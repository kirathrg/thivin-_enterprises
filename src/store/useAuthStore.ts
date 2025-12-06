import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (email: string, password: string) => {
        // Accept any valid email and password (for testing purposes)
        if (email && password.length >= 6) {
          // Extract name from email (part before @)
          const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
          
          set({
            isAuthenticated: true,
            user: { name, email },
          });
          return true;
        }
        return false;
      },

      signup: async (name: string, email: string, password: string) => {
        // Mock signup logic
        if (email && password && name) {
          set({
            isAuthenticated: true,
            user: { name, email },
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
