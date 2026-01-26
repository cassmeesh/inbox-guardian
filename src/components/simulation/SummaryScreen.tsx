import { SummaryData } from '@/types/simulation';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  ShieldAlert, 
  ShieldX, 
  CheckCircle, 
  AlertTriangle,
  RotateCcw,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryScreenProps {
  data: SummaryData;
  onRestart: () => void;
}

const riskConfig = {
  low: {
    icon: Shield,
    label: 'Low Risk',
    color: 'text-risk-low',
    bgColor: 'bg-risk-low/10',
    message: 'Your decisions kept organizational risk at a minimum.'
  },
  elevated: {
    icon: ShieldAlert,
    label: 'Elevated Risk',
    color: 'text-risk-elevated',
    bgColor: 'bg-risk-elevated/10',
    message: 'Some decisions increased organizational exposure.'
  },
  high: {
    icon: ShieldAlert,
    label: 'High Risk',
    color: 'text-risk-high',
    bgColor: 'bg-risk-high/10',
    message: 'Several actions significantly increased organizational risk.'
  },
  critical: {
    icon: ShieldX,
    label: 'Critical Risk',
    color: 'text-risk-critical',
    bgColor: 'bg-risk-critical/10',
    message: 'Multiple high-risk actions led to significant exposure.'
  }
};

export function SummaryScreen({ data, onRestart }: SummaryScreenProps) {
  const config = riskConfig[data.finalRiskLevel];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={cn(
            "inline-flex items-center justify-center w-20 h-20 rounded-full mb-4",
            config.bgColor
          )}>
            <Icon className={cn("w-10 h-10", config.color)} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Simulation Complete
          </h1>
          <p className="text-muted-foreground">
            Your Security Snapshot
          </p>
        </div>

        {/* Risk Summary Card */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6 inbox-shadow">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Final Risk Level</p>
              <p className={cn("text-2xl font-bold", config.color)}>
                {config.label}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Risk Score</p>
              <p className={cn("text-2xl font-bold", config.color)}>
                {data.riskScore}%
              </p>
            </div>
          </div>
          
          <p className="text-foreground mb-6">{config.message}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-foreground">{data.totalEmails}</p>
              <p className="text-xs text-muted-foreground">Messages</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-success">{data.phishingReported}</p>
              <p className="text-xs text-muted-foreground">Phishing Reported</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-risk-critical">{data.phishingOpened}</p>
              <p className="text-xs text-muted-foreground">Phishing Clicked</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-foreground">{data.correctActions}</p>
              <p className="text-xs text-muted-foreground">Safe Actions</p>
            </div>
          </div>
        </div>

        {/* Behaviors */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Strong Behaviors */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-success" />
              <h3 className="font-semibold text-foreground">Strong Behaviors</h3>
            </div>
            <ul className="space-y-2">
              {data.strongBehaviors.map((behavior, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  {behavior}
                </li>
              ))}
            </ul>
          </div>

          {/* Areas to Watch */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground">Areas to Watch</h3>
            </div>
            <ul className="space-y-2">
              {data.areasToWatch.map((area, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Message */}
        <div className="bg-primary/5 rounded-xl p-5 mb-6 text-center">
          <p className="text-foreground">
            <strong>Remember:</strong> Phishing defense is about reducing risk over time, 
            not eliminating it entirely. Stay vigilant and report suspicious messages.
          </p>
        </div>

        {/* Restart */}
        <Button 
          onClick={onRestart} 
          variant="outline"
          size="lg" 
          className="w-full gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
