'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../../types/user';
import { useRouter } from 'next/navigation';
import { getStorageNamespace, nsKey } from '@/lib/storageNamespace';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'mock-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    role: 'customer'
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount (simple mock)
  useEffect(() => {
    const userKey = nsKey('user');
    const savedUser = localStorage.getItem(userKey) ?? localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (role: UserRole) => {
    const namespace = getStorageNamespace();
    const userKey = `${namespace}_user`;
    const profileCompletedKey = `${namespace}_vendor_profile_completed`;
    const roleCookieName = `${namespace}_session`;

    const mockUser: User = {
      id: '1',
      name: `Demo ${role}`,
      email: `${role}@example.com`,
      role: role,
    };
    setUser(mockUser);
    localStorage.setItem(userKey, JSON.stringify(mockUser));
    
    // Domain/subdomain-scoped session cookie name
    document.cookie = `${roleCookieName}=${role}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
    
    // Smart Redirect
    if (role === 'vendor') {
      const isCompleted =
        localStorage.getItem(profileCompletedKey) === 'true' ||
        localStorage.getItem('vendor_profile_completed') === 'true';
      if (isCompleted) {
        router.push('/vendor/dashboard');
      } else {
        router.push('/vendor/profile-setup');
      }
    } else {
      router.push(`/${role}/dashboard`);
    }
  };

  const logout = () => {
    const namespace = getStorageNamespace();
    const userKey = `${namespace}_user`;
    const roleCookieName = `${namespace}_session`;
    setUser(null);
    localStorage.removeItem(userKey);
    localStorage.removeItem('user');
    document.cookie = `${roleCookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; samesite=lax`;
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; samesite=lax';
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
