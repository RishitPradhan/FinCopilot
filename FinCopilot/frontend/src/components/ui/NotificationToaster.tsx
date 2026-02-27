'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { useNotificationStore } from '@/store/useNotificationStore';

const icons = {
    info: <Info className="w-5 h-5 text-blue-400" />,
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />
};

export function NotificationToaster() {
    const { notifications, removeNotification } = useNotificationStore();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="pointer-events-auto flex items-start gap-3 w-80 bg-[#111] border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md relative overflow-hidden group"
                    >
                        <div className="shrink-0 mt-0.5">
                            {icons[notification.type]}
                        </div>
                        <div className="flex-1 text-sm text-gray-200">
                            {notification.message}
                        </div>
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-gray-500 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Auto-dismiss progress bar effect */}
                        <div className="absolute bottom-0 left-0 h-[2px] bg-white/20 w-full rounded-b-xl overflow-hidden">
                            <motion.div
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 5, ease: "linear" }}
                                className="h-full bg-blue-500/50"
                            />
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
