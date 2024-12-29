import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Upload } from 'lucide-react';
import { api } from '../services/api';
import { Company } from '../types';

interface CompanyFormProps {
  onSuccess?: () => void;
}

const initialCompanyState: Partial<Company> = {
  name: '',
  contactDetails: {
    email: '',
    phone: '',
    address: ''
  },
  settings: {
    aiIntegration: {
      enableAI: false,
      aiPolicies: []
    },
    compliance: {
      dataRetentionPolicy: '',
      userConductPolicy: ''
    }
  },
  activeFlag: true,
  ipAddress: '',
  deviceId: ''
};

export const CompanyForm: React.FC<CompanyFormProps> = ({ onSuccess }) => {
  const [company, setCompany] = useState<Partial<Company>>(initialCompanyState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.createCompany(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Company created successfully');
      setCompany(initialCompanyState);
      setSelectedFile(null);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create company');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Add file if selected
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    // Add company data
    formData.append('name', company.name || '');
    formData.append('contactDetails', JSON.stringify(company.contactDetails));
    formData.append('settings', JSON.stringify(company.settings));
    formData.append('activeFlag', String(company.activeFlag));
    formData.append('ipAddress', company.ipAddress || '');
    formData.append('deviceId', company.deviceId || '');

    mutation.mutate(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company Logo</label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <Upload className="w-5 h-5 mr-2" />
              {selectedFile ? 'Change Logo' : 'Upload Logo'}
            </button>
            {selectedFile && (
              <span className="ml-3 text-sm text-gray-500">
                {selectedFile.name}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            value={company.contactDetails?.email}
            onChange={(e) => setCompany({
              ...company,
              contactDetails: { ...company.contactDetails!, email: e.target.value }
            })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            value={company.contactDetails?.phone}
            onChange={(e) => setCompany({
              ...company,
              contactDetails: { ...company.contactDetails!, phone: e.target.value }
            })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          value={company.contactDetails?.address}
          onChange={(e) => setCompany({
            ...company,
            contactDetails: { ...company.contactDetails!, address: e.target.value }
          })}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">IP Address</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            value={company.ipAddress}
            onChange={(e) => setCompany({ ...company, ipAddress: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Device ID</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            value={company.deviceId}
            onChange={(e) => setCompany({ ...company, deviceId: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
      >
        {mutation.isPending ? 'Creating...' : 'Create Company'}
      </button>
    </form>
  );
};