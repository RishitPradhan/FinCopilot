import { create } from 'zustand';

interface Holding {
    id: string;
    ticker: string;
    name: string;
    quantity: number;
    buyPrice: number;
    currentPrice: number;
    sector: string;
}

interface PortfolioState {
    holdings: Holding[];
    wishlist: string[]; // tickers
    totalInvested: number;
    currentValue: number;
    addToWishlist: (ticker: string) => void;
    removeFromWishlist: (ticker: string) => void;
    toggleWishlist: (ticker: string) => void;
    updateQuantity: (ticker: string, quantity: number, price: number, name: string, sector: string) => void;
    removeHolding: (ticker: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    holdings: [],
    wishlist: [],
    totalInvested: 0,
    currentValue: 0,

    addToWishlist: (ticker) => set((state) => ({
        wishlist: state.wishlist.includes(ticker) ? state.wishlist : [...state.wishlist, ticker]
    })),

    removeFromWishlist: (ticker) => set((state) => ({
        wishlist: state.wishlist.filter(t => t !== ticker)
    })),

    toggleWishlist: (ticker) => set((state) => ({
        wishlist: state.wishlist.includes(ticker)
            ? state.wishlist.filter(t => t !== ticker)
            : [...state.wishlist, ticker]
    })),

    updateQuantity: (ticker, quantity, price, name, sector) => set((state) => {
        const existingIndex = state.holdings.findIndex(h => h.ticker === ticker);
        let newHoldings = [...state.holdings];

        if (quantity <= 0) {
            newHoldings = newHoldings.filter(h => h.ticker !== ticker);
        } else {
            const holding: Holding = {
                id: ticker,
                ticker,
                name,
                quantity,
                buyPrice: price, // For mock, buy price = current price
                currentPrice: price + (Math.random() * 10 - 5), // Slight variation
                sector: sector || 'Other'
            };

            if (existingIndex > -1) {
                newHoldings[existingIndex] = { ...newHoldings[existingIndex], quantity };
            } else {
                newHoldings.push(holding);
            }
        }

        const totalInvested = newHoldings.reduce((acc, h) => acc + h.buyPrice * h.quantity, 0);
        const currentValue = newHoldings.reduce((acc, h) => acc + h.currentPrice * h.quantity, 0);

        return { holdings: newHoldings, totalInvested, currentValue };
    }),

    removeHolding: (ticker) => set((state) => {
        const newHoldings = state.holdings.filter((h) => h.ticker !== ticker);
        const totalInvested = newHoldings.reduce((acc, h) => acc + h.buyPrice * h.quantity, 0);
        const currentValue = newHoldings.reduce((acc, h) => acc + h.currentPrice * h.quantity, 0);
        return { holdings: newHoldings, totalInvested, currentValue };
    }),
}));
