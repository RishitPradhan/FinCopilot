import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AlertSeverity = 'Normal' | 'High' | 'Critical';

export interface MarketAlert {
    id: string;
    headline: string;
    description: string;
    affectedSector: string;
    severity: AlertSeverity;
    timestamp: string;
    isRead: boolean;
    isDismissed: boolean;
}

interface AlertState {
    alerts: MarketAlert[];
    addAlerts: (newAlerts: MarketAlert[]) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    dismissAlert: (id: string) => void;
    getUnreadCount: () => number;
}

export const useAlertStore = create<AlertState>()(
    persist(
        (set, get) => ({
            alerts: [],
            addAlerts: (newAlerts) => {
                const currentAlerts = get().alerts;
                // Filter out duplicates based on headline and affectedSector
                const uniqueNewAlerts = newAlerts.filter(
                    (newAlert) => !currentAlerts.some(
                        (existing) =>
                            existing.headline === newAlert.headline &&
                            existing.affectedSector === newAlert.affectedSector
                    )
                );

                if (uniqueNewAlerts.length === 0) return;

                set({ alerts: [...uniqueNewAlerts, ...currentAlerts] });
            },
            markAsRead: (id) => set((state) => ({
                alerts: state.alerts.map((a) => a.id === id ? { ...a, isRead: true } : a)
            })),
            markAllAsRead: () => set((state) => ({
                alerts: state.alerts.map((a) => ({ ...a, isRead: true }))
            })),
            dismissAlert: (id) => set((state) => ({
                alerts: state.alerts.map((a) => a.id === id ? { ...a, isDismissed: true } : a)
            })),
            getUnreadCount: () => get().alerts.filter(a => !a.isRead && !a.isDismissed).length,
        }),
        {
            name: 'market-alerts-storage',
        }
    )
);
