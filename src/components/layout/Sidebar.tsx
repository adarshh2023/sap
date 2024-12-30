import React from 'react';
import { NavLink } from 'react-router-dom';
import { Building2, UserPlus, Users, LogOut, PuzzleIcon, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform 
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 lg:static lg:min-h-screen transition-transform duration-300 ease-in-out flex flex-col
  `;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      <div className={sidebarClasses}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <PuzzleIcon className="w-8 h-8 text-yellow-500" />
            <span className="ml-2 text-xl font-bold">Super Admin</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavLink
            to="/dashboard/companies"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive
                ? 'bg-yellow-50 text-yellow-700'
                : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <Building2 className="w-5 h-5 mr-3" />
            Companies
          </NavLink>

          <NavLink
            to="/dashboard/create-user"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive
                ? 'bg-yellow-50 text-yellow-700'
                : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <UserPlus className="w-5 h-5 mr-3" />
            Create User
          </NavLink>

          <NavLink
            to="/dashboard/admin-users"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive
                ? 'bg-yellow-50 text-yellow-700'
                : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <Users className="w-5 h-5 mr-3" />
            View All Admins
          </NavLink>
        </nav>

        <div className="p-4 border-t mt-auto">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};