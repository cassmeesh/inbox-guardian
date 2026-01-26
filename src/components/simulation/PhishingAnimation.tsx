import { motion } from 'framer-motion';

export function PhishingAnimation() {
  return (
    <div className="relative w-32 h-32 mx-auto mb-4">
      {/* Fishing line */}
      <motion.div
        className="absolute left-1/2 top-0 w-0.5 bg-muted-foreground/40 origin-top"
        initial={{ height: 0 }}
        animate={{ height: 48 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Hook */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute left-1/2 -translate-x-1/2 w-6 h-6 text-muted-foreground"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 44, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <path
          d="M12 2 L12 8 Q12 14 8 16 Q4 18 4 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Fish */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        initial={{ y: 120, x: 40, opacity: 0, rotate: 10 }}
        animate={{ 
          y: [120, 70, 75, 70, 75],
          x: [40, 0, 0, 0, 0],
          opacity: 1,
          rotate: [10, 0, -5, 5, 0]
        }}
        transition={{ 
          duration: 1.5, 
          delay: 0.5,
          times: [0, 0.4, 0.6, 0.8, 1],
          ease: "easeOut"
        }}
      >
        <motion.svg
          viewBox="0 0 64 40"
          className="w-16 h-10"
          animate={{ 
            y: [0, -2, 0, 2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
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
          
          {/* Fish mouth (hooked!) */}
          <ellipse cx="8" cy="20" rx="2" ry="3" className="fill-background" />
          
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

      {/* Water splash/bubbles effect */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{ left: (i - 1) * 16 }}
            animate={{
              y: [0, -10, -20],
              opacity: [0.6, 0.3, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 2 + i * 0.3,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
