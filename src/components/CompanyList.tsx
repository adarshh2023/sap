import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Upload } from 'lucide-react';
import { api } from '../services/api';
import { Company } from '../types';
import { EditCompanyModal } from './EditCompanyModal';
import { Toggle } from './ui/Toggle';
import toast from 'react-hot-toast';

export const CompanyList = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const queryClient = useQueryClient();

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies'],
    queryFn: api.getCompanies
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, activeFlag }: { id: string; activeFlag: boolean }) => 
      api.changeCompanyStatus(id, { activeFlag }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Company status updated successfully');
    },
    onError: () => {
      toast.error('Failed to update company status');
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading companies</div>;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Users</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies?.map((company: Company) => (
              <tr key={company._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {company.logoUrl ? (
                        <img 
                          className="h-10 w-10 rounded-full object-cover" 
                          src={"http://localhost:5001"+company.logoUrl} 
                          alt={company.name} 
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <span className="text-yellow-600 font-medium">
                            {company.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{company.contactDetails.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{company.contactDetails.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{company.userCount || 0}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Toggle
                    checked={company.activeFlag}
                    onChange={(checked) => 
                      toggleMutation.mutate({ id: company._id!, activeFlag: checked })
                    }
                    disabled={toggleMutation.isPending}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => setSelectedCompany(company)}
                    className="inline-flex items-center px-3 py-1.5 border border-yellow-500 text-xs font-medium rounded-md text-yellow-600 bg-white hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCompany && (
        <EditCompanyModal
          company={selectedCompany}
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </>
  );
};