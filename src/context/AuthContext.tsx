import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthState } from '../types/auth';
import { storage } from '../services/storage';

interface AuthContextType extends AuthState {
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<AuthState>({
    token: storage.getToken(),
    user: null,
    isAuthenticated: !!storage.getToken(),
  });

  useEffect(() => {
    const token = storage.getToken();
    if (token) {
      setState(prev => ({ ...prev, isAuthenticated: true, token }));
    } else if (location.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate, location]);

  const login = (token: string, user: any) => {
    storage.setToken(token);
    setState({ token, user, isAuthenticated: true });
    navigate('/dashboard');
  };

  const logout = () => {
    storage.removeToken();
    setState({ token: null, user: null, isAuthenticated: false });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};