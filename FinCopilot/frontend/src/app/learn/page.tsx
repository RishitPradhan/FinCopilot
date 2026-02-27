'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    BookOpen,
    Lock,
    Clock,
    CheckCircle2,
    PlayCircle,
    BarChart3,
    ShieldCheck,
    LineChart,
    BrainCircuit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const modules = [
    {
        id: '1',
        title: 'Basics of Stocks',
        description: 'Learn the fundamentals of stock markets, equity, and how companies go public.',
        progress: 100,
        time: '45 mins',
        status: 'completed',
        icon: BookOpen,
        color: 'text-white',
    },
    {
        id: '2',
        title: 'Risk vs Return',
        description: 'Understanding the relationship between potential rewards and associated risks.',
        progress: 65,
        time: '60 mins',
        status: 'in-progress',
        icon: ShieldCheck,
        color: 'text-gray-300',
    },
    {
        id: '3',
        title: 'Portfolio Diversification',
        description: 'Strategies to spread risk across different asset classes and sectors.',
        progress: 0,
        time: '90 mins',
        status: 'unlocked',
        icon: BarChart3,
        color: 'text-gray-400',
    },
    {
        id: '4',
        title: 'Market Indicators',
        description: 'How to read technical and fundamental indicators like P/E ratios and RSI.',
        progress: 0,
        time: '120 mins',
        status: 'locked',
        icon: LineChart,
        color: 'text-gray-500',
    },
    {
        id: '5',
        title: 'News & Market Psychology',
        description: 'Analyzing how market sentiment and news drive short-term price movements.',
        progress: 0,
        time: '60 mins',
        status: 'locked',
        icon: BrainCircuit,
        color: 'text-gray-600',
    },
];

export default function LearnPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Learning Academy</h1>
                    <p className="text-gray-400">Master the markets with our structured AI-driven curriculum.</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Overall Progress</p>
                    <div className="flex items-center space-x-3">
                        <Progress value={35} className="w-48 h-2 bg-secondary" />
                        <span className="text-sm font-mono text-white font-bold">35%</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => (
                    <Card
                        key={module.id}
                        className={cn(
                            "bg-card border-border transition-all duration-300 flex flex-col h-full shadow-xl",
                            module.status !== 'locked' ? "hover:border-white/50 cursor-pointer" : "opacity-60"
                        )}
                    >
                        <CardHeader>
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("p-3 rounded-xl bg-opacity-10",
                                    module.color.replace('text-', 'bg-')
                                )}>
                                    <module.icon className={cn("h-6 w-6", module.color)} />
                                </div>
                                <Badge variant="outline" className={cn(
                                    "border-border text-[10px] uppercase",
                                    module.status === 'completed' ? "text-white font-bold" :
                                        module.status === 'in-progress' ? "text-gray-300" : "text-gray-500"
                                )}>
                                    {module.status}
                                </Badge>
                            </div>
                            <CardTitle className="text-xl text-white">{module.title}</CardTitle>
                            <CardDescription className="text-gray-400 line-clamp-2">
                                {module.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="space-y-4">
                                <div className="flex items-center text-xs text-gray-500">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {module.time}
                                    <div className="mx-2 w-1 h-1 rounded-full bg-gray-700" />
                                    <BookOpen className="h-3 w-3 mr-1" />
                                    Quiz Included
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider">
                                        <span className="text-gray-500">Progress</span>
                                        <span className="text-white">{module.progress}%</span>
                                    </div>
                                    <Progress value={module.progress} className="h-1.5 bg-black" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-4 border-t border-border/50">
                            {module.status === 'locked' ? (
                                <Button disabled className="w-full bg-secondary text-gray-500">
                                    <Lock className="h-4 w-4 mr-2" />
                                    Module Locked
                                </Button>
                            ) : (
                                <Link href={`/learn/${module.id}`} className="w-full">
                                    <Button className={cn(
                                        "w-full font-bold",
                                        module.status === 'completed'
                                            ? "bg-white/10 text-white hover:bg-white/20"
                                            : "bg-white text-black hover:bg-gray-200"
                                    )}>
                                        {module.status === 'completed' ? (
                                            <><CheckCircle2 className="h-4 w-4 mr-2" /> Review Module</>
                                        ) : module.status === 'in-progress' ? (
                                            <><PlayCircle className="h-4 w-4 mr-2" /> Continue Learning</>
                                        ) : (
                                            <><PlayCircle className="h-4 w-4 mr-2" /> Start Module</>
                                        )}
                                    </Button>
                                </Link>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
