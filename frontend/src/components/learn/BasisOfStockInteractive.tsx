'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ArrowRight,
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
        <div className="space-y-12 pb-20">
            {/* Progress Navigation */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md py-4 border-b border-white/10">
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
                    <span className={cn("text-[10px] uppercase font-black tracking-widest text-white/60", monoFont)}>
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
                            <div className="text-center space-y-4">
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1">THE ENTERPRISE ENGINE</Badge>
                                <h2 className={cn("text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>Why Companies Need Investors</h2>
                                <p className="text-neutral-300 max-w-2xl mx-auto text-lg leading-relaxed">
                                    Imagine a brilliant entrepreneur with a world-changing idea but empty pockets. To build factories, hire engineers, and scale globally, they need massive amounts of capital.
                                </p>
                            </div>

                            <div className="relative py-24 px-8 bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden">
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
                                            <div className="flex items-center text-white/20 font-black text-xl uppercase tracking-widest px-4">
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
                            </div>

                            <div className="bg-white text-black p-10 rounded-[2.5rem] space-y-4 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-black/50">The Investor's Secret</h4>
                                <p className="text-2xl font-medium leading-relaxed">
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
                            <div className="text-center space-y-4">
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1">EQUITY DEFINED</Badge>
                                <h2 className={cn("text-5xl font-bold text-white leading-tight", serifFont)}>What Are Stocks?</h2>
                                <p className="text-neutral-300 max-w-2xl mx-auto text-lg leading-relaxed">
                                    At its core, a stock (or share) is a legal document that proves you own a portion of a corporation. It represents a claim on part of the corporation's assets and earnings.
                                </p>
                            </div>

                            <div className="flex flex-col lg:flex-row items-center justify-center gap-16 py-12">
                                {/* The Pizza */}
                                <div className="relative w-72 h-72 md:w-96 md:h-96 group">
                                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                                            <motion.path
                                                key={i}
                                                d={`M 50 50 L ${50 + 45 * Math.cos((i * 45 * Math.PI) / 180)} ${50 + 45 * Math.sin((i * 45 * Math.PI) / 180)} A 45 45 0 0 1 ${50 + 45 * Math.cos(((i + 1) * 45 * Math.PI) / 180)} ${50 + 45 * Math.sin(((i + 1) * 45 * Math.PI) / 180)} Z`}
                                                fill={i === 0 && pizzaHovered ? "#fff" : "transparent"}
                                                stroke="white"
                                                strokeWidth="0.5"
                                                strokeOpacity={i === 0 && pizzaHovered ? "1" : "0.3"}
                                                whileHover={{ scale: 1.05, fill: "rgba(255,255,255,0.9)" }}
                                                onMouseEnter={() => i === 0 && setPizzaHovered(true)}
                                                onMouseLeave={() => i === 0 && setPizzaHovered(false)}
                                                className="cursor-pointer transition-all duration-300"
                                            />
                                        ))}
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <div className="bg-black/80 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 shadow-2xl">
                                            <span className={cn("text-sm font-black uppercase tracking-[0.2em]", monoFont)}>The Corporation</span>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {pizzaHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-2xl z-20"
                                            >
                                                You own this part!
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="max-w-md space-y-8">
                                    <div className={cn(
                                        "p-8 border rounded-[2.5rem] transition-all duration-700 shadow-2xl relative overflow-hidden",
                                        pizzaHovered ? "bg-white text-black border-white" : "bg-white/[0.03] border-white/10 text-white"
                                    )}>
                                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                            <Briefcase className={cn("w-6 h-6", pizzaHovered ? "text-emerald-600" : "text-emerald-400")} />
                                            The Power of Equity
                                        </h3>
                                        <p className={cn("text-lg leading-relaxed", pizzaHovered ? "text-black/80" : "text-neutral-400")}>
                                            If Google has 1 million shares and you buy 100, you are a part-owner. You have the right to vote on company decisions and a claim on their massive bank account of earnings.
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4 p-6 bg-blue-500/10 border border-blue-500/30 rounded-3xl">
                                        <Info className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase font-black text-blue-400 tracking-widest">Educational Insight</p>
                                            <p className="text-sm text-neutral-200 leading-relaxed font-medium">
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
                            <div className="text-center space-y-4">
                                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-1">THE MARKET MECHANISM</Badge>
                                <h2 className={cn("text-5xl font-bold text-white leading-tight", serifFont)}>How the Market Works</h2>
                                <p className="text-neutral-300 max-w-2xl mx-auto text-lg leading-relaxed">
                                    The stock market is an auction house where the value of companies is decided second-by-second by people like you.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8">
                                <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 relative aspect-square max-w-lg mx-auto flex items-center justify-center">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-64 h-64 rounded-full border border-dashed border-white/10 animate-spin-slow" />
                                    </div>
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        {[
                                            { label: 'IPO', icon: Rocket, color: 'blue', pos: 'top-0 left-1/2 -translate-x-1/2', t: "Going public for the first time." },
                                            { label: 'Buy', icon: Users, color: 'purple', pos: 'top-1/2 -translate-y-1/2 right-0', t: "Investors purchase shares." },
                                            { label: 'Expand', icon: Building2, color: 'blue', pos: 'bottom-0 left-1/2 -translate-x-1/2', t: "Company uses cash to grow." },
                                            { label: 'Profit', icon: Coins, color: 'emerald', pos: 'top-1/2 -translate-y-1/2 left-0', t: "Growth leads to higher value." }
                                        ].map((p, i) => (
                                            <motion.div
                                                key={p.label}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.2 }}
                                                whileHover={{ scale: 1.1, zIndex: 30 }}
                                                className={cn(
                                                    "absolute w-20 h-20 bg-black border rounded-[2rem] flex flex-col items-center justify-center gap-1 shadow-2xl transition-colors cursor-help group",
                                                    p.color === 'blue' ? "border-blue-500/50" : p.color === 'emerald' ? "border-emerald-500/50" : "border-purple-500/50"
                                                )}
                                                style={{ left: i === 1 ? '85%' : i === 3 ? '-5%' : i === 0 || i === 2 ? '40%' : '40%', top: i === 0 ? '-5%' : i === 2 ? '85%' : i === 1 || i === 3 ? '40%' : '40%' }}
                                            >
                                                <p.icon className={cn("w-6 h-6", p.color === 'blue' ? "text-blue-400" : p.color === 'emerald' ? "text-emerald-400" : "text-purple-400")} />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-white">{p.label}</span>
                                            </motion.div>
                                        ))}
                                        <div className="text-center space-y-2 relative z-10 bg-black p-6 rounded-full border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                            <Globe className="w-10 h-10 text-white mx-auto animate-pulse" />
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">The Hub</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <div className="bg-black border border-white/10 rounded-[2.5rem] p-8 h-80 flex flex-col justify-end relative overflow-hidden shadow-2xl">
                                        <div className="absolute top-8 left-8 space-y-2">
                                            <p className="text-[10px] font-black uppercase text-blue-400 tracking-[0.2em]">Price Discovery</p>
                                            <h3 className="text-3xl font-bold text-white">Value follows Growth</h3>
                                        </div>
                                        <svg viewBox="0 0 200 100" className="w-full h-40">
                                            <defs>
                                                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#3b82f6" />
                                                    <stop offset="100%" stopColor="#10b981" />
                                                </linearGradient>
                                            </defs>
                                            <motion.path
                                                d="M 10 90 C 40 85, 60 70, 90 60 S 140 40, 190 10"
                                                fill="none"
                                                stroke="url(#lineGrad)"
                                                strokeWidth="3"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
                            <div className="text-center space-y-4">
                                <Badge className="bg-red-500/10 text-red-400 border-red-500/20 px-4 py-1">MARKET PSYCHOLOGY</Badge>
                                <h2 className={cn("text-5xl font-bold text-white leading-tight", serifFont)}>Bull vs Bear Market</h2>
                                <p className="text-neutral-300 max-w-2xl mx-auto text-lg leading-relaxed">
                                    Markets move in cycles. Understanding the "mood" of the market is crucial for deciding your strategy.
                                </p>
                            </div>

                            <div className="relative py-24 px-12 rounded-[3.5rem] overflow-hidden transition-all duration-1000 shadow-2xl"
                                style={{
                                    backgroundColor: marketMood[0] < 40 ? 'rgba(185, 28, 28, 0.05)' : marketMood[0] > 60 ? 'rgba(5, 150, 105, 0.05)' : 'rgba(255, 255, 255, 0.04)',
                                    border: `1px solid ${marketMood[0] < 40 ? 'rgba(185, 28, 28, 0.2)' : marketMood[0] > 60 ? 'rgba(5, 150, 105, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`
                                }}
                            >
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                                    <motion.div
                                        animate={{ opacity: marketMood[0] < 40 ? 1 : 0.2, scale: marketMood[0] < 40 ? 1.1 : 0.8 }}
                                        className="text-center space-y-8 flex-1"
                                    >
                                        <div className="w-40 h-40 mx-auto bg-neutral-900 border border-red-500/30 rounded-[2.5rem] flex items-center justify-center relative shadow-2xl">
                                            <TrendingDown className="w-16 h-16 text-red-500" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-bold text-red-500">The Bear</h3>
                                            <p className="text-sm text-neutral-200 max-w-[250px] mx-auto leading-relaxed font-medium">
                                                Prices fall. Investors are afraid. A time of caution and "claws down".
                                            </p>
                                        </div>
                                    </motion.div>

                                    <div className="w-full lg:w-48 flex flex-col items-center justify-center gap-8 py-10 lg:py-0">
                                        <div className="flex justify-between w-full px-2 text-[10px] font-black uppercase tracking-widest text-white/40">
                                            <span>Fear</span>
                                            <span>Greed</span>
                                        </div>
                                        <Slider defaultValue={[50]} max={100} step={1} className="w-full h-2 cursor-pointer" onValueChange={setMarketMood} />
                                        <div className="bg-white text-black px-6 py-3 rounded-full border border-white/10 text-xs font-black uppercase tracking-widest">
                                            Sentiment: {marketMood[0] < 40 ? "Bearish" : marketMood[0] > 60 ? "Bullish" : "Neutral"}
                                        </div>
                                    </div>

                                    <motion.div
                                        animate={{ opacity: marketMood[0] > 60 ? 1 : 0.2, scale: marketMood[0] > 60 ? 1.1 : 0.8 }}
                                        className="text-center space-y-8 flex-1"
                                    >
                                        <div className="w-40 h-40 mx-auto bg-neutral-900 border border-emerald-500/50 rounded-[2.5rem] flex items-center justify-center relative shadow-2xl">
                                            <TrendingUp className="w-16 h-16 text-emerald-500" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-bold text-emerald-500">The Bull</h3>
                                            <p className="text-sm text-neutral-200 max-w-[250px] mx-auto leading-relaxed font-medium">
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
                            <div className="text-center space-y-4">
                                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-1">TERMINOLOGY HUB</Badge>
                                <h2 className={cn("text-5xl font-bold text-white leading-tight", serifFont)}>Market Intelligence Glossary</h2>
                                <p className="text-neutral-300 max-w-2xl mx-auto text-lg">Knowledge is leverage. Click to reveal the meaning of these foundational terms.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                                {[
                                    { icon: "📊", term: "Sensex", def: "A stock market index of 30 well-established companies on the Bombay Stock Exchange (BSE). It's the 'pulse' of the Indian market.", color: "white" },
                                    { icon: "💼", term: "Demat Account", def: "Short for 'Dematerialized'. It's your digital vault where shares are stored securely in electronic form.", color: "neutral-500" },
                                    { icon: "🚀", term: "IPO", def: "Initial Public Offering. The 'birth' of a public stock—when a private company first invites the global public to become owners.", color: "white" },
                                    { icon: "🧾", term: "Dividend", def: "Your share of the company's profits. Usually paid in cash directly into your bank account as a reward for holding the stock.", color: "neutral-500" }
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
                            <div className="text-center space-y-4">
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1">MARKET STRUCTURE</Badge>
                                <h2 className={cn("text-5xl font-bold text-white leading-tight", serifFont)}>Primary vs Secondary Markets</h2>
                                <p className="text-neutral-300 max-w-2xl mx-auto text-lg leading-relaxed">
                                    Where exactly does your money go? The stock market is divided into two distinct arenas.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-10">
                                {/* Primary Market */}
                                <div className="p-10 bg-white/[0.03] border border-blue-500/20 rounded-[3rem] space-y-8 relative overflow-hidden group hover:bg-blue-500/5 transition-all duration-700 shadow-2xl">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-3xl font-bold text-white">Primary Market</h3>
                                        <Badge variant="outline" className="border-blue-500/50 text-blue-400 font-black">NEW CAPITAL</Badge>
                                    </div>
                                    <div className="flex items-center justify-center py-10 gap-8">
                                        <div className="w-24 h-24 rounded-3xl bg-blue-500 flex items-center justify-center text-black shadow-[0_0_40px_rgba(59,130,246,0.6)]">
                                            <Building2 className="w-12 h-12" />
                                        </div>
                                        <motion.div animate={{ x: [0, 20, 0], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-blue-400">
                                            <ArrowRight className="w-10 h-10" />
                                        </motion.div>
                                        <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/20 flex items-center justify-center">
                                            <Users className="w-12 h-12 text-blue-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-sm text-neutral-200 leading-relaxed font-semibold">
                                            This is where companies issue <span className="text-blue-400 font-black">NEW</span> shares for the first time through an <span className="text-white underline decoration-blue-500 underline-offset-4">IPO</span>. The money flows <span className="text-white italic">directly</span> from you to the company.
                                        </p>
                                        <div className="p-4 bg-blue-500/20 rounded-2xl border border-blue-500/40 text-xs font-black text-blue-100">
                                            PRO TIP: You buy directly from the source to fund their growth.
                                        </div>
                                    </div>
                                </div>

                                {/* Secondary Market */}
                                <div className="p-10 bg-white/[0.03] border border-purple-500/20 rounded-[3rem] space-y-8 relative overflow-hidden group hover:bg-purple-500/5 transition-all duration-700 shadow-2xl">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-3xl font-bold text-white">Secondary Market</h3>
                                        <Badge variant="outline" className="border-purple-500/50 text-purple-400 font-black">TRADING HUB</Badge>
                                    </div>
                                    <div className="flex items-center justify-center py-10 gap-8">
                                        <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/20 flex items-center justify-center">
                                            <Users className="w-12 h-12 text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.3)]" />
                                        </div>
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="text-purple-400">
                                            <RefreshCw className="w-10 h-10" />
                                        </motion.div>
                                        <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/20 flex items-center justify-center text-black">
                                            <Users className="w-12 h-12 text-purple-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-sm text-neutral-200 leading-relaxed font-semibold">
                                            This is the "Stock Market" most people know. Investors buy and sell <span className="text-purple-400 font-black">EXISTING</span> shares to each other. The company is <span className="text-white underline decoration-purple-500 underline-offset-4">not involved</span> in these trades.
                                        </p>
                                        <div className="p-4 bg-purple-500/20 rounded-2xl border border-purple-500/40 text-xs font-black text-purple-100">
                                            PRO TIP: This provides "liquidity", allowing you to exit your investment anytime.
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
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1">WEALTH SIMULATOR</Badge>
                                <h2 className={cn("text-5xl font-bold text-white leading-tight", serifFont)}>The Power of Growth</h2>
                                <p className="text-neutral-300 max-w-2xl mx-auto text-lg leading-relaxed">See how a simple investment can evolve as a company grows in value.</p>
                            </div>

                            <ProfitSimulator />

                            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Price Appreciation", val: "Asset Value ↑", icon: TrendingUp },
                                    { label: "Compound Growth", val: "Exponential ↑", icon: Zap },
                                    { label: "Ownership Rights", val: "Equity Hold ↑", icon: ShieldCheck }
                                ].map((c, i) => (
                                    <div key={i} className="p-6 bg-white/[0.05] border border-white/20 rounded-3xl text-center space-y-2 hover:border-emerald-500/50 transition-colors">
                                        <c.icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                                        <h4 className="text-[10px] font-black uppercase text-white/40 tracking-widest">{c.label}</h4>
                                        <p className="text-white font-black text-lg">{c.val}</p>
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
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="space-y-16 py-10"
                        >
                            <div className="text-center space-y-6">
                                <Badge className="bg-white text-black font-black px-6 py-2 rounded-full tracking-[0.3em] shadow-[0_0_30px_white/30]">MISSION ACCOMPLISHED</Badge>
                                <h2 className={cn("text-6xl font-bold text-white tracking-tighter leading-tight", serifFont)}>Plant Your Wealth.</h2>
                                <p className="text-neutral-200 max-w-xl mx-auto text-xl leading-relaxed font-medium">
                                    You've decoded the fundamental engine of the global economy. Now, it's time to apply this intelligence to real markets.
                                </p>
                            </div>

                            <div className="relative h-80 flex items-center justify-center">
                                {/* The Wealth Tree / Beacon */}
                                <div className="w-1.5 bg-gradient-to-t from-white/0 via-white/40 to-white h-full relative rounded-full">
                                    {[0.2, 0.4, 0.6, 0.8].map((p, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0, opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                                            animate={{ scale: 1, opacity: 1, x: i % 2 === 0 ? 40 : -40 }}
                                            transition={{ delay: 0.5 + (i * 0.3), type: "spring" }}
                                            className={cn(
                                                "absolute w-16 h-16 bg-black border border-white/20 rounded-[1.5rem] flex items-center justify-center shadow-2xl group cursor-pointer",
                                                i % 2 === 0 ? "left-0" : "right-0"
                                            )}
                                            style={{ bottom: `${p * 100}%` }}
                                        >
                                            <Gem className={cn("w-6 h-6", i % 2 === 0 ? "text-emerald-400" : "text-blue-400")} />
                                            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-3 py-1 rounded-lg text-[10px] whitespace-nowrap font-black">
                                                {i === 0 ? "SAVINGS" : i === 1 ? "STOCKS" : i === 2 ? "FINANCIAL FREEDOM" : "GENERATIONAL WEALTH"}
                                            </div>
                                        </motion.div>
                                    ))}
                                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -top-16 -left-16 w-32 h-32 bg-white rounded-full blur-[60px]" />
                                    <motion.div className="absolute -top-10 -left-10 w-20 h-20 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_50px_white]">
                                        <Rocket className="w-10 h-10" />
                                    </motion.div>
                                </div>
                            </div>

                            <div className="text-center space-y-12">
                                <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] max-w-2xl mx-auto text-xl italic text-neutral-300 relative">
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl text-white/10">"</span>
                                    The best time to plant a tree was 20 years ago. The second best time is <span className="text-white font-black underline decoration-emerald-500 underline-offset-8">now</span>.
                                </div>
                                <Button
                                    onClick={() => window.location.href = '/learn'}
                                    className="bg-white text-black hover:bg-neutral-200 font-black tracking-widest uppercase px-16 py-8 rounded-[2rem] text-xl shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95"
                                >
                                    Master the Next Module <ChevronRight className="ml-3 w-8 h-8" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-24 flex items-center justify-between border-t border-white/10 pt-12 pb-10">
                    <Button
                        variant="ghost"
                        disabled={activeSection === 1}
                        onClick={() => setActiveSection(s => Math.max(1, s - 1))}
                        className="text-white/40 hover:text-white group py-6 px-8 rounded-2xl"
                    >
                        <ArrowLeft className="mr-3 w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        Back
                    </Button>
                    <div className="flex gap-6">
                        <Button variant="outline" className="border-white/20 text-white/50 hover:bg-white/5 hover:text-white py-6 px-10 rounded-2xl font-bold" onClick={() => window.location.href = '/learn'}>
                            Exit
                        </Button>
                        <Button
                            className="bg-white text-black hover:bg-neutral-200 font-black tracking-widest uppercase px-12 py-6 rounded-2xl text-base shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                            onClick={() => setActiveSection(s => Math.min(totalSections, s + 1))}
                        >
                            {activeSection === totalSections ? "Complete" : "Continue"} <ChevronRight className="ml-2 w-5 h-5" />
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
        blue: "text-blue-400 border-blue-500/20 bg-blue-500/5",
        amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
        purple: "text-purple-400 border-purple-500/20 bg-purple-500/5",
        emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
        white: "text-white border-white/20 bg-white/5"
    };

    return (
        <div className="relative group">
            <motion.div onMouseEnter={() => setHoveredBox(id)} onMouseLeave={() => setHoveredBox(null)} whileHover={{ y: -8, scale: 1.02 }} className={cn("w-44 h-44 border-2 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 cursor-help bg-black shadow-2xl relative z-10", isHovered ? "border-white scale-105" : "border-white/10")}>
                <div className={cn("p-4 rounded-2xl transition-all duration-500", colorClasses[color])}>
                    <Icon className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black uppercase text-center px-4 tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">{label}</span>
            </motion.div>
            <AnimatePresence>
                {isHovered && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-64 p-8 bg-white text-black rounded-[2.5rem] z-50 shadow-[0_20px_80px_rgba(0,0,0,0.6)] border-4 border-black">
                        <p className="text-sm font-bold leading-relaxed">{desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function FlowArrow() {
    return <motion.div animate={{ x: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ repeat: Infinity, duration: 3 }} className="hidden md:block text-white"><ArrowRight className="w-8 h-8" /></motion.div>;
}

function GlossaryCard({ item }: { item: any }) {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <motion.div onClick={() => setIsFlipped(!isFlipped)} whileHover={{ y: -8 }} className="relative h-64 cursor-pointer group perspective-1000">
            <AnimatePresence mode="wait">
                {!isFlipped ? (
                    <motion.div key="front" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-[3rem] flex flex-col items-center justify-center gap-6 p-8 group-hover:border-white/30 transition-all shadow-2xl">
                        <span className="text-6xl drop-shadow-2xl">{item.icon}</span>
                        <div className="text-center space-y-2">
                            <h4 className="text-lg font-black uppercase tracking-[0.2em] text-white">{item.term}</h4>
                            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Tap to flip</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="back" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} className="absolute inset-0 bg-white text-black border-4 border-black rounded-[3rem] flex items-center justify-center p-10 shadow-2xl">
                        <p className="text-base font-bold leading-relaxed text-center italic">"{item.def}"</p>
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
        <div className="p-12 bg-black border border-white/20 rounded-[4rem] shadow-[0_0_100px_rgba(255,255,255,0.05)] space-y-12 relative overflow-hidden max-w-2xl mx-auto">
            <div className="space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between text-xs font-black uppercase text-white/40 tracking-widest">
                        <span>Buying Price (₹)</span>
                        <span className="text-white font-mono text-xl">₹{buyPrice}</span>
                    </div>
                    <Slider value={[buyPrice]} min={100} max={2000} step={10} onValueChange={(v) => setBuyPrice(v[0])} className="[&_[role=slider]]:bg-white [&_[role=slider]]:w-6 [&_[role=slider]]:h-6" />
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between text-xs font-black uppercase text-white/40 tracking-widest">
                        <span>Selling Price (₹)</span>
                        <span className="text-white font-mono text-xl">₹{sellPrice}</span>
                    </div>
                    <Slider value={[sellPrice]} min={100} max={5000} step={10} onValueChange={(v) => setSellPrice(v[0])} className="[&_[role=slider]]:bg-white [&_[role=slider]]:w-6 [&_[role=slider]]:h-6" />
                </div>
            </div>
            <div className={cn("p-12 rounded-[3.5rem] text-center transition-all duration-1000", profit >= 0 ? "bg-white text-black shadow-[0_20px_60px_rgba(255,255,255,0.2)]" : "bg-red-600 text-white")}>
                <p className="text-[12px] font-black uppercase tracking-[0.3em] mb-4 opacity-50">Estimated Realization</p>
                <div className="text-7xl font-black mb-4 tracking-tighter">{profit >= 0 ? "+" : ""}₹{profit}</div>
                <div className="text-lg font-black tracking-widest">{percentage}% GAIN</div>
            </div>
        </div>
    );
}

const ArrowLeft = ({ className, ...props }: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
);
