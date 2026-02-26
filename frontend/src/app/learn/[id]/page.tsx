'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen, BrainCircuit, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Quiz } from '@/components/learn/Quiz';
import { BasicsOfStocksContent } from '@/components/learn/BasicsOfStocksContent';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BasisOfStockInteractive } from '@/components/learn/BasisOfStockInteractive';
import { CompanyDetectiveGame } from '@/components/learn/CompanyDetectiveGame';
import { RiskAndReturnInteractive } from '@/components/learn/RiskAndReturnInteractive';
import { DiversificationInteractive } from '@/components/learn/DiversificationInteractive';
import { motion } from 'framer-motion';

// Mock data for modules
const mockModules: Record<string, any> = {
    '1': {
        id: '1',
        title: 'Basics of Stocks',
        questions: [
            {
                id: 1,
                question: "What does 'equity' represent in a corporation?",
                options: ["A loan", "Ownership of a fraction", "A guarantee of profit", "Voting rights only"],
                correctAnswer: 1
            },
            {
                id: 2,
                question: "Why do companies issue stocks?",
                options: ["Avoid taxes", "Give away ownership", "Raise capital for expansion", "Comply with regulations"],
                correctAnswer: 2
            }
        ]
    },
    '2': {
        id: '2',
        title: 'Risk vs Return',
        questions: [
            {
                id: 1,
                question: "What is the relationship between Risk and Return?",
                options: ["Higher risk usually means higher potential return", "Lower risk means higher potential return", "There is no relationship", "Risk and Return are opposites"],
                correctAnswer: 0
            },
            {
                id: 2,
                question: "Which investment typically has the lowest risk?",
                options: ["Small-cap stocks", "Bank Fixed Deposits", "Crypto", "Tech startups"],
                correctAnswer: 1
            }
        ]
    },
    '3': {
        id: '3',
        title: 'Portfolio Diversification',
        questions: [
            {
                id: 1,
                question: "What is the primary benefit of diversification?",
                options: ["Guaranteed 50% returns", "Reducing overall portfolio risk", "Avoiding all taxes", "Increasing focus on one stock"],
                correctAnswer: 1
            },
            {
                id: 2,
                question: "What does 'rebalancing' a portfolio mean?",
                options: ["Buying more of the winning stock", "Adjusting asset levels back to a target mix", "Closing the account", "Withdrawing all profit"],
                correctAnswer: 1
            }
        ]
    }
};

export default function ModuleDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [view, setView] = useState<'content' | 'quiz' | 'game'>('content');
    const [isCompleted, setIsCompleted] = useState(false);

    // Fetch module data based on the ID
    const module = mockModules[id as string] || mockModules['1'];

    const handleQuizComplete = (score: number) => {
        setIsCompleted(true);
    };

    return (
        <div className="max-w-5xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-24 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/learn')}
                    className="text-gray-500 hover:text-white hover:bg-white/5 rounded-xl group transition-all"
                >
                    <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Back to Academy</span>
                </Button>
                <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 px-6 py-2.5 rounded-full shadow-xl">
                    <BookOpen className="h-3.5 w-3.5 text-white/40" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Curriculum Module <span className="text-white ml-2">#0{id}</span></span>
                </div>
            </div>

            <div className="space-y-6 mb-16">
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-none">{module.title}</h1>
                <div className="flex items-center space-x-10">
                    <button
                        onClick={() => setView('content')}
                        className={cn(
                            "flex items-center text-[10px] uppercase font-black tracking-[0.3em] transition-all",
                            view === 'content' ? "text-white" : "text-gray-600 hover:text-gray-400"
                        )}
                    >
                        <div className={cn(
                            "w-2 h-2 rounded-full mr-3 shadow-2xl transition-all",
                            view === 'content' ? "bg-white scale-125" : "bg-gray-800"
                        )} />
                        Content
                    </button>
                    <button
                        onClick={() => setView('quiz')}
                        className={cn(
                            "flex items-center text-[10px] uppercase font-black tracking-[0.3em] transition-all",
                            view === 'quiz' ? "text-white" : "text-gray-600 hover:text-gray-400"
                        )}
                    >
                        <div className={cn(
                            "w-2 h-2 rounded-full mr-3 shadow-2xl transition-all",
                            view === 'quiz' ? "bg-white scale-125" : "bg-gray-800"
                        )} />
                        Assessment
                    </button>
                    {id === '1' && (
                        <button
                            onClick={() => setView('game')}
                            className={cn(
                                "flex items-center text-[10px] uppercase font-black tracking-[0.3em] transition-all",
                                view === 'game' ? "text-white" : "text-gray-600 hover:text-gray-400"
                            )}
                        >
                            <div className={cn(
                                "w-2 h-2 rounded-full mr-3 shadow-2xl transition-all",
                                view === 'game' ? "bg-white scale-125" : "bg-gray-800"
                            )} />
                            Simulation
                        </button>
                    )}
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 flex">
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{
                            width: view === 'content' ? "100%" : "0%",
                            flexBasis: id === '1' ? "33.333%" : "50%"
                        }}
                        className="bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-700"
                    />
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{
                            width: view === 'quiz' ? "100%" : "0%",
                            flexBasis: id === '1' ? "33.333%" : "50%"
                        }}
                        className="bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-700"
                    />
                    {id === '1' && (
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{
                                width: view === 'game' ? "100%" : "0%",
                                flexBasis: "33.333%"
                            }}
                            className="bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-700"
                        />
                    )}
                </div>
            </div>

            <div className="w-full">
                {view === 'content' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {id === '1' ? (
                            <BasisOfStockInteractive />
                        ) : id === '2' ? (
                            <RiskAndReturnInteractive />
                        ) : id === '3' ? (
                            <DiversificationInteractive />
                        ) : (
                            <div className="premium-card p-20 flex flex-col items-center justify-center text-center">
                                <BrainCircuit className="h-16 w-16 text-white/20 mb-8 animate-pulse" />
                                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">Under Synthesis</h2>
                                <p className="text-gray-500 max-w-sm uppercase tracking-widest text-[10px] font-black leading-relaxed">
                                    Our neural networks are currently distilling this knowledge. check back soon for the full transmission.
                                </p>
                            </div>
                        )}
                    </motion.div>
                ) : view === 'quiz' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-3xl mx-auto py-12"
                    >
                        <Quiz questions={module.questions} onComplete={handleQuizComplete} />
                    </motion.div>
                ) : view === 'game' && id === '1' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full mx-auto py-12"
                    >
                        <CompanyDetectiveGame />
                    </motion.div>
                ) : null}
            </div>
        </div>
    );
}
