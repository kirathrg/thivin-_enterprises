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
        // Mock login logic
        if (email === "test@example.com" && password === "password") {
          set({
            isAuthenticated: true,
            user: { name: "Test User", email },
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
