import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './IntroAnimation.css';

const IntroAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  
  // Always show the animation for exactly 3 seconds regardless of previous visits
  useEffect(() => {
    // Set a timeout to hide the animation after exactly 3 seconds
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000); // 3 seconds total for animation
    
    return () => clearTimeout(timer);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren"
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    moveToHeader: { 
      opacity: 1,
      y: -300,
      scale: 0.6,
      transition: { 
        duration: 0.5, 
        ease: "easeInOut",
        delay: 1.5 // Show in center for 1.5s, then move to header
      }
    }
  };
  
  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div 
          className="intro-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.h1 
            className="intro-title"
            variants={textVariants}
            animate={["visible", "moveToHeader"]}
            transition={{ duration: 1.5 }}
          >
            Question Paper Generator
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
