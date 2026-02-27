'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Toaster } from '@/components/ui/toaster';
import { NotificationToaster } from '@/components/ui/NotificationToaster';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/auth';
    const isLandingPage = pathname === '/';

    if (isAuthPage || isLandingPage) {
        return (
            <main className="min-h-screen bg-black">
                {children}
                <Toaster />
                <NotificationToaster />
            </main>
        );
    }

    return (
        <div className="flex h-screen bg-black overflow-hidden relative">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-8 relative no-scrollbar">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
            <Toaster />
            <NotificationToaster />
        </div>
    );
}
