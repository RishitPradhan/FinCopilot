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
        <div className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center flex-1">
                <div className="relative w-64 max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-border rounded-full bg-secondary/50 text-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                        placeholder="Search stocks, news, topics..."
                    />
                </div>
            </div>

            <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-4 pr-6 border-r border-border">
                    <div className="text-right">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase">Portfolio Value</p>
                        <p className="font-mono text-sm text-white font-bold">${currentValue.toLocaleString() || '0.00'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase">Financial IQ</p>
                        <div className="flex items-center">
                            <span className="font-mono text-sm text-primary font-bold">74</span>
                            <TrendingUp className="ml-1 w-3 h-3 text-white" />
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
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                                <Avatar className="h-9 w-9 border border-border">
                                    <AvatarImage src="" alt={user?.name || 'User'} />
                                    <AvatarFallback className="bg-secondary text-white">
                                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-card border-border text-white shadow-2xl" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.name || 'Guest User'}</p>
                                    <p className="text-xs leading-none text-gray-500">{user?.email || 'guest@example.com'}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-border" />
                            <DropdownMenuItem className="focus:bg-secondary focus:text-white cursor-pointer">
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-secondary focus:text-white cursor-pointer">
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-border" />
                            <DropdownMenuItem
                                className="focus:bg-white/10 focus:text-white cursor-pointer"
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
