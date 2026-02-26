'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen, BrainCircuit, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Quiz } from '@/components/learn/Quiz';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mock data for a module
const mockModule = {
    id: '1',
    title: 'Basics of Stocks',
    content: `
# Introduction to the Stock Market

The stock market is a complex ecosystem where investors buy and sell shares of publicly traded companies. Understanding the basics is the first step toward financial intelligence.

## What is a Stock?
A stock (also known as equity) is a security that represents the ownership of a fraction of a corporation. This entitles the owner of the stock to a proportion of the corporation's assets and profits equal to how much stock they own.

## Why do Companies Issue Stocks?
Companies issue stock to raise capital to:
* Expand their operations
* Invest in new projects
* Pay off debt

## Key Terms to Know
1. **Dividend**: A portion of a company's earnings distributed to shareholders.
2. **Market Cap**: The total value of a company's shares.
3. **IPO**: Initial Public Offering - when a company first sells shares to the public.

### How Prices are Determined
Stock prices are driven by supply and demand. If more people want to buy a stock than sell it, the price moves up. If more people want to sell than buy, the price moves down.
  `,
    questions: [
        {
            id: 1,
            question: "What does 'equity' represent in a corporation?",
            options: [
                "A loan to the company",
                "Ownership of a fraction of the corporation",
                "A guarantee of future profits",
                "Voting rights only"
            ],
            correctAnswer: 1
        },
        {
            id: 2,
            question: "Why do companies primarily issue stocks?",
            options: [
                "To avoid paying taxes",
                "To give away ownership for free",
                "To raise capital for expansionist or debt",
                "To comply with government regulations"
            ],
            correctAnswer: 2
        },
        {
            id: 3,
            question: "What is an IPO?",
            options: [
                "International Profit Organization",
                "Internal Portfolio Optimization",
                "Initial Public Offering",
                "Investment Price Option"
            ],
            correctAnswer: 2
        }
    ]
};

export default function ModuleDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [view, setView] = useState<'content' | 'quiz'>('content');
    const [isCompleted, setIsCompleted] = useState(false);

    // In a real app, we would fetch module data based on the ID
    const module = mockModule;

    const handleQuizComplete = (score: number) => {
        setIsCompleted(true);
        // In a real app, POST progress to backend here
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex items-center justify-between">
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

            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white">{module.title}</h1>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center text-xs text-gray-500 uppercase tracking-widest">
                        <div className={cn(
                            "w-2 h-2 rounded-full mr-2",
                            view === 'content' ? "bg-white" : "bg-gray-700"
                        )} />
                        Reading Content
                    </div>
                    <div className="flex items-center text-xs text-gray-500 uppercase tracking-widest">
                        <div className={cn(
                            "w-2 h-2 rounded-full mr-2",
                            view === 'quiz' ? "bg-white" : "bg-gray-700"
                        )} />
                        Module Quiz
                    </div>
                </div>
                <Progress value={view === 'content' ? 50 : 100} className="h-1 bg-secondary" />
            </div>

            {view === 'content' ? (
                <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl">
                    <article className="prose prose-invert prose-neutral max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {module.content}
                        </ReactMarkdown>
                    </article>

                    <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
                        <div className="flex items-center text-gray-400 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-white mr-2" />
                            Finished reading? Test your knowledge.
                        </div>
                        <Button
                            onClick={() => setView('quiz')}
                            className="bg-white text-black hover:bg-gray-200 font-bold px-8"
                        >
                            Take Module Quiz <BrainCircuit className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto py-8">
                    <Quiz questions={module.questions} onComplete={handleQuizComplete} />
                </div>
            )}
        </div>
    );
}
