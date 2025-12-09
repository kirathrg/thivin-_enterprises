import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

export interface Address {
  id: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

interface User {
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<User, 'name' | 'email' | 'phone'>>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => Address | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,

      login: async (email: string, password: string) => {
        // Accept any valid email and password (for testing purposes)
        if (email && password.length >= 6) {
          const currentState = get();
          // Check if user exists in storage
          const existingUser = currentState.user;

          if (existingUser && existingUser.email === email) {
            // User exists, restore their data
            set({
              isAuthenticated: true,
              user: existingUser,
            });
          } else {
            // New login, extract name from email
            const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);

            set({
              isAuthenticated: true,
              user: { name, email, phone: '', addresses: [] },
            });
          }
          return true;
        }
        return false;
      },

      signup: async (name: string, email: string, phone: string, password: string) => {
        // Mock signup logic
        if (email && password && name && phone) {
          set({
            isAuthenticated: true,
            user: { name, email, phone, addresses: [] },
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

      updateProfile: (updates: Partial<Pick<User, 'name' | 'email' | 'phone'>>) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({
          user: {
            ...currentUser,
            ...updates,
          },
        });

        toast.success('Profile updated successfully!');
      },

      addAddress: (address: Omit<Address, 'id'>) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const newAddress: Address = {
          ...address,
          id: `addr_${Date.now()}`,
        };

        // If this is the first address or marked as default, set it as default
        const isFirstAddress = currentUser.addresses.length === 0;
        if (isFirstAddress || address.isDefault) {
          // Remove default from other addresses
          currentUser.addresses.forEach(addr => addr.isDefault = false);
          newAddress.isDefault = true;
        }

        set({
          user: {
            ...currentUser,
            addresses: [...currentUser.addresses, newAddress],
          },
        });

        toast.success('Address added successfully!');
      },

      updateAddress: (id: string, updatedFields: Partial<Address>) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updatedAddresses = currentUser.addresses.map(addr => {
          if (addr.id === id) {
            return { ...addr, ...updatedFields };
          }
          return addr;
        });

        set({
          user: {
            ...currentUser,
            addresses: updatedAddresses,
          },
        });

        toast.success('Address updated successfully!');
      },

      deleteAddress: (id: string) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const addressToDelete = currentUser.addresses.find(addr => addr.id === id);
        const remainingAddresses = currentUser.addresses.filter(addr => addr.id !== id);

        // If deleted address was default and there are remaining addresses, set first as default
        if (addressToDelete?.isDefault && remainingAddresses.length > 0) {
          remainingAddresses[0].isDefault = true;
        }

        set({
          user: {
            ...currentUser,
            addresses: remainingAddresses,
          },
        });

        toast.success('Address deleted successfully!');
      },

      setDefaultAddress: (id: string) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updatedAddresses = currentUser.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === id,
        }));

        set({
          user: {
            ...currentUser,
            addresses: updatedAddresses,
          },
        });

        toast.success('Default address updated!');
      },

      getDefaultAddress: () => {
        const currentUser = get().user;
        if (!currentUser) return null;

        return currentUser.addresses.find(addr => addr.isDefault) || currentUser.addresses[0] || null;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
