import { useState, useMemo } from 'react';
import { Company } from '../types';

export function useCompanyFilters(companies: Company[] = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      // Apply status filter
      if (statusFilter !== 'all') {
        const isActive = statusFilter === 'active';
        if (company.activeFlag !== isActive) return false;
      }

      // Apply search filter
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        return (
          company.name.toLowerCase().includes(searchLower) ||
          company.contactDetails.email.toLowerCase().includes(searchLower) ||
          company.contactDetails.phone.includes(searchLower)
        );
      }

      return true;
    });
  }, [companies, searchTerm, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredCompanies
  };
}