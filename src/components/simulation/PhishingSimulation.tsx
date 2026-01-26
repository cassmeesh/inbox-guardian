import { useSimulation } from '@/hooks/useSimulation';
import { IntroScreen } from './IntroScreen';
import { InboxScreen } from './InboxScreen';
import { IncidentScreen } from './IncidentScreen';
import { SummaryScreen } from './SummaryScreen';
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const pageTransition = {
  duration: 0.3,
  ease: "easeOut" as const
};

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
    <AnimatePresence mode="wait">
      {state.phase === 'intro' && (
        <motion.div
          key="intro"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="w-full h-full"
        >
          <IntroScreen onStart={startSimulation} />
        </motion.div>
      )}

      {state.phase === 'inbox' && (
        <motion.div
          key="inbox"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="w-full h-full"
        >
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
        </motion.div>
      )}

      {state.phase === 'incident' && (
        <motion.div
          key="incident"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="w-full h-full"
        >
          <IncidentScreen onContinue={continueFromIncident} />
        </motion.div>
      )}

      {state.phase === 'summary' && (
        <motion.div
          key="summary"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="w-full h-full"
        >
          <SummaryScreen 
            data={getSummaryData()} 
            onRestart={resetSimulation}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
