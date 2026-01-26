import { useEffect } from 'react';
import { SummaryData, Designation } from '@/types/simulation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import confetti from 'canvas-confetti';
import { 
  Shield, 
  ShieldAlert, 
  ShieldX, 
  CheckCircle, 
  AlertTriangle,
  RotateCcw,
  TrendingUp,
  Award,
  Star,
  Eye,
  BookOpen,
  Target,
  X
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

const designationConfig: Record<Designation, {
  title: string;
  description: string;
  icon: typeof Award;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  'security-champion': {
    title: 'Security Champion',
    description: 'Exceptional awareness and judgment. You\'re a model for security-conscious behavior.',
    icon: Award,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30'
  },
  'vigilant-defender': {
    title: 'Vigilant Defender',
    description: 'Strong security instincts. You consistently make safe choices under pressure.',
    icon: Shield,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30'
  },
  'aware-employee': {
    title: 'Aware Employee',
    description: 'Solid foundation in security awareness. Continue building on these skills.',
    icon: Eye,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  'developing-awareness': {
    title: 'Developing Awareness',
    description: 'You\'re learning to spot threats. Focus on verifying sender details and links.',
    icon: Target,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30'
  },
  'needs-training': {
    title: 'Training Recommended',
    description: 'Additional practice will help strengthen your threat recognition skills.',
    icon: BookOpen,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30'
  }
};

export function SummaryScreen({ data, onRestart }: SummaryScreenProps) {
  const config = riskConfig[data.finalRiskLevel];
  const Icon = config.icon;
  const designation = designationConfig[data.designation];
  const DesignationIcon = designation.icon;

  const shouldCelebrate = data.designation === 'security-champion' || data.designation === 'vigilant-defender';

  useEffect(() => {
    if (!shouldCelebrate) return;

    // Initial burst
    const fireConfetti = () => {
      // Left side
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: data.designation === 'security-champion' 
          ? ['#fbbf24', '#f59e0b', '#d97706', '#ffffff']
          : ['#10b981', '#34d399', '#6ee7b7', '#ffffff']
      });
      
      // Right side
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: data.designation === 'security-champion' 
          ? ['#fbbf24', '#f59e0b', '#d97706', '#ffffff']
          : ['#10b981', '#34d399', '#6ee7b7', '#ffffff']
      });
    };

    // Fire immediately
    fireConfetti();

    // Fire again after a short delay for extra celebration
    const timeout1 = setTimeout(fireConfetti, 300);
    const timeout2 = setTimeout(fireConfetti, 600);

    // For security champion, add extra celebration
    if (data.designation === 'security-champion') {
      const timeout3 = setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { x: 0.5, y: 0.4 },
          colors: ['#fbbf24', '#f59e0b', '#d97706', '#fef3c7', '#ffffff']
        });
      }, 900);
      
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [shouldCelebrate, data.designation]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full fade-in">
        {/* Designation Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center">
            <div className={cn(
              "flex items-center justify-center w-24 h-24 rounded-full mb-4 border-2",
              designation.bgColor,
              designation.borderColor
            )}>
              <DesignationIcon className={cn("w-12 h-12", designation.color)} />
            </div>
            <Badge className={cn("mb-3 px-4 py-1 text-sm", designation.bgColor, designation.color, "border", designation.borderColor)}>
              {designation.title}
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Simulation Complete
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            {designation.description}
          </p>
        </div>

        {/* Score Card */}
        <div className={cn(
          "rounded-xl border-2 p-6 mb-6 text-center",
          designation.bgColor,
          designation.borderColor
        )}>
          <p className="text-sm text-muted-foreground mb-2">Your Score</p>
          <div className="flex items-center justify-center gap-2">
            <Star className={cn("w-8 h-8", designation.color)} />
            <span className={cn("text-5xl font-bold", designation.color)}>
              {data.score}
            </span>
            <span className="text-2xl text-muted-foreground">/100</span>
          </div>
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onRestart} 
            variant="outline"
            size="lg" 
            className="flex-1 gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
          <Button 
            onClick={() => window.close()} 
            variant="default"
            size="lg" 
            className="flex-1 gap-2"
          >
            <X className="w-4 h-4" />
            End Simulation
          </Button>
        </div>
      </div>
    </div>
  );
}
