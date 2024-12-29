import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, animate = true }) => {
  const Component = animate ? motion.div : 'div';
  
  return (
    <Component
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden",
        className
      )}
    >
      {children}
    </Component>
  );
};