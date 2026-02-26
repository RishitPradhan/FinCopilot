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

// Mock data for a module
const mockModule = {
    id: '1',
    title: 'Basics of Stocks',
    content: `
# Why Do Companies Need Investors?

Every company needs money to run — for salaries, products, and growth. Sometimes, profits aren't enough.
So, they invite people like us to invest money in their business. In return, we get a share of their success — literally!

## 📈 What Are Stocks?

Think of a stock as a tiny piece of a company.
When you buy a stock, you become a part-owner of that company.
If the company grows and earns more — your piece (your stock) becomes more valuable.

### ✅ In short:
You invest → company grows → your money grows too.

## 🏛️ What Is the Stock Market?

The stock market is where people buy and sell these shares.
You can think of it like a big marketplace — but instead of fruits or clothes, people trade ownership in companies.

- **Share Market** → Trading only company shares.
- **Stock Market** → Includes shares, mutual funds, bonds, and more.

## ⚙️ How Does It Work?

1. Companies list themselves on the stock market to raise money (this is called an **IPO**).
2. Investors buy those shares.
3. As companies grow, the value of shares usually rises → investors earn profits or dividends.

📊 Historically, stock markets have given about 10% returns per year over time — better than most savings accounts!

## 🧠 Must-Know Terms for Beginners

| Term | Meaning |
|------|---------|
| Sensex | Top 30 companies on the BSE (Bombay Stock Exchange). |
| Nifty 50 | Top 50 companies on the NSE (National Stock Exchange). |
| SEBI | The watchdog — it makes sure everything is fair and safe. |
| Demat Account | Your digital locker for holding shares. |
| IPO (Initial Public Offer) | When a company sells its shares to the public for the first time. |
| Bull Market 🐂 | Prices going up — investors are excited! |
| Bear Market 🐻 | Prices falling — investors are cautious. |
| Dividend | A reward or profit share paid by the company to its shareholders. |
| Broker | The middleman (or app) that helps you buy and sell stocks. |

## 🏦 Types of Stock Markets

- **Primary Market** → Where companies sell shares for the first time (IPO).
- **Secondary Market** → Where investors trade those shares among themselves.

## 📊 Quick Example

If you buy a share of Tata Motors for ₹500 and later it rises to ₹600 — you earn ₹100 profit per share 💸.
If the company gives a ₹10 dividend, that's a bonus!

## 🌟 Final Thought

The stock market isn't a get-rich-quick game — it's a smart way to grow your wealth over time.
Start small, learn daily, and let your money work for you!
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
