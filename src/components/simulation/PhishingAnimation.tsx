import { motion } from 'framer-motion';

export function PhishingAnimation() {
  return (
    <div className="relative w-32 h-24 mx-auto mb-4 flex items-center justify-center">
      {/* Floating Fish */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.svg
          viewBox="0 0 64 40"
          className="w-20 h-12"
          animate={{ 
            y: [0, -6, 0, 6, 0],
            rotate: [0, -3, 0, 3, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Fish body */}
          <ellipse cx="28" cy="20" rx="20" ry="12" className="fill-primary" />
          
          {/* Fish tail */}
          <path
            d="M48 20 L60 8 L58 20 L60 32 Z"
            className="fill-primary"
          />
          
          {/* Fish eye */}
          <circle cx="16" cy="17" r="4" className="fill-background" />
          <circle cx="15" cy="16" r="2" className="fill-foreground" />
          
          {/* Fins */}
          <path
            d="M28 8 Q32 2 36 8"
            fill="none"
            className="stroke-primary-foreground/30"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M28 32 Q32 38 36 32"
            fill="none"
            className="stroke-primary-foreground/30"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.svg>
      </motion.div>

      {/* Bubbles */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{ top: (i - 1) * 12 }}
            animate={{
              x: [0, 10, 20],
              opacity: [0.6, 0.3, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}
