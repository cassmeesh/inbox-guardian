import { Button } from '@/components/ui/button';
import { ShieldX, AlertOctagon, Server, Users, ArrowRight } from 'lucide-react';

interface IncidentScreenProps {
  onContinue: () => void;
}

export function IncidentScreen({ onContinue }: IncidentScreenProps) {
  return (
    <div className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-lg w-full fade-in">
        {/* Alert Animation */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-risk-critical/20 mb-4 risk-pulse">
            <ShieldX className="w-10 h-10 text-risk-critical" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-risk-critical rounded-full text-primary-foreground text-sm font-medium mb-4">
            <AlertOctagon className="w-4 h-4" />
            Security Incident Detected
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-card rounded-xl border border-border p-6 scale-in">
          <h2 className="text-xl font-bold text-foreground mb-3 text-center">
            Simulated Breach Alert
          </h2>
          
          <p className="text-muted-foreground text-center mb-6">
            Due to accumulated security risks from your inbox interactions, 
            your organization experienced a simulated security incident.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg">
              <Server className="w-5 h-5 text-destructive" />
              <div className="text-sm">
                <p className="font-medium text-foreground">System Compromise</p>
                <p className="text-muted-foreground text-xs">Credentials may have been exposed</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg">
              <Users className="w-5 h-5 text-destructive" />
              <div className="text-sm">
                <p className="font-medium text-foreground">Potential Spread</p>
                <p className="text-muted-foreground text-xs">Other employees may be targeted next</p>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-foreground leading-relaxed">
              <strong>Remember:</strong> In a real incident, the security team would respond immediately. 
              This simulation continues so you can see how the rest of your decisions affect the outcome.
            </p>
          </div>

          <Button 
            onClick={onContinue} 
            className="w-full gap-2"
          >
            Continue Simulation
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
