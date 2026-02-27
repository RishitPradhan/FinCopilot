'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, BookOpen, TrendingUp, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function LandingNav() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 py-4",
            scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <BrainCircuit className="w-6 h-6 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">FinCopilot</span>
                        <span className="text-[8px] font-black tracking-[0.3em] text-white/40 uppercase -mt-1 ml-1">AI Intelligence</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { name: 'Academy', href: '/learn' },
                        { name: 'Analysis', href: '/analysis' },
                        { name: 'Markets', href: '/dashboard' },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-black tracking-widest text-white/60 hover:text-white transition-colors uppercase"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="/auth">
                        <Button variant="ghost" className="text-white/60 hover:text-white font-black tracking-widest uppercase text-xs">Login</Button>
                    </Link>
                    <Link href="/auth">
                        <Button className="bg-white text-black hover:bg-neutral-200 font-black tracking-widest uppercase text-xs rounded-full px-6 flex items-center gap-2 transition-transform active:scale-95 group">
                            Register
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
                >
                    <Link href="/learn" className="text-lg font-black tracking-widest text-white uppercase">Academy</Link>
                    <Link href="/analysis" className="text-lg font-black tracking-widest text-white uppercase">Analysis</Link>
                    <Link href="/dashboard" className="text-lg font-black tracking-widest text-white uppercase">Markets</Link>
                    <hr className="border-white/10" />
                    <Link href="/auth" className="flex justify-between items-center text-white font-black tracking-widest uppercase py-2">
                        Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            )}
        </nav>
    );
}
