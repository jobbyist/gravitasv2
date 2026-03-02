import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (emailOrUsername: string, password: string, returnTo?: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, username: string, returnTo?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface StoredUser {
  id: string;
  email: string;
  password: string;
  name: string;
  username: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('gravitas_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('gravitas_user');
      }
    }
  }, []);

  const login = async (emailOrUsername: string, password: string, returnTo?: string): Promise<boolean> => {
    // Mock authentication - in production, this would call an API
    const storedUsers = localStorage.getItem('gravitas_users');
    const users: StoredUser[] = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Support login by email OR username
    const foundUser = users.find((u: StoredUser) => 
      (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
    );
    
    if (foundUser) {
      const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name, username: foundUser.username };
      setUser(userData);
      localStorage.setItem('gravitas_user', JSON.stringify(userData));
      
      // Navigate to returnTo or user's manage overview
      const destination = returnTo || `/client-area/${foundUser.username}/manage/overview`;
      window.location.href = destination;
      
      return true;
    }
    
    return false;
  };

  const signup = async (email: string, password: string, name: string, username: string, returnTo?: string): Promise<boolean> => {
    // Mock signup - in production, this would call an API
    const storedUsers = localStorage.getItem('gravitas_users');
    const users: StoredUser[] = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Validate username format (slug regex: ^[a-z0-9]{3,24}$)
    const usernameRegex = /^[a-z0-9]{3,24}$/;
    if (!usernameRegex.test(username)) {
      throw new Error('Username must be 3-24 characters, lowercase letters and numbers only');
    }
    
    // Check if email or username already exists
    if (users.find((u: StoredUser) => u.email === email)) {
      throw new Error('Email already exists');
    }
    
    if (users.find((u: StoredUser) => u.username === username)) {
      throw new Error('Username already exists');
    }
    
    const newUser: StoredUser = {
      id: Date.now().toString(),
      email,
      password, // WARNING: In production, passwords must be hashed on the server side
      name,
      username
    };
    
    users.push(newUser);
    localStorage.setItem('gravitas_users', JSON.stringify(users));
    
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name, username: newUser.username };
    setUser(userData);
    localStorage.setItem('gravitas_user', JSON.stringify(userData));
    
    // Navigate to returnTo or user's manage overview
    const destination = returnTo || `/client-area/${username}/manage/overview`;
    window.location.href = destination;
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gravitas_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
