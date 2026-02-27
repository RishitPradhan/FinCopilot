'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    Tooltip as RechartsTooltip,
} from 'recharts';
import { cn } from '@/lib/utils';

const flowSteps = [
    { label: 'Company', desc: 'A business that needs capital to operate and grow.' },
    { label: 'Needs Funds', desc: 'Money for salaries, products, R&D, and expansion.' },
    { label: 'Invites Investors', desc: 'You! People who put money in for a share of success.' },
    { label: 'Gets Capital', desc: 'The company receives the funds it needs.' },
    { label: 'Grows', desc: 'Business expands, revenue increases.' },
    { label: 'Shares Profit', desc: 'Investors earn through dividends or stock price rise.' },
];

const pizzaData = [
    { name: 'Slice 1', value: 25, color: '#ffffff' },
    { name: 'Slice 2', value: 25, color: '#e5e5e5' },
    { name: 'Slice 3', value: 25, color: '#d4d4d4' },
    { name: 'Slice 4', value: 25, color: '#a3a3a3' },
];

const stockGrowthData = [
    { month: 'Y1', price: 100 },
    { month: 'Y2', price: 112 },
    { month: 'Y3', price: 125 },
    { month: 'Y4', price: 138 },
    { month: 'Y5', price: 155 },
];

const exampleBarData = [
    { label: 'Buy', value: 500 },
    { label: 'Sell', value: 600 },
];

const glossaryTerms = [
    { icon: '📊', term: 'Sensex', meaning: 'Top 30 companies on the BSE (Bombay Stock Exchange).' },
    { icon: '💼', term: 'Demat Account', meaning: 'Your digital locker for holding shares.' },
    { icon: '🚀', term: 'IPO', meaning: 'When a company sells shares to the public for the first time.' },
    { icon: '🧾', term: 'Dividend', meaning: 'Company profit shared with you as a shareholder.' },
    { icon: '🛡️', term: 'SEBI', meaning: 'The watchdog — makes sure everything is fair and safe.' },
    { icon: '📈', term: 'Nifty 50', meaning: 'Top 50 companies on the NSE (National Stock Exchange).' },
];

