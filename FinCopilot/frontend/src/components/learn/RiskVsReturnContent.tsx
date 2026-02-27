'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    BarChart,
    Bar,
    CartesianGrid,
} from 'recharts';
import { cn } from '@/lib/utils';

const investmentTypes = [
    { icon: '🏦', name: 'Bank FD', risk: 'Very Low', return: '~6%' },
    { icon: '🏛️', name: 'Govt Bonds', risk: 'Low', return: '~7%' },
    { icon: '💼', name: 'Large Stocks', risk: 'Medium', return: '~10–12%' },
    { icon: '🚀', name: 'Small Stocks', risk: 'High', return: '15%+' },
];

const riskTypes = [
    { icon: '📉', type: 'Market Risk', example: 'Whole market drops suddenly' },
    { icon: '💼', type: 'Company Risk', example: 'One business fails' },
    { icon: '💧', type: 'Liquidity Risk', example: "Can't sell when needed" },
    { icon: '🔥', type: 'Inflation Risk', example: 'Prices rise faster than your returns' },
];

const timeHorizonData = [
    { years: 1, label: '1 year', volatility: 85, mood: '🎢', moodText: 'Unpredictable', lossChance: 'High' },
    { years: 5, label: '5 years', volatility: 55, mood: '🌤️', moodText: 'Calmer', lossChance: 'Moderate' },
    { years: 10, label: '10 years', volatility: 30, mood: '🌞', moodText: 'Stable growth', lossChance: 'Low' },
    { years: 15, label: '15 years', volatility: 15, mood: '🌞', moodText: 'Stable growth', lossChance: 'Low' },
];

const portfolioTypes = [
    { name: 'Conservative', equity: 30, debt: 70, return: '8–9%', risk: 'Low' },
    { name: 'Balanced', equity: 60, debt: 40, return: '10–11%', risk: 'Moderate' },
    { name: 'Aggressive', equity: 80, debt: 20, return: '12–13%', risk: 'High' },
];

const summaryNodes = [
    { icon: '⚖️', text: 'Risk & Return: Always connected.' },
    { icon: '⏰', text: 'Time: Smooths volatility.' },
    { icon: '🧩', text: 'Diversify: Spread across assets.' },
    { icon: '💵', text: 'Real Return: Watch inflation.' },
    { icon: '🧠', text: 'Behavior: Stay consistent.' },
];

const assetBlocks = [
    { id: 'stocks', label: 'Stocks', color: '#ffffff', weight: 0.6 },
    { id: 'bonds', label: 'Bonds', color: '#a3a3a3', weight: 0.3 },
    { id: 'gold', label: 'Gold', color: '#facc15', weight: 0.1 },
];

function getChartDataForYears(years: number) {
    const points = Math.min(years * 6, 40);
    const data = [];
    let value = 100;
    const volatility = years === 1 ? 0.12 : years <= 5 ? 0.06 : 0.03;
    for (let i = 0; i <= points; i++) {
        const wave = Math.sin(i * 0.5) * volatility + (i / points) * 0.02;
        value = value * (1 + wave);
        data.push({ x: i, value: Math.max(85, Math.min(145, value)) });
    }
    return data;
}

