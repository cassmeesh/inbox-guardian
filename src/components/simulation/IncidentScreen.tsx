import { Button } from '@/components/ui/button';
import { ShieldX, AlertOctagon, Server, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface IncidentScreenProps {
  onContinue: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      delay: 0.1
    }
  }
};

const pulseVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.5
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.1, duration: 0.3 }
  })
};

export function IncidentScreen({ onContinue }: IncidentScreenProps) {
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-md flex items-center justify-center p-4"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="max-w-lg w-full"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Alert Animation */}
        <div className="text-center mb-6">
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-risk-critical/20 mb-4"
            variants={pulseVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ShieldX className="w-10 h-10 text-risk-critical" />
            </motion.div>
          </motion.div>
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-risk-critical rounded-full text-primary-foreground text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <AlertOctagon className="w-4 h-4" />
            Security Incident Detected
          </motion.div>
        </div>

        {/* Content Card */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-3 text-center">
            Simulated Breach Alert
          </h2>
          
          <p className="text-muted-foreground text-center mb-6">
            Due to accumulated security risks from your inbox interactions, 
            your organization experienced a simulated security incident.
          </p>

          <div className="space-y-3 mb-6">
            <motion.div 
              className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg"
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Server className="w-5 h-5 text-destructive" />
              <div className="text-sm">
                <p className="font-medium text-foreground">System Compromise</p>
                <p className="text-muted-foreground text-xs">Credentials may have been exposed</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg"
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Users className="w-5 h-5 text-destructive" />
              <div className="text-sm">
                <p className="font-medium text-foreground">Potential Spread</p>
                <p className="text-muted-foreground text-xs">Other employees may be targeted next</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="bg-muted rounded-lg p-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <p className="text-sm text-foreground leading-relaxed">
              <strong>Remember:</strong> In a real incident, the security team would respond immediately. 
              This simulation continues so you can see how the rest of your decisions affect the outcome.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <Button 
              onClick={onContinue} 
              className="w-full gap-2"
            >
              Continue Simulation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
