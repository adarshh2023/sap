import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { CreateUserForm } from '../components/user/CreateUserForm';

export const CreateUserPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <div className="p-3 bg-yellow-50 rounded-xl">
          <UserPlus className="w-8 h-8 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New User</h1>
          <p className="text-sm text-gray-500 mt-1">Add a new administrator to the system</p>
        </div>
      </motion.div>

      <Card>
        <CreateUserForm />
      </Card>
    </div>
  );
};