import { Button } from '@/components/ui/button';
import { Mail, AlertTriangle, Clock, Shield } from 'lucide-react';
import { PhishingAnimation } from './PhishingAnimation';

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full fade-in">
        {/* Header with Phishing Animation */}
        <div className="text-center mb-8">
          <PhishingAnimation />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Phishing Awareness Simulation
          </h1>
          <p className="text-muted-foreground text-lg">
            An interactive security experience
          </p>
        </div>

        {/* Context Card */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8 inbox-shadow">
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <h2 className="font-semibold text-foreground mb-1">Security Alert</h2>
              <p className="text-sm text-muted-foreground">
                Organizations across the industry have experienced a rise in targeted email-based attacks. 
                Your company has seen increased suspicious activity as well.
              </p>
            </div>
          </div>
          
          <p className="text-foreground mb-6">
            Security has asked all employees to be extra vigilant. In this simulation, you'll step into 
            a realistic inbox and respond to messages as you would during a normal workday.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Review your inbox</p>
                <p className="text-xs text-muted-foreground">
                  Some messages are legitimate. Others are not.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Every decision matters</p>
                <p className="text-xs text-muted-foreground">
                  Your choices contribute to the organization's overall risk level.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Time pressure</p>
                <p className="text-xs text-muted-foreground">
                  Some messages are marked urgent. Decide before time runs out.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground mb-6">
          This is a behavioral simulation, not a pass/fail assessment. 
          The goal is to help you make safer decisions.
        </p>

        {/* Start Button */}
        <Button 
          onClick={onStart} 
          size="lg" 
          className="w-full text-base h-12"
        >
          Begin Simulation
        </Button>
      </div>
    </div>
  );
}
