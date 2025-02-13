import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompanySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const CompanySearch: React.FC<CompanySearchProps> = ({ value, onChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search customers..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
    </motion.div>
  );
};