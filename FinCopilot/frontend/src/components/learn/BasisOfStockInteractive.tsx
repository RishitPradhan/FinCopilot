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
    RefreshCw,
    Info,
    CheckCircle2,
    Rocket,
    Globe,
    ShieldCheck,
    Briefcase,
    Lightbulb,
    Gem,
    Zap
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
    const [marketMood, setMarketMood] = useState([50]);

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
                    {/* Section 1: Why Companies Need Investors */}
                    {activeSection === 1 && (
                        <motion.div
                            key="s1"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">THE ENTERPRISE ENGINE</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>Why Companies Need Investors</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                                    Imagine a brilliant entrepreneur with a world-changing idea but empty pockets. To build factories and scale globally, they need capital.
                                </p>
                            </div>

                            {/* Removed overflow-hidden to prevent hover clipping */}
                            <div className="relative py-16 px-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] shadow-xl">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-20 gap-x-8 relative z-10 items-center">
                                    <FlowBox id="comp" label="The Company" icon={Building2} color="blue" desc="A business starts with a vision—maybe it's building electric cars. They have talent but lack cash." hoveredBox={hoveredBox} setHoveredBox={setHoveredBox} />
                                    <div className="flex justify-center"><FlowArrow /></div>
                                    <FlowBox id="funds" label="Needs Funds" icon={Lightbulb} color="amber" desc="Scaling costs millions. Research and marketing require immediate liquidity." hoveredBox={hoveredBox} setHoveredBox={setHoveredBox} />

                                    <FlowBox id="inv" label="Invites Investors" icon={Users} color="purple" desc="The company offers 'slices' of itself to the public. You give them money for a piece of the pie." hoveredBox={hoveredBox} setHoveredBox={setHoveredBox} />
                                    <div className="flex justify-center"><FlowArrow /></div>
                                    <FlowBox id="cap" label="Gets Capital" icon={Coins} color="emerald" desc="With thousands of investors, the company has the millions it needs to scale." hoveredBox={hoveredBox} setHoveredBox={setHoveredBox} />

                                    <div className="md:col-span-3 flex justify-center pt-4">
                                        <div className="flex flex-col md:flex-row items-center gap-10 max-w-2xl">
                                            <FlowBox id="grow" label="Expansion & Growth" icon={Rocket} color="white" desc="The factory is built. Sales skyrocket. The value of the company increases." hoveredBox={hoveredBox} setHoveredBox={setHoveredBox} />
                                            <div className="flex items-center text-white/30 font-black text-[9px] uppercase tracking-[0.3em] px-2">Final Result</div>
                                            <FlowBox id="prof" label="Shared Success" icon={CheckCircle2} color="emerald" desc="As the company earns profit, the value of your 'slices' increases." hoveredBox={hoveredBox} setHoveredBox={setHoveredBox} />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none text-[12rem] font-black text-white whitespace-nowrap z-0">CORE</div>
                            </div>

                            <div className="bg-white text-black p-8 rounded-[2rem] space-y-2 shadow-xl">
                                <h4 className="font-black uppercase tracking-widest text-[9px] opacity-60">The Investor's Secret</h4>
                                <p className="text-xl font-bold leading-relaxed">
                                    "When you invest, you aren't 'spending' money. You are fueling an engine and taking a seat at the table of its future success."
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 2: What Are Stocks? */}
                    {activeSection === 2 && (
                        <motion.div
                            key="s2"
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">EQUITY DEFINED</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight", serifFont)}>What Are Stocks?</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                                    A stock is a legal document that proves you own a portion of a corporation. It's a claim on assets and earnings.
                                </p>
                            </div>

                            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 py-8">
                                <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
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
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="bg-black/80 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20">
                                            <span className={cn("text-xs font-black uppercase tracking-widest text-white", monoFont)}>The Corporation</span>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {pizzaHovered && (
                                            <motion.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="absolute -top-12 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-2xl z-20">You own this!</motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="max-w-md space-y-6">
                                    <div className={cn("p-8 border-2 rounded-[2.5rem] transition-all duration-700 shadow-xl", pizzaHovered ? "bg-white text-black border-white" : "bg-white/[0.05] border-white/20 text-white")}>
                                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Briefcase className={cn("w-6 h-6", pizzaHovered ? "text-emerald-600" : "text-emerald-400")} /> The Power of Equity</h3>
                                        <p className={cn("text-lg leading-relaxed", pizzaHovered ? "text-black/80" : "text-neutral-200")}>If a company has 1M shares and you buy 100, you are a part-owner. You have voting rights and a claim on earnings.</p>
                                    </div>
                                    <div className="flex items-start gap-4 p-6 bg-blue-500/10 border border-blue-500/30 rounded-[2rem]">
                                        <Info className="w-6 h-6 text-blue-400 mt-1" />
                                        <div className="space-y-1">
                                            <p className="text-[9px] uppercase font-black text-blue-400 tracking-widest">Educational Insight</p>
                                            <p className="text-base text-white font-medium">Digital records have replaced paper certificates, but the legal ownership is just as powerful.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 3: How the Stock Market Works */}
                    {activeSection === 3 && (
                        <motion.div key="s3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">THE MARKET MECHANISM</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight", serifFont)}>How the Market Works</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-lg leading-relaxed font-medium">An auction house where company values are decided second-by-second by millions of participants.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-4">
                                <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 relative aspect-square max-w-xs mx-auto flex items-center justify-center shadow-xl">
                                    <div className="absolute inset-x-8 inset-y-8 rounded-full border border-dashed border-white/20 animate-spin-slow" />
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        {[
                                            { label: 'IPO', icon: Rocket, color: 'blue', pos: 'top-[-5%] left-1/2 -translate-x-1/2' },
                                            { label: 'Buy', icon: Users, color: 'purple', pos: 'top-1/2 -translate-y-1/2 right-[-5%]' },
                                            { label: 'Expand', icon: Building2, color: 'blue', pos: 'bottom-[-5%] left-1/2 -translate-x-1/2' },
                                            { label: 'Profit', icon: Coins, color: 'emerald', pos: 'top-1/2 -translate-y-1/2 left-[-5%]' }
                                        ].map((p, i) => (
                                            <motion.div key={p.label} className={cn("absolute w-20 h-20 bg-black border-2 rounded-3xl flex flex-col items-center justify-center gap-1 shadow-2xl z-10", p.color === 'blue' ? "border-blue-500/50" : p.color === 'emerald' ? "border-emerald-500/50" : "border-purple-500/50")} style={{
                                                top: i === 0 ? '-5%' : i === 2 ? '85%' : i === 1 || i === 3 ? '40%' : '40%',
                                                left: i === 1 ? '85%' : i === 3 ? '-5%' : i === 0 || i === 2 ? '40%' : '40%'
                                            }}>
                                                <p.icon className={cn("w-6 h-6", p.color === 'blue' ? "text-blue-400" : p.color === 'emerald' ? "text-emerald-400" : "text-purple-400")} />
                                                <span className="text-[8px] font-black uppercase text-white">{p.label}</span>
                                            </motion.div>
                                        ))}
                                        <div className="text-center space-y-2 relative z-10 bg-black p-8 rounded-full border border-white/20 shadow-xl">
                                            <Globe className="w-10 h-10 text-white mx-auto animate-pulse" />
                                            <span className="text-[8px] font-black text-white uppercase tracking-widest">The Exchange</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-black border border-white/10 rounded-[2.5rem] p-8 h-[350px] flex flex-col justify-end relative shadow-xl overflow-hidden">
                                    <div className="absolute top-8 left-8 space-y-2">
                                        <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Price Discovery</p>
                                        <h3 className="text-2xl font-bold text-white">Value Projection</h3>
                                    </div>
                                    <svg viewBox="0 0 200 100" className="w-full h-40">
                                        <motion.path d="M 10 90 C 40 85, 60 70, 90 60 S 140 40, 190 10" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 5, repeat: Infinity }} />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 4: Bull vs Bear Market */}
                    {activeSection === 4 && (
                        <motion.div key="s4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-red-500/10 text-red-400 border-red-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">MARKET PSYCHOLOGY</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight", serifFont)}>Bull vs Bear Market</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-lg leading-relaxed font-medium">Markets move in cycles. Understanding the "mood" is crucial for strategy.</p>
                            </div>

                            <div className="relative py-20 px-12 rounded-[3rem] overflow-hidden transition-all duration-1000 shadow-xl" style={{
                                backgroundColor: marketMood[0] < 40 ? 'rgba(185, 28, 28, 0.08)' : marketMood[0] > 60 ? 'rgba(5, 150, 105, 0.08)' : 'rgba(255, 255, 255, 0.05)',
                                border: `1px solid ${marketMood[0] < 40 ? 'rgba(185, 28, 28, 0.3)' : marketMood[0] > 60 ? 'rgba(5, 150, 105, 0.3)' : 'rgba(255, 255, 255, 0.15)'}`
                            }}>
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                                    <div className="text-center space-y-6 flex-1">
                                        <div className="w-36 h-36 mx-auto bg-black border border-red-500/40 rounded-[2.5rem] flex items-center justify-center shadow-xl">
                                            <TrendingDown className="w-14 h-14 text-red-500" />
                                        </div>
                                        <h3 className="text-2xl font-black text-red-500 uppercase">The Bear</h3>
                                        <p className="text-base text-white font-medium">Prices fall. Investors are afraid. A time for caution.</p>
                                    </div>
                                    <div className="w-64 flex flex-col gap-6">
                                        <div className="flex justify-between font-black uppercase tracking-widest text-[9px] text-white"><span>Fear</span><span>Greed</span></div>
                                        <Slider defaultValue={[50]} max={100} step={1} onValueChange={setMarketMood} />
                                        <div className="bg-white text-black px-6 py-2 rounded-full text-xs font-black uppercase text-center">{marketMood[0] < 40 ? "Bearish" : marketMood[0] > 60 ? "Bullish" : "Neutral"}</div>
                                    </div>
                                    <div className="text-center space-y-6 flex-1">
                                        <div className="w-36 h-36 mx-auto bg-black border border-emerald-500/40 rounded-[2.5rem] flex items-center justify-center shadow-xl">
                                            <TrendingUp className="w-14 h-14 text-emerald-500" />
                                        </div>
                                        <h3 className="text-2xl font-black text-emerald-500 uppercase">The Bull</h3>
                                        <p className="text-base text-white font-medium">Prices soar. Optimism reigns. A time for growth.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 5: Interactive Glossary */}
                    {activeSection === 5 && (
                        <motion.div key="s5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">TERMINOLOGY HUB</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight", serifFont)}>Market Intelligence</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-lg leading-relaxed font-medium">Click to reveal the meaning of these foundational terms.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                                {[
                                    { icon: "📊", term: "Sensex", def: "A stock market index of 30 well-established companies on the BSE. It's the 'pulse' of the market." },
                                    { icon: "💼", term: "Demat Account", def: "A digital vault where shares are stored securely in electronic form." },
                                    { icon: "🚀", term: "IPO", def: "Initial Public Offering. When a private company first invites the public to become owners." },
                                    { icon: "🧾", term: "Dividend", def: "Your share of the company's profits, usually paid in cash as a reward for holding the stock." }
                                ].map((item) => (<GlossaryCard key={item.term} item={item} />))}
                            </div>
                        </motion.div>
                    )}

                    {/* Section 6: Types of Markets */}
                    {activeSection === 6 && (
                        <motion.div key="s6" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">MARKET STRUCTURE</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight", serifFont)}>Primary vs Secondary</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-lg font-medium leading-relaxed">Where exactly does your money go?</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
                                <div className="p-10 bg-white/[0.04] border border-blue-500/20 rounded-[3rem] space-y-8 relative group hover:bg-blue-500/5 transition-all shadow-xl">
                                    <div className="flex items-center justify-between"><h3 className="text-3xl font-black text-white uppercase">Primary</h3><Badge variant="outline" className="border-blue-500 text-blue-400 font-bold px-3">NEW CAPITAL</Badge></div>
                                    <div className="flex items-center justify-center py-6 gap-6">
                                        <div className="w-20 h-20 rounded-3xl bg-blue-500 flex items-center justify-center text-black shadow-lg"><Building2 className="w-10 h-10" /></div>
                                        <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-blue-400"><ArrowRight className="w-8 h-8" /></motion.div>
                                        <div className="w-20 h-20 rounded-3xl bg-white text-black flex items-center justify-center shadow-lg"><Users className="w-10 h-10" /></div>
                                    </div>
                                    <p className="text-lg text-white font-bold">New shares issued via <span className="text-blue-400">IPO</span>. Money flows directly to the company.</p>
                                </div>
                                <div className="p-10 bg-white/[0.04] border border-purple-500/20 rounded-[3rem] space-y-8 relative group hover:bg-purple-500/5 transition-all shadow-xl">
                                    <div className="flex items-center justify-between"><h3 className="text-3xl font-black text-white uppercase">Secondary</h3><Badge variant="outline" className="border-purple-500 text-purple-400 font-bold px-3">TRADING HUB</Badge></div>
                                    <div className="flex items-center justify-center py-6 gap-6">
                                        <div className="w-20 h-20 rounded-3xl bg-white text-black flex items-center justify-center"><Users className="w-10 h-10" /></div>
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="text-purple-400"><RefreshCw className="w-8 h-8" /></motion.div>
                                        <div className="w-20 h-20 rounded-3xl bg-white text-black flex items-center justify-center"><Users className="w-10 h-10" /></div>
                                    </div>
                                    <p className="text-lg text-white font-bold">Trading of <span className="text-purple-400">EXISTING</span> shares. The company is not involved.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 7: Simple Example & Simulator */}
                    {activeSection === 7 && (
                        <motion.div key="s7" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">WEALTH SIMULATOR</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight", serifFont)}>Profit Realization</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-lg leading-relaxed font-medium">See how investment evolves as a company grows.</p>
                            </div>
                            <ProfitSimulator />
                        </motion.div>
                    )}

                    {/* Section 8: Closing Section */}
                    {activeSection === 8 && (
                        <motion.div key="s8" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-12 py-4" >
                            <div className="text-center space-y-6">
                                <Badge className="bg-white text-black font-black px-6 py-2 rounded-full tracking-widest text-[9px]">MISSION ACCOMPLISHED</Badge>
                                <h2 className={cn("text-6xl md:text-7xl font-black text-white tracking-tighter leading-tight", serifFont)}>Plant Your Wealth.</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-xl font-medium leading-relaxed">Fundamental economic intelligence decoded. Ready for the next module?</p>
                            </div>
                            <div className="relative h-80 flex items-center justify-center">
                                <div className="w-1 bg-gradient-to-t from-transparent via-white/50 to-white h-full relative rounded-full">
                                    {[0.2, 0.4, 0.6, 0.8].map((p, i) => (
                                        <motion.div key={i} initial={{ scale: 0, x: i % 2 === 0 ? 60 : -60 }} animate={{ scale: 1, x: i % 2 === 0 ? 50 : -50 }} className="absolute w-16 h-16 bg-black border border-white/30 rounded-2xl flex items-center justify-center shadow-xl group cursor-help transition-all hover:border-white" style={{ bottom: `${p * 100}%` }}>
                                            <Gem className={cn("w-6 h-6", i % 2 === 0 ? "text-emerald-400" : "text-blue-400")} />
                                            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all bg-white text-black px-4 py-2 rounded-xl text-[9px] font-black whitespace-nowrap shadow-xl z-50">
                                                {i === 0 ? "SAVINGS" : i === 1 ? "STOCKS" : i === 2 ? "FINANCIAL FREEDOM" : "GENERATIONAL WEALTH"}
                                            </div>
                                        </motion.div>
                                    ))}
                                    <div className="absolute -top-8 -left-8 w-16 h-16 bg-white rounded-full border-2 border-black flex items-center justify-center text-black shadow-2xl z-10"><Rocket className="w-8 h-8" /></div>
                                </div>
                            </div>
                            <div className="text-center space-y-12">
                                <div className="p-10 bg-white/[0.05] border border-white/20 rounded-[3rem] max-w-2xl mx-auto text-2xl font-bold text-white relative shadow-xl italic leading-relaxed">
                                    The best time to plant a tree was 20 years ago. The second best time is <span className="text-emerald-400 underline decoration-emerald-500/50 decoration-4 underline-offset-8">now</span>.
                                </div>
                                <Button onClick={() => window.location.href = '/learn'} className="bg-white text-black hover:bg-neutral-200 font-black tracking-widest uppercase px-12 py-8 rounded-[2rem] text-xl shadow-2xl transition-all hover:scale-105 group">
                                    Master Next Module <ChevronRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons - Reduced padding */}
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
            <motion.div onMouseEnter={() => setHoveredBox(id)} onMouseLeave={() => setHoveredBox(null)} whileHover={{ y: -8, scale: 1.02 }} className={cn("w-40 h-40 border-2 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 cursor-help bg-black shadow-xl relative z-20", isHovered ? "border-white" : "border-white/10")}>
                <div className={cn("p-4 rounded-2xl transition-all duration-500 shadow-lg", colorClasses[color])}><Icon className="w-8 h-8" /></div>
                <span className="text-[10px] font-black uppercase text-center px-4 tracking-widest text-white leading-tight">{label}</span>
            </motion.div>
            <AnimatePresence>
                {isHovered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-64 p-6 bg-white text-black rounded-3xl z-[100] shadow-2xl border-4 border-black">
                        <p className="text-xs font-black italic">"{desc}"</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function FlowArrow() {
    return <motion.div animate={{ x: [0, 5, 0], opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 3 }} className="hidden md:block text-white"><ArrowRight className="w-8 h-8" /></motion.div>;
}

function GlossaryCard({ item }: { item: any }) {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <motion.div onClick={() => setIsFlipped(!isFlipped)} whileHover={{ y: -8 }} className="relative h-64 cursor-pointer group perspective-[2000px]">
            <AnimatePresence mode="wait">
                {!isFlipped ? (
                    <motion.div key="front" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} className="absolute inset-0 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 p-10 group-hover:border-white transition-all shadow-xl">
                        <span className="text-6xl drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">{item.icon}</span>
                        <div className="text-center space-y-1">
                            <h4 className="text-xl font-black uppercase tracking-widest text-white">{item.term}</h4>
                            <p className="text-[8px] text-neutral-400 font-bold uppercase tracking-widest opacity-80">Tap to reveal</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="back" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} className="absolute inset-0 bg-white text-black border-4 border-black rounded-[2.5rem] flex items-center justify-center p-10 shadow-xl overflow-hidden">
                        <p className="text-base font-black leading-relaxed text-center italic">"{item.def}"</p>
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
        <div className="p-10 bg-black border border-white/10 rounded-[3.5rem] shadow-2xl space-y-12 relative overflow-hidden max-w-2xl mx-auto">
            <div className="space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between text-[9px] font-black uppercase text-neutral-400 tracking-widest"><span>Initial Investment</span><span className="text-white font-mono text-lg">₹{buyPrice}</span></div>
                    <Slider value={[buyPrice]} min={100} max={2000} step={10} onValueChange={(v) => setBuyPrice(v[0])} />
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between text-[9px] font-black uppercase text-neutral-400 tracking-widest"><span>Exit Valuation</span><span className="text-white font-mono text-lg">₹{sellPrice}</span></div>
                    <Slider value={[sellPrice]} min={100} max={5000} step={10} onValueChange={(v) => setSellPrice(v[0])} />
                </div>
            </div>
            <div className={cn("p-10 rounded-[3rem] text-center transition-all duration-1000 shadow-xl border-4 transform", profit >= 0 ? "bg-white text-black border-black scale-105" : "bg-red-600 text-white border-white")}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">Wealth Realization</p>
                <div className="text-7xl font-black mb-4 tracking-tighter">{profit >= 0 ? "+" : ""}₹{profit}</div>
                <div className="text-xl font-black tracking-widest uppercase">{percentage}% Growth</div>
            </div>
        </div>
    );
}
