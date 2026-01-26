import { useSimulation } from '@/hooks/useSimulation';
import { IntroScreen } from './IntroScreen';
import { InboxScreen } from './InboxScreen';
import { IncidentScreen } from './IncidentScreen';
import { SummaryScreen } from './SummaryScreen';

export function PhishingSimulation() {
  const {
    state,
    emails,
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
  } = useSimulation();

  const riskLevel = getRiskLevel(state.riskScore);

  return (
    <>
      {state.phase === 'intro' && (
        <IntroScreen onStart={startSimulation} />
      )}

      {state.phase === 'inbox' && (
        <InboxScreen
          emails={emails}
          currentEmailIndex={state.currentEmailIndex}
          completedEmails={state.completedEmails}
          riskScore={state.riskScore}
          riskLevel={riskLevel}
          currentScore={state.currentScore}
          maxScore={maxPossibleScore}
          lastScoreChange={state.lastScoreChange}
          onClearScoreChange={clearLastScoreChange}
          onAction={handleEmailAction}
          onTimerExpire={handleTimerExpiry}
          onNext={nextEmail}
        />
      )}

      {state.phase === 'incident' && (
        <IncidentScreen onContinue={continueFromIncident} />
      )}

      {state.phase === 'summary' && (
        <SummaryScreen 
          data={getSummaryData()} 
          onRestart={resetSimulation}
        />
      )}
    </>
  );
}
