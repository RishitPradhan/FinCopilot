'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ArrowRight,
    ArrowLeft,
    PieChart as PieIcon,
    Globe,
    ShieldCheck,
    AlertTriangle,
    Coins,
    Building2,
    RefreshCw,
    TrendingUp,
    TrendingDown,
    Briefcase,
    Zap,
    Scale,
    Gem,
    Users,
    Activity,
    Target,
    BarChart3,
    Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const serifFont = "font-serif";
const monoFont = "font-mono";

export function DiversificationInteractive() {
    const [activeSection, setActiveSection] = useState(1);
    const totalSections = 10;

    const sections = [
        { id: 1, title: "The Basket Principle" },
        { id: 2, title: "What Is Diversification?" },
        { id: 3, title: "Why It Matters" },
        { id: 4, title: "Asset Allocation Strategy" },
        { id: 5, title: "Diversifying Within Assets" },
        { id: 6, title: "Going Global" },
        { id: 7, title: "The Power of Rebalancing" },
        { id: 8, title: "Common Mistakes" },
        { id: 9, title: "Example Portfolios" },
        { id: 10, title: "The Growth Tree" }
    ];

    return (
        <div className="space-y-6 pb-12 selection:bg-white selection:text-black">
            {/* Nav - Aligned with parent's px-4 via w-full (no inner max-w-4xl) */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md py-2 border-b border-white/10 mb-4 px-0">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                className={cn(
                                    "h-1 rounded-full transition-all duration-500",
                                    activeSection === s.id ? "w-6 bg-white" :
                                        activeSection > s.id ? "w-2 bg-white/40" : "w-1 bg-white/10"
                                )}
                            />
                        ))}
                    </div>
                    <span className={cn("text-[8px] uppercase font-black tracking-widest text-neutral-400", monoFont)}>
                        S{activeSection}: {sections[activeSection - 1].title}
                    </span>
                </div>
            </div>

            <div className="w-full">
                <AnimatePresence mode="wait">
                    {/* Section 1: Intro - The Basket Principle */}
                    {activeSection === 1 && (
                        <motion.div key="s1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">CORE STRATEGY</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>Don't Put All Your Eggs in One Basket</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                                    Putting all your money in one place is risky. One bad day could ruin everything.
                                </p>
                            </div>

                            <BasketAnimation />
                        </motion.div>
                    )}

                    {/* Section 2: What is Diversification? */}
                    {activeSection === 2 && (
                        <motion.div key="s2" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="space-y-8" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">DEFINITION</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight", serifFont)}>The Asset Wheel</h2>
                                <p className="text-neutral-200 text-lg font-medium">Spreading money across different assets to balance returns.</p>
                            </div>

                            <AssetWheel />
                        </motion.div>
                    )}

                    {/* Section 3: Why It Matters */}
                    {activeSection === 3 && (
                        <motion.div key="s3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">THE MECHANICS</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>The Stability Shield</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
                                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-[2rem] space-y-4 shadow-xl">
                                    <h4 className="text-lg font-bold text-red-500 uppercase tracking-widest">❌ Concentrated</h4>
                                    <div className="h-32 bg-black rounded-2xl flex items-center justify-center p-4 border border-white/5">
                                        <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-center">
                                            <TrendingDown className="w-10 h-10 text-red-500 mx-auto" />
                                            <p className="text-[10px] text-white font-bold uppercase mt-2">All savings fall!</p>
                                        </motion.div>
                                    </div>
                                    <p className="text-xs text-neutral-400">If your single stock choice drops 40%, your whole net worth drops 40%.</p>
                                </div>
                                <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] space-y-4 shadow-xl">
                                    <h4 className="text-lg font-bold text-emerald-500 uppercase tracking-widest">✅ Diversified</h4>
                                    <div className="h-32 bg-black rounded-2xl flex items-center justify-center p-4 border border-white/5 relative overflow-hidden">
                                        <div className="flex gap-4">
                                            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-red-500 text-center"><TrendingDown className="w-6 h-6 mx-auto" /><p className="text-[7px] font-bold">Stocks</p></motion.div>
                                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-emerald-500 text-center"><TrendingUp className="w-8 h-8 mx-auto" /><p className="text-[7px] font-bold">Gold</p></motion.div>
                                            <motion.div className="text-blue-400 text-center flex items-center"><Scale className="w-6 h-6" /></motion.div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-neutral-400">When stocks fall, gold often rises, keeping your overall wealth protected.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 4: Asset Allocation Strategy */}
                    {activeSection === 4 && (
                        <motion.div key="s4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">STRATEGY</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>Step 1: The Master Mix</h2>
                                <p className="text-neutral-200 text-lg font-medium leading-relaxed">Adjust your levels and see the risk balance shift live.</p>
                            </div>
                            <AssetAllocationSim />
                        </motion.div>
                    )}

                    {/* Section 5: Diversifying Within Assets */}
                    {activeSection === 5 && (
                        <motion.div key="s5" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-white/10 text-white border-white/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">DEEP DIVE</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>Step 2: Micro-Diversification</h2>
                                <p className="text-neutral-200 text-lg font-medium italic">"Don't just buy many stocks, buy different industries."</p>
                            </div>
                            <WithinAssetsExplorer />
                        </motion.div>
                    )}

                    {/* Section 6: Going Global */}
                    {activeSection === 6 && (
                        <motion.div key="s6" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">GLOBAL HORIZON</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>Step 3: Go Global</h2>
                                <p className="text-neutral-200 text-lg font-medium">Smooth your returns when local markets struggle.</p>
                            </div>
                            <GlobalMapVisual />
                        </motion.div>
                    )}

                    {/* Section 7: The Power of Rebalancing */}
                    {activeSection === 7 && (
                        <motion.div key="s7" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">MAINTENANCE</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>Step 4: Rebalance Yearly</h2>
                                <p className="text-neutral-200 text-lg font-medium">As some assets grow faster, your risk shifts. Bring it back home.</p>
                            </div>
                            <RebalancingChart />
                        </motion.div>
                    )}

                    {/* Section 8: Common Mistakes */}
                    {activeSection === 8 && (
                        <motion.div key="s8" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-red-500/10 text-red-400 border-red-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">PRO TIPS</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>Avoid the Traps</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                                {[
                                    { front: "❌ Too many investments", back: "✅ Focus on quality, not quantity. Managing 50 stocks is impossible." },
                                    { front: "❌ Ignoring costs", back: "✅ Use low-cost index funds to keep more of your profit." },
                                    { front: "❌ Following trends", back: "✅ Stick to your long-term plan, not TikTok advice." },
                                    { front: "❌ Not matching goals", back: "✅ Align your mix with your age and when you need the money." }
                                ].map((item, i) => (<MistakeFlipCard key={i} item={item} />))}
                            </div>
                        </motion.div>
                    )}

                    {/* Section 9: Example Portfolios */}
                    {activeSection === 9 && (
                        <motion.div key="s9" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-white text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest">BLUEPRINTS</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>Portfolio Personas</h2>
                                <p className="text-neutral-200 text-lg font-medium">Pick a blueprint that matches your life stage.</p>
                            </div>
                            <PortfolioPersonaToggle />
                        </motion.div>
                    )}

                    {/* Section 10: The Growth Tree */}
                    {activeSection === 10 && (
                        <motion.div key="s10" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-12 py-4" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[9px]">FINAL LESSON</Badge>
                                <h2 className={cn("text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight", serifFont)}>The Diversified Tree</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-xl font-medium leading-relaxed italic">"A diversified portfolio is your shield against uncertainty."</p>
                            </div>

                            <div className="relative h-64 flex items-center justify-center">
                                <div className="w-1 bg-gradient-to-t from-transparent via-white/50 to-white h-full relative rounded-full">
                                    {[0.2, 0.4, 0.6, 0.8].map((p, i) => (
                                        <motion.div key={i} initial={{ scale: 0, x: i % 2 === 0 ? 50 : -50 }} animate={{ scale: 1, x: i % 2 === 0 ? 40 : -40 }} className="absolute w-12 h-12 bg-black border border-white/20 rounded-xl flex items-center justify-center shadow-xl group cursor-help transition-all hover:border-white" style={{ bottom: `${p * 100}%` }}>
                                            <Gem className={cn("w-5 h-5", i === 0 ? "text-blue-400" : i === 1 ? "text-emerald-400" : i === 2 ? "text-amber-400" : "text-purple-400")} />
                                            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all bg-white text-black px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest whitespace-nowrap shadow-xl z-50">
                                                {i === 0 ? "STOCKS" : i === 1 ? "GOLD" : i === 2 ? "REAL ESTATE" : "CASH"}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center space-y-12">
                                <div className="p-10 bg-white/[0.05] border border-white/20 rounded-[3rem] max-w-2xl mx-auto text-xl font-bold text-white relative shadow-xl leading-relaxed italic border-l-4 border-l-emerald-500">
                                    "Start small. Be consistent. Review yearly. Your wealth will grow steadily — not by luck, but by balance."
                                </div>
                                <Button onClick={() => window.location.href = '/learn'} className="bg-white text-black hover:bg-neutral-200 font-black tracking-widest uppercase px-12 py-8 rounded-[2rem] text-xl shadow-2xl transition-all hover:scale-105 group">
                                    Complete Module <ChevronRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-20 flex items-center justify-between border-t border-white/10 pt-10 pb-8">
                    <Button variant="ghost" disabled={activeSection === 1} onClick={() => setActiveSection(s => Math.max(1, s - 1))} className="text-neutral-400 hover:text-white group py-6 px-8 rounded-2xl transition-all font-bold">
                        <ArrowLeft className="mr-3 w-5 h-5 transition-transform group-hover:-translate-x-1" /> Back
                    </Button>
                    <div className="flex gap-4">
                        <Button variant="outline" className="border-white/10 text-neutral-400 hover:bg-white/5 py-6 px-10 rounded-2xl font-black uppercase tracking-widest text-xs" onClick={() => window.location.href = '/learn'}>Exit</Button>
                        <Button className="bg-white text-black hover:bg-neutral-200 font-black tracking-widest uppercase px-12 py-6 rounded-2xl text-lg group transition-all" onClick={() => setActiveSection(s => Math.min(totalSections, s + 1))}>
                            {activeSection === totalSections ? "Complete" : "Continue"} <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// SUBCOMPONENTS

function BasketAnimation() {
    return (
        <div className="relative py-20 px-8 bg-white/[0.03] border border-white/10 rounded-[3rem] flex flex-col items-center justify-center shadow-xl overflow-hidden min-h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-2xl">
                <div className="p-8 bg-black border border-white/10 rounded-[2rem] space-y-6 flex flex-col items-center group overflow-hidden">
                    <motion.div animate={{ y: [0, 40, 0], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="text-7xl">🧺</motion.div>
                    <div className="flex gap-1 text-2xl"><span>🥚</span><motion.span animate={{ opacity: [1, 0, 1], scale: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-red-500">💥</motion.span><span>🥚</span></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-red-400">Concentrated Risk</p>
                </div>
                <div className="p-8 bg-black border border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-8 group">
                    <div className="flex gap-6">
                        {[0, 1, 2].map(i => (
                            <motion.div key={i} animate={{ y: [0, -10, 0] }} transition={{ delay: i * 0.2, repeat: Infinity, duration: 2 }} className="text-center p-3 border border-white/5 rounded-2xl bg-white/[0.02]">
                                <div className="text-3xl mb-1">🧺</div>
                                <div className="text-xl">🥚</div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Diversified Balance</p>
                </div>
            </div>
            <div className="mt-12 text-center text-sm font-medium text-neutral-300 max-w-sm italic">
                "Spreading across different assets so one bad day doesn’t ruin your entire portfolio."
            </div>
        </div>
    );
}

function AssetWheel() {
    const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
    const slices = [
        { label: "Equity", color: "#3b82f6", desc: "Stocks & Mutual Funds" },
        { label: "Gold", color: "#fbbf24", desc: "ETFs & Physical Gold" },
        { label: "Real Estate", color: "#8b5cf6", desc: "REITs & Property" },
        { label: "Debt", color: "#10b981", desc: "Bonds & PPF" },
        { label: "Cash", color: "#6b7280", desc: "Savings & Liquid Funds" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-4">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {slices.map((s, i) => (
                        <motion.path
                            key={i}
                            onMouseEnter={() => setHoveredSlice(s.label)}
                            onMouseLeave={() => setHoveredSlice(null)}
                            d={`M 50 50 L ${50 + 45 * Math.cos((i * 72 * Math.PI) / 180)} ${50 + 45 * Math.sin((i * 72 * Math.PI) / 180)} A 45 45 0 0 1 ${50 + 45 * Math.cos(((i + 1) * 72 * Math.PI) / 180)} ${50 + 45 * Math.sin(((i + 1) * 72 * Math.PI) / 180)} Z`}
                            fill={s.color} fillOpacity={hoveredSlice === s.label ? 1 : 0.4}
                            stroke="white" strokeWidth="0.5" strokeOpacity="0.2"
                            whileHover={{ scale: 1.05 }}
                            className="cursor-help transition-all"
                        />
                    ))}
                </svg>
            </div>
            <div className="space-y-4">
                {slices.map((s, i) => (
                    <div key={i} className={cn("p-4 border rounded-2xl transition-all flex items-center gap-4", hoveredSlice === s.label ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white")}>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                        <div className="flex flex-col"><span className="text-sm font-bold uppercase tracking-tight">{s.label}</span><span className="text-[10px] opacity-60 font-medium italic">{s.desc}</span></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AssetAllocationSim() {
    const [equity, setEquity] = useState(40);
    const [debt, setDebt] = useState(30);
    const [gold, setGold] = useState(10);
    const others = 100 - (equity + debt + gold);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-10 bg-black border border-white/10 rounded-[3rem] shadow-xl space-y-8">
                <div className="space-y-4"><div className="flex justify-between text-[9px] font-black text-blue-400"><span>Equity</span><span>{equity}%</span></div><Slider value={[equity]} onValueChange={([v]) => setEquity(v)} max={80} /></div>
                <div className="space-y-4"><div className="flex justify-between text-[9px] font-black text-emerald-400"><span>Debt</span><span>{debt}%</span></div><Slider value={[debt]} onValueChange={([v]) => setDebt(v)} max={60} /></div>
                <div className="space-y-4"><div className="flex justify-between text-[9px] font-black text-amber-500"><span>Gold</span><span>{gold}%</span></div><Slider value={[gold]} onValueChange={([v]) => setGold(v)} max={30} /></div>
            </div>
            <div className="bg-white/5 p-10 rounded-[3rem] flex flex-col justify-center gap-8 border border-white/10">
                <div className="flex justify-between items-center"><span className="text-xs font-black uppercase text-neutral-500">Risk Profile</span><Badge variant="outline" className={cn("px-4 py-1", equity > 60 ? "border-red-500 text-red-400" : equity > 30 ? "border-blue-500 text-blue-400" : "border-emerald-500 text-emerald-400")}>{equity > 60 ? "Aggressive" : equity > 30 ? "Moderate" : "Conservative"}</Badge></div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden flex shadow-inner">
                    <div style={{ width: `${equity}%` }} className="bg-blue-500 transition-all" />
                    <div style={{ width: `${debt}%` }} className="bg-emerald-500 transition-all" />
                    <div style={{ width: `${gold}%` }} className="bg-amber-500 transition-all" />
                    <div className="flex-1 bg-purple-500 transition-all" />
                </div>
                <p className="text-xs text-neutral-400 text-center font-medium italic">"Find a mix that fits your comfort and goals."</p>
            </div>
        </div>
    );
}

function WithinAssetsExplorer() {
    const [tab, setTab] = useState<'equity' | 'debt'>('equity');
    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="flex gap-2 p-2 bg-white/5 rounded-2xl border border-white/10">
                <button onClick={() => setTab('equity')} className={cn("flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all", tab === 'equity' ? "bg-white text-black" : "text-neutral-500 hover:text-white")}>Equity (Stocks)</button>
                <button onClick={() => setTab('debt')} className={cn("flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all", tab === 'debt' ? "bg-white text-black" : "text-neutral-500 hover:text-white")}>Debt (Safety)</button>
            </div>
            <div className="p-10 bg-black border border-white/10 rounded-[2.5rem] shadow-xl min-h-[250px] flex items-center">
                {tab === 'equity' ? (
                    <div className="w-full space-y-6 animate-in fade-in slide-in-from-left-4">
                        <div className="flex items-end justify-center gap-4 h-32">
                            {['IT', 'Bank', 'Hlth', 'FMCG'].map((s, i) => (
                                <div key={s} className="flex flex-col items-center gap-2">
                                    <div className="w-8 bg-blue-500/30 border border-blue-500/50 rounded-t-lg" style={{ height: `${20 + (i * 20)}px` }} />
                                    <span className="text-[8px] font-black uppercase text-neutral-500">{s}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-center text-white font-medium">Spread across sectors and company sizes (Large, Mid, Small caps).</p>
                    </div>
                ) : (
                    <div className="w-full space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="flex items-center justify-center gap-4">
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center flex-1">
                                <Clock className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                                <span className="text-[9px] font-black uppercase text-white">Liquid Funds</span>
                            </div>
                            <ArrowRight className="text-neutral-500" />
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center flex-1">
                                <Target className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                                <span className="text-[9px] font-black uppercase text-white">Govt Bonds</span>
                            </div>
                        </div>
                        <p className="text-sm text-center text-white font-medium">Mix government and corporate options for safety and better yields.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function GlobalMapVisual() {
    return (
        <div className="relative py-16 px-8 bg-white/[0.03] border border-white/10 rounded-[3rem] flex flex-col items-center justify-center shadow-xl overflow-hidden min-h-[400px]">
            <div className="relative w-full max-w-lg aspect-video flex items-center justify-center">
                <Globe className="w-48 h-48 text-white/5 animate-spin-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 3 }} className="w-6 h-6 bg-emerald-500 rounded-full shadow-[0_0_20px_#10b981]" />
                    {[30, 150, 270].map((angle, i) => (
                        <motion.div key={i} animate={{ x: [0, 80 * Math.cos(angle * Math.PI / 180)], y: [0, 80 * Math.sin(angle * Math.PI / 180)], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 4, delay: i * 1 }} className="absolute text-blue-400">
                            <TrendingUp className="w-6 h-6 rotate-45" />
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="text-center space-y-2 mt-8">
                <p className="text-base text-white font-black uppercase tracking-widest">Global Diversification</p>
                <p className="text-xs text-neutral-400 font-medium italic">Adding international investments smooths returns when local markets stall.</p>
            </div>
        </div>
    );
}

function RebalancingChart() {
    const [balanced, setBalanced] = useState(false);
    return (
        <div className="max-w-2xl mx-auto p-10 bg-black border border-white/10 rounded-[3rem] shadow-xl space-y-10">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-neutral-500">
                <span>Current Allocation</span>
                <span className={cn("transition-colors", balanced ? "text-emerald-400" : "text-red-400")}>{balanced ? "✅ Healthy Balance" : "⚠️ Drift Detected"}</span>
            </div>
            <div className="h-10 w-full bg-white/5 rounded-2xl overflow-hidden flex shadow-inner">
                <motion.div animate={{ width: balanced ? '40%' : '75%' }} className="bg-blue-500" />
                <motion.div animate={{ width: balanced ? '30%' : '15%' }} className="bg-emerald-500" />
                <motion.div animate={{ width: balanced ? '20%' : '5%' }} className="bg-amber-400" />
                <motion.div className="flex-1 bg-purple-500" />
            </div>
            <div className="text-center">
                {!balanced ? (
                    <Button onClick={() => setBalanced(true)} className="bg-red-500 text-white hover:bg-red-600 font-black tracking-widest uppercase px-10 py-5 rounded-2xl text-[10px] shadow-2xl">Rebalance Portfolio <RefreshCw className="ml-2 w-4 h-4" /></Button>
                ) : (
                    <Button variant="outline" className="border-emerald-500 text-emerald-400 font-black tracking-widest uppercase px-10 py-5 rounded-2xl text-[10px] bg-emerald-500/10">Ideal Mix Restored</Button>
                )}
            </div>
            <p className="text-xs text-neutral-500 text-center font-medium">Rebalancing keeps your risk level stable as markets change.</p>
        </div>
    );
}

function MistakeFlipCard({ item }: { item: any }) {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <motion.div onClick={() => setIsFlipped(!isFlipped)} whileHover={{ y: -5 }} className="relative h-48 cursor-pointer group perspective-[1000px]">
            <AnimatePresence mode="wait">
                {!isFlipped ? (
                    <motion.div key="front" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} className="absolute inset-0 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center p-6 text-center shadow-xl group-hover:border-red-500/50">
                        <span className="text-base font-black text-white uppercase tracking-tighter">{item.front}</span>
                    </motion.div>
                ) : (
                    <motion.div key="back" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} className="absolute inset-0 bg-white text-black border-4 border-black rounded-3xl flex items-center justify-center p-6 text-center shadow-xl">
                        <p className="text-sm font-black italic">{item.back}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function PortfolioPersonaToggle() {
    const [type, setType] = useState('moderate');
    const personas = {
        conservative: { equity: 20, debt: 50, gold: 10, real: 10, cash: 10, label: "🧓 Conservative" },
        moderate: { equity: 40, debt: 30, gold: 10, real: 10, cash: 10, label: "👩💼 Moderate" },
        aggressive: { equity: 60, debt: 20, gold: 10, real: 5, cash: 5, label: "🧑💻 Aggressive" }
    };
    const p = personas[type as keyof typeof personas];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-3">
                {Object.keys(personas).map(k => (
                    <button key={k} onClick={() => setType(k)} className={cn("py-4 px-8 rounded-2xl text-left font-black uppercase tracking-widest text-[10px] transition-all border-2", type === k ? "bg-white text-black border-black scale-105" : "bg-black text-neutral-500 border-white/10 hover:border-white/30")}>
                        {personas[k as keyof typeof personas].label}
                    </button>
                ))}
            </div>
            <div className="bg-white/5 p-10 rounded-[3rem] space-y-6 border border-white/10 shadow-xl">
                <div className="flex justify-between items-end"><span className="text-6xl font-black text-white tracking-tighter leading-none">{p.equity}%</span><span className="text-[10px] font-black uppercase text-blue-400 tracking-[0.2em]">Equity Slice</span></div>
                <div className="space-y-3">
                    {Object.entries(p).filter(([k]) => k !== 'label').map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between text-[10px] font-bold text-neutral-400 capitalize">
                            <span>{k}</span>
                            <div className="flex-1 mx-4 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-white/40" style={{ width: `${v}%` }} /></div>
                            <span>{v}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
