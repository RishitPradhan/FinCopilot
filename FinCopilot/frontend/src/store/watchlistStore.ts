import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WatchlistItem {
    ticker: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    quantity: number;
    addedAt: string;
}

interface WatchlistState {
    items: WatchlistItem[];
    isLoading: boolean;
    error: string | null;

    fetchWatchlist: () => Promise<void>;
    addItem: (item: Omit<WatchlistItem, 'addedAt'>) => Promise<void>;
    removeItem: (ticker: string) => Promise<void>;
    updateQuantity: (ticker: string, quantity: number) => Promise<void>;
    clearWatchlist: () => Promise<void>;
}

export const useWatchlistStore = create<WatchlistState>()(
    persist(
        (set: any, get: any) => ({
            items: [],
            isLoading: false,
            error: null,

            fetchWatchlist: async () => {
                // With persist middleware, items are rehydrated from localStorage automatically.
                set({ isLoading: false, error: null });
            },

            addItem: async (item: Omit<WatchlistItem, 'addedAt'>) => {
                set({ isLoading: true, error: null });
                try {
                    const currentItems = get().items;
                    const existingItem = currentItems.find((i: WatchlistItem) => i.ticker === item.ticker);

                    if (existingItem) {
                        set({
                            items: currentItems.map((i: WatchlistItem) =>
                                i.ticker === item.ticker
                                    ? { ...i, quantity: i.quantity + item.quantity }
                                    : i
                            ),
                            isLoading: false
                        });
                    } else {
                        const newItem: WatchlistItem = {
                            ...item,
                            addedAt: new Date().toISOString()
                        };
                        set({
                            items: [...currentItems, newItem],
                            isLoading: false
                        });
                    }
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.message || 'Failed to add item'
                    });
                    throw error;
                }
            },

            removeItem: async (ticker: string) => {
                set({ isLoading: true, error: null });
                try {
                    set({
                        items: get().items.filter((i: WatchlistItem) => i.ticker !== ticker),
                        isLoading: false
                    });
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.message || 'Failed to remove item'
                    });
                    throw error;
                }
            },

            updateQuantity: async (ticker: string, quantity: number) => {
                set({ isLoading: true, error: null });
                try {
                    set({
                        items: get().items.map((i: WatchlistItem) =>
                            i.ticker === ticker
                                ? { ...i, quantity }
                                : i
                        ),
                        isLoading: false
                    });
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.message || 'Failed to update quantity'
                    });
                    throw error;
                }
            },

            clearWatchlist: async () => {
                set({ isLoading: true, error: null });
                try {
                    set({ items: [], isLoading: false });
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.message || 'Failed to clear watchlist'
                    });
                    throw error;
                }
            },
        }),
        {
            name: 'watchlist-storage',
        }
    )
);
