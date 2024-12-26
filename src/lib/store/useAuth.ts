import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthData {
  id: number;
  name: string;
  email: string;
  createdAt: string | null;
}

interface AuthState extends AuthData {
  setAuth: ({ id, name, email, createdAt }: AuthData) => void;
  reset: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      id: 0,
      name: '',
      email: '',
      createdAt: '',
      setAuth: ({ id, name, email, createdAt }: AuthData) =>
        set({ id, name, email, createdAt }),
      reset: () => set({ id: 0, name: '', email: '', createdAt: '' }),
    }),
    {
      name: 'auth_data',
    }
  )
);

export default useAuthStore;
