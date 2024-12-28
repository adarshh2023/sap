import React from 'react';
import { CreateUser } from '../components/CreateUser';

export const CreateUserPage = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New User</h1>
      <div className="bg-white shadow rounded-lg">
        <CreateUser />
      </div>
    </div>
  );
};