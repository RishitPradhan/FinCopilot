'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ArrowRight,
    ArrowLeft,
    Coins,
    Users,
    Building2,
    TrendingUp,
    TrendingDown,
    PieChart as PieIcon,
    RefreshCw,
    Info,
    CheckCircle2,
    DollarSign,
    Rocket,
    Globe,
    ShieldCheck,
    Briefcase,
    Lightbulb,
    Target,
    Zap,
    Scale,
    Gem
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const serifFont = "font-serif";
const monoFont = "font-mono";

export function BasisOfStockInteractive() {
    const [activeSection, setActiveSection] = useState(1);
    const [hoveredBox, setHoveredBox] = useState<string | null>(null);
    const [pizzaHovered, setPizzaHovered] = useState(false);
    const [marketMood, setMarketMood] = useState([50]); // 0 = Bear, 100 = Bull

    const totalSections = 8;

    const sections = [
        { id: 1, title: "Why Companies Need Investors" },
        { id: 2, title: "What Are Stocks?" },
        { id: 3, title: "How the Stock Market Works" },
        { id: 4, title: "Bull vs Bear Market" },
        { id: 5, title: "Interactive Glossary" },
        { id: 6, title: "Types of Markets" },
        { id: 7, title: "Simple Example & Simulator" },
        { id: 8, title: "Planting Your Wealth" }
    ];

    return (
        <div className="space-y-12 pb-20 selection:bg-white selection:text-black">
            {/* Progress Navigation */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md py-4 border-b border-white/10 mb-8">
                <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
                    <div className="flex items-center gap-1.5">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-500",
                                    activeSection === s.id ? "w-10 bg-white" :
                                        activeSection > s.id ? "w-4 bg-white/40" : "w-2 bg-white/10"
                                )}
                            />
                        ))}
                    </div>
                    <span className={cn("text-[10px] uppercase font-black tracking-widest text-neutral-400", monoFont)}>
                        Section {activeSection} of {totalSections}: {sections[activeSection - 1].title}
                    </span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                <AnimatePresence mode="wait">
                    {/* Section 1: Why Companies Need Investors */}
                    {activeSection === 1 && (
                        <motion.div
                            key="s1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-10"
                        >
                            <div className="text-center space-y-6">
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-6 py-1.5 text-xs font-black tracking-widest uppercase">THE ENTERPRISE ENGINE</Badge>
                                <h2 className={cn("text-6xl font-bold text-white tracking-tight leading-none", serifFont)}>Why Companies Need Investors</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
                                    Imagine a brilliant entrepreneur with a world-changing idea but empty pockets. To build factories, hire engineers, and scale globally, they need massive amounts of capital.
                                </p>
                            </div>

                            <div className="relative py-24 px-12 bg-white/[0.03] border border-white/10 rounded-[3.5rem] overflow-hidden shadow-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-y-24 gap-x-12 relative z-10 items-center">
                                    {/* Row 1 */}
                                    <FlowBox
                                        id="comp"
                                        label="The Company"
                                        icon={Building2}
                                        color="blue"
                                        desc="A business starts with a vision—maybe it's building electric cars or a new social network. They have the talent but lack the cash."
                                        hoveredBox={hoveredBox}
                                        setHoveredBox={setHoveredBox}
                                    />
                                    <div className="flex justify-center">
                                        <FlowArrow />
                                    </div>
                                    <FlowBox
                                        id="funds"
                                        label="Needs Funds"
                                        icon={Lightbulb}
                                        color="amber"
                                        desc="Scaling costs millions. Research, development, and marketing require immediate liquidity that the founders might not have."
                                        hoveredBox={hoveredBox}
                                        setHoveredBox={setHoveredBox}
                                    />

                                    {/* Row 2 */}
                                    <FlowBox
                                        id="inv"
                                        label="Invites Investors"
                                        icon={Users}
                                        color="purple"
                                        desc="The company offers 'slices' of itself to the public. You give them your money, and in return, you get a piece of the pie."
                                        hoveredBox={hoveredBox}
                                        setHoveredBox={setHoveredBox}
                                    />
                                    <div className="flex justify-center">
                                        <FlowArrow />
                                    </div>
                                    <FlowBox
                                        id="cap"
                                        label="Gets Capital"
                                        icon={Coins}
                                        color="emerald"
                                        desc="With thousands of investors, the company suddenly has the millions it needs to build and dominate the market."
                                        hoveredBox={hoveredBox}
                                        setHoveredBox={setHoveredBox}
                                    />

                                    {/* Row 3 - The Result */}
                                    <div className="md:col-span-3 flex justify-center pt-8">
                                        <div className="flex flex-col md:flex-row items-center gap-12 max-w-2xl">
                                            <FlowBox
                                                id="grow"
                                                label="Expansion & Growth"
                                                icon={Rocket}
                                                color="white"
                                                desc="The factory is built. Sales skyrocket. The value of the company increases because it is now making more money."
                                                hoveredBox={hoveredBox}
                                                setHoveredBox={setHoveredBox}
                                            />
                                            <div className="flex items-center text-white/30 font-black text-xs uppercase tracking-[0.4em] px-4 whitespace-nowrap">
                                                Final Result
                                            </div>
                                            <FlowBox
                                                id="prof"
                                                label="Shared Success"
                                                icon={CheckCircle2}
                                                color="emerald"
                                                desc="As the company earns profit, the value of your 'slices' increases. They might even send you a check (dividends)!"
                                                hoveredBox={hoveredBox}
                                                setHoveredBox={setHoveredBox}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none text-[20rem] font-black text-white whitespace-nowrap -z-0">
                                    CORE
                                </div>
                            </div>

                            <div className="bg-white text-black p-10 rounded-[2.5rem] space-y-4 shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                                <h4 className="font-black uppercase tracking-widest text-[10px] opacity-70">The Investor's Secret</h4>
                                <p className="text-2xl font-bold leading-relaxed">
                                    "When you invest, you aren't 'spending' money. You are fueling an engine and taking a seat at the table of its future success."
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 2: What Are Stocks? */}
                    {activeSection === 2 && (
                        <motion.div
                            key="s2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="text-center space-y-6">
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-6 py-1.5 text-xs font-black tracking-widest uppercase">EQUITY DEFINED</Badge>
                                <h2 className={cn("text-6xl font-bold text-white tracking-tight leading-none", serifFont)}>What Are Stocks?</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
                                    At its core, a stock (or share) is a legal document that proves you own a portion of a corporation. It represents a claim on part of the corporation's assets and earnings.
                                </p>
                            </div>

                            <div className="flex flex-col lg:flex-row items-center justify-center gap-16 py-12">
                                {/* The Pizza */}
                                <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] group">
                                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_60px_rgba(255,255,255,0.15)]">
                                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                                            <motion.path
                                                key={i}
                                                d={`M 50 50 L ${50 + 45 * Math.cos((i * 45 * Math.PI) / 180)} ${50 + 45 * Math.sin((i * 45 * Math.PI) / 180)} A 45 45 0 0 1 ${50 + 45 * Math.cos(((i + 1) * 45 * Math.PI) / 180)} ${50 + 45 * Math.sin(((i + 1) * 45 * Math.PI) / 180)} Z`}
                                                fill={i === 0 && pizzaHovered ? "#fff" : "transparent"}
                                                stroke="white"
                                                strokeWidth="0.8"
                                                strokeOpacity={i === 0 && pizzaHovered ? "1" : "0.4"}
                                                whileHover={{ scale: 1.05, fill: "rgba(255,255,255,0.95)" }}
                                                onMouseEnter={() => i === 0 && setPizzaHovered(true)}
                                                onMouseLeave={() => i === 0 && setPizzaHovered(false)}
                                                className="cursor-pointer transition-all duration-300"
                                            />
                                        ))}
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <div className="bg-black/80 backdrop-blur-2xl px-8 py-4 rounded-full border border-white/30 shadow-2xl">
                                            <span className={cn("text-base font-black uppercase tracking-[0.3em] text-white", monoFont)}>The Corporation</span>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {pizzaHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                className="absolute -top-16 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-6 py-2 rounded-2xl text-sm font-black uppercase tracking-widest shadow-[0_0_40px_rgba(16,185,129,0.4)] z-20"
                                            >
                                                You own this part!
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="max-w-md space-y-8">
                                    <div className={cn(
                                        "p-10 border-2 rounded-[3.5rem] transition-all duration-700 shadow-2xl relative overflow-hidden",
                                        pizzaHovered ? "bg-white text-black border-white" : "bg-white/[0.05] border-white/20 text-white"
                                    )}>
                                        <h3 className="text-3xl font-bold mb-6 flex items-center gap-4">
                                            <Briefcase className={cn("w-8 h-8", pizzaHovered ? "text-emerald-600" : "text-emerald-400")} />
                                            The Power of Equity
                                        </h3>
                                        <p className={cn("text-xl leading-relaxed", pizzaHovered ? "text-black/80" : "text-neutral-200")}>
                                            If Google has 1 million shares and you buy 100, you are a part-owner. You have the right to vote on company decisions and a claim on their massive bank account of earnings.
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-6 p-8 bg-blue-500/10 border-2 border-blue-500/30 rounded-[2.5rem] shadow-xl">
                                        <div className="p-3 bg-blue-500 rounded-2xl">
                                            <Info className="w-8 h-8 text-black" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] uppercase font-black text-blue-400 tracking-[0.2em]">Educational Insight</p>
                                            <p className="text-lg text-white font-medium leading-relaxed">
                                                In the old days, you'd get a paper certificate. Today, it's all digital, but the legal ownership remains just as powerful.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 3: How the Stock Market Works */}
                    {activeSection === 3 && (
                        <motion.div
                            key="s3"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-6">
                                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-6 py-1.5 text-xs font-black tracking-widest uppercase">THE MARKET MECHANISM</Badge>
                                <h2 className={cn("text-6xl font-bold text-white tracking-tight leading-none", serifFont)}>How the Market Works</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
                                    The stock market is an auction house where the value of companies is decided second-by-second by millions of people.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-8">
                                <div className="bg-white/[0.03] border border-white/10 rounded-[4rem] p-16 relative aspect-square max-w-lg mx-auto flex items-center justify-center shadow-2xl">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-80 h-80 rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />
                                    </div>
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        {[
                                            { label: 'IPO', icon: Rocket, color: 'blue', pos: 'top-[-10%] left-1/2 -translate-x-1/2', t: "Going public for the first time." },
                                            { label: 'Buy', icon: Users, color: 'purple', pos: 'top-1/2 -translate-y-1/2 right-[-10%]', t: "Investors purchase shares." },
                                            { label: 'Expand', icon: Building2, color: 'blue', pos: 'bottom-[-10%] left-1/2 -translate-x-1/2', t: "Company uses cash to grow." },
                                            { label: 'Profit', icon: Coins, color: 'emerald', pos: 'top-1/2 -translate-y-1/2 left-[-10%]', t: "Growth leads to higher value." }
                                        ].map((p, i) => (
                                            <motion.div
                                                key={p.label}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.2 }}
                                                whileHover={{ scale: 1.1, zIndex: 30 }}
                                                className={cn(
                                                    "absolute w-24 h-24 bg-black border-2 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-colors cursor-help group z-10",
                                                    p.color === 'blue' ? "border-blue-500/50" : p.color === 'emerald' ? "border-emerald-500/50" : "border-purple-500/50"
                                                )}
                                                style={{ left: i === 1 ? '90%' : i === 3 ? '-10%' : i === 0 || i === 2 ? '38%' : '38%', top: i === 0 ? '-10%' : i === 2 ? '90%' : i === 1 || i === 3 ? '38%' : '38%' }}
                                            >
                                                <p.icon className={cn("w-8 h-8", p.color === 'blue' ? "text-blue-400" : p.color === 'emerald' ? "text-emerald-400" : "text-purple-400")} />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-white">{p.label}</span>
                                            </motion.div>
                                        ))}
                                        <div className="text-center space-y-3 relative z-10 bg-black p-10 rounded-full border-2 border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.1)]">
                                            <Globe className="w-14 h-14 text-white mx-auto animate-pulse" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">The Exchange</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-10">
                                    <div className="bg-black border-2 border-white/10 rounded-[3.5rem] p-10 h-[450px] flex flex-col justify-end relative overflow-hidden shadow-2xl">
                                        <div className="absolute top-10 left-10 space-y-4">
                                            <p className="text-[12px] font-black uppercase text-blue-400 tracking-[0.3em]">Value Projection</p>
                                            <h3 className="text-4xl font-bold text-white leading-tight">Price Discoveries<br />Follow Success</h3>
                                        </div>
                                        <svg viewBox="0 0 200 100" className="w-full h-56">
                                            <defs>
                                                <linearGradient id="lineGradLarge" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#3b82f6" />
                                                    <stop offset="100%" stopColor="#10b981" />
                                                </linearGradient>
                                            </defs>
                                            <motion.path
                                                d="M 10 90 C 40 85, 60 70, 90 60 S 140 40, 190 10"
                                                fill="none"
                                                stroke="url(#lineGradLarge)"
                                                strokeWidth="5"
                                                strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 4: Bull vs Bear Market */}
                    {activeSection === 4 && (
                        <motion.div
                            key="s4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-6">
                                <Badge className="bg-red-500/10 text-red-400 border-red-500/20 px-6 py-1.5 text-xs font-black tracking-widest uppercase">MARKET PSYCHOLOGY</Badge>
                                <h2 className={cn("text-6xl font-bold text-white tracking-tight leading-none", serifFont)}>Bull vs Bear Market</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
                                    Markets move in cycles. Understanding the "mood" of the market is crucial for deciding your strategy.
                                </p>
                            </div>

                            <div className="relative py-28 px-16 rounded-[4rem] overflow-hidden transition-all duration-1000 shadow-[0_0_100px_rgba(255,255,255,0.05)]"
                                style={{
                                    backgroundColor: marketMood[0] < 40 ? 'rgba(185, 28, 28, 0.08)' : marketMood[0] > 60 ? 'rgba(5, 150, 105, 0.08)' : 'rgba(255, 255, 255, 0.05)',
                                    border: `2px solid ${marketMood[0] < 40 ? 'rgba(185, 28, 28, 0.3)' : marketMood[0] > 60 ? 'rgba(5, 150, 105, 0.3)' : 'rgba(255, 255, 255, 0.15)'}`
                                }}
                            >
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-20 relative z-10">
                                    <motion.div
                                        animate={{ opacity: marketMood[0] < 40 ? 1 : 0.3, scale: marketMood[0] < 40 ? 1.15 : 0.85 }}
                                        className="text-center space-y-10 flex-1"
                                    >
                                        <div className="w-48 h-48 mx-auto bg-neutral-950 border-2 border-red-500/40 rounded-[3rem] flex items-center justify-center relative shadow-3xl">
                                            <TrendingDown className="w-20 h-20 text-red-500" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-black text-red-500 uppercase tracking-tighter">The Bear</h3>
                                            <p className="text-lg text-white max-w-[280px] mx-auto leading-relaxed font-medium">
                                                Prices fall. Investors are afraid. A time of caution and "claws down".
                                            </p>
                                        </div>
                                    </motion.div>

                                    <div className="w-full lg:w-64 flex flex-col items-center justify-center gap-10 py-12 lg:py-0">
                                        <div className="flex justify-between w-full px-4 text-[12px] font-black uppercase tracking-[0.4em] text-white">
                                            <span>Fear</span>
                                            <span>Greed</span>
                                        </div>
                                        <Slider defaultValue={[50]} max={100} step={1} className="w-full h-3 cursor-pointer" onValueChange={setMarketMood} />
                                        <div className="bg-white text-black px-10 py-4 rounded-full border-2 border-black text-sm font-black uppercase tracking-widest shadow-2xl">
                                            Sentiment: {marketMood[0] < 40 ? "Bearish" : marketMood[0] > 60 ? "Bullish" : "Neutral"}
                                        </div>
                                    </div>

                                    <motion.div
                                        animate={{ opacity: marketMood[0] > 60 ? 1 : 0.3, scale: marketMood[0] > 60 ? 1.15 : 0.85 }}
                                        className="text-center space-y-10 flex-1"
                                    >
                                        <div className="w-48 h-48 mx-auto bg-neutral-950 border-2 border-emerald-500/40 rounded-[3rem] flex items-center justify-center relative shadow-3xl">
                                            <TrendingUp className="w-20 h-20 text-emerald-500" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-black text-emerald-500 uppercase tracking-tighter">The Bull</h3>
                                            <p className="text-lg text-white max-w-[280px] mx-auto leading-relaxed font-medium">
                                                Prices soar. Optimism reigns. A time of growth and "horns up".
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 5: Interactive Glossary */}
                    {activeSection === 5 && (
                        <motion.div
                            key="s5"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-6">
                                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-6 py-1.5 text-xs font-black tracking-widest uppercase">TERMINOLOGY HUB</Badge>
                                <h2 className={cn("text-6xl font-bold text-white tracking-tight leading-none", serifFont)}>Market Intelligence</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-xl font-medium leading-relaxed">Knowledge is leverage. Click to reveal the meaning of these foundational terms.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
                                {[
                                    { icon: "📊", term: "Sensex", def: "A stock market index of 30 well-established companies on the Bombay Stock Exchange (BSE). It's the 'pulse' of the Indian market.", color: "white" },
                                    { icon: "💼", term: "Demat Account", def: "Short for 'Dematerialized Account'. It's your digital vault where shares are stored securely in electronic form.", color: "neutral-400" },
                                    { icon: "🚀", term: "IPO", def: "Initial Public Offering. The 'birth' of a public stock—when a private company first invites the global public to become owners.", color: "white" },
                                    { icon: "🧾", term: "Dividend", def: "Your share of the company's profits. Usually paid in cash directly into your bank account as a reward for holding the stock.", color: "neutral-400" }
                                ].map((item, i) => (
                                    <GlossaryCard key={item.term} item={item} />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Section 6: Types of Markets */}
                    {activeSection === 6 && (
                        <motion.div
                            key="s6"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-6">
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-6 py-1.5 text-xs font-black tracking-widest uppercase">MARKET STRUCTURE</Badge>
                                <h2 className={cn("text-6xl font-bold text-white tracking-tight leading-none", serifFont)}>Primary vs Secondary</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
                                    Where exactly does your money go? The market is divided into two distinct arenas.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-10">
                                {/* Primary Market */}
                                <div className="p-12 bg-white/[0.04] border-2 border-blue-500/20 rounded-[4rem] space-y-10 relative overflow-hidden group hover:bg-blue-500/5 transition-all duration-700 shadow-2xl">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Primary</h3>
                                        <Badge variant="outline" className="border-blue-500 text-blue-400 font-black px-4 py-1">NEW CAPITAL</Badge>
                                    </div>
                                    <div className="flex items-center justify-center py-12 gap-10">
                                        <div className="w-28 h-28 rounded-[2.5rem] bg-blue-500 flex items-center justify-center text-black shadow-[0_0_40px_rgba(59,130,246,0.6)]">
                                            <Building2 className="w-14 h-14" />
                                        </div>
                                        <motion.div animate={{ x: [0, 25, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2.5 }} className="text-blue-400">
                                            <ArrowRight className="w-12 h-12" />
                                        </motion.div>
                                        <div className="w-28 h-28 rounded-[2.5rem] bg-white text-black flex items-center justify-center shadow-2xl">
                                            <Users className="w-14 h-14" />
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <p className="text-lg text-white leading-relaxed font-bold">
                                            This is where companies issue <span className="text-blue-400 font-black">NEW</span> shares for the first time via <span className="text-white underline decoration-blue-500 decoration-4 underline-offset-8">IPO</span>.
                                        </p>
                                        <p className="text-sm text-neutral-300 leading-relaxed font-medium">
                                            The money flows <span className="text-white italic font-bold text-base">directly</span> from you to the company to fund their breakthrough products.
                                        </p>
                                        <div className="p-6 bg-blue-500/10 rounded-3xl border-2 border-blue-500/20 text-xs font-black text-blue-200 tracking-widest uppercase">
                                            Role: You are the Initial Fuel.
                                        </div>
                                    </div>
                                </div>

                                {/* Secondary Market */}
                                <div className="p-12 bg-white/[0.04] border-2 border-purple-500/20 rounded-[4rem] space-y-10 relative overflow-hidden group hover:bg-purple-500/5 transition-all duration-700 shadow-2xl">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Secondary</h3>
                                        <Badge variant="outline" className="border-purple-500 text-purple-400 font-black px-4 py-1">TRADING HUB</Badge>
                                    </div>
                                    <div className="flex items-center justify-center py-12 gap-10">
                                        <div className="w-28 h-28 rounded-[2.5rem] bg-white text-black flex items-center justify-center shadow-2xl">
                                            <Users className="w-14 h-14" />
                                        </div>
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }} className="text-purple-400">
                                            <RefreshCw className="w-12 h-12" />
                                        </motion.div>
                                        <div className="w-28 h-28 rounded-[2.5rem] bg-white text-black flex items-center justify-center shadow-2xl">
                                            <Users className="w-14 h-14" />
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <p className="text-lg text-white leading-relaxed font-bold">
                                            Investors buy and sell <span className="text-purple-400 font-black">EXISTING</span> shares to each other. The company is <span className="text-neutral-400 line-through decoration-red-500/50 decoration-2">not involved</span>.
                                        </p>
                                        <p className="text-sm text-neutral-300 leading-relaxed font-medium">
                                            This is the standard 'Store' for stocks. It provides <span className="text-white font-bold text-base italic">liquidity</span>, allowing you to exit anytime.
                                        </p>
                                        <div className="p-6 bg-purple-500/10 rounded-3xl border-2 border-purple-500/20 text-xs font-black text-purple-200 tracking-widest uppercase">
                                            Role: You are the Active Trader.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 7: Simple Example & Simulator */}
                    {activeSection === 7 && (
                        <motion.div
                            key="s7"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-6">
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-6 py-1.5 text-xs font-black tracking-widest uppercase">WEALTH SIMULATOR</Badge>
                                <h2 className={cn("text-6xl font-bold text-white tracking-tight leading-none", serifFont)}>Profit Realization</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-xl font-medium leading-relaxed">See how a simple investment can evolve as a company grows in value.</p>
                            </div>

                            <ProfitSimulator />

                            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { label: "Price Appreciation", val: "Asset Value ↑", icon: TrendingUp, color: "emerald" },
                                    { label: "Compound Growth", val: "Exponential ↑", icon: Zap, color: "blue" },
                                    { label: "Ownership Rights", val: "Equity Hold ↑", icon: ShieldCheck, color: "purple" }
                                ].map((c, i) => (
                                    <div key={i} className="p-10 bg-white/[0.04] border-2 border-white/10 rounded-[2.5rem] text-center space-y-4 hover:border-white/30 transition-all shadow-2xl">
                                        <div className={cn("p-4 rounded-2xl mx-auto w-min", c.color === "emerald" ? "bg-emerald-500" : c.color === "blue" ? "bg-blue-500" : "bg-purple-500")}>
                                            <c.icon className="w-10 h-10 text-black" />
                                        </div>
                                        <h4 className="text-[12px] font-black uppercase text-neutral-400 tracking-[0.3em]">{c.label}</h4>
                                        <p className="text-2xl text-white font-black tracking-tight">{c.val}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Section 8: Closing Section */}
                    {activeSection === 8 && (
                        <motion.div
                            key="s8"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-20 py-10"
                        >
                            <div className="text-center space-y-8">
                                <Badge className="bg-white text-black font-black px-8 py-2.5 rounded-full tracking-[0.5em] text-sm">MISSION ACCOMPLISHED</Badge>
                                <h2 className={cn("text-8xl font-black text-white tracking-tighter leading-tight", serifFont)}>Plant Your Wealth.</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-2xl font-medium leading-relaxed">
                                    You've decoded the fundamental engine of the global economy. Now, it's time to apply this intelligence to real markets.
                                </p>
                            </div>

                            <div className="relative h-[500px] flex items-center justify-center">
                                {/* The Wealth Tree / Beacon */}
                                <div className="w-2 bg-gradient-to-t from-white/0 via-white/50 to-white h-full relative rounded-full shadow-[0_0_100px_rgba(255,255,255,0.2)]">
                                    {[0.2, 0.4, 0.6, 0.8].map((p, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0, opacity: 0, x: i % 2 === 0 ? 80 : -80 }}
                                            animate={{ scale: 1, opacity: 1, x: i % 2 === 0 ? 60 : -60 }}
                                            transition={{ delay: 0.8 + (i * 0.4), type: "spring", stiffness: 100 }}
                                            className={cn(
                                                "absolute w-24 h-24 bg-black border-2 border-white/30 rounded-[2rem] flex items-center justify-center shadow-3xl group cursor-pointer hover:border-white transition-all",
                                                i % 2 === 0 ? "left-0" : "right-0"
                                            )}
                                            style={{ bottom: `${p * 100}%` }}
                                        >
                                            <Gem className={cn("w-10 h-10", i % 2 === 0 ? "text-emerald-400" : "text-blue-400")} />
                                            <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-all bg-white text-black px-6 py-3 rounded-2xl text-xs font-black whitespace-nowrap shadow-3xl transform translate-y-2 group-hover:translate-y-0">
                                                {i === 0 ? "SAVINGS" : i === 1 ? "STOCKS" : i === 2 ? "FINANCIAL FREEDOM" : "GENERATIONAL WEALTH"}
                                            </div>
                                        </motion.div>
                                    ))}
                                    <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-32 -left-32 w-64 h-64 bg-white rounded-full blur-[100px] pointer-events-none" />
                                    <motion.div className="absolute -top-12 -left-12 w-28 h-28 bg-white rounded-full border-4 border-black flex items-center justify-center text-black shadow-[0_0_80px_white]">
                                        <Rocket className="w-14 h-14" />
                                    </motion.div>
                                </div>
                            </div>

                            <div className="text-center space-y-16">
                                <div className="p-12 bg-white/[0.05] border-2 border-white/20 rounded-[4rem] max-w-3xl mx-auto text-3xl font-bold text-white relative leading-relaxed shadow-3xl italic">
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10rem] text-white/5 font-serif select-none pointer-events-none">"</span>
                                    The best time to plant a tree was 20 years ago. The second best time is <span className="text-emerald-400 underline decoration-emerald-500/50 decoration-8 underline-offset-[12px]">now</span>.
                                </div>
                                <Button
                                    onClick={() => window.location.href = '/learn'}
                                    className="bg-white text-black hover:bg-neutral-200 font-black tracking-widest uppercase px-20 py-10 rounded-[3rem] text-2xl shadow-[0_30px_100px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95 group"
                                >
                                    Master Next Module <ChevronRight className="ml-4 w-10 h-10 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-32 flex items-center justify-between border-t border-white/10 pt-16 pb-12">
                    <Button
                        variant="ghost"
                        disabled={activeSection === 1}
                        onClick={() => setActiveSection(s => Math.max(1, s - 1))}
                        className="text-neutral-400 hover:text-white group py-8 px-10 rounded-3xl transition-all text-lg font-bold"
                    >
                        <ArrowLeft className="mr-4 w-6 h-6 transition-transform group-hover:-translate-x-2" />
                        Back
                    </Button>
                    <div className="flex gap-8">
                        <Button variant="outline" className="border-white/20 text-neutral-300 hover:bg-white/10 py-8 px-12 rounded-3xl font-black uppercase tracking-widest text-base shadow-xl" onClick={() => window.location.href = '/learn'}>
                            Exit
                        </Button>
                        <Button
                            className="bg-white text-black hover:bg-neutral-200 font-black tracking-[0.2em] uppercase px-16 py-8 rounded-3xl text-xl shadow-[0_15px_60px_rgba(255,255,255,0.15)] group transition-all"
                            onClick={() => setActiveSection(s => Math.min(totalSections, s + 1))}
                        >
                            {activeSection === totalSections ? "Complete" : "Continue"} <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-components
function FlowBox({ id, label, icon: Icon, color, desc, hoveredBox, setHoveredBox }: any) {
    const isHovered = hoveredBox === id;
    const colorClasses: any = {
        blue: "text-blue-400 border-blue-500/20 bg-blue-500/10",
        amber: "text-amber-400 border-amber-500/20 bg-amber-500/10",
        purple: "text-purple-400 border-purple-500/20 bg-purple-500/10",
        emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
        white: "text-white border-white/20 bg-white/10"
    };

    return (
        <div className="relative group">
            <motion.div
                onMouseEnter={() => setHoveredBox(id)}
                onMouseLeave={() => setHoveredBox(null)}
                whileHover={{ y: -12, scale: 1.05 }}
                className={cn(
                    "w-52 h-52 border-2 rounded-[3.5rem] flex flex-col items-center justify-center gap-6 transition-all duration-500 cursor-help bg-black shadow-3xl relative z-10",
                    isHovered ? "border-white" : "border-white/10"
                )}
            >
                <div className={cn("p-6 rounded-3xl transition-all duration-500 shadow-xl", colorClasses[color])}>
                    <Icon className="w-12 h-12" />
                </div>
                <span className="text-[11px] font-black uppercase text-center px-6 tracking-[0.3em] text-white leading-relaxed">{label}</span>
            </motion.div>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-80 p-8 bg-white text-black rounded-[2.5rem] z-50 shadow-[0_30px_80px_rgba(0,0,0,0.6)] border-4 border-black"
                    >
                        <p className="text-sm font-black leading-relaxed italic">"{desc}"</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function FlowArrow() {
    return (
        <motion.div
            animate={{ x: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
            className="hidden md:block text-white"
        >
            <ArrowRight className="w-12 h-12" />
        </motion.div>
    );
}

function GlossaryCard({ item }: { item: any }) {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <motion.div onClick={() => setIsFlipped(!isFlipped)} whileHover={{ y: -12 }} className="relative h-80 cursor-pointer group perspective-[2000px]">
            <AnimatePresence mode="wait">
                {!isFlipped ? (
                    <motion.div
                        key="front"
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        className="absolute inset-0 bg-white/[0.05] border-2 border-white/20 rounded-[4rem] flex flex-col items-center justify-center gap-8 p-12 group-hover:border-white transition-all shadow-3xl"
                    >
                        <span className="text-8xl drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">{item.icon}</span>
                        <div className="text-center space-y-3">
                            <h4 className="text-2xl font-black uppercase tracking-[0.3em] text-white">{item.term}</h4>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.5em] opacity-80">Tap to reveal</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="back"
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        className="absolute inset-0 bg-white text-black border-8 border-black rounded-[4rem] flex items-center justify-center p-12 shadow-3xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-black opacity-10" />
                        <p className="text-xl font-black leading-relaxed text-center italic">"{item.def}"</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function ProfitSimulator() {
    const [buyPrice, setBuyPrice] = useState<number>(500);
    const [sellPrice, setSellPrice] = useState<number>(1200);
    const profit = sellPrice - buyPrice;
    const percentage = ((profit / buyPrice) * 100).toFixed(1);

    return (
        <div className="p-16 bg-black border-2 border-white/20 rounded-[5rem] shadow-[0_0_150px_rgba(255,255,255,0.05)] space-y-16 relative overflow-hidden max-w-3xl mx-auto">
            <div className="space-y-12">
                <div className="space-y-6">
                    <div className="flex justify-between text-xs font-black uppercase text-neutral-400 tracking-[0.4em]">
                        <span>Initial Investment</span>
                        <span className="text-white font-mono text-xl">₹{buyPrice}</span>
                    </div>
                    <Slider value={[buyPrice]} min={100} max={2000} step={10} onValueChange={(v) => setBuyPrice(v[0])} className="[&_[role=slider]]:bg-white [&_[role=slider]]:w-10 [&_[role=slider]]:h-10 [&_[role=slider]]:border-4 [&_[role=slider]]:border-black" />
                </div>
                <div className="space-y-6">
                    <div className="flex justify-between text-xs font-black uppercase text-neutral-400 tracking-[0.4em]">
                        <span>Exit Valuation</span>
                        <span className="text-white font-mono text-xl">₹{sellPrice}</span>
                    </div>
                    <Slider value={[sellPrice]} min={100} max={5000} step={10} onValueChange={(v) => setSellPrice(v[0])} className="[&_[role=slider]]:bg-white [&_[role=slider]]:w-10 [&_[role=slider]]:h-10 [&_[role=slider]]:border-4 [&_[role=slider]]:border-black" />
                </div>
            </div>
            <div className={cn(
                "p-16 rounded-[4rem] text-center transition-all duration-1000 shadow-3xl transform border-4",
                profit >= 0 ? "bg-white text-black border-black scale-105" : "bg-red-600 text-white border-white"
            )}>
                <p className="text-[14px] font-black uppercase tracking-[0.5em] mb-6 opacity-60">Wealth Realization</p>
                <div className="text-8xl font-black mb-6 tracking-tighter">{profit >= 0 ? "+" : ""}₹{profit}</div>
                <div className="text-2xl font-black tracking-[0.3em] uppercase">{percentage}% Growth</div>
            </div>
        </div>
    );
}
