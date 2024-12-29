import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import { Company } from '../types';

const initialUserState = {
  name: '',
  email: '',
  password: '',
  mobile: '',
  roles: ['admin'],
  companyId: ''
};

export const CreateUser = () => {
  const [user, setUser] = useState(initialUserState);

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: api.getCompanies
  });

  const mutation = useMutation({
    mutationFn: api.createUser,
    onSuccess: () => {
      toast.success('User created successfully');
      setUser(initialUserState); // Reset form after successful submission
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create user');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(user);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            type="tel"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            value={user.mobile}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            value={user.companyId}
            onChange={(e) => setUser({ ...user, companyId: e.target.value })}
          >
            <option value="">Select a company</option>
            {companies?.map((company: Company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
        >
          {mutation.isPending ? 'Creating...' : 'Create User'}
        </button>
      </div>
    </form>
  );
};