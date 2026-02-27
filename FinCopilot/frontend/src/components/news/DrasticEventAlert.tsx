'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Bell, History } from 'lucide-react';
import { useAlertStore, MarketAlert } from '@/store/useAlertStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export function DrasticEventAlert() {
    const { alerts, dismissAlert, markAsRead } = useAlertStore();

    // Only show the most recent unread and non-dismissed High/Critical alert
    const activeAlert = alerts.filter(a => !a.isDismissed && (a.severity === 'High' || a.severity === 'Critical'))[0];

    if (!activeAlert) return null;

    const isCritical = activeAlert.severity === 'Critical';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                    "fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-4",
                )}
            >
                <div className={cn(
                    "relative overflow-hidden rounded-2xl border-2 shadow-2xl backdrop-blur-xl p-5 flex items-start gap-4 transition-all",
                    isCritical
                        ? "bg-red-500/10 border-red-500/50 text-red-100"
                        : "bg-yellow-500/10 border-yellow-500/50 text-yellow-100"
                )}>
                    {/* Pulsing background for Critical */}
                    {isCritical && (
                        <motion.div
                            animate={{ opacity: [0.1, 0.3, 0.1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="absolute inset-0 bg-red-500/10 pointer-events-none"
                        />
                    )}

                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                        isCritical ? "bg-red-500 text-white" : "bg-yellow-500 text-black"
                    )}>
                        <AlertTriangle className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn(
                                "font-black tracking-widest text-[10px] uppercase",
                                isCritical ? "bg-red-600 text-white" : "bg-yellow-600 text-black"
                            )}>
                                {activeAlert.severity} Event
                            </Badge>
                            <span className="text-[10px] font-bold opacity-60 uppercase tracking-wider">
                                {activeAlert.affectedSector} Sector • {formatDistanceToNow(new Date(activeAlert.timestamp), { addSuffix: true })}
                            </span>
                        </div>
                        <h4 className="text-lg font-bold leading-snug mb-1 truncate">{activeAlert.headline}</h4>
                        <p className="text-sm opacity-80 leading-relaxed line-clamp-2">{activeAlert.description}</p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => dismissAlert(activeAlert.id)}
                            className="hover:bg-white/10"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