export function BasicsOfStocksContent() {
    const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
    const [marketMode, setMarketMode] = useState<number>(50);
    const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
    const [showProfit, setShowProfit] = useState(false);
    const [buyPrice, setBuyPrice] = useState('500');
    const [sellPrice, setSellPrice] = useState('600');

    const isBull = marketMode >= 50;
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const gain = sell - buy;
    const gainPercent = buy > 0 ? ((gain / buy) * 100).toFixed(1) : '0';

    const flipCard = (id: number) => {
        setFlippedCards((p) => ({ ...p, [id]: !p[id] }));
    };

    return (
        <TooltipProvider>
            <div className="space-y-16 text-white">
                {/* Section 1: Why Companies Need Investors - Flow Diagram */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Why Companies Need Investors</h2>
                    <p className="text-white/90 mb-6">
                        Every company needs money to run — for salaries, products, and growth. Sometimes, profits aren&apos;t enough. They invite investors in return for a share of success.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 py-6">
                        {flowSteps.map((step, i) => (
                            <React.Fragment key={step.label}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <motion.div
                                            className={cn(
                                                "relative px-4 py-3 rounded-xl border-2 border-white/30 bg-secondary/50 cursor-pointer min-w-[100px] text-center",
                                                step.label === 'Company' && "overflow-hidden"
                                            )}
                                            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.8)' }}
                                            transition={{ type: 'spring', stiffness: 400 }}
                                        >
                                            {step.label === 'Company' && (
                                                <motion.div
                                                    className="absolute inset-0 flex flex-wrap items-center justify-center gap-0.5 p-1"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.5, duration: 1 }}
                                                >
                                                    {['🪙', '🪙', '🪙', '🪙', '🪙', '🪙'].map((c, j) => (
                                                        <motion.span
                                                            key={j}
                                                            initial={{ y: -10, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 0.9 }}
                                                            transition={{ delay: 1 + j * 0.08, duration: 0.25 }}
                                                            className="text-sm"
                                                        >
                                                            {c}
                                                        </motion.span>
                                                    ))}
                                                </motion.div>
                                            )}
                                            <span className="relative z-10 font-semibold text-sm">{step.label}</span>
                                        </motion.div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="bg-black border border-white/20 text-white max-w-[220px]">
                                        {step.desc}
                                    </TooltipContent>
                                </Tooltip>
                                {i < flowSteps.length - 1 && (
                                    <span className="text-white/50 text-lg hidden md:inline">→</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </section>

                {/* Section 2: What Are Stocks - Pizza Chart */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">📈 What Are Stocks?</h2>
                    <p className="text-white/90 mb-6">
                        Think of a stock as a tiny piece of a company. When you buy a stock, you become a part-owner. If the company grows, your piece becomes more valuable.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="h-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pizzaData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={100}
                                        paddingAngle={2}
                                        dataKey="value"
                                        onMouseEnter={(_, index) => setHoveredSlice(index)}
                                        onMouseLeave={() => setHoveredSlice(null)}
                                    >
                                        {pizzaData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={entry.color}
                                                stroke={hoveredSlice === index ? '#fff' : 'transparent'}
                                                strokeWidth={3}
                                                className="cursor-pointer transition-all"
                                            />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        content={({ active, payload }) =>
                                            active && payload?.length ? (
                                                <div className="bg-black/90 border border-white/20 rounded-lg px-4 py-2 text-white text-sm">
                                                    You own this part! Owning stock = owning part of the company.
                                                </div>
                                            ) : null
                                        }
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-2">
                            <p className="text-white/90">✅ In short:</p>
                            <p className="text-lg font-semibold">You invest → company grows → your money grows too.</p>
                        </div>
                    </div>
                </section>

                {/* Section 3: How the Stock Market Works */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">⚙️ How the Stock Market Works</h2>
                    <div className="space-y-6">
                        <div className="flex flex-wrap justify-center gap-2 py-4">
                            {['Company Lists (IPO)', 'Investors Buy', 'Company Expands', 'Share Value ↑', 'Investors Earn'].map((s, i) => (
                                <span key={s} className="px-3 py-1.5 rounded-lg bg-white/10 text-sm font-medium">
                                    {s} {i < 4 && <span className="text-white/50 ml-1">→</span>}
                                </span>
                            ))}
                        </div>
                        <div className="h-[240px] rounded-xl border border-white/20 bg-black/30 p-4">
                            <p className="text-sm text-white/80 mb-2">As companies grow, so does your share&apos;s value.</p>
                            <ResponsiveContainer width="100%" height="85%">
                                <LineChart data={stockGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="month" stroke="#fff" tick={{ fill: '#fff', fontSize: 12 }} />
                                    <YAxis stroke="#fff" tick={{ fill: '#fff', fontSize: 12 }} domain={[90, 180]} />
                                    <Line
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#fff"
                                        strokeWidth={2}
                                        dot={{ fill: '#fff', r: 4 }}
                                        isAnimationActive
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-white/80 text-sm">
                            📊 Historically, stock markets have given about 10% returns per year over time — better than most savings accounts!
                        </p>
                    </div>
                </section>

                {/* Section 4: Bull vs Bear Market */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Bull vs Bear Market</h2>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-white/80">Bear</span>
                            <Slider
                                value={[marketMode]}
                                onValueChange={([v]) => setMarketMode(v)}
                                max={100}
                                step={1}
                                className="flex-1 max-w-md"
                            />
                            <span className="text-sm text-white/80">Bull</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                className={cn(
                                    "rounded-xl border-2 p-6 text-center transition-all",
                                    !isBull ? "border-white/50 bg-white/10 scale-105" : "border-white/20 bg-black/20 scale-95 opacity-70"
                                )}
                                animate={{ y: !isBull ? -4 : 0 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <span className="text-4xl mb-2 block">🐻</span>
                                <span className="text-2xl">📉</span>
                                <p className="font-bold mt-2">Bear Market</p>
                                <p className="text-sm text-white/80">Prices falling — investors cautious</p>
                            </motion.div>
                            <motion.div
                                className={cn(
                                    "rounded-xl border-2 p-6 text-center transition-all",
                                    isBull ? "border-white/50 bg-white/10 scale-105" : "border-white/20 bg-black/20 scale-95 opacity-70"
                                )}
                                animate={{ y: isBull ? -4 : 0 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <span className="text-4xl mb-2 block">🐂</span>
                                <span className="text-2xl">📈</span>
                                <p className="font-bold mt-2">Bull Market</p>
                                <p className="text-sm text-white/80">Prices going up — investors excited!</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Interactive Glossary */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">🧠 Important Terms (Interactive Glossary)</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {glossaryTerms.map((item, i) => (
                            <motion.div
                                key={item.term}
                                className="cursor-pointer min-h-[120px]"
                                onClick={() => flipCard(i)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    className="rounded-xl border border-white/30 bg-secondary/50 p-4 h-full flex flex-col items-center justify-center min-h-[120px]"
                                    layout
                                >
                                    <AnimatePresence mode="wait">
                                        {!flippedCards[i] ? (
                                            <motion.div
                                                key="front"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex flex-col items-center justify-center"
                                            >
                                                <span className="text-2xl mb-1">{item.icon}</span>
                                                <span className="font-bold text-sm">{item.term}</span>
                                                <span className="text-xs text-white/70 mt-1">Click to flip</span>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="back"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex flex-col items-center justify-center text-center"
                                            >
                                                <span className="text-sm text-white/90">{item.meaning}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Section 6: Types of Markets */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">🏦 Types of Stock Markets</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-secondary/30 border-white/20 overflow-hidden">
                            <CardContent className="pt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold">1</div>
                                        <div>
                                            <h3 className="font-bold text-white">Primary Market</h3>
                                            <p className="text-sm text-white/80">Company selling new shares to the public (IPO)</p>
                                        </div>
                                    </div>
                                    <motion.div
                                        className="mt-4 flex justify-between text-sm"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <span className="text-white/80">Investors</span>
                                        <span className="text-lg">→</span>
                                        <span className="text-white">Company</span>
                                    </motion.div>
                                </CardContent>
                        </Card>
                        <Card className="bg-secondary/30 border-white/20 overflow-hidden">
                            <CardContent className="pt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold">2</div>
                                        <div>
                                            <h3 className="font-bold text-white">Secondary Market</h3>
                                            <p className="text-sm text-white/80">Investors trading shares with each other</p>
                                        </div>
                                    </div>
                                    <motion.div
                                        className="mt-4 flex justify-center gap-4 text-sm"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <span className="text-white/80">Investor</span>
                                        <span className="text-lg">↔</span>
                                        <span className="text-white/80">Investor</span>
                                    </motion.div>
                                </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Section 7: Simple Example + Mini Simulator */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">📊 Simple Example</h2>
                    <div className="space-y-6">
                        <div className="h-[200px] rounded-xl border border-white/20 bg-black/30 p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={exampleBarData} layout="vertical" margin={{ left: 40 }}>
                                    <CartesianGrid stroke="rgba(255,255,255,0.1)" horizontal={false} />
                                    <XAxis type="number" stroke="#fff" domain={[0, 700]} tick={{ fill: '#fff' }} />
                                    <YAxis type="category" dataKey="label" stroke="#fff" tick={{ fill: '#fff' }} width={50} />
                                    <Bar dataKey="value" fill="#fff" radius={[0, 4, 4, 0]} isAnimationActive />
                                </BarChart>
                            </ResponsiveContainer>
                            <motion.p
                                className="text-center mt-2 font-bold text-green-400"
                                initial={{ opacity: 0, y: 10 }}
                                animate={showProfit ? { opacity: 1, y: 0 } : { opacity: 0 }}
                            >
                                +₹100 profit per share 💸
                            </motion.p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4 rounded-xl border border-white/20 bg-secondary/30 p-6">
                                <h3 className="font-bold">Mini Simulator</h3>
                                <div className="space-y-2">
                                    <Label className="text-white/90">Buy price (₹)</Label>
                                    <Input
                                        type="number"
                                        value={buyPrice}
                                        onChange={(e) => setBuyPrice(e.target.value)}
                                        className="bg-black/50 border-white/20 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/90">Sell price (₹)</Label>
                                    <Input
                                        type="number"
                                        value={sellPrice}
                                        onChange={(e) => setSellPrice(e.target.value)}
                                        className="bg-black/50 border-white/20 text-white"
                                    />
                                </div>
                                <Button
                                    onClick={() => setShowProfit(true)}
                                    className="bg-white text-black hover:bg-gray-200 w-full"
                                >
                                    Calculate
                                </Button>
                                <AnimatePresence>
                                    {showProfit && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="rounded-lg bg-white/10 p-4 text-center"
                                        >
                                            <p className="text-white font-bold">
                                                {gain >= 0 ? '+' : ''}₹{gain.toFixed(0)} ({gainPercent}%)
                                            </p>
                                            {gain >= 0 && <p className="text-green-400 text-sm">🎉 Profit!</p>}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="rounded-xl border border-white/20 bg-secondary/30 p-6 flex flex-col justify-center">
                                <p className="text-white/90">
                                    If you buy a share of Tata Motors for ₹500 and later it rises to ₹600 — you earn ₹100 profit per share.
                                    If the company gives a ₹10 dividend, that&apos;s a bonus!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 8: Closing - Tree Visual */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">🌟 Final Thought</h2>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <motion.div
                                className="flex flex-col items-center py-8 rounded-xl border border-white/20 bg-gradient-to-b from-black/40 to-secondary/20 cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                            >
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                    className="text-6xl mb-4"
                                >
                                    🌳
                                </motion.div>
                                <div className="flex gap-2 mb-2">
                                    {['🪙', '🪙', '🪙'].map((c, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                        >
                                            {c}
                                        </motion.span>
                                    ))}
                                </div>
                                <p className="text-white/90 text-center max-w-md">
                                    The stock market isn&apos;t a get-rich-quick game — it&apos;s a smart way to grow your wealth over time. Start small, learn daily, and let your money work for you!
                                </p>
                            </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-black border border-white/20 text-white">
                            Start small, learn, and grow your wealth steadily.
                        </TooltipContent>
                    </Tooltip>
                </section>
            </div>
        </TooltipProvider>
    );
}
