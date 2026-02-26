import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Building2, AlertTriangle, ShieldCheck, ArrowRight, Lightbulb, Activity, Trophy, CheckCircle2, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
export interface CompanyData {
    name: string;
    revenue: number; // in billions
    profit: number; // in billions
    debt: number; // in billions
    growth: number; // percentage
    description: string;
}

export interface GameRound {
    id: number;
    title: string;
    companyA: CompanyData;
    companyB: CompanyData;
    correctAnswer: 'A' | 'B';
    hint: string;
    explanation: string;
    learningFocus: string;
}

// Data
const rounds: GameRound[] = [
    {
        id: 1,
        title: "Revenue vs Profit: The Efficiency Test",
        learningFocus: "Higher revenue doesn't always mean better investment. Efficiency matters.",
        companyA: {
            name: "MegaCorp Industries",
            revenue: 220,
            profit: 55,
            debt: 40,
            growth: 6,
            description: "A stable giant with massive scale."
        },
        companyB: {
            name: "FlashSales Retail",
            revenue: 250,
            profit: 10,
            debt: 80,
            growth: 8,
            description: "High revenue, but struggling with costs."
        },
        correctAnswer: 'A',
        hint: "Look at how much profit they actually keep from their massive revenue. Who is more efficient?",
        explanation: "MegaCorp (A) is the better choice. Even though FlashSales has higher revenue ($250B), they only keep $10B in profit (4% margin). MegaCorp keeps $55B (25% margin) and has half the debt."
    },
    {
        id: 2,
        title: "The Debt Trap",
        learningFocus: "High debt increases risk and can wipe out profits during downturns.",
        companyA: {
            name: "SafeHarbor Logistics",
            revenue: 80,
            profit: 15,
            debt: 10,
            growth: 12,
            description: "Consistent performer with a clean balance sheet."
        },
        companyB: {
            name: "LeverageTech",
            revenue: 90,
            profit: 18,
            debt: 140,
            growth: 15,
            description: "Aggressively expanding using borrowed money."
        },
        correctAnswer: 'A',
        hint: "Profit and growth look similar, but look at what they owe. Which company would survive a sudden market freeze?",
        explanation: "SafeHarbor (A) is safer. LeverageTech has a massive debt burden ($140B) compared to its profit ($18B). It would take them nearly 8 years of all their profits just to pay off debt. SafeHarbor is financially stable."
    },
    {
        id: 3,
        title: "Growth vs Stability",
        learningFocus: "Hyper-growth is attractive but comes with significant volatility and debt.",
        companyA: {
            name: "SteadyDividend Bank",
            revenue: 140,
            profit: 40,
            debt: 60,
            growth: 4,
            description: "A traditional bank paying reliable dividends."
        },
        companyB: {
            name: "NextGen EV Motors",
            revenue: 35,
            profit: -2,
            debt: 45,
            growth: 65,
            description: "Revolutionizing transport, burning cash."
        },
        correctAnswer: 'A',
        hint: "Growth is amazing, but a company needs to survive to grow. Which one is actually making money today?",
        explanation: "SteadyDividend (A) is the structurally sound choice here. While NextGen EV has incredible 65% growth, they are currently losing money (Negative Profit) and taking on debt to survive. Growth companies are risky until they prove profitability."
    },
    {
        id: 4,
        title: "The Balanced Performer",
        learningFocus: "The best companies balance strong margins, manageable debt, and reasonable growth.",
        companyA: {
            name: "CloudScale Software",
            revenue: 65,
            profit: 22,
            debt: 5,
            growth: 24,
            description: "High-margin SaaS company dominating its niche."
        },
        companyB: {
            name: "Global Airlines",
            revenue: 70,
            profit: 5,
            debt: 55,
            growth: 18,
            description: "Capital intensive transport business in recovery."
        },
        correctAnswer: 'A',
        hint: "Compare their profit margins (Profit ÷ Revenue) and their debt levels. It's not close.",
        explanation: "CloudScale (A) is a phenomenal business. They have a massive ~34% profit margin, virtually no debt, and faster growth. Airlines (B) are notoriously capital intensive, leading to high debt and razor-thin margins."
    },
    {
        id: 5,
        title: "Market Crash Twist! 🌪️",
        learningFocus: "When easy money stops, over-leveraged companies crash. Cash-rich companies buy their competitors.",
        companyA: {
            name: "Apex Holdings",
            revenue: 110,
            profit: 25,
            debt: 0,
            growth: 3,
            description: "Sitting on a mountain of cash, waiting for opportunities."
        },
        companyB: {
            name: "Venture Real Estate",
            revenue: 120,
            profit: 30,
            debt: 180,
            growth: 5,
            description: "A massive property portfolio built on cheap debt."
        },
        correctAnswer: 'A',
        hint: "Interest rates just doubled. Debt payments are going to eat up all the profits. Who survives?",
        explanation: "Apex (A) survives and thrives. In a crash, Venture Real Estate's massive debt ($180B) becomes deadly as interest rates spike and property values fall. Apex has zero debt and can use its profits to buy distressed assets."
    }
];

