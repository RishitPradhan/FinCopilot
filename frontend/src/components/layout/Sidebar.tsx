'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    BookOpen,
    TrendingUp,
    Newspaper,
    PieChart,
    MessageSquare,
    UserCircle,
    Microscope,
    Bot
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Learn', href: '/learn', icon: BookOpen },
    { name: 'Predict', href: '/predict', icon: TrendingUp },
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'Portfolio', href: '/portfolio', icon: PieChart },
    { name: 'Community', href: '/community', icon: MessageSquare },
    { name: 'AI Advisor', href: '/advisor', icon: Bot },
    { name: 'Deep Dive Analysis', href: '/deep-dive', icon: Microscope },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-background border-r border-border">
            <div className="flex h-16 shrink-0 items-center px-6">
                <Link href="/dashboard" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                        <TrendingUp className="text-black w-5 h-5" />
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">FinCopilot</span>
                </Link>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto no-scrollbar">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                                isActive
                                    ? 'bg-secondary text-primary'
                                    : 'text-gray-400 hover:text-white hover:bg-secondary'
                            )}
                        >
                            <item.icon
                                className={cn(
                                    'mr-3 h-5 w-5 shrink-0 transition-colors',
                                    isActive ? 'text-primary' : 'text-gray-400 group-hover:text-white'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-border">
                <div className="flex items-center p-3 rounded-xl bg-card border border-border">
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Market Mood</p>
                        <p className="text-sm font-medium text-white">Bullish +4.2%</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
            </div>
        </div>
    );
}
