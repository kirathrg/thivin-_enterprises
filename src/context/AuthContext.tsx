"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  const login = async (email: string, password: string) => {
    // Mock login logic
    if (email === "test@example.com" && password === "password") {
      setIsAuthenticated(true);
      setUser({ name: "Test User", email });
      toast.success("Logged in successfully!");
      return true;
    }
    toast.error("Invalid credentials.");
    return false;
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup logic
    if (email && password && name) {
      setIsAuthenticated(true);
      setUser({ name, email });
      toast.success("Account created and logged in!");
      return true;
    }
    toast.error("Please fill all fields.");
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    toast.info("Logged out.");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};