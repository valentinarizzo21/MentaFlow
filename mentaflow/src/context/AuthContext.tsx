import React, { createContext, useContext, useState, useCallback } from 'react';

export interface AuthUser {
  token: string;
  username: string;
  email: string;
  role: 'Student' | 'Admin';
  expiresAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'mf_user';

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw) as AuthUser;
    if (new Date(user.expiresAt) < new Date()) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('mf_token');
      return null;
    }
    return user;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser);

  const login = useCallback((incoming: AuthUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
    localStorage.setItem('mf_token', incoming.token);
    setUser(incoming);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('mf_token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'Admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
