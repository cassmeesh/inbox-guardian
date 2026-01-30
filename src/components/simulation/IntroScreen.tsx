import { Button } from '@/components/ui/button';
import { Mail, AlertTriangle, Clock, Shield } from 'lucide-react';
import { PhishingAnimation } from './PhishingAnimation';
import { motion } from 'framer-motion';
import phishingBg from '@/assets/phishing-bg.png';

interface IntroScreenProps {
  onStart: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: `url(${phishingBg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain'
        }} 
      />
      
      <motion.div 
        className="max-w-2xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with Phishing Animation */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <PhishingAnimation />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Inbox Guardian</h1>
          <p className="text-muted-foreground text-lg">An interactive phishing awareness learning experience</p>
        </motion.div>

        {/* Context Card */}
        <motion.div 
          className="bg-card rounded-xl border border-border p-6 mb-8 inbox-shadow"
          variants={itemVariants}
        >
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <h2 className="font-semibold text-foreground mb-1">IT Alert</h2>
              <p className="text-sm text-muted-foreground">Organizations across industries have experienced a rise in targeted email-based attacks. Your company has seen increased suspicious activity as well.</p>
            </div>
          </div>
          
          <p className="text-foreground mb-6">IT has asked all employees to be extra vigilant. In this simulation, you'll step into a realistic inbox and respond to messages as you would during a normal workday.</p>

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
        </motion.div>

        {/* Disclaimer */}
        <motion.p 
          className="text-center text-xs text-muted-foreground mb-6"
          variants={itemVariants}
        >
          This is a behavioral simulation, not a pass/fail assessment. 
          The goal is to help you make safer decisions.
        </motion.p>

        {/* Start Button */}
        <motion.div variants={itemVariants}>
          <Button onClick={onStart} size="lg" className="w-full text-base h-12">
            Begin Simulation
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}