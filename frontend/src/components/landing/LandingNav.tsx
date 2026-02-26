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
                        <motion.div
                            key={item.name}
                            whileHover="hover"
                            initial="initial"
                        >
                            <Link
                                href={item.href}
                                className="text-[11px] font-black tracking-[0.2em] text-white/50 hover:text-white transition-colors uppercase relative py-2"
                            >
                                <motion.span
                                    variants={{
                                        initial: { letterSpacing: "0.2em" },
                                        hover: { letterSpacing: "0.3em" }
                                    }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                >
                                    {item.name}
                                </motion.span>
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white/40 origin-left"
                                    variants={{
                                        initial: { scaleX: 0 },
                                        hover: { scaleX: 1 }
                                    }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <motion.div whileHover="hover" initial="initial">
                        <Link href="/auth">
                            <Button variant="ghost" className="text-white/50 hover:text-white hover:bg-transparent font-black tracking-[0.3em] uppercase text-[10px] relative h-auto py-2 group">
                                <motion.span
                                    variants={{
                                        initial: { letterSpacing: "0.3em" },
                                        hover: { letterSpacing: "0.45em" }
                                    }}
                                    transition={{ duration: 0.5, ease: "circOut" }}
                                >
                                    Login
                                </motion.span>
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white/20 origin-left"
                                    variants={{
                                        initial: { scaleX: 0 },
                                        hover: { scaleX: 1, backgroundColor: "rgba(255,255,255,0.8)" }
                                    }}
                                    transition={{ duration: 0.5, ease: "circOut" }}
                                />
                            </Button>
                        </Link>
                    </motion.div>

                    <Link href="/auth">
                        <motion.div
                            whileHover="hover"
                            initial="initial"
                            whileTap="tap"
                            className="relative"
                        >
                            <motion.div
                                variants={{
                                    hover: { scale: 1.05 },
                                    tap: { scale: 0.95 }
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                                <Button className="bg-white text-black hover:bg-white font-black tracking-[0.2em] uppercase text-[10px] rounded-full px-8 py-5 flex items-center gap-3 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] group overflow-hidden relative">
                                    <span className="relative z-10 flex items-center">
                                        Register
                                        <motion.div
                                            variants={{
                                                hover: { x: 5 }
                                            }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </motion.div>
                                    </span>

                                    {/* Shimmer */}
                                    <motion.div
                                        variants={{
                                            hover: { x: "150%" }
                                        }}
                                        initial={{ x: "-150%" }}
                                        transition={{ duration: 1, ease: "easeInOut" }}
                                        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-black/[0.08] to-transparent skew-x-[35deg]"
                                    />
                                </Button>
                            </motion.div>

                            {/* Glow */}
                            <motion.div
                                variants={{
                                    hover: { opacity: 0.3, scale: 1.1 }
                                }}
                                initial={{ opacity: 0, scale: 1 }}
                                className="absolute inset-0 bg-white/20 blur-2xl -z-10 rounded-full"
                            />
                        </motion.div>
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
