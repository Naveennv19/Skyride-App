import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '@/lib/axios';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'CUSTOMER' | 'DRIVER' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; redirectTo?: string }>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; redirectTo?: string }> => {
    try {
      const res = await api.post('/user/login', { email, password });

      // ✅ Extract token and decode it if needed
      const token = res.data.token;
      const decoded = jwtDecode<{ sub: string; exp: number }>(token);

      // ✅ Use user details from response
      const loggedInUser: User = {
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        role: res.data.role?.toUpperCase() || 'CUSTOMER',
      };

      setUser(loggedInUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('token', token);

      const redirectTo =
        loggedInUser.role === 'CUSTOMER'
          ? '/customer-dashboard'
          : loggedInUser.role === 'DRIVER'
          ? '/driver-dashboard'
          : '/admin-dashboard';

          console.log(loggedInUser.role)

      return { success: true, redirectTo };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false };
    }
  };

  const register = async (
    userData: Omit<User, 'id'> & { password: string }
  ): Promise<boolean> => {
    try {
      const payload = {
        ...userData,
        role: userData.role.toUpperCase(),
      };
      const res = await api.post('/user/register', payload);
      return res.status === 200 || res.status === 201;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
