import React from 'react';
import { Filter } from 'lucide-react';
import { CompanySearch } from './CompanySearch';
import { StatusFilter } from './StatusFilter';

interface CompanyFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: 'all' | 'active' | 'inactive';
  onStatusChange: (status: 'all' | 'active' | 'inactive') => void;
}

export const CompanyFilters: React.FC<CompanyFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <CompanySearch value={searchTerm} onChange={onSearchChange} />
        </div>
        <StatusFilter value={statusFilter} onChange={onStatusChange} />
      </div>
    </div>
  );
};