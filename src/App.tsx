import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { LoginForm } from './components/LoginForm';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { CompaniesPage } from './pages/CompaniesPage';
import { CreateUserPage } from './pages/CreateUserPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="create-user" element={<CreateUserPage />} />
        <Route path="admin-users" element={<AdminUsersPage />} />
        <Route index element={<Navigate to="companies" replace />} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;