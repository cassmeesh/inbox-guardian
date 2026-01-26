import { useState, useCallback } from 'react';
import { SimulationState, ActionType, RiskLevel, SummaryData, Designation } from '@/types/simulation';
import { emails, emailConsequences } from '@/data/emails';

const RISK_THRESHOLDS = {
  low: 20,
  elevated: 45,
  high: 70,
  critical: 100
};

// Points awarded for each action type
const SCORE_POINTS = {
  phishingReported: 20,      // Best action for phishing
  phishingDeleted: 10,       // Acceptable for phishing
  phishingIgnored: 0,        // Neutral - didn't click but didn't report
  phishingOpened: -15,       // Bad - clicked on phishing
  legitimateOpened: 10,      // Correct - engaged with legit email
  legitimateIgnored: 5,      // Acceptable - didn't report falsely
  legitimateDeleted: 0,      // Neutral
  legitimateReported: -5,    // Minor penalty for false positive
};

const DESIGNATION_THRESHOLDS = {
  'security-champion': 90,
  'vigilant-defender': 70,
  'aware-employee': 50,
  'developing-awareness': 30,
  'needs-training': 0,
};

const INCIDENT_THRESHOLD = 60;

export function useSimulation() {
  const [state, setState] = useState<SimulationState>({
    phase: 'intro',
    currentEmailIndex: 0,
    riskScore: 0,
    maxRisk: 100,
    currentScore: 0,
    lastScoreChange: null,
    actions: [],
    completedEmails: [],
    incidentTriggered: false
  });

  const getRiskLevel = useCallback((score: number): RiskLevel => {
    if (score < RISK_THRESHOLDS.low) return 'low';
    if (score < RISK_THRESHOLDS.elevated) return 'elevated';
    if (score < RISK_THRESHOLDS.high) return 'high';
    return 'critical';
  }, []);

  const startSimulation = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'inbox' }));
  }, []);

  const handleEmailAction = useCallback((emailId: string, action: ActionType) => {
    const consequence = emailConsequences[emailId]?.[action];
    const email = emails.find(e => e.id === emailId);
    if (!consequence || !email) return null;

    // Calculate score change for this action
    let scoreChange = 0;
    if (email.isPhishing) {
      if (action === 'report') scoreChange = SCORE_POINTS.phishingReported;
      else if (action === 'open') scoreChange = SCORE_POINTS.phishingOpened;
      else if (action === 'delete') scoreChange = SCORE_POINTS.phishingDeleted;
      else if (action === 'ignore') scoreChange = SCORE_POINTS.phishingIgnored;
    } else {
      if (action === 'report') scoreChange = SCORE_POINTS.legitimateReported;
      else if (action === 'open') scoreChange = SCORE_POINTS.legitimateOpened;
      else if (action === 'delete') scoreChange = SCORE_POINTS.legitimateDeleted;
      else if (action === 'ignore') scoreChange = SCORE_POINTS.legitimateIgnored;
    }

    setState(prev => {
      const newRiskScore = Math.max(0, Math.min(100, prev.riskScore + consequence.riskChange));
      const shouldTriggerIncident = newRiskScore >= INCIDENT_THRESHOLD && !prev.incidentTriggered;
      
      return {
        ...prev,
        riskScore: newRiskScore,
        currentScore: prev.currentScore + scoreChange,
        lastScoreChange: scoreChange,
        actions: [...prev.actions, { emailId, action }],
        completedEmails: [...prev.completedEmails, emailId],
        incidentTriggered: prev.incidentTriggered || shouldTriggerIncident,
        phase: shouldTriggerIncident ? 'incident' : prev.phase
      };
    });

    return consequence;
  }, []);

  const clearLastScoreChange = useCallback(() => {
    setState(prev => ({ ...prev, lastScoreChange: null }));
  }, []);

  const handleTimerExpiry = useCallback((emailId: string) => {
    const email = emails.find(e => e.id === emailId);
    if (!email) return null;

    // Expiring on a phishing email without action = slight risk increase
    const consequence = {
      title: 'Time Expired',
      description: email.isPhishing 
        ? 'The urgency was designed to pressure you. While you didn\'t click, delayed responses to urgent requests can sometimes lead to hasty decisions later.'
        : 'Some messages do require timely responses.',
      riskChange: email.isPhishing ? 3 : 0,
      isPositive: false
    };

    setState(prev => ({
      ...prev,
      riskScore: Math.max(0, Math.min(100, prev.riskScore + consequence.riskChange)),
      completedEmails: [...prev.completedEmails, emailId]
    }));

    return consequence;
  }, []);

  const continueFromIncident = useCallback(() => {
    setState(prev => {
      const nextIncompleteIndex = emails.findIndex(
        email => !prev.completedEmails.includes(email.id)
      );
      
      if (nextIncompleteIndex === -1) {
        return { ...prev, phase: 'summary' };
      }
      
      return { 
        ...prev, 
        phase: 'inbox',
        currentEmailIndex: nextIncompleteIndex 
      };
    });
  }, []);

  const nextEmail = useCallback(() => {
    setState(prev => {
      if (prev.completedEmails.length >= emails.length) {
        return { ...prev, phase: 'summary' };
      }
      
      const nextIncompleteIndex = emails.findIndex(
        email => !prev.completedEmails.includes(email.id)
      );
      
      if (nextIncompleteIndex === -1) {
        return { ...prev, phase: 'summary' };
      }
      
      return { ...prev, currentEmailIndex: nextIncompleteIndex };
    });
  }, []);

  const getSummaryData = useCallback((): SummaryData => {
    const phishingEmails = emails.filter(e => e.isPhishing);
    const legitEmails = emails.filter(e => !e.isPhishing);
    
    let phishingReported = 0;
    let phishingOpened = 0;
    let legitimateMisreported = 0;
    let correctActions = 0;
    let totalScore = 0;

    // Calculate max possible score
    const maxScore = 
      phishingEmails.length * SCORE_POINTS.phishingReported + 
      legitEmails.length * SCORE_POINTS.legitimateOpened;

    state.actions.forEach(({ emailId, action }) => {
      const email = emails.find(e => e.id === emailId);
      if (!email) return;

      if (email.isPhishing) {
        if (action === 'report') {
          phishingReported++;
          correctActions++;
          totalScore += SCORE_POINTS.phishingReported;
        } else if (action === 'open') {
          phishingOpened++;
          totalScore += SCORE_POINTS.phishingOpened;
        } else if (action === 'delete') {
          correctActions++;
          totalScore += SCORE_POINTS.phishingDeleted;
        } else if (action === 'ignore') {
          totalScore += SCORE_POINTS.phishingIgnored;
        }
      } else {
        if (action === 'report') {
          legitimateMisreported++;
          totalScore += SCORE_POINTS.legitimateReported;
        } else if (action === 'open') {
          correctActions++;
          totalScore += SCORE_POINTS.legitimateOpened;
        } else if (action === 'ignore') {
          correctActions++;
          totalScore += SCORE_POINTS.legitimateIgnored;
        } else if (action === 'delete') {
          totalScore += SCORE_POINTS.legitimateDeleted;
        }
      }
    });

    // Normalize score to percentage (0-100)
    const normalizedScore = Math.max(0, Math.min(100, Math.round((totalScore / maxScore) * 100)));

    // Determine designation based on score
    const getDesignation = (score: number): Designation => {
      if (score >= DESIGNATION_THRESHOLDS['security-champion']) return 'security-champion';
      if (score >= DESIGNATION_THRESHOLDS['vigilant-defender']) return 'vigilant-defender';
      if (score >= DESIGNATION_THRESHOLDS['aware-employee']) return 'aware-employee';
      if (score >= DESIGNATION_THRESHOLDS['developing-awareness']) return 'developing-awareness';
      return 'needs-training';
    };

    const strongBehaviors: string[] = [];
    const areasToWatch: string[] = [];

    if (phishingReported > 0) {
      strongBehaviors.push('Identified and reported suspicious messages');
    }
    if (phishingOpened === 0) {
      strongBehaviors.push('Avoided clicking on malicious links');
    }
    if (legitimateMisreported === 0) {
      strongBehaviors.push('Accurately distinguished legitimate communications');
    }
    if (correctActions >= emails.length * 0.7) {
      strongBehaviors.push('Demonstrated strong overall judgment');
    }

    if (phishingOpened > 0) {
      areasToWatch.push('Check sender domains carefully before clicking links');
    }
    if (phishingReported < phishingEmails.length / 2) {
      areasToWatch.push('Report suspicious messages to help protect colleagues');
    }
    if (legitimateMisreported > 1) {
      areasToWatch.push('Take time to verify sender authenticity before reporting');
    }

    // Ensure we always have at least one of each
    if (strongBehaviors.length === 0) {
      strongBehaviors.push('Completed the security awareness simulation');
    }
    if (areasToWatch.length === 0) {
      areasToWatch.push('Continue practicing phishing recognition skills');
    }

    return {
      finalRiskLevel: getRiskLevel(state.riskScore),
      riskScore: state.riskScore,
      totalEmails: emails.length,
      correctActions,
      phishingReported,
      phishingOpened,
      legitimateMisreported,
      strongBehaviors,
      areasToWatch,
      score: normalizedScore,
      maxScore: 100,
      designation: getDesignation(normalizedScore)
    };
  }, [state.actions, state.riskScore, getRiskLevel]);

  const resetSimulation = useCallback(() => {
    setState({
      phase: 'intro',
      currentEmailIndex: 0,
      riskScore: 0,
      maxRisk: 100,
      currentScore: 0,
      lastScoreChange: null,
      actions: [],
      completedEmails: [],
      incidentTriggered: false
    });
  }, []);

  // Calculate max possible score for display
  const maxPossibleScore = emails.filter(e => e.isPhishing).length * SCORE_POINTS.phishingReported + 
    emails.filter(e => !e.isPhishing).length * SCORE_POINTS.legitimateOpened;

  return {
    state,
    emails,
    currentEmail: emails[state.currentEmailIndex],
    getRiskLevel,
    startSimulation,
    handleEmailAction,
    handleTimerExpiry,
    continueFromIncident,
    nextEmail,
    getSummaryData,
    resetSimulation,
    clearLastScoreChange,
    maxPossibleScore
  };
}
