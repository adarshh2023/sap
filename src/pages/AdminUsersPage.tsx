import React, { useState } from 'react';
import { Search, ArrowUpDown, UserCog } from 'lucide-react';
import { EditAdminModal } from '../components/EditAdminModal';
import { Container } from '../components/ui/Container';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { AdminUser } from '../types/admin';

export const AdminUsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const {
    users,
    isLoading,
    search,
    setSearch,
    sortField,
    sortOrder,
    handleSort
  } = useAdminUsers();

  return (
    <Container className="max-w-7xl py-6">
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <UserCog className="h-8 w-8 text-yellow-500" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
              <p className="text-sm text-gray-500 mt-1">Manage system administrators</p>
            </div>
          </div>
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder="Search by name or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('name')}
                      className="group flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      <span>Name</span>
                      <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Mobile
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('createdAt')}
                      className="group flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      <span>Created</span>
                      <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-yellow-500 border-t-transparent" />
                        <span>Loading users...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                      No admin users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.profileImageUrl ? (
                            <img
                              src={"http://103.120.178.99:5001"+user.profileImageUrl}
                              alt={user.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                              <span className="text-yellow-600 font-medium text-sm">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">Admin</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.mobile || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.companyId?.name || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="inline-flex items-center px-3 py-1.5 border border-yellow-500 text-xs font-medium rounded-md text-yellow-600 bg-white hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedUser && (
        <EditAdminModal
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </Container>
  );
};