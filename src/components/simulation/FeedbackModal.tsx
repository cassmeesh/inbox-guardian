import { useEffect } from 'react';
import { ActionFeedback } from '@/types/simulation';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';

interface FeedbackModalProps {
  feedback: ActionFeedback;
  onContinue: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.3
    }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: { 
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.1
    }
  }
};

export function FeedbackModal({ feedback, onContinue }: FeedbackModalProps) {
  const isPositive = feedback.isPositive;
  const isCritical = feedback.riskChange >= 15;
  const { playDing } = useSound();

  useEffect(() => {
    if (isPositive) {
      playDing();
    }
  }, [isPositive, playDing]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="bg-card rounded-xl shadow-2xl max-w-md w-full p-6"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icon */}
        <motion.div 
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto",
            isPositive && "bg-success/10",
            !isPositive && !isCritical && "bg-warning/10",
            !isPositive && isCritical && "bg-destructive/10"
          )}
          variants={iconVariants}
          initial="hidden"
          animate="visible"
        >
          {isPositive ? (
            <CheckCircle className="w-8 h-8 text-success" />
          ) : isCritical ? (
            <XCircle className="w-8 h-8 text-destructive" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-warning" />
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <h3 className={cn(
            "text-lg font-semibold text-center mb-2",
            isPositive && "text-success",
            !isPositive && !isCritical && "text-warning-foreground",
            !isPositive && isCritical && "text-destructive"
          )}>
            {feedback.title}
          </h3>
          
          <p className="text-sm text-muted-foreground text-center mb-4 leading-relaxed">
            {feedback.description}
          </p>
        </motion.div>

        {/* Risk Change */}
        <motion.div 
          className={cn(
            "text-center py-2 px-4 rounded-lg mb-6",
            feedback.riskChange < 0 && "bg-success/10",
            feedback.riskChange === 0 && "bg-muted",
            feedback.riskChange > 0 && feedback.riskChange < 15 && "bg-warning/10",
            feedback.riskChange >= 15 && "bg-destructive/10"
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <span className={cn(
            "text-sm font-medium",
            feedback.riskChange < 0 && "text-success",
            feedback.riskChange === 0 && "text-muted-foreground",
            feedback.riskChange > 0 && feedback.riskChange < 15 && "text-warning-foreground",
            feedback.riskChange >= 15 && "text-destructive"
          )}>
            Risk Level: {feedback.riskChange > 0 ? '+' : ''}{feedback.riskChange}%
          </span>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          <Button 
            onClick={onContinue} 
            className="w-full gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
