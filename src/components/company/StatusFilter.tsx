import React from 'react';
import { motion } from 'framer-motion';

interface StatusFilterProps {
  value: 'all' | 'active' | 'inactive';
  onChange: (value: 'all' | 'active' | 'inactive') => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      {(['all', 'active', 'inactive'] as const).map((status) => (
        <motion.button
          key={status}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(status)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors
            ${value === status
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }
          `}
        >
          {status}
        </motion.button>
      ))}
    </div>
  );
};