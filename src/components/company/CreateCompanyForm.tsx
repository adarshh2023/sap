import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { api } from '../../services/api';
import { Company } from '../../types';
import { Input } from '../ui/Input';
import { CompanyLogoUpload } from './CompanyLogoUpload';
import { Button } from '../ui/Button';

interface CreateCompanyFormProps {
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
  activeFlag: true
};

export const CreateCompanyForm: React.FC<CreateCompanyFormProps> = ({ onSuccess }) => {
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
    
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    formData.append('name', company.name || '');
    formData.append('contactDetails', JSON.stringify(company.contactDetails));
    formData.append('settings', JSON.stringify(company.settings));
    formData.append('activeFlag', String(company.activeFlag));

    mutation.mutate(formData);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            label="Company Name"
            icon={<Building2 className="w-5 h-5" />}
            required
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            placeholder="Enter company name"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CompanyLogoUpload
            logoUrl=""
            onFileSelect={setSelectedFile}
            inputRef={fileInputRef}
          />
        </motion.div>
      </div>

      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Email Address"
            type="email"
            icon={<Mail className="w-5 h-5" />}
            required
            value={company.contactDetails?.email}
            onChange={(e) => setCompany({
              ...company,
              contactDetails: { ...company.contactDetails!, email: e.target.value }
            })}
            placeholder="company@example.com"
          />

          <Input
            label="Phone Number"
            type="tel"
            icon={<Phone className="w-5 h-5" />}
            required
            value={company.contactDetails?.phone}
            onChange={(e) => setCompany({
              ...company,
              contactDetails: { ...company.contactDetails!, phone: e.target.value }
            })}
            placeholder="1234567890"
          />
        </div>

        <Input
          label="Address"
          icon={<MapPin className="w-5 h-5" />}
          required
          value={company.contactDetails?.address}
          onChange={(e) => setCompany({
            ...company,
            contactDetails: { ...company.contactDetails!, address: e.target.value }
          })}
          placeholder="Enter complete address"
        />
      </motion.div>

      <motion.div 
        className="flex justify-end pt-6 border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          type="submit"
          isLoading={mutation.isPending}
          size="lg"
          className="min-w-[200px]"
        >
          {mutation.isPending ? 'Creating...' : 'Create Company'}
        </Button>
      </motion.div>
    </motion.form>
  );
};