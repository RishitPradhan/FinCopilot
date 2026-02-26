'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Toaster } from '@/components/ui/toaster';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/auth';

    if (isAuthPage) {
        return (
            <main className="min-h-screen bg-[#0a0f1e]">
                {children}
                <Toaster />
            </main>
        );
    }

    return (
        <div className="flex h-screen bg-[#0a0f1e] overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-8 relative">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
            <Toaster />
        </div>
    );
}
