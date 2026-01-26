import { ActionFeedback } from '@/types/simulation';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedbackModalProps {
  feedback: ActionFeedback;
  onContinue: () => void;
}

export function FeedbackModal({ feedback, onContinue }: FeedbackModalProps) {
  const isPositive = feedback.isPositive;
  const isCritical = feedback.riskChange >= 15;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm fade-in">
      <div className="bg-card rounded-xl shadow-2xl max-w-md w-full p-6 scale-in">
        {/* Icon */}
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto",
          isPositive && "bg-success/10",
          !isPositive && !isCritical && "bg-warning/10",
          !isPositive && isCritical && "bg-destructive/10"
        )}>
          {isPositive ? (
            <CheckCircle className="w-8 h-8 text-success" />
          ) : isCritical ? (
            <XCircle className="w-8 h-8 text-destructive" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-warning" />
          )}
        </div>

        {/* Content */}
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

        {/* Risk Change */}
        <div className={cn(
          "text-center py-2 px-4 rounded-lg mb-6",
          feedback.riskChange < 0 && "bg-success/10",
          feedback.riskChange === 0 && "bg-muted",
          feedback.riskChange > 0 && feedback.riskChange < 15 && "bg-warning/10",
          feedback.riskChange >= 15 && "bg-destructive/10"
        )}>
          <span className={cn(
            "text-sm font-medium",
            feedback.riskChange < 0 && "text-success",
            feedback.riskChange === 0 && "text-muted-foreground",
            feedback.riskChange > 0 && feedback.riskChange < 15 && "text-warning-foreground",
            feedback.riskChange >= 15 && "text-destructive"
          )}>
            Risk Level: {feedback.riskChange > 0 ? '+' : ''}{feedback.riskChange}%
          </span>
        </div>

        {/* Continue Button */}
        <Button 
          onClick={onContinue} 
          className="w-full gap-2"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
