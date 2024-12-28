import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { AdminUser } from '../types/admin';

export function useAdminUsers() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'createdAt' | 'name'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: api.getAllAdminUsers
  });

  const handleSort = (field: 'createdAt' | 'name') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter((user: AdminUser) => {
        const searchTerm = search.toLowerCase();
        return (
          user.name.toLowerCase().includes(searchTerm) ||
          (user.companyId?.name || '').toLowerCase().includes(searchTerm)
        );
      })
      .sort((a: AdminUser, b: AdminUser) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        if (sortField === 'name') {
          return order * a.name.localeCompare(b.name);
        }
        return order * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      });
  }, [users, search, sortField, sortOrder]);

  return {
    users: filteredUsers,
    isLoading,
    search,
    setSearch,
    sortField,
    sortOrder,
    handleSort
  };
}