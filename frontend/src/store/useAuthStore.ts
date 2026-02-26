import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
    riskAppetite: 'Beginner' | 'Moderate' | 'Aggressive';
}

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
    getEffectiveUser: () => User;
    getEffectiveToken: () => string;
}

const MOCK_USER: User = {
    id: '69a04a42080b05c1d9f4',
    name: 'Wizard (Dev)',
    email: 'wizard@fincopilot.com',
    riskAppetite: 'Moderate'
};

// In development, we can default to a mock user to remove friction
const isDev = process.env.NODE_ENV === 'development';

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: isDev ? MOCK_USER : null,
            token: isDev ? 'dev-token' : null,
            setAuth: (user, token) => set({ user, token }),
            logout: () => {
                // Clear storage so dev-mode doesn't auto-re-login on refresh if user explicitly logged out
                localStorage.removeItem('auth-storage');
                set({ user: null, token: null });
            },
            getEffectiveUser: () => get().user || MOCK_USER,
            getEffectiveToken: () => get().token || 'dev-token',
        }),
        {
            name: 'auth-storage',
        }
    )
);
