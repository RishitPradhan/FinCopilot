'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, BookOpen, Smile, Zap, ArrowUpRight, ArrowDownRight, LayoutDashboard, BrainCircuit, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

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
            color: 'text-blue-400',
        },
        {
            title: 'Prediction Accuracy',
            value: '78.2%',
            change: '+2.4%',
            trend: 'up',
            icon: Target,
            color: 'text-[#00d4ff]',
        },
        {
            title: 'Modules Completed',
            value: '12 / 15',
            change: '80%',
            trend: 'neutral',
            icon: BookOpen,
            color: 'text-[#10b981]',
        },
        {
            title: 'Market Mood',
            value: 'Fear & Greed: 64',
            change: 'Greed',
            trend: 'up',
            icon: Zap,
            color: 'text-orange-400',
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#111827] to-[#1f2937] p-8 border border-[#1f2937]">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Hello, {user?.name?.split(' ')[0] || 'Investor'}. Your Financial IQ Score: <span className="text-[#00d4ff]">{iqScore}</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl">
                        You're in the top 15% of investors this week. Your portfolio diversification is looking strong, but keep an eye on your tech sector exposure.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d4ff]/5 blur-3xl -mr-20 -mt-20 rounded-full" />
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="bg-[#111827] border-[#1f2937] hover:border-[#00d4ff]/50 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={cn("h-4 w-4", stat.color)} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                            <div className="flex items-center mt-1">
                                {stat.trend === 'up' ? (
                                    <ArrowUpRight className="h-4 w-4 text-emerald-400 mr-1" />
                                ) : stat.trend === 'down' ? (
                                    <ArrowDownRight className="h-4 w-4 text-red-400 mr-1" />
                                ) : null}
                                <span className={cn(
                                    "text-xs font-medium",
                                    stat.trend === 'up' ? "text-emerald-400" : stat.trend === 'down' ? "text-red-400" : "text-gray-400"
                                )}>
                                    {stat.change}
                                </span>
                                <span className="text-[10px] text-gray-600 ml-2 uppercase">vs last week</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Market Overview Card - Placeholder for Chart */}
                <Card className="lg:col-span-2 bg-[#111827] border-[#1f2937] h-[400px] flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-white">Market Overview (NIFTY50)</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-center justify-center border-t border-[#1f2937]/50">
                        <div className="flex flex-col items-center text-gray-500">
                            <TrendingUp className="h-12 w-12 mb-4 opacity-20" />
                            <p>Market Chart will be rendered here (Recharts)</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent AI Insight Strip */}
                <Card className="bg-[#111827] border-[#1f2937] h-[400px] flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-white flex items-center">
                            <Zap className="h-4 w-4 text-yellow-400 mr-2" />
                            AI Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4 overflow-y-auto pr-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 rounded-xl bg-[#0a0f1e] border border-[#1f2937] hover:bg-[#1f2937]/50 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 uppercase">Opportunity</span>
                                    <span className="text-[10px] text-gray-500">2h ago</span>
                                </div>
                                <h3 className="text-sm font-semibold text-white group-hover:text-[#00d4ff] transition-colors">AAPL Consolidation Phase</h3>
                                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                    Apple stock is showing signs of consolidation. Relative Strength Index (RSI) is at 45, suggesting potential for...
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* AI Insight Strip at bottom */}
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                        <Zap className="h-4 w-4 text-blue-400" />
                    </div>
                    <p className="text-sm text-gray-300">
                        <span className="font-bold text-white">Pro Tip:</span> Diversifying into renewable energy might reduce your current portfolio volatility by <span className="text-emerald-400 font-bold">14%</span>.
                    </p>
                </div>
                <button className="text-xs font-bold text-[#00d4ff] hover:underline uppercase tracking-wider">Analyze Portfolio</button>
            </div>
        </div>
    );
}
