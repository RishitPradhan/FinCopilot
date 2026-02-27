import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Holding {
    id: string;
    ticker: string;
    quantity: number;
    buyPrice: number;
    currentPrice: number;
    date: string;
}

interface PortfolioState {
    holdings: Holding[];
    totalInvested: number;
    currentValue: number;
    setHoldings: (holdings: Holding[]) => void;
    addHolding: (holding: Holding) => void;
    removeHolding: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
    persist(
        (set: any) => ({
            holdings: [],
            totalInvested: 0,
            currentValue: 0,
            setHoldings: (holdings: Holding[]) => {
                const totalInvested = holdings.reduce((acc: number, h: Holding) => acc + h.buyPrice * h.quantity, 0);
                const currentValue = holdings.reduce((acc: number, h: Holding) => acc + h.currentPrice * h.quantity, 0);
                set({ holdings, totalInvested, currentValue });
            },
            addHolding: (holding: Holding) => set((state: PortfolioState) => {
                const newHoldings = [...state.holdings, holding];
                const totalInvested = newHoldings.reduce((acc: number, h: Holding) => acc + h.buyPrice * h.quantity, 0);
                const currentValue = newHoldings.reduce((acc: number, h: Holding) => acc + h.currentPrice * h.quantity, 0);
                return { holdings: newHoldings, totalInvested, currentValue };
            }),
            removeHolding: (id: string) => set((state: PortfolioState) => {
                const newHoldings = state.holdings.filter((h: Holding) => h.id !== id);
                const totalInvested = newHoldings.reduce((acc: number, h: Holding) => acc + h.buyPrice * h.quantity, 0);
                const currentValue = newHoldings.reduce((acc: number, h: Holding) => acc + h.currentPrice * h.quantity, 0);
                return { holdings: newHoldings, totalInvested, currentValue };
            }),
        }),
        {
            name: 'portfolio-storage',
        }
    )
);
