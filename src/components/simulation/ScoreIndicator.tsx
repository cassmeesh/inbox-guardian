import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScoreIndicatorProps {
  scoreChange: number | null;
  onAnimationComplete: () => void;
}

export function ScoreIndicator({ scoreChange, onAnimationComplete }: ScoreIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState<number | null>(null);

  useEffect(() => {
    if (scoreChange !== null && scoreChange !== 0) {
      setDisplayValue(scoreChange);
      setIsVisible(true);
      
      // Hide after animation
      const timer = setTimeout(() => {
        setIsVisible(false);
        onAnimationComplete();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [scoreChange, onAnimationComplete]);

  if (!isVisible || displayValue === null || displayValue === 0) {
    return null;
  }

  const isPositive = displayValue > 0;

  return (
    <div
      className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-10",
        "animate-score-pop"
      )}
    >
      <div
        className={cn(
          "px-3 py-1.5 rounded-full font-bold text-lg shadow-lg",
          isPositive 
            ? "bg-emerald-500 text-white" 
            : "bg-red-500 text-white"
        )}
      >
        {isPositive ? '+' : ''}{displayValue}
      </div>
    </div>
  );
}
