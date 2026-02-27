'use client';

import { useState, useCallback } from 'react';
import { BrowserProvider } from 'ethers';
import api from '@/services/api';

// Extend the Window interface to include ethereum (MetaMask injected provider)
declare global {
    interface Window {
        ethereum?: {
            request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
            isMetaMask?: boolean;
            on?: (event: string, handler: (...args: unknown[]) => void) => void;
        };
    }
}

export interface MetaMaskState {
    address: string | null;
    isConnecting: boolean;
    error: string | null;
}

export interface MetaMaskAuthResult {
    address: string;
    user: {
        id: string;
        name: string;
        email: string;
        riskAppetite: 'Beginner' | 'Moderate' | 'Aggressive';
        walletAddress?: string;
    };
    token: string;
}

export function useMetaMask() {
    const [state, setState] = useState<MetaMaskState>({
        address: null,
        isConnecting: false,
        error: null,
    });

    const connect = useCallback(async (): Promise<MetaMaskAuthResult | null> => {
        // Check if MetaMask is installed
        if (typeof window === 'undefined' || !window.ethereum) {
            setState(s => ({ ...s, error: 'MetaMask is not installed. Please install the MetaMask browser extension.' }));
            return null;
        }

        setState({ address: null, isConnecting: true, error: null });

        try {
            const provider = new BrowserProvider(window.ethereum as any);

            // Step 1: Request account access
            const accounts = await provider.send('eth_requestAccounts', []);
            const address = accounts[0] as string;

            // Step 2: Sign a message to prove wallet ownership
            const signer = await provider.getSigner();
            const message = `Welcome to FinCopilot!\n\nSign this message to verify your wallet ownership.\n\nThis does not cost any gas.\n\nWallet: ${address}\nTimestamp: ${Date.now()}`;
            const signature = await signer.signMessage(message);

            // Step 3: Send to backend for cryptographic verification
            const response = await api.post('/auth/metamask', { address, message, signature });
            const { user, token } = response.data;

            setState({ address, isConnecting: false, error: null });
            return { address, user, token };
        } catch (err: any) {
            let errorMsg = 'Failed to connect to MetaMask.';
            if (err?.code === 4001) {
                errorMsg = 'You rejected the connection request.';
            } else if (err?.code === -32002) {
                errorMsg = 'A MetaMask request is already pending. Please check the extension.';
            } else if (err?.response?.data?.message) {
                errorMsg = err.response.data.message;
            } else if (err?.message) {
                errorMsg = err.message;
            }
            setState({ address: null, isConnecting: false, error: errorMsg });
            return null;
        }
    }, []);

    const reset = useCallback(() => {
        setState({ address: null, isConnecting: false, error: null });
    }, []);

    return { ...state, connect, reset };
}

