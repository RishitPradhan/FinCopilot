'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, BookOpen, Zap, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarketChart } from './MarketChart';

export default function DashboardPage() {
    const { user } = useAuthStore();
    const [iqScore, setIqScore] = useState(74);

    useEffect(() => {
        const fetchIq = async () => {
            try {
                const res = await api.get('/user/iq-score');
                setIqScore(res.data.score);
            } catch (e) { /* fallback to default */ }
        };
        fetchIq();
    }, []);

    const stats = [
        {
            title: 'Portfolio Value',
            value: '$124,592.50',
            change: '+12.5%',
            trend: 'up',
            icon: Wallet,
            color: 'text-emerald-400',
        },
        {
            title: 'Prediction Accuracy',
            value: '78.2%',
            change: '+2.4%',
            trend: 'up',
            icon: Target,
            color: 'text-emerald-400',
        },
        {
            title: 'Modules Completed',
            value: '12 / 15',
            change: '80%',
            trend: 'neutral',
            icon: BookOpen,
            color: 'text-blue-400',
        },
        {
            title: 'Market Mood',
            value: 'Fear & Greed: 64',
            change: '-2 pts',
            trend: 'down',
            icon: Zap,
            color: 'text-rose-400',
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-black p-10 border border-white/5 shadow-2xl">
                <div className="relative z-10">
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">{user?.name?.split(' ')[0] || 'Investor'}</span>.
                    </h1>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <p className="text-sm font-medium text-gray-300">
                                Financial IQ: <span className="text-primary font-bold">{iqScore}</span>
                            </p>
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                            <p className="text-sm font-medium text-emerald-400">Top 15% this week</p>
                        </div>
                    </div>
                    <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
                        Your portfolio diversification is looking strong, but keep an eye on your tech sector exposure. Market volatility is expected to increase.
                    </p>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="bg-card/50 border border-white/5 hover:bg-card/80 transition-all duration-500 shadow-xl backdrop-blur-xl group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={cn("h-5 w-5 transition-transform duration-500 group-hover:scale-110", stat.color)} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-white font-mono tracking-tighter">{stat.value}</div>
                            <div className="flex items-center mt-2">
                                {stat.trend === 'up' ? (
                                    <div className="flex items-center px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                        <ArrowUpRight className="h-3 w-3 text-emerald-400 mr-1" />
                                        <span className="text-xs font-bold text-emerald-400">{stat.change}</span>
                                    </div>
                                ) : stat.trend === 'down' ? (
                                    <div className="flex items-center px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                                        <ArrowDownRight className="h-3 w-3 text-rose-400 mr-1" />
                                        <span className="text-xs font-bold text-rose-400">{stat.change}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                                        <span className="text-xs font-bold text-blue-400">{stat.change}</span>
                                    </div>
                                )}
                                <span className="text-[10px] text-gray-600 ml-3 uppercase font-bold tracking-wider">vs last week</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Market Overview Card */}
                <Card className="lg:col-span-2 bg-card/50 border border-white/5 h-[450px] flex flex-col shadow-2xl backdrop-blur-xl overflow-hidden">
                    <CardHeader className="border-b border-white/5 bg-white/[0.01]">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-xl font-black text-white tracking-tight">Market Overview</CardTitle>
                                <p className="text-xs text-gray-500 mt-1 font-medium">NIFTY 50 • REAL-TIME PERFORMANCE</p>
                            </div>
                            <div className="flex space-x-2">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">Live</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-6">
                        <MarketChart />
                    </CardContent>
                </Card>

                {/* AI Insights Strip */}
                <Card className="bg-card/50 border border-white/5 h-[450px] flex flex-col shadow-2xl backdrop-blur-xl">
                    <CardHeader className="border-b border-white/5 bg-white/[0.01]">
                        <CardTitle className="text-xl font-black text-white flex items-center tracking-tight">
                            <Zap className="h-5 w-5 text-primary mr-2" />
                            AI Catalyst
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4 overflow-y-auto p-6 no-scrollbar">
                        {[
                            { title: 'AAPL Consolidation', desc: 'Apple stock is showing signs of consolidation near $190 support.', type: 'Neutral', time: '2h ago' },
                            { title: 'Tech Sector Surge', desc: 'High momentum detected in AI-related stocks following NVIDIA results.', type: 'Bullish', time: '4h ago' },
                            { title: 'Interest Rate Impact', desc: 'Fed hints at maintaining rates, potentially impacting bank margins.', type: 'Alert', time: '6h ago' }
                        ].map((insight, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={cn(
                                        "text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter",
                                        insight.type === 'Bullish' ? "bg-emerald-500/20 text-emerald-400" :
                                            insight.type === 'Alert' ? "bg-rose-500/20 text-rose-400" : "bg-white/10 text-white"
                                    )}>{insight.type}</span>
                                    <span className="text-[9px] font-bold text-gray-600 uppercase">{insight.time}</span>
                                </div>
                                <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{insight.title}</h3>
                                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-medium">
                                    {insight.desc}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* AI Insight Strip at bottom */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border-none flex items-center justify-between backdrop-blur-sm group transition-colors">
                <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                        <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white mb-0.5">Optimization Insight</p>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium">
                            Diversifying into renewable energy might reduce your current portfolio volatility by <span className="text-emerald-400 font-black">14.2%</span>.
                        </p>
                    </div>
                </div>
                <button className="px-6 py-2 rounded-xl bg-white text-black text-xs font-black hover:bg-white/90 transition-all active:scale-95 uppercase tracking-widest shadow-lg">Analyze Portfolio</button>
            </div>
        </div>
    );
}
