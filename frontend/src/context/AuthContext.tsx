import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

// Define a simple User interface
export interface User {
  id: string;
  name: string; // Changed from username
  role: 'user' | 'admin';
  unlockedCheckpoints: number[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null; // Added user to context
  login: (token: string, userData: User) => void; // Modified login signature
  logout: () => void;
  completeCheckpoint: (checkpointId: number) => void; // Added completeCheckpoint method
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null); // Added user state

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        // Ensure unlockedCheckpoints is always an array
        if (!parsedUser.unlockedCheckpoints) {
          parsedUser.unlockedCheckpoints = [1]; // Default for older user data or new users
        }
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        logout(); // Clear invalid data
      }
    }
  }, []);

  const login = (token: string, userData: User) => {
    // Ensure unlockedCheckpoints is always an array, default to [1] if not provided
    const userWithProgress: User = {
      ...userData,
      unlockedCheckpoints: userData.unlockedCheckpoints || [1], // Unlock first checkpoint by default
    };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userWithProgress)); // Store user data
    setIsAuthenticated(true);
    setUser(userWithProgress);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user data on logout
    setIsAuthenticated(false);
    setUser(null);
  };

  const completeCheckpoint = useCallback((checkpointId: number) => {
    setUser(prevUser => {
      if (!prevUser) return null;

      // Ensure the checkpoint is not added multiple times and maintain order
      const newUnlockedCheckpoints = [...new Set([...prevUser.unlockedCheckpoints, checkpointId])].sort((a, b) => a - b);
      const updatedUser = { ...prevUser, unlockedCheckpoints: newUnlockedCheckpoints };
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage
      return updatedUser;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, completeCheckpoint }}>
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
