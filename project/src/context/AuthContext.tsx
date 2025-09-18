import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, studentId: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('gu_user');
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    if (!email.endsWith('@gauhati.ac.in')) {
      throw new Error('Only Gauhati University students can sign in');
    }

    // Simulate authentication - replace with real Supabase auth
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      student_id: 'GU' + Math.random().toString().substr(2, 6),
      is_admin: email.includes('admin'),
      created_at: new Date().toISOString(),
    };

    localStorage.setItem('gu_user', JSON.stringify(mockUser));
    setAuthState({ user: mockUser, isLoading: false });
  };

  const signUp = async (email: string, password: string, name: string, studentId: string): Promise<void> => {
    if (!email.endsWith('@gauhati.ac.in')) {
      throw new Error('Only Gauhati University students (@gauhati.ac.in) can register');
    }

    // Simulate registration - replace with real Supabase auth
    const mockUser: User = {
      id: '1',
      email,
      name,
      student_id: studentId,
      is_admin: false,
      created_at: new Date().toISOString(),
    };

    localStorage.setItem('gu_user', JSON.stringify(mockUser));
    setAuthState({ user: mockUser, isLoading: false });
  };

  const signOut = () => {
    localStorage.removeItem('gu_user');
    setAuthState({ user: null, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};