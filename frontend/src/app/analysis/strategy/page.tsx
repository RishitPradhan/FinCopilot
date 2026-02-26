'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Microscope, Zap, Target, TrendingUp, BarChart3, ShieldAlert } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const demoData = [
    { name: 'Week 1', score: 65, risk: 20 },
    { name: 'Week 2', score: 68, risk: 18 },
    { name: 'Week 3', score: 75, risk: 22 },
    { name: 'Week 4', score: 82, risk: 15 },
    { name: 'Week 5', score: 79, risk: 12 },
    { name: 'Week 6', score: 88, risk: 10 },
];

export default function StrategyLab() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 no-scrollbar">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <Microscope className="mr-3 h-8 w-8 text-white" />
                    Strategy Lab
                </h1>
                <p className="text-gray-500">Advanced algorithmic analysis and backtesting insights for your current strategy.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card border-border shadow-2xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center">
                            <Target className="h-4 w-4 mr-2" />
                            Efficiency Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white font-mono">88.4%</div>
                        <p className="text-[10px] text-emerald-400 mt-1 uppercase font-bold">+5.2% vs baseline</p>
                    </CardContent>
                </Card>
                <Card className="bg-card border-border shadow-2xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center">
                            <Zap className="h-4 w-4 mr-2" />
                            Alpha Generation
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white font-mono">14.2%</div>
                        <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">Risk-adjusted</p>
                    </CardContent>
                </Card>
                <Card className="bg-card border-border shadow-2xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center">
                            <ShieldAlert className="h-4 w-4 mr-2" />
                            Max Drawdown
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white font-mono">6.8%</div>
                        <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">Lower than average</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-card border-border shadow-2xl h-[400px] flex flex-col">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-white">Strategy Performance Trend</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 min-h-0 pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={demoData}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                            <XAxis dataKey="name" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #222', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="score" stroke="#fff" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Key Insights</h3>
                    {[
                        "Your current exposure to tech is yielding high alpha but increasing volatility.",
                        "Rebalancing towards defensive stocks could reduce drawdown by 2.1%.",
                        "NIFTY momentum signals suggest holding current long positions for 2 more weeks."
                    ].map((insight, i) => (
                        <div key={i} className="p-4 rounded-xl bg-secondary/50 border border-border flex items-start space-x-3">
                            <div className="h-2 w-2 rounded-full bg-white mt-1.5 shrink-0" />
                            <p className="text-sm text-gray-300">{insight}</p>
                        </div>
                    ))}
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-border">
                    <h3 className="text-lg font-bold text-white mb-4">Optimization Recommendation</h3>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                        Based on your Strategy Efficiency Score of 88.4%, we recommend a minor rotation into mid-cap energy stocks. This move historically recovers faster during consolidation phases.
                    </p>
                    <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs">
                        Run Auto-Optimization
                    </button>
                </div>
            </div>
        </div>
    );
}
