import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  icon,
  error,
  className,
  children,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <select
          className={cn(
            "appearance-none block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900",
            "focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none",
            "hover:border-gray-300",
            "transition-all duration-200",
            "cursor-pointer",
            icon && "pl-11",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            animate={{ rotate: props.value ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};