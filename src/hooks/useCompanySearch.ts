import { useState, useMemo } from 'react';
import { Company } from '../types';

export function useCompanySearch(companies: Company[] = []) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = useMemo(() => {
    if (!searchTerm.trim()) return companies;

    const searchLower = searchTerm.toLowerCase();
    return companies.filter((company) => {
      return (
        company.name.toLowerCase().includes(searchLower) ||
        company.contactDetails.email.toLowerCase().includes(searchLower) ||
        company.contactDetails.phone.includes(searchLower)
      );
    });
  }, [companies, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredCompanies
  };
}