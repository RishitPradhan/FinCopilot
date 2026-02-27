'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ArrowRight,
    ArrowLeft,
    ShieldAlert,
    TrendingUp,
    TrendingDown,
    Scale,
    PieChart as PieIcon,
    RefreshCw,
    Info,
    CheckCircle2,
    DollarSign,
    Zap,
    Clock,
    Target,
    Brain,
    Activity,
    CloudRain,
    Sun,
    Waves,
    Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const serifFont = "font-serif";
const monoFont = "font-mono";

export function RiskAndReturnInteractive() {
    const [activeSection, setActiveSection] = useState(1);
    const totalSections = 7;

    const sections = [
        { id: 1, title: "Intro Scene: The See-Saw" },
        { id: 2, title: "Risk vs Return Trade-Off" },
        { id: 3, title: "What Is Risk? The Factors" },
        { id: 4, title: "What Is Return? The Reward" },
        { id: 5, title: "Why Time Reduces Risk" },
        { id: 6, title: "Balancing Your Portfolio" },
        { id: 7, title: "Final Summary" }
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
                    {/* Section 1: Intro Scene - The See-Saw */}
                    {activeSection === 1 && (
                        <motion.div key="s1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-8" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">THE HEARTBEAT</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>Understanding Risk & Return</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-lg leading-relaxed font-medium italic">
                                    "Every investment is a balance."
                                </p>
                            </div>

                            <div className="relative py-20 px-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center shadow-xl overflow-hidden">
                                <motion.div
                                    animate={{ rotate: [5, -5, 5] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="relative w-full max-w-md h-1 bg-white/20 rounded-full mb-12 flex items-center justify-between px-10"
                                >
                                    <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-8 h-8 bg-white/10 border-t-8 border-x-8 border-x-transparent border-t-white" />

                                    <motion.div className="flex flex-col items-center gap-4 -mt-20">
                                        <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                            <ShieldAlert className="w-10 h-10" />
                                        </div>
                                        <span className="text-xs font-black uppercase text-white tracking-widest">Risk</span>
                                    </motion.div>

                                    <motion.div className="flex flex-col items-center gap-4 -mt-20">
                                        <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                            <TrendingUp className="w-10 h-10" />
                                        </div>
                                        <span className="text-xs font-black uppercase text-white tracking-widest">Return</span>
                                    </motion.div>
                                </motion.div>

                                <div className="space-y-4 text-center z-10">
                                    <p className="text-xl text-white font-bold leading-relaxed">More risk can bring higher rewards — or bigger losses.</p>
                                    <p className="text-neutral-400 text-sm font-medium">Smart investing means finding your perfect balance.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 2: Trade-Off Graph */}
                    {activeSection === 2 && (
                        <motion.div key="s2" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="space-y-8" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">THE BASIC TRADE-OFF</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight", serifFont)}>Risk vs Return</h2>
                                <p className="text-neutral-200 text-lg font-medium italic">"The higher the return potential, the rougher the ride."</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-4">
                                <RiskReturnGraph />

                                <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-center shadow-xl">
                                    <div className="space-y-4">
                                        {[
                                            { asset: "🏦 Bank FD", risk: "Very Low", return: "~6%", color: "text-blue-400" },
                                            { asset: "🏛️ Govt Bonds", risk: "Low", return: "~7%", color: "text-emerald-400" },
                                            { asset: "💼 Large Stocks", risk: "Medium", return: "10-12%", color: "text-amber-400" },
                                            { asset: "🚀 Small Stocks", risk: "High", return: "15%+", color: "text-red-400" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl hover:border-white/20 transition-all">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white">{item.asset}</span>
                                                    <span className="text-[9px] uppercase font-black text-neutral-500 tracking-widest">Risk: {item.risk}</span>
                                                </div>
                                                <span className={cn("font-mono text-lg font-bold", item.color)}>{item.return}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Section 3: What is Risk? */}
                    {activeSection === 3 && (
                        <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-red-500/10 text-red-400 border-red-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">THE "WHAT IF" FACTOR</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>What Is Risk?</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                                    Risk is simply not knowing what’ll happen next. The trick is to understand how much you can handle.
                                </p>
                            </div>

                            <RiskTypesExplorer />
                        </motion.div>
                    )}

                    {/* Section 4: What is Return? */}
                    {activeSection === 4 && (
                        <motion.div key="s4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">THE REWARD SIDE</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>What Is Return?</h2>
                                <p className="text-neutral-200 text-lg leading-relaxed font-medium">Profit or income from your investment. Always check your real return.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-4">
                                <ReturnAnimation />
                                <RealReturnCalculator />
                            </div>
                        </motion.div>
                    )}

                    {/* Section 5: Why Time Reduces Risk */}
                    {activeSection === 5 && (
                        <motion.div key="s5" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">THE TIME FACTOR</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>Why Time Reduces Risk</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                                    The longer you stay invested, the smoother the journey. Time doesn’t remove risk — it softens it.
                                </p>
                            </div>

                            <TimeHorizonVisual />
                        </motion.div>
                    )}

                    {/* Section 6: Balancing Portfolio */}
                    {activeSection === 6 && (
                        <motion.div key="s6" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-10" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-1 text-[10px] font-black tracking-widest uppercase">STRATEGY</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight", serifFont)}>Balancing Your Portfolio</h2>
                                <p className="text-neutral-200 text-lg font-medium leading-relaxed">Mix safe and risky assets to match your goals. Don’t go “all in” on anything.</p>
                            </div>

                            <PortfolioBalancer />
                        </motion.div>
                    )}

                    {/* Section 7: Final Summary */}
                    {activeSection === 7 && (
                        <motion.div key="s7" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-12 py-8" >
                            <div className="text-center space-y-4">
                                <Badge className="bg-white text-black font-black px-6 py-2 rounded-full tracking-widest text-[9px]">QUIZ READY</Badge>
                                <h2 className={cn("text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight", serifFont)}>The Smart Investor’s Formula</h2>
                                <p className="text-neutral-200 max-w-2xl mx-auto text-xl font-medium leading-relaxed italic">"You can’t remove risk — but you can manage it."</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                                {[
                                    { icon: Scale, label: "Balance", desc: "Risk & Return are always connected.", color: "text-blue-400" },
                                    { icon: Clock, label: "Time", desc: "Smooths out market volatility.", color: "text-emerald-400" },
                                    { icon: PieIcon, label: "Diversify", desc: "Spread across different assets.", color: "text-purple-400" },
                                    { icon: Brain, label: "Behavior", desc: "Stay calm and consistent.", color: "text-red-400" }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-white/[0.03] border border-white/10 rounded-[2rem] flex items-start gap-6 hover:bg-white/[0.05] transition-all group shadow-xl">
                                        <div className={cn("p-4 rounded-2xl bg-black border border-white/10 transition-colors group-hover:border-white", item.color)}>
                                            <Brain className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-xl font-bold text-white uppercase tracking-tight">{item.label}</h4>
                                            <p className="text-neutral-400 text-sm font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                <Button onClick={() => window.location.href = '/learn'} className="bg-white text-black hover:bg-neutral-200 font-black tracking-widest uppercase px-12 py-8 rounded-[2rem] text-xl shadow-2xl transition-all hover:scale-105 group">
                                    Take Module Quiz <ChevronRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
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

function RiskReturnGraph() {
    const [point, setPoint] = useState(30);
    const returnVal = 10 + (point / 2);
    const uncertainty = point / 2.5;

    return (
        <div className="p-8 bg-black border border-white/10 rounded-[2.5rem] shadow-xl space-y-8 flex flex-col items-center">
            <div className="relative w-full h-64 border-l border-b border-white/20 flex flex-col justify-end p-4">
                <div className="absolute top-0 right-0 text-[10px] font-black uppercase tracking-widest text-neutral-500">The Efficiency Frontier</div>

                {/* Uncertainty Cloud */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute bg-white/10 rounded-full blur-2xl pointer-events-none"
                    style={{
                        width: `${uncertainty * 10}px`,
                        height: `${uncertainty * 5}px`,
                        left: `${point}%`,
                        top: `${100 - returnVal - uncertainty}%`
                    }}
                />

                <motion.div
                    className="absolute w-6 h-6 bg-white rounded-full shadow-[0_0_20px_white] cursor-pointer"
                    style={{ left: `${point}%`, top: `${100 - returnVal}%`, transform: 'translate(-50%, -50%)' }}
                />

                <svg className="w-full h-full absolute inset-0 text-white/10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M 0 100 Q 50 80, 100 0" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                </svg>

                <div className="absolute left-[-40px] top-1/2 -rotate-90 text-[10px] font-black uppercase tracking-widest text-neutral-500">Return</div>
                <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-neutral-500">Risk</div>
            </div>

            <div className="w-full space-y-4">
                <Slider value={[point]} onValueChange={([v]) => setPoint(v)} max={90} step={1} />
                <div className="flex justify-between items-center bg-white/[0.05] p-4 rounded-2xl">
                    <div className="flex flex-col"><span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase">Expected Return</span><span className="text-xl font-bold text-white">{returnVal.toFixed(1)}%</span></div>
                    <div className="flex flex-col items-end"><span className="text-[10px] font-black text-red-400 tracking-widest uppercase">Volatility</span><span className="text-xl font-bold text-white">{uncertainty.toFixed(1)}x</span></div>
                </div>
            </div>
        </div>
    );
}

function RiskTypesExplorer() {
    const [selected, setSelected] = useState<number | null>(null);
    const risks = [
        { icon: TrendingDown, label: "Market Risk", example: "Whole market drops suddenly due to news.", color: "text-blue-400" },
        { icon: Building2, label: "Company Risk", example: "A specific business fails or profit drops.", color: "text-purple-400" },
        { icon: RefreshCw, label: "Liquidity Risk", example: "You can't sell your asset when you need cash.", color: "text-amber-400" },
        { icon: Activity, label: "Inflation Risk", example: "Prices rise faster than your investment returns.", color: "text-red-400" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {risks.map((r, i) => (
                <div key={i} onClick={() => setSelected(i)} className={cn("p-10 bg-black border-2 rounded-[3rem] text-center space-y-6 transition-all cursor-pointer shadow-xl", selected === i ? "border-white scale-105" : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/30")}>
                    <div className={cn("p-6 rounded-3xl mx-auto w-min bg-white/5 transition-colors", selected === i && "bg-white text-black")}>
                        <r.icon className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-black uppercase text-white tracking-widest block">{r.label}</span>
                </div>
            ))}
            <AnimatePresence>
                {selected !== null && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 lg:col-span-4 p-8 bg-white text-black rounded-[2.5rem] shadow-2xl relative border-4 border-black">
                        <button onClick={(e) => { e.stopPropagation(); setSelected(null); }} className="absolute top-6 right-6 font-black text-xs uppercase tracking-widest">Close</button>
                        <h4 className="text-2xl font-black uppercase tracking-tight mb-4">{risks[selected].label}</h4>
                        <p className="text-lg font-bold italic">"{risks[selected].example}"</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ReturnAnimation() {
    const [step, setStep] = useState(0);
    const returns = [100, 112, 125, 128]; // Capital growth + Dividends

    return (
        <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[3rem] shadow-xl flex flex-col items-center justify-center space-y-12">
            <div className="flex items-end gap-1 h-32">
                {[0, 1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: step >= i ? `${(returns[i] / 1.3)}px` : '4px' }}
                        className={cn("w-12 bg-emerald-500/80 rounded-t-xl transition-all", i === 3 && "bg-blue-400 shadow-[0_0_20px_#60a5fa]")}
                    >
                        {i === 3 && step === 3 && <motion.div animate={{ y: [-10, -30, -10], opacity: [0, 1, 0] }} className="text-center text-xs font-black">💵 DIVIDEND</motion.div>}
                    </motion.div>
                ))}
            </div>
            <div className="text-center space-y-4">
                <div className="text-4xl font-black text-white">₹{returns[step]}</div>
                <Button onClick={() => setStep((s) => (s + 1) % 4)} variant="outline" className="border-white/20 text-neutral-400 rounded-full px-8 uppercase font-black text-[9px] tracking-widest">Next Phase</Button>
            </div>
        </div>
    );
}

function RealReturnCalculator() {
    const [nominal, setNominal] = useState(12);
    const [inflation, setInflation] = useState(6);
    const real = nominal - inflation;

    return (
        <div className="p-10 bg-black border border-white/10 rounded-[3rem] shadow-xl space-y-8">
            <div className="space-y-6">
                <div className="space-y-2"><div className="flex justify-between text-[10px] font-black uppercase text-neutral-500 tracking-widest"><span>Nominal Return</span><span className="text-white">{nominal}%</span></div><Slider value={[nominal]} onValueChange={([v]) => setNominal(v)} max={25} /></div>
                <div className="space-y-2"><div className="flex justify-between text-[10px] font-black uppercase text-neutral-500 tracking-widest"><span>Inflation Rate</span><span className="text-red-400">{inflation}%</span></div><Slider value={[inflation]} onValueChange={([v]) => setInflation(v)} max={15} /></div>
            </div>
            <div className="p-8 bg-white/5 rounded-3xl text-center border-t-2 border-emerald-500/40">
                <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest block mb-2">Real Return (Your True Wealth Growth)</span>
                <div className={cn("text-5xl font-black", real > 0 ? "text-emerald-400" : "text-red-400")}>{real.toFixed(1)}%</div>
            </div>
        </div>
    );
}

function TimeHorizonVisual() {
    const [years, setYears] = useState(1);
    const amplitude = 50 / years;

    return (
        <div className="p-12 bg-black border border-white/10 rounded-[3rem] shadow-xl space-y-12">
            <div className="h-48 relative border-b border-white/10 flex items-center overflow-hidden">
                <svg className="w-full h-full text-white/40" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ d: `M 0 50 Q 10 ${50 - amplitude}, 20 50 T 40 50 T 60 50 T 80 50 T 100 50` }}
                        fill="none" stroke="currentColor" strokeWidth="2"
                    />
                </svg>
                {years < 5 ? <CloudRain className="absolute top-0 right-10 text-neutral-600 w-12 h-12" /> : <Sun className="absolute top-0 right-10 text-emerald-500 w-12 h-12 shadow-[0_0_50px_rgba(16,185,129,0.3)]" />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white"><span>Time Window</span><span>{years} Years</span></div>
                    <Slider value={[years]} onValueChange={([v]) => setYears(v)} min={1} max={15} step={1} />
                </div>
                <div className="bg-white/5 p-6 rounded-[2rem] space-y-2 border border-white/10">
                    <h5 className="text-xl font-bold text-white uppercase tracking-tight">{years < 5 ? "🎢 Unpredictable" : years < 10 ? "🌤️ Calmer" : "🌞 Stable Growth"}</h5>
                    <p className="text-neutral-400 text-sm">Risk "waves" flatten as the horizon expands.</p>
                </div>
            </div>
        </div>
    );
}

function PortfolioBalancer() {
    const [equity, setEquity] = useState(60);
    const debt = 100 - equity;

    // Logic for Expected Return and Risk Meter
    const expectedReturn = (equity * 0.12 + debt * 0.07).toFixed(1);
    const riskLevel = equity > 70 ? "High" : equity > 40 ? "Moderate" : "Low";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="p-10 bg-black border border-white/10 rounded-[3rem] shadow-xl space-y-10">
                <div className="relative w-48 h-48 mx-auto">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="15" />
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="15" strokeDasharray={`${equity * 2.51} 251`} />
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="15" strokeDasharray={`${debt * 2.51} 251`} strokeDashoffset={-equity * 2.51} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
                        <span className="text-2xl font-black text-white">{equity}/{debt}</span>
                        <span className="text-[8px] font-black uppercase text-neutral-500 tracking-widest">Equity/Debt</span>
                    </div>
                </div>
                <div className="space-y-6">
                    <Slider value={[equity]} onValueChange={([v]) => setEquity(v)} min={0} max={100} />
                    <div className="flex justify-between font-black uppercase tracking-[0.2em] text-[9px] text-white"><span>Conservative</span><span>Aggressive</span></div>
                </div>
            </div>

            <div className="bg-white text-black p-10 rounded-[3rem] space-y-10 flex flex-col justify-center border-8 border-black shadow-2xl">
                <div className="space-y-2">
                    <h3 className="text-4xl font-black uppercase tracking-tighter">{equity > 70 ? "Aggressive" : equity > 40 ? "Balanced" : "Conservative"}</h3>
                    <p className="text-sm font-bold opacity-60">Ideal for {equity > 70 ? "long-term wealth creation" : equity > 40 ? "steady growth & stability" : "capital protection"}.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-black text-white rounded-[2rem] space-y-1">
                        <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">Est. Return</span>
                        <div className="text-2xl font-black">{expectedReturn}%</div>
                    </div>
                    <div className="p-6 bg-black text-white rounded-[2rem] space-y-1">
                        <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">Risk Meter</span>
                        <div className={cn("text-2xl font-black", riskLevel === "High" ? "text-red-500" : riskLevel === "Moderate" ? "text-amber-500" : "text-emerald-400")}>{riskLevel}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
