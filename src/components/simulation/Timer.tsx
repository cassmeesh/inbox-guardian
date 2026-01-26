import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface TimerProps {
  seconds: number;
  onExpire: () => void;
  isPaused?: boolean;
}

export function Timer({ seconds, onExpire, isPaused = false }: TimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    setRemaining(seconds);
    setExpired(false);
  }, [seconds]);

  useEffect(() => {
    if (isPaused || expired) return;

    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setExpired(true);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, expired, onExpire]);

  const progress = (remaining / seconds) * 100;
  const isUrgent = remaining <= 10;

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
      isUrgent 
        ? "bg-risk-critical/10 text-risk-critical pulse-urgent" 
        : "bg-risk-elevated/10 text-risk-elevated"
    )}>
      <Clock className="w-4 h-4" />
      <span>{remaining}s</span>
      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-linear",
            isUrgent ? "bg-risk-critical" : "bg-risk-elevated"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
