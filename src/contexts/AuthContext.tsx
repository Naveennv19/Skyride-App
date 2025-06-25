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
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log('AuthProvider useEffect: token from localStorage:', token);
    if (storedUser && token) {
      try {
        const decoded: { exp: number } = jwtDecode(token);
        console.log('Decoded token:', decoded);
        console.log('Token expiry (ms):', decoded.exp * 1000, 'Current time (ms):', Date.now());
        if (decoded.exp * 1000 > Date.now()) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          console.log('User restored from localStorage:', storedUser);
        } else {
          // Token expired
          localStorage.removeItem('user');
          localStorage.removeItem('token');

        }
      } catch (e) {
        // Invalid token
        localStorage.removeItem('user');
        localStorage.removeItem('token');

      }
    } else {
      console.log('No storedUser or token found in localStorage');
    }
    setLoading(false);
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
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
