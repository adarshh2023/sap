import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User2, Mail, Lock, Building2, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Company } from '../../types';

const initialUserState = {
  name: '',
  email: '',
  mobile: '',
  password: '',
  roles: ['admin'],
  companyId: ''
};

export const CreateUserForm = () => {
  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: companies = [] } = useQuery({
    queryKey: ['companies'],
    queryFn: api.getCompanies
  });

  const mutation = useMutation({
    mutationFn: api.createUser,
    onSuccess: () => {
      toast.success('User created successfully');
      setUser(initialUserState);
      setErrors({});
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create user');
    }
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!user.name) newErrors.name = 'Name is required';
    if (!user.mobile && user.mobile.length !== 10) newErrors.mobile = 'Mobile must be 6 digits';
    if (!user.email) newErrors.email = 'Email is required';
    if (!user.password) newErrors.password = 'Password is required';
    if (user.password && user.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!user.companyId) newErrors.companyId = 'Company is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate(user);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Full Name"
          icon={<User2 className="w-5 h-5" />}
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Enter full name"
          error={errors.name}
          required
        />

        <Input
          label="Email Address"
          type="email"
          icon={<Mail className="w-5 h-5" />}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email address"
          error={errors.email}
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Password"
          type="password"
          icon={<Lock className="w-5 h-5" />}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
          error={errors.password}
          required
        />

<Input
          label="Mobile"
          type="mobile"
          icon={<Phone className="w-5 h-5" />}
          value={user.mobile}
          onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          placeholder="Enter Mobile"
          error={errors.mobile}
          required
        />

        <Select
          label="Company"
          icon={<Building2 className="w-5 h-5" />}
          value={user.companyId}
          onChange={(e) => setUser({ ...user, companyId: e.target.value })}
          error={errors.companyId}
          required
        >
          <option value="">Select a company</option>
          {companies.map((company: Company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          isLoading={mutation.isPending}
          size="lg"
          className="min-w-[200px]"
        >
          {mutation.isPending ? 'Creating User...' : 'Create User'}
        </Button>
      </div>
    </motion.form>
  );
};