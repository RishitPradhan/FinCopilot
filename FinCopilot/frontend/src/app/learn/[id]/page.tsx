'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen, Zap } from 'lucide-react';
import { Quiz } from '@/components/learn/Quiz';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { BasisOfStockInteractive } from '@/components/learn/BasisOfStockInteractive';
import { RiskAndReturnInteractive } from '@/components/learn/RiskAndReturnInteractive';
import { DiversificationInteractive } from '@/components/learn/DiversificationInteractive';

interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

interface ModuleData {
    id: string;
    title: string;
    questions: QuizQuestion[];
}

const mockModules: Record<string, ModuleData> = {
    '1': {
        id: '1',
        title: 'Basics of Stocks',
        questions: [
            {
                id: 1,
                question: "What does 'equity' represent in a corporation?",
                options: ["A loan to the company", "Ownership of a fraction of the corporation", "A guarantee of future profits", "Voting rights only"],
                correctAnswer: 1
            },
            {
                id: 2,
                question: "Which type of risk means the whole market drops suddenly?",
                options: ["Company Risk", "Liquidity Risk", "Market Risk", "Inflation Risk"],
                correctAnswer: 2
            },
            {
                id: 3,
                question: "How does a longer time horizon affect investment risk?",
                options: ["Increases risk", "Removes risk completely", "Softens volatility over time", "Has no effect"],
                correctAnswer: 2
            },
            {
                id: 4,
                question: "What is 'real return'?",
                options: ["Return before taxes", "Return after accounting for inflation", "Return from dividends only", "Return from capital gains only"],
                correctAnswer: 1
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
    const [view] = useState<'content' | 'quiz'>('content');

    const moduleId = typeof id === 'string' ? id : '1';
    const moduleData = mockModules[moduleId] || mockModules['1'];

    const handleQuizComplete = () => {
        // Quiz completed - can add completion tracking here
    };

    return (
        <div className="max-w-4xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 relative">
            <div className="flex items-center justify-between mb-8">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/learn')}
                    className="text-gray-400 hover:text-white"
                >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Academy
                </Button>
                <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-gray-500">Module {id}</span>
                </div>
            </div>

            <div className="space-y-4 mb-10">
                <h1 className="text-4xl font-bold text-white tracking-tight">{moduleData.title}</h1>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center text-[10px] text-gray-500 uppercase font-black tracking-widest">
                        <div className={cn(
                            "w-2 h-2 rounded-full mr-2",
                            view === 'content' ? "bg-white" : "bg-gray-700"
                        )} />
                        Reading Content
                    </div>
                    <div className="flex items-center text-[10px] text-gray-500 uppercase font-black tracking-widest">
                        <div className={cn(
                            "w-2 h-2 rounded-full mr-2",
                            view === 'quiz' ? "bg-white" : "bg-gray-700"
                        )} />
                        Module Quiz
                    </div>
                </div>
                <Progress value={view === 'content' ? 50 : 100} className="h-1 bg-white/5" />
            </div>

            <div className="w-full">
                {view === 'content' ? (
                    moduleId === '1' ? (
                        <BasisOfStockInteractive />
                    ) : moduleId === '2' ? (
                        <RiskAndReturnInteractive />
                    ) : moduleId === '3' ? (
                        <DiversificationInteractive />
                    ) : (
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                            <div className="flex flex-col items-center justify-center space-y-4 py-20">
                                <Zap className="h-12 w-12 text-blue-500" />
                                <h2 className="text-2xl font-bold text-white">Module Under Construction</h2>
                                <p className="text-gray-400">Our AI is still drafting this specialized content for you.</p>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="max-w-2xl mx-auto py-8">
                        <Quiz questions={moduleData.questions} onComplete={handleQuizComplete} />
                    </div>
                )}
            </div>
        </div>
    );
}
