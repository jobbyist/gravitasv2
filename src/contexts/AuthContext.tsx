import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isNewUser: boolean;
  completeOnboarding: () => void;
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
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('gravitas_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        // If the user has not completed onboarding, mark them as a new user so
        // they are redirected to the onboarding flow on next visit.
        const onboardingKey = `gravitas_onboarding_${parsedUser.id}`;
        if (!localStorage.getItem(onboardingKey)) {
          setIsNewUser(true);
        }
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('gravitas_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call an API
    const storedUsers = localStorage.getItem('gravitas_users');
    const users: StoredUser[] = storedUsers ? JSON.parse(storedUsers) : [];
    
    const foundUser = users.find((u: StoredUser) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
      setUser(userData);
      localStorage.setItem('gravitas_user', JSON.stringify(userData));
      // Restore isNewUser state if onboarding was never completed
      const onboardingKey = `gravitas_onboarding_${foundUser.id}`;
      if (!localStorage.getItem(onboardingKey)) {
        setIsNewUser(true);
      }
      return true;
    }
    
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock signup - in production, this would call an API
    const storedUsers = localStorage.getItem('gravitas_users');
    const users: StoredUser[] = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Check if user already exists
    if (users.find((u: StoredUser) => u.email === email)) {
      return false;
    }
    
    const newUser: StoredUser = {
      id: Date.now().toString(),
      email,
      password, // WARNING: In production, passwords must be hashed on the server side
      name
    };
    
    users.push(newUser);
    localStorage.setItem('gravitas_users', JSON.stringify(users));
    
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userData);
    localStorage.setItem('gravitas_user', JSON.stringify(userData));
    setIsNewUser(true);
    
    return true;
  };

  const completeOnboarding = () => {
    setIsNewUser(false);
    if (user) {
      localStorage.setItem(`gravitas_onboarding_${user.id}`, 'complete');
    }
  };

  const logout = () => {
    setUser(null);
    setIsNewUser(false);
    localStorage.removeItem('gravitas_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isNewUser,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
