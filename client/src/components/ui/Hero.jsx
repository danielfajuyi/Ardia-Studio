import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import BlurText from './BlurText';

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-700/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-700/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block p-2 px-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
          <span className="text-xs uppercase tracking-widest text-gray-400">The Future of AI Video</span>
        </div>

        <div className="flex justify-center mb-6">
          <BlurText 
            text="Crafting Visual Intelligence" 
            className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 pb-2 justify-center"
          />
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          Ardia Studio blends cutting-edge AI with cinematic storytelling to create visuals that defy boundaries.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button variant="glow" className="min-w-[160px]">
            Start Project
          </Button>
          <Button variant="secondary" className="min-w-[160px]">
            View Our Work
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
