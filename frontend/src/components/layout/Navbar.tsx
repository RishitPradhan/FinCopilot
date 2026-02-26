'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, Search, TrendingUp, Wallet, Brain } from 'lucide-react';

import { useAlertStore } from '@/store/useAlertStore';

export function Navbar() {
    const { user, logout } = useAuthStore();
    const { currentValue } = usePortfolioStore();
    const { getUnreadCount } = useAlertStore();
    const unreadCount = getUnreadCount();

    return (
        <div className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center flex-1">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative w-72 max-w-sm group"
                >
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                        <Search className="h-4 w-4 text-gray-500 group-focus-within:text-primary transition-colors duration-300" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-4 py-2 border border-border/50 rounded-full bg-secondary/30 text-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300 group-hover:bg-secondary/50 group-hover:border-border group-focus:bg-secondary/60 placeholder:text-gray-600 focus:placeholder:text-gray-500"
                        placeholder="Search stocks, news, topics..."
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-focus-within:opacity-100 blur-md -z-10 transition-opacity duration-300" />
                </motion.div>
            </div>

            <div className="flex items-center space-x-6">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hidden lg:flex items-center gap-1 p-1 bg-black/20 rounded-xl backdrop-blur-xl shadow-2xl mr-2"
                >
                    {/* Portfolio Value */}
                    <motion.div
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors group cursor-default relative overflow-hidden"
                    >
                        <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-all">
                            <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 leading-none mb-1.5 font-sans">Institutional Value</p>
                            <p className="font-mono text-sm font-black text-white leading-none tabular-nums tracking-tighter shadow-sm">
                                ${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                            </p>
                        </div>

                        {/* Subtle Shimmer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
                        />
                    </motion.div>

                    <div className="w-[1px] h-6 bg-white/5 mx-1" />

                    {/* Financial IQ */}
                    <motion.div
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors group cursor-default relative overflow-hidden"
                    >
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all">
                            <Brain className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 leading-none mb-1.5 font-sans">Cognitive Alpha</p>
                            <div className="flex items-center gap-2 leading-none">
                                <span className="font-mono text-sm font-black text-primary tabular-nums tracking-tighter">74.2</span>
                                <div className="flex items-center gap-1 bg-primary/10 px-1.5 py-0.5 rounded text-[8px] font-black text-primary">
                                    <TrendingUp className="w-2 h-2" />
                                    <span>+2.4</span>
                                </div>
                            </div>
                        </div>

                        {/* Subtle Shimmer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
                        />
                    </motion.div>
                </motion.div>

                <div className="flex items-center space-x-3">
                    <motion.div
                        whileHover="hover"
                        initial="initial"
                        className="relative group h-10 w-10 flex items-center justify-center"
                    >
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-secondary/50 relative rounded-full h-10 w-10 transition-colors duration-300 z-10 overflow-hidden">
                            <motion.div
                                variants={{
                                    hover: { scale: 1.15 }
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Bell className="h-5 w-5" />
                            </motion.div>

                            {/* Premium Shimmer Effect */}
                            <motion.div
                                variants={{
                                    hover: { x: "150%" }
                                }}
                                initial={{ x: "-150%" }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[35deg]"
                            />
                        </Button>


                        <AnimatePresence>
                            {unreadCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        y: [0, -2, 0]
                                    }}
                                    transition={{
                                        y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                                    }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-black text-black ring-2 ring-background z-20"
                                >
                                    {unreadCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <motion.div
                                whileHover="hover"
                                initial="initial"
                                className="relative h-10 w-10 group"
                            >
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden group z-10 scale-[0.98]">
                                    <Avatar className="h-full w-full">
                                        <AvatarImage src="" alt={user?.name || 'User'} />
                                        <AvatarFallback className="bg-secondary/80 text-white text-xs font-black">
                                            {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Shimmer Effect */}
                                    <motion.div
                                        variants={{
                                            hover: { x: "150%" }
                                        }}
                                        initial={{ x: "-150%" }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[35deg]"
                                    />
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                                </Button>

                                {/* Rotating/Pulsing Ring */}
                                <motion.div
                                    variants={{
                                        hover: { opacity: 1, scale: 1.05 }
                                    }}
                                    initial={{ opacity: 0.3, scale: 0.95 }}
                                    className="absolute inset-0 rounded-full border-2 border-primary/20 pointer-events-none -z-10 group-hover:border-primary/40 transition-all duration-500"
                                />

                                {/* Bloom Glow */}
                                <motion.div
                                    variants={{
                                        hover: { opacity: 1, scale: 1.3 }
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    className="absolute inset-0 rounded-full bg-primary/10 blur-xl pointer-events-none -z-10"
                                />
                            </motion.div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border-border/50 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl p-2"
                            align="end"
                            sideOffset={12}
                        >
                            <DropdownMenuLabel className="font-normal px-4 py-3">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-black tracking-tight leading-none text-white">{user?.name || 'Guest User'}</p>
                                    <p className="text-[10px] uppercase font-black tracking-widest leading-none text-gray-500">{user?.role || 'Retail Trader'}</p>
                                    <p className="text-xs leading-none text-gray-600 pt-1 font-mono">{user?.email || 'guest@example.com'}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-border/30 mx-2" />
                            <div className="p-1 space-y-1">
                                <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer rounded-lg px-3 py-2 transition-colors flex items-center gap-3">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    <span className="text-xs font-bold tracking-tight">Access Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer rounded-lg px-3 py-2 transition-colors flex items-center gap-3">
                                    <div className="w-1 h-1 rounded-full bg-gray-600" />
                                    <span className="text-xs font-bold tracking-tight text-gray-300">Account Settings</span>
                                </DropdownMenuItem>
                            </div>
                            <DropdownMenuSeparator className="bg-border/30 mx-2" />
                            <div className="p-1">
                                <DropdownMenuItem
                                    className="focus:bg-red-500/10 focus:text-red-500 text-red-400 cursor-pointer rounded-lg px-3 py-2 transition-colors font-black text-xs uppercase tracking-widest"
                                    onClick={() => logout()}
                                >
                                    Terminate Session
                                </DropdownMenuItem>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
