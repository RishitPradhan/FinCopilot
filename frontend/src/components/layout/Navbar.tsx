'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { usePortfolioStore } from '@/store/usePortfolioStore';
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
import { Bell, Search, TrendingUp, Wallet } from 'lucide-react';

import { useAlertStore } from '@/store/useAlertStore';

export function Navbar() {
    const { user, logout } = useAuthStore();
    const { currentValue } = usePortfolioStore();
    const { getUnreadCount } = useAlertStore();
    const unreadCount = getUnreadCount();

    return (
        <div className="h-16 border-b border-white/5 bg-background/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
            <div className="flex items-center flex-1">
                <div className="relative w-72 max-w-md group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 bg-white/5 border border-white/5 rounded-full text-gray-200 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:bg-white/10 hover:bg-white/10 transition-all duration-300 shadow-inner"
                        placeholder="Search stocks, news, topics..."
                    />
                </div>
            </div>

            <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-6 pr-6 border-r border-white/10">
                    <div className="flex flex-col items-end">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Portfolio Value</p>
                        <p className="font-mono text-[15px] text-white font-bold leading-tight">${currentValue.toLocaleString() || '0.00'}</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Financial IQ</p>
                        <div className="flex items-center gap-1">
                            <span className="font-mono text-[15px] text-primary font-bold leading-tight">74</span>
                            <TrendingUp className="w-3 h-3 text-emerald-400" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-secondary relative">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white">
                                {unreadCount}
                            </span>
                        )}
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border border-white/10 hover:border-white/30 transition-all">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="" alt={user?.name || 'User'} />
                                    <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-white font-bold">
                                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-60 bg-[#141414] border-white/10 text-white shadow-2xl rounded-xl" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal p-3">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-semibold text-white leading-none">{user?.name || 'Guest User'}</p>
                                    <p className="text-xs leading-none text-gray-400 mt-1">{user?.email || 'guest@example.com'}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer py-2 px-3 rounded-md mx-1">
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer py-2 px-3 rounded-md mx-1">
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem
                                className="focus:bg-rose-500/10 focus:text-rose-400 text-rose-400 cursor-pointer py-2 px-3 rounded-md mx-1 font-medium transition-colors"
                                onClick={() => logout()}
                            >
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
