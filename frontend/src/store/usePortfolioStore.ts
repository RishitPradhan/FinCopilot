import { create } from 'zustand';

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

export const usePortfolioStore = create<PortfolioState>((set) => ({
    holdings: [],
    totalInvested: 0,
    currentValue: 0,
    setHoldings: (holdings) => {
        const totalInvested = holdings.reduce((acc, h) => acc + h.buyPrice * h.quantity, 0);
        const currentValue = holdings.reduce((acc, h) => acc + h.currentPrice * h.quantity, 0);
        set({ holdings, totalInvested, currentValue });
    },
    addHolding: (holding) => set((state) => {
        const newHoldings = [...state.holdings, holding];
        const totalInvested = newHoldings.reduce((acc, h) => acc + h.buyPrice * h.quantity, 0);
        const currentValue = newHoldings.reduce((acc, h) => acc + h.currentPrice * h.quantity, 0);
        return { holdings: newHoldings, totalInvested, currentValue };
    }),
    removeHolding: (id) => set((state) => {
        const newHoldings = state.holdings.filter((h) => h.id !== id);
        const totalInvested = newHoldings.reduce((acc, h) => acc + h.buyPrice * h.quantity, 0);
        const currentValue = newHoldings.reduce((acc, h) => acc + h.currentPrice * h.quantity, 0);
        return { holdings: newHoldings, totalInvested, currentValue };
    }),
}));