export const CompanyDetectiveGame = () => {
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'roundResult' | 'gameOver'>('intro');
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [hintUsed, setHintUsed] = useState(false);
    const [roundTime, setRoundTime] = useState(0);
    const [selectedCompany, setSelectedCompany] = useState<'A' | 'B' | null>(null);
    const [stats, setStats] = useState({ correct: 0, wrong: 0 });

    const currentRound = rounds[currentRoundIndex];

    // Timer effect
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'playing') {
            timer = setInterval(() => {
                setRoundTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState]);

    const handleStart = () => {
        setGameState('playing');
        setRoundTime(0);
        setHintUsed(false);
    };

    const handleChoice = (choice: 'A' | 'B') => {
        setSelectedCompany(choice);
        const isCorrect = choice === currentRound.correctAnswer;

        let roundScore = 0;
        if (isCorrect) {
            roundScore += 100; // Base score
            if (!hintUsed) roundScore += 50; // No hint bonus
            if (roundTime < 10) roundScore += 30; // Quick decision bonus

            // Streak multiplier
            const multiplier = 1 + (streak * 0.2);
            roundScore = Math.floor(roundScore * multiplier);

            setScore(prev => prev + roundScore);
            setStreak(prev => prev + 1);
            setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
        } else {
            setStreak(0);
            setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        }

        setGameState('roundResult');
    };

    const handleNextRound = () => {
        if (currentRoundIndex < rounds.length - 1) {
            setCurrentRoundIndex(prev => prev + 1);
            setGameState('playing');
            setRoundTime(0);
            setHintUsed(false);
            setSelectedCompany(null);
        } else {
            setGameState('gameOver');
        }
    };

    const resetGame = () => {
        setGameState('intro');
        setCurrentRoundIndex(0);
        setScore(0);
        setStreak(0);
        setSelectedCompany(null);
        setStats({ correct: 0, wrong: 0 });
    };

    // UI Helper: Color scale for metrics
    const getMetricColor = (type: 'revenue' | 'profit' | 'debt' | 'growth', value: number, compareValue: number) => {
        if (type === 'debt') {
            return value > compareValue ? 'text-rose-400' : 'text-emerald-400';
        }
        if (type === 'profit') {
            return value < 0 ? 'text-rose-500 font-bold' : value > compareValue ? 'text-emerald-400' : 'text-white';
        }
        return value > compareValue ? 'text-emerald-400' : 'text-white';
    };

    const CompanyCard = ({ data, id, opponent }: { data: CompanyData, id: 'A' | 'B', opponent: CompanyData }) => {
        const margin = data.revenue > 0 ? ((data.profit / data.revenue) * 100).toFixed(1) : 0;
        const isSelected = selectedCompany === id;
        const isCorrectChoice = currentRound.correctAnswer === id;

        // Border colors during result phase
        let cardBorderClasses = "border-white/10 hover:border-white/30";
        if (gameState === 'roundResult') {
            if (isSelected && isCorrectChoice) cardBorderClasses = "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]";
            else if (isSelected && !isCorrectChoice) cardBorderClasses = "border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.2)]";
            else if (!isSelected && isCorrectChoice) cardBorderClasses = "border-emerald-500/50";
            else cardBorderClasses = "border-white/5 opacity-50";
        }

        return (
            <div className={cn(
                "premium-card flex flex-col p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group",
                cardBorderClasses,
                gameState === 'playing' ? "cursor-pointer hover:shadow-2xl hover:shadow-white/5 bg-black/20 hover:bg-black/40" : ""
            )}
                onClick={() => gameState === 'playing' && handleChoice(id)}
            >
                {/* Result stamp */}
                <AnimatePresence>
                    {gameState === 'roundResult' && isSelected && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: -20 }}
                            animate={{ scale: 1, opacity: 1, rotate: -15 }}
                            className={cn(
                                "absolute top-6 right-6 z-10 px-4 py-1 flex items-center gap-2 rounded-full font-black uppercase tracking-widest text-xs border-2 shadow-2xl backdrop-blur-md",
                                isCorrectChoice ? "border-emerald-500 text-emerald-400 bg-emerald-500/10" : "border-rose-500 text-rose-400 bg-rose-500/10"
                            )}
                        >
                            {isCorrectChoice ? <ShieldCheck size={16} /> : <AlertTriangle size={16} />}
                            {isCorrectChoice ? "Strong Choice" : "Risky Bet"}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                        <Building2 size={20} className="text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-white">{data.name}</h3>
                        <span className="text-xs text-gray-500 font-mono">Company {id}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-400 mb-8 italic">"{data.description}"</p>

                <div className="space-y-5 flex-1 w-full bg-black/40 rounded-xl p-4 border border-white/5">

                    {/* Revenue */}
                    <div className="flex justify-between items-center group/metric">
                        <div className="flex items-center gap-2 text-gray-400 group-hover/metric:text-white transition-colors">
                            <DollarSign size={14} />
                            <span className="text-xs font-bold uppercase tracking-wider">Revenue</span>
                        </div>
                        <span className={cn("font-mono text-lg font-bold", getMetricColor('revenue', data.revenue, opponent.revenue))}>
                            ${data.revenue}B
                        </span>
                    </div>

                    {/* Profit */}
                    <div className="flex justify-between items-center group/metric">
                        <div className="flex items-center gap-2 text-gray-400 group-hover/metric:text-white transition-colors">
                            <Activity size={14} />
                            <span className="text-xs font-bold uppercase tracking-wider">Net Profit</span>
                        </div>
                        <span className={cn("font-mono text-lg font-black", getMetricColor('profit', data.profit, opponent.profit))}>
                            ${data.profit}B
                        </span>
                    </div>

                    {/* Margin Bar */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
                            <span>Profit Margin</span>
                            <span>{margin}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500"
                                style={{ width: `${Math.max(0, Math.min(100, Number(margin)))}%` }}
                            />
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/10 my-2" />

                    {/* Debt */}
                    <div className="flex justify-between items-center group/metric">
                        <div className="flex items-center gap-2 text-gray-400 group-hover/metric:text-white transition-colors">
                            <AlertTriangle size={14} className={data.debt > opponent.debt ? "text-rose-500/50" : ""} />
                            <span className="text-xs font-bold uppercase tracking-wider">Total Debt</span>
                        </div>
                        <span className={cn("font-mono font-bold text-base", getMetricColor('debt', data.debt, opponent.debt))}>
                            ${data.debt}B
                        </span>
                    </div>

                    {/* Growth */}
                    <div className="flex justify-between items-center group/metric mt-2">
                        <div className="flex items-center gap-2 text-gray-400 group-hover/metric:text-white transition-colors">
                            <TrendingUp size={14} />
                            <span className="text-xs font-bold uppercase tracking-wider">YoY Growth</span>
                        </div>
                        <span className={cn("font-mono font-bold text-base", getMetricColor('growth', data.growth, opponent.growth))}>
                            +{data.growth}%
                        </span>
                    </div>
                </div>

                {/* Selection button for playing state */}
                {gameState === 'playing' && (
                    <Button className="w-full mt-6 bg-white text-black hover:bg-gray-200 uppercase tracking-widest font-black text-xs py-6 group-hover:bg-emerald-400 transition-colors">
                        Invest in {id}
                    </Button>
                )}
            </div>
        );
    };

    return (
        <div className="w-full max-w-5xl mx-auto min-h-[600px] flex flex-col relative">

            {/* Header Stats */}
            {gameState !== 'intro' && (
                <div className="flex justify-between items-center mb-8 bg-black/50 p-4 border border-white/5 rounded-2xl backdrop-blur-xl shrink-0">
                    <div className="flex gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Score</span>
                            <span className="font-mono text-2xl font-black text-white">{score}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Streak</span>
                            <span className="font-mono text-xl font-bold text-emerald-400">x{streak}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle2 size={14} /> {stats.correct}
                        </div>
                        <div className="px-4 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            <AlertTriangle size={14} /> {stats.wrong}
                        </div>
                    </div>
                </div>
            )}

            {/* Intro Screen */}
            <AnimatePresence mode="wait">
                {gameState === 'intro' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex-1 flex flex-col items-center justify-center text-center p-12 premium-banner"
                    >
                        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-2xl backdrop-blur-md border border-white/20">
                            <TrendingUp className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Company Detective</h1>
                        <p className="text-gray-400 max-w-md text-sm leading-relaxed mb-6 font-mono">
                            Learn to evaluate companies like a professional investor. Compare financial metrics, understand tradeoffs, and make the right investment.
                        </p>
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest mb-10 flex items-center gap-3">
                            <AlertTriangle size={16} />
                            Simulation only. Numbers are fictional. Not financial advice.
                        </div>
                        <Button
                            onClick={handleStart}
                            size="lg"
                            className="bg-white text-black hover:bg-gray-200 px-12 py-6 text-sm uppercase tracking-widest font-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                        >
                            Start Simulation
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Playing or Result Screen */}
            {(gameState === 'playing' || gameState === 'roundResult') && (
                <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="text-center mb-10">
                        <h2 className="text-sm font-black text-gray-500 uppercase tracking-[0.3em] mb-3">
                            Round {currentRoundIndex + 1} of {rounds.length}
                        </h2>
                        <h3 className="text-3xl font-black text-white italic capitalize tracking-tight">
                            {currentRound.title}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative">
                        {/* VS Badge */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black border border-white/10 rounded-full flex items-center justify-center font-black italic text-gray-500 shadow-2xl">
                            VS
                        </div>

                        <CompanyCard data={currentRound.companyA} id="A" opponent={currentRound.companyB} />
                        <CompanyCard data={currentRound.companyB} id="B" opponent={currentRound.companyA} />
                    </div>

                    {/* Hint Section (Playing) */}
                    {gameState === 'playing' && (
                        <div className="flex justify-center mt-4">
                            {!hintUsed ? (
                                <Button
                                    variant="outline"
                                    onClick={() => setHintUsed(true)}
                                    className="border-white/10 text-gray-400 hover:text-white hover:bg-white/5 uppercase text-xs font-black tracking-widest flex items-center gap-2"
                                >
                                    <Lightbulb size={14} />
                                    Get a Hint (-50pts bonus)
                                </Button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-6 py-4 rounded-xl text-sm italic font-medium max-w-lg text-center shadow-lg backdrop-blur-md"
                                >
                                    "{currentRound.hint}"
                                </motion.div>
                            )}
                        </div>
                    )}

                    {/* Explanation Section (Result) */}
                    {gameState === 'roundResult' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="premium-card p-8 rounded-2xl border border-white/10 mt-4"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                            <BrainCircuit className="text-white h-5 w-5" />
                                        </div>
                                        <h4 className="font-black text-white uppercase tracking-widest text-sm">Investment Thesis</h4>
                                    </div>
                                    <h5 className="text-xl font-bold text-white leading-snug">{currentRound.learningFocus}</h5>
                                    <p className="text-gray-400 text-sm leading-relaxed">{currentRound.explanation}</p>
                                </div>

                                <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-auto mt-6 md:mt-0 md:pl-8 md:border-l border-white/5">
                                    <div className="text-center mb-6">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Your Choice</p>
                                        <p className={cn(
                                            "text-2xl font-black italic",
                                            selectedCompany === currentRound.correctAnswer ? "text-emerald-400" : "text-rose-400"
                                        )}>
                                            {selectedCompany === currentRound.correctAnswer ? "Correct" : "Incorrect"}
                                        </p>
                                    </div>
                                    <Button
                                        onClick={handleNextRound}
                                        className="w-full bg-white text-black hover:bg-gray-200 uppercase tracking-widest font-black text-xs h-12 flex items-center gap-2"
                                    >
                                        {currentRoundIndex < rounds.length - 1 ? 'Next Scenario' : 'View Final Results'}
                                        <ArrowRight size={16} />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
                <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500 premium-card p-12 text-center rounded-3xl border border-white/10">
                    <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                        <Trophy className="w-12 h-12 text-emerald-400" />
                    </div>

                    <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Simulation Complete</h2>
                    <p className="text-gray-400 font-mono mb-10 max-w-md">
                        You have completed your training as a Company Detective. Remember: Revenue is vanity, Profit is sanity, and Cash is king.
                    </p>

                    <div className="flex gap-16 mb-12 bg-black/50 p-8 rounded-2xl border border-white/5 w-full max-w-lg justify-center">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2">Final Score</span>
                            <span className="text-4xl font-mono font-black text-white">{score}</span>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2">Accuracy</span>
                            <span className="text-4xl font-mono font-black text-emerald-400">
                                {Math.round((stats.correct / rounds.length) * 100)}%
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button
                            onClick={resetGame}
                            variant="outline"
                            className="border-white/20 bg-transparent text-white hover:bg-white/5 uppercase tracking-widest font-black text-xs px-12 py-6"
                        >
                            Play Again
                        </Button>
                    </div>
                </div>
            )}

        </div>
    );
};
