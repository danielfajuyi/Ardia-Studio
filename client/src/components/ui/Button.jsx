import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden group";
  
  const variants = {
    primary: "bg-white text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]",
    secondary: "bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-105",
    glow: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:shadow-[0_0_30px_rgba(168,85,186,0.6)] hover:scale-105"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
      )}
    </motion.button>
  );
};

export default Button;