export function RiskVsReturnContent() {
    const [riskLevel, setRiskLevel] = useState(50);
    const [selectedRisk, setSelectedRisk] = useState<number | null>(null);
    const [nominalReturn, setNominalReturn] = useState('10');
    const [inflationRate, setInflationRate] = useState('6');
    const [timeYears, setTimeYears] = useState(5);
    const [equityPercent, setEquityPercent] = useState(60);

    // Mini-game state
    const [portfolioAllocation, setPortfolioAllocation] = useState({ stocks: 0, bonds: 0, gold: 0 });
    const [gameMessage, setGameMessage] = useState<string | null>(null);

    const realReturn = ((parseFloat(nominalReturn) || 0) - (parseFloat(inflationRate) || 0)).toFixed(1);
    const returnValue = 40 + (riskLevel / 100) * 60;
    const uncertaintySize = 10 + (riskLevel / 100) * 40;

    const equityData = [{ equity: equityPercent, debt: 100 - equityPercent }];
    const pieData = [
        { name: 'Equity', value: equityPercent, color: '#ffffff' },
        { name: 'Debt', value: 100 - equityPercent, color: '#737373' },
    ];

    const expectedReturnFromEquity = 5 + (equityPercent / 100) * 10;
    const riskMeter = equityPercent;

    const timeChartData = getChartDataForYears(timeYears);
    const currentTimeData = timeHorizonData.find((t) => t.years === timeYears) ||
        (timeYears <= 3 ? timeHorizonData[0] : timeYears <= 7 ? timeHorizonData[1] : timeHorizonData[2]);

    // Portfolio builder game logic
    const totalAllocation = portfolioAllocation.stocks + portfolioAllocation.bonds + portfolioAllocation.gold;
    const gameExpectedReturn =
        totalAllocation > 0
            ? (
                  (portfolioAllocation.stocks / totalAllocation) * 12 +
                  (portfolioAllocation.bonds / totalAllocation) * 6 +
                  (portfolioAllocation.gold / totalAllocation) * 8
              ).toFixed(1)
            : '0';
    const gameRisk =
        totalAllocation > 0
            ? Math.round(
                  (portfolioAllocation.stocks / totalAllocation) * 80 +
                      (portfolioAllocation.bonds / totalAllocation) * 20 +
                      (portfolioAllocation.gold / totalAllocation) * 40
              )
            : 0;

    const addToPortfolio = (asset: 'stocks' | 'bonds' | 'gold') => {
        const total = portfolioAllocation.stocks + portfolioAllocation.bonds + portfolioAllocation.gold;
        if (total >= 100) return;
        setPortfolioAllocation((p) => ({ ...p, [asset]: Math.min(100, p[asset] + 10) }));
        setGameMessage(null);
    };

    const resetPortfolio = () => {
        setPortfolioAllocation({ stocks: 0, bonds: 0, gold: 0 });
        setGameMessage(null);
    };

    const evaluatePortfolio = () => {
        const eq = portfolioAllocation.stocks;
        const db = portfolioAllocation.bonds;
        const gd = portfolioAllocation.gold;
        if (eq + db + gd !== 100) {
            setGameMessage('Allocate exactly 100% to see your result!');
            return;
        }
        if (eq >= 70 && db <= 30) {
            setGameMessage('🎉 You built an Aggressive Portfolio — high growth potential, higher risk!');
        } else if (eq >= 40 && eq <= 70 && db >= 30) {
            setGameMessage('🎉 You built a Balanced Portfolio — steady growth, moderate risk!');
        } else {
            setGameMessage('🎉 You built a Conservative Portfolio — stable returns, lower risk!');
        }
    };

    return (
        <TooltipProvider>
            <div className="space-y-16 text-white">
                {/* Intro - See-saw */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">🎬 Intro</h2>
                    <div className="flex flex-col items-center py-8">
                        <motion.div
                            className="relative w-full max-w-md h-24 flex items-center justify-center"
                            animate={{ rotate: [-2, 2, -2] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <div className="absolute w-3/4 h-1 bg-white/50 rounded-full" />
                            <motion.div
                                className="absolute flex items-center gap-2 left-[15%]"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="text-2xl">Risk</span>
                            </motion.div>
                            <motion.div
                                className="absolute flex items-center gap-2 right-[15%]"
                                animate={{ y: [8, 0, 8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="text-2xl">Return</span>
                            </motion.div>
                            <span className="text-4xl absolute">⚖️</span>
                        </motion.div>
                        <div className="mt-8 space-y-2 text-center max-w-xl text-white/90">
                            <p>Every investment is a balance.</p>
                            <p>More risk can bring higher rewards — or bigger losses.</p>
                            <p className="font-semibold text-white">Smart investing means finding your perfect balance.</p>
                        </div>
                    </div>
                </section>

                {/* Section 1: Risk vs Return Trade-Off */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">⚖️ 1. Risk vs Return — The Basic Trade-Off</h2>
                    <div className="space-y-6">
                        <div className="rounded-xl border border-white/20 bg-black/30 p-6">
                            <Label className="text-white/90 block mb-4">Slide to see Risk vs Return</Label>
                            <Slider value={[riskLevel]} onValueChange={([v]) => setRiskLevel(v)} max={100} className="mb-6" />
                            <div className="flex gap-8 items-end h-40">
                                <div className="flex-1 flex flex-col items-center">
                                    <span className="text-sm text-white/70 mb-2">Return</span>
                                    <motion.div
                                        className="w-full max-w-[60px] bg-white rounded-t"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${returnValue}%` }}
                                        transition={{ type: 'spring', stiffness: 100 }}
                                    />
                                    <span className="text-sm font-mono mt-2">{Math.round(returnValue)}%</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center">
                                    <span className="text-sm text-white/70 mb-2">Uncertainty</span>
                                    <motion.div
                                        className="w-full max-w-[80px] bg-white/30 rounded-t blur-sm"
                                        animate={{ height: `${uncertaintySize}%` }}
                                        transition={{ type: 'spring', stiffness: 100 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/20">
                                        <th className="text-left py-3 text-white/90">Investment Type</th>
                                        <th className="text-left py-3 text-white/90">Risk</th>
                                        <th className="text-left py-3 text-white/90">Return</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {investmentTypes.map((inv) => (
                                        <tr key={inv.name} className="border-b border-white/10">
                                            <td className="py-3">
                                                <span className="mr-2">{inv.icon}</span>
                                                {inv.name}
                                            </td>
                                            <td className="py-3">{inv.risk}</td>
                                            <td className="py-3">{inv.return}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-white/90 italic">🎯 The higher the return potential, the rougher the ride.</p>
                    </div>
                </section>

                {/* Section 2: What Is Risk? */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">💡 2. What Is Risk? — The &quot;What If&quot; Factor</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex flex-wrap justify-center gap-4">
                            {riskTypes.map((r, i) => (
                                <motion.button
                                    key={r.type}
                                    onClick={() => setSelectedRisk(selectedRisk === i ? null : i)}
                                    className={cn(
                                        "w-20 h-20 rounded-full border-2 flex flex-col items-center justify-center transition-all",
                                        selectedRisk === i ? "border-white bg-white/20" : "border-white/30 bg-secondary/50 hover:border-white/60"
                                    )}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="text-2xl">{r.icon}</span>
                                    <span className="text-[10px] mt-1">{r.type.split(' ')[0]}</span>
                                </motion.button>
                            ))}
                        </div>
                        <div>
                            <AnimatePresence>
                                {selectedRisk !== null ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="rounded-xl border border-white/20 bg-secondary/50 p-6"
                                    >
                                        <h3 className="font-bold text-lg mb-2">{riskTypes[selectedRisk].type}</h3>
                                        <p className="text-white/90">{riskTypes[selectedRisk].example}</p>
                                    </motion.div>
                                ) : (
                                    <p className="text-white/80">Click an icon to learn more.</p>
                                )}
                            </AnimatePresence>
                            <p className="mt-4 text-white/90">
                                Risk is simply not knowing what&apos;ll happen next. Every investment has it — the trick is to understand how
                                much you can handle.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3: What Is Return? */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">💰 3. What Is Return? — The Reward Side</h2>
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-6">
                            <motion.span className="text-2xl font-mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0 }}>
                                ₹100
                            </motion.span>
                            <span className="text-white/50">→</span>
                            <motion.span
                                className="text-2xl font-mono text-green-400"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                ₹120
                            </motion.span>
                            <span className="text-white/50">→</span>
                            <motion.span
                                className="text-2xl font-mono text-green-400"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                            >
                                ₹125
                            </motion.span>
                            <motion.span
                                className="text-xl"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.2, type: 'spring' }}
                            >
                                💵
                            </motion.span>
                        </div>
                        <p className="text-white/80">Your money growing over time = your return.</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="bg-secondary/30 border-white/20">
                                <CardContent className="pt-6 space-y-4">
                                    <h3 className="font-bold">Real Return Calculator</h3>
                                    <div className="space-y-2">
                                        <Label className="text-white/90">Nominal Return (%)</Label>
                                        <Input
                                            type="number"
                                            value={nominalReturn}
                                            onChange={(e) => setNominalReturn(e.target.value)}
                                            className="bg-black/50 border-white/20 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white/90">Inflation Rate (%)</Label>
                                        <Input
                                            type="number"
                                            value={inflationRate}
                                            onChange={(e) => setInflationRate(e.target.value)}
                                            className="bg-black/50 border-white/20 text-white"
                                        />
                                    </div>
                                    <div className="rounded-lg bg-white/10 p-3">
                                        <span className="text-sm text-white/80">Real Return = </span>
                                        <span className="font-bold text-green-400">{realReturn}%</span>
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="space-y-2 text-white/90">
                                <p><strong>Return</strong> = Profit or income from your investment.</p>
                                <p>📈 <strong>Capital Growth:</strong> Price goes up.</p>
                                <p>💵 <strong>Income:</strong> Dividends or interest.</p>
                                <p>Always check your real return (after inflation).</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Why Time Reduces Risk */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">⏳ 4. Why Time Reduces Risk</h2>
                    <div className="space-y-6">
                        <div>
                            <Label className="text-white/90 block mb-4">Time Horizon</Label>
                            <Slider
                                value={[timeYears]}
                                onValueChange={([v]) => setTimeYears(v)}
                                min={1}
                                max={15}
                                step={1}
                                className="mb-2"
                            />
                            <div className="flex justify-between text-sm text-white/70">
                                <span>1 year</span>
                                <span>5 years</span>
                                <span>10 years</span>
                                <span>15 years</span>
                            </div>
                        </div>
                        <div className="h-[200px] rounded-xl border border-white/20 bg-black/30 p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={timeChartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="x" stroke="#fff" tick={{ fill: '#fff', fontSize: 10 }} hide />
                                    <YAxis stroke="#fff" tick={{ fill: '#fff', fontSize: 10 }} domain={[80, 150]} />
                                    <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} isAnimationActive />
                                </LineChart>
                            </ResponsiveContainer>
                            <p className="text-center text-sm mt-2">
                                {currentTimeData.mood} {currentTimeData.moodText}
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/20">
                                        <th className="text-left py-3 text-white/90">Time Horizon</th>
                                        <th className="text-left py-3 text-white/90">Chance of Loss</th>
                                        <th className="text-left py-3 text-white/90">Market Mood</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeHorizonData.map((t) => (
                                        <tr key={t.years} className="border-b border-white/10">
                                            <td className="py-3">{t.label}</td>
                                            <td className="py-3">{t.lossChance}</td>
                                            <td className="py-3">{t.mood} {t.moodText}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-white/90">The longer you stay invested, the smoother the journey. Time doesn&apos;t remove risk — it softens it.</p>
                    </div>
                </section>

                {/* Section 5: Balancing Your Portfolio */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">🧩 5. Balancing Your Portfolio</h2>
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <Label className="text-white/90 block mb-4">Equity % vs Debt %</Label>
                                <Slider
                                    value={[equityPercent]}
                                    onValueChange={([v]) => setEquityPercent(v)}
                                    max={100}
                                    className="mb-4"
                                />
                                <div className="flex justify-between text-sm">
                                    <span>0% Equity</span>
                                    <span className="font-bold">{equityPercent}% Equity / {100 - equityPercent}% Debt</span>
                                    <span>100% Equity</span>
                                </div>
                                <div className="h-[200px] mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={40}
                                                outerRadius={80}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {pieData.map((entry, i) => (
                                                    <Cell key={i} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="rounded-lg bg-white/10 p-3 text-center">
                                        <p className="text-xs text-white/70">Expected Return</p>
                                        <p className="font-bold">{expectedReturnFromEquity.toFixed(1)}%</p>
                                    </div>
                                    <div className="rounded-lg bg-white/10 p-3 text-center">
                                        <p className="text-xs text-white/70">Risk Meter</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-black rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-white rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${riskMeter}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-mono">{riskMeter}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/20">
                                            <th className="text-left py-3 text-white/90">Portfolio Type</th>
                                            <th className="text-left py-3 text-white/90">Equity</th>
                                            <th className="text-left py-3 text-white/90">Debt</th>
                                            <th className="text-left py-3 text-white/90">Return</th>
                                            <th className="text-left py-3 text-white/90">Risk</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {portfolioTypes.map((p) => (
                                            <tr key={p.name} className="border-b border-white/10">
                                                <td className="py-3">{p.name}</td>
                                                <td className="py-3">{p.equity}%</td>
                                                <td className="py-3">{p.debt}%</td>
                                                <td className="py-3">{p.return}</td>
                                                <td className="py-3">{p.risk}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="mt-4 text-white/90">
                                    Mix safe and risky assets to match your goals. Don&apos;t go &quot;all in&quot; on anything — even the best stocks.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 6: Behavior - The Hidden Risk */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">😨 6. Behavior — The Hidden Risk</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <motion.div
                            className="rounded-xl border border-white/20 bg-secondary/50 p-6 text-center"
                            whileHover={{ scale: 1.02 }}
                        >
                            <span className="text-4xl block mb-2">1️⃣</span>
                            <p className="font-bold mb-2">&quot;Market crash!&quot;</p>
                            <p className="text-sm text-white/80">Investor panics and sells</p>
                        </motion.div>
                        <motion.div
                            className="rounded-xl border border-white/20 bg-secondary/50 p-6 text-center"
                            whileHover={{ scale: 1.02 }}
                        >
                            <span className="text-4xl block mb-2">2️⃣</span>
                            <p className="font-bold mb-2">Market recovers</p>
                            <p className="text-sm text-red-400">&quot;Oh no!&quot; moment</p>
                        </motion.div>
                        <motion.div
                            className="rounded-xl border border-green-500/50 bg-green-500/10 p-6 text-center"
                            whileHover={{ scale: 1.02 }}
                        >
                            <span className="text-4xl block mb-2">3️⃣</span>
                            <p className="font-bold mb-2">Calm investor stays</p>
                            <p className="text-sm text-green-400">Happy outcome ✓</p>
                        </motion.div>
                    </div>
                    <p className="mt-4 text-white/90">
                        Your biggest risk isn&apos;t the market — it&apos;s your own reactions. Stay calm. Avoid panic selling or chasing returns.
                    </p>
                </section>

                {/* Section 7: Final Summary */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">🧭 7. Final Summary — The Smart Investor&apos;s Formula</h2>
                    <div className="flex flex-wrap justify-center gap-4 py-6">
                        {summaryNodes.map((node, i) => (
                            <motion.div
                                key={node.text}
                                className="rounded-xl border border-white/30 bg-secondary/50 px-6 py-4 flex items-center gap-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-2xl">{node.icon}</span>
                                <span className="text-sm font-medium">{node.text}</span>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-center text-white/90 max-w-xl mx-auto">
                        You can&apos;t remove risk — but you can manage it. The key is patience, balance, and staying invested for the long game.
                    </p>
                </section>

                {/* Section 8: Build Your Portfolio Mini-Game */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">🧮 Build Your Portfolio</h2>
                    <p className="text-white/80 mb-6">
                        Drag blocks into your portfolio. Aim for 100% total allocation, then click Evaluate!
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex gap-4 flex-wrap">
                                {assetBlocks.map((block) => (
                                    <motion.div
                                        key={block.id}
                                        className="px-6 py-4 rounded-xl border-2 border-dashed border-white/40 cursor-pointer hover:border-white"
                                        style={{ borderColor: block.color }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => addToPortfolio(block.id as 'stocks' | 'bonds' | 'gold')}
                                    >
                                        <span className="font-bold">{block.label}</span>
                                        <p className="text-xs text-white/70">+10% per click</p>
                                    </motion.div>
                                ))}
                            </div>
                            <Button variant="outline" onClick={resetPortfolio} className="border-white/30 text-white">
                                Reset
                            </Button>
                            <Button onClick={evaluatePortfolio} className="bg-white text-black ml-4">
                                Evaluate Portfolio
                            </Button>
                        </div>
                        <Card className="bg-secondary/30 border-white/20">
                            <CardContent className="pt-6 space-y-4">
                                <div>
                                    <p className="text-sm text-white/70">Your Allocation</p>
                                    <p className="font-mono text-lg">
                                        Stocks: {portfolioAllocation.stocks}% | Bonds: {portfolioAllocation.bonds}% | Gold:{' '}
                                        {portfolioAllocation.gold}%
                                    </p>
                                    <p className="text-xs text-white/60">Total: {totalAllocation}%</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-lg bg-white/10 p-3">
                                        <p className="text-xs text-white/70">Expected Return %</p>
                                        <p className="font-bold text-lg">{gameExpectedReturn}%</p>
                                    </div>
                                    <div className="rounded-lg bg-white/10 p-3">
                                        <p className="text-xs text-white/70">Risk Meter</p>
                                        <p className="font-bold text-lg">{gameRisk}</p>
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {gameMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="rounded-lg bg-green-500/20 border border-green-500/50 p-4"
                                        >
                                            <p className="text-green-400 font-medium">{gameMessage}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </TooltipProvider>
    );
}
