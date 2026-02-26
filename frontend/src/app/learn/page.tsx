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
import { motion } from 'framer-motion';

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
        <div className="space-y-12 animate-in fade-in duration-700 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
                <div>
                    <h1 className="text-5xl font-black text-white mb-3 tracking-tighter uppercase italic">Academy</h1>
                    <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-black">AI-Driven Financial Intelligence Curriculum</p>
                </div>
                <div className="w-full md:w-auto">
                    <div className="flex justify-between items-end mb-3">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Overall Mastery</p>
                        <span className="text-sm font-black text-white italic">35%</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-64 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "35%" }}
                                className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-1000"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {modules.map((module) => (
                    <Card
                        key={module.id}
                        className={cn(
                            "premium-card group transition-all duration-500 flex flex-col h-full overflow-hidden",
                            module.status !== 'locked' ? "hover:border-white/20 cursor-pointer shadow-2xl" : "opacity-40 grayscale"
                        )}
                    >
                        <CardHeader className="bg-white/[0.02] border-b border-white/5 pb-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn("p-4 rounded-2xl bg-white/[0.03] border border-white/5 shadow-xl group-hover:border-white/20 transition-all",
                                    module.color.replace('text-', 'text-')
                                )}>
                                    <module.icon className={cn("h-6 w-6 shadow-2xl", module.color === 'text-white' ? 'text-white' : 'text-gray-400')} />
                                </div>
                                <Badge variant="outline" className={cn(
                                    "border-white/10 text-[9px] uppercase font-black tracking-widest px-3 py-1 rounded-full",
                                    module.status === 'completed' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                        module.status === 'in-progress' ? "bg-white/10 text-white border-white/20" : "text-gray-600"
                                )}>
                                    {module.status}
                                </Badge>
                            </div>
                            <CardTitle className="text-2xl font-black text-white tracking-tight leading-tight group-hover:text-primary transition-colors">{module.title}</CardTitle>
                            <CardDescription className="text-gray-500 line-clamp-2 mt-2 font-medium leading-relaxed">
                                {module.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 p-6 pt-8">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                                        <Clock className="h-3.5 w-3.5 mr-2" />
                                        {module.time}
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                    <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                                        <BookOpen className="h-3.5 w-3.5 mr-2" />
                                        Interactive
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Completion</span>
                                        <span className="text-xs font-black text-white italic">{module.progress}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${module.progress}%` }}
                                            className={cn(
                                                "h-full rounded-full transition-all duration-1000",
                                                module.status === 'completed' ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-6 pt-0 mt-auto">
                            {module.status === 'locked' ? (
                                <Button disabled className="w-full bg-white/5 border border-white/5 text-gray-700 font-black uppercase tracking-widest text-[9px] rounded-2xl h-12">
                                    <Lock className="h-4 w-4 mr-2" />
                                    Module Locked
                                </Button>
                            ) : (
                                <Link href={`/learn/${module.id}`} className="w-full">
                                    <Button className={cn(
                                        "w-full font-black uppercase tracking-widest text-[10px] rounded-2xl h-14 shadow-2xl transition-all active:scale-[0.98]",
                                        module.status === 'completed'
                                            ? "bg-white/[0.03] text-white border border-white/10 hover:bg-white/[0.08]"
                                            : "bg-white text-black hover:bg-gray-200"
                                    )}>
                                        {module.status === 'completed' ? (
                                            <><CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" /> Review Content</>
                                        ) : module.status === 'in-progress' ? (
                                            <><PlayCircle className="h-4 w-4 mr-2" /> Continue Course</>
                                        ) : (
                                            <><PlayCircle className="h-4 w-4 mr-2" /> Start Course</>
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
