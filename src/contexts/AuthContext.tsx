
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'driver' | 'admin';
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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
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

  const login = async (email: string, password: string): Promise<{ success: boolean; redirectTo?: string }> => {
    // Simulate API call - In real app, this would be an actual API call
    const mockUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = mockUsers.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      // Return appropriate redirect based on role
      const redirectTo = userWithoutPassword.role === 'customer' ? '/' : 
                        userWithoutPassword.role === 'driver' ? '/driver-dashboard' : 
                        '/admin-dashboard';
      
      return { success: true, redirectTo };
    }
    
    // Default admin user for demo
    if (email === 'admin@skyride.com' && password === 'admin123') {
      const adminUser = {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@skyride.com',
        phone: '+1234567890',
        role: 'admin' as const
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return { success: true, redirectTo: '/admin-dashboard' };
    }
    
    return { success: false };
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    // Simulate API call
    const mockUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = mockUsers.find((u: any) => u.email === userData.email);
    
    if (existingUser) {
      return false;
    }
    
    const newUser = {
      ...userData,
      id: `user-${Date.now()}`
    };
    
    mockUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(mockUsers));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
