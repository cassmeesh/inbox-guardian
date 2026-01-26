import { cn } from '@/lib/utils';
import { RiskLevel } from '@/types/simulation';
import { Shield, ShieldAlert, ShieldX, AlertTriangle } from 'lucide-react';

interface RiskMeterProps {
  score: number;
  level: RiskLevel;
  animate?: boolean;
}

const levelConfig = {
  low: {
    label: 'Low Risk',
    icon: Shield,
    color: 'text-risk-low',
    bgColor: 'bg-risk-low',
    gradient: 'risk-gradient-low'
  },
  elevated: {
    label: 'Elevated',
    icon: ShieldAlert,
    color: 'text-risk-elevated',
    bgColor: 'bg-risk-elevated',
    gradient: 'risk-gradient-elevated'
  },
  high: {
    label: 'High Risk',
    icon: AlertTriangle,
    color: 'text-risk-high',
    bgColor: 'bg-risk-high',
    gradient: 'risk-gradient-high'
  },
  critical: {
    label: 'Critical',
    icon: ShieldX,
    color: 'text-risk-critical',
    bgColor: 'bg-risk-critical',
    gradient: 'risk-gradient-critical'
  }
};

export function RiskMeter({ score, level, animate = false }: RiskMeterProps) {
  const config = levelConfig[level];
  const Icon = config.icon;

  return (
    <div className={cn(
      "bg-card rounded-lg p-4 border border-border shadow-sm",
      level === 'critical' && 'risk-pulse'
    )}>
      <div className="flex items-center gap-3 mb-3">
        <div className={cn(
          "p-2 rounded-md",
          level === 'low' && "bg-risk-low/10",
          level === 'elevated' && "bg-risk-elevated/10",
          level === 'high' && "bg-risk-high/10",
          level === 'critical' && "bg-risk-critical/10"
        )}>
          <Icon className={cn("w-5 h-5", config.color)} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Organization Risk</p>
          <p className={cn("font-semibold", config.color)}>{config.label}</p>
        </div>
      </div>
      
      <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out",
            config.gradient
          )}
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-2">
        <span className="text-xs text-muted-foreground">Safe</span>
        <span className="text-xs text-muted-foreground">Critical</span>
      </div>
    </div>
  );
}
