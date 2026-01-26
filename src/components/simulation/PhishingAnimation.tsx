import { motion } from 'framer-motion';
import phishingGraphic from '@/assets/phishing-graphic.jpg';

export function PhishingAnimation() {
  return (
    <motion.div 
      className="relative w-48 h-48 mx-auto mb-4 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.img
        src={phishingGraphic}
        alt="Phishing awareness illustration"
        className="w-full h-full object-contain"
        animate={{ 
          y: [0, -4, 0, 4, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}
