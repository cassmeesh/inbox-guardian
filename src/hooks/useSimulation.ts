import { useState, useCallback } from 'react';
import { SimulationState, ActionType, RiskLevel, SummaryData } from '@/types/simulation';
import { emails, emailConsequences } from '@/data/emails';

const RISK_THRESHOLDS = {
  low: 20,
  elevated: 45,
  high: 70,
  critical: 100
};

const INCIDENT_THRESHOLD = 60;

export function useSimulation() {
  const [state, setState] = useState<SimulationState>({
    phase: 'intro',
    currentEmailIndex: 0,
    riskScore: 0,
    maxRisk: 100,
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
    if (!consequence) return null;

    setState(prev => {
      const newRiskScore = Math.max(0, Math.min(100, prev.riskScore + consequence.riskChange));
      const shouldTriggerIncident = newRiskScore >= INCIDENT_THRESHOLD && !prev.incidentTriggered;
      
      return {
        ...prev,
        riskScore: newRiskScore,
        actions: [...prev.actions, { emailId, action }],
        completedEmails: [...prev.completedEmails, emailId],
        incidentTriggered: prev.incidentTriggered || shouldTriggerIncident,
        phase: shouldTriggerIncident ? 'incident' : prev.phase
      };
    });

    return consequence;
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
    setState(prev => ({ ...prev, phase: 'inbox' }));
  }, []);

  const nextEmail = useCallback(() => {
    setState(prev => {
      const nextIndex = prev.currentEmailIndex + 1;
      if (nextIndex >= emails.length) {
        return { ...prev, phase: 'summary' };
      }
      return { ...prev, currentEmailIndex: nextIndex };
    });
  }, []);

  const getSummaryData = useCallback((): SummaryData => {
    const phishingEmails = emails.filter(e => e.isPhishing);
    const legitEmails = emails.filter(e => !e.isPhishing);
    
    let phishingReported = 0;
    let phishingOpened = 0;
    let legitimateMisreported = 0;
    let correctActions = 0;

    state.actions.forEach(({ emailId, action }) => {
      const email = emails.find(e => e.id === emailId);
      if (!email) return;

      if (email.isPhishing) {
        if (action === 'report') {
          phishingReported++;
          correctActions++;
        } else if (action === 'open') {
          phishingOpened++;
        } else if (action === 'delete') {
          correctActions++;
        }
      } else {
        if (action === 'report') {
          legitimateMisreported++;
        } else if (action === 'open' || action === 'ignore') {
          correctActions++;
        }
      }
    });

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
      areasToWatch
    };
  }, [state.actions, state.riskScore, getRiskLevel]);

  const resetSimulation = useCallback(() => {
    setState({
      phase: 'intro',
      currentEmailIndex: 0,
      riskScore: 0,
      maxRisk: 100,
      actions: [],
      completedEmails: [],
      incidentTriggered: false
    });
  }, []);

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
    resetSimulation
  };
}
