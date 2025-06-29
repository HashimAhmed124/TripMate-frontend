import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../models/user';
import * as api from '../services/api';
import * as storage from '../services/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await storage.getUser();
        setUser(user);
      } catch (err) {
        console.error('Failed to load user:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
  setIsLoading(true);
  setError(null);

  try {
    const formData = new URLSearchParams();
    formData.append('username', email);  // OAuth2 expects "username"
    formData.append('password', password);

    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    setUser(response.user);
    await storage.saveToken(response.access_token);
    await storage.saveUser(response.user);
    return true;
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Login failed');
    return false;
  } finally {
    setIsLoading(false);
  }
};


  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await api.post('/auth/register', { name, email, password });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await storage.clearAll();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);