import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Puzzle, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.login({ email, password });
      login(response.token, response.user);
      navigate('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Invalid credentials';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block p-3 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-lg"
          >
            <Puzzle className="w-12 h-12 text-yellow-600" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-3xl font-bold text-gray-900"
          >
            Welcome Back
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-gray-600"
          >
            Sign in to your Super Admin dashboard
          </motion.p>
        </motion.div>

        <Card className="p-8">
          <motion.form 
            className="space-y-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Input
              label="Email address"
              type="email"
              icon={<Mail className="w-5 h-5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              icon={<Lock className="w-5 h-5" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
              size="lg"
              icon={!isLoading && <ArrowRight className="w-5 h-5" />}
            >
              Sign in
            </Button>
          </motion.form>
        </Card>
      </div>
    </div>
  );
};