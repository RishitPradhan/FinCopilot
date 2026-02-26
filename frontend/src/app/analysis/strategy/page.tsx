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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 no-scrollbar pb-10">
            <div className="flex flex-col space-y-4 border-b border-white/5 pb-10 mb-10">
                <h1 className="text-6xl font-black text-white flex items-center tracking-tighter italic uppercase">
                    Strategy<span className="text-white/20 ml-2">Lab</span>
                </h1>
                <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-[10px]">Quantum Backtesting & Alpha Generation Protocol</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="premium-card">
                    <CardHeader className="pb-2 bg-white/[0.02]">
                        <CardTitle className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center">
                            <Target className="h-4 w-4 mr-2 text-primary" />
                            Efficiency Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="text-3xl font-black text-white font-mono tracking-tighter">88.4%</div>
                        <p className="text-[10px] trend-up mt-2 uppercase inline-block font-black tracking-widest">+5.2% vs baseline</p>
                    </CardContent>
                </Card>
                <Card className="premium-card">
                    <CardHeader className="pb-2 bg-white/[0.02]">
                        <CardTitle className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center">
                            <Zap className="h-4 w-4 mr-2 text-primary" />
                            Alpha Generation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="text-3xl font-black text-white font-mono tracking-tighter">14.2%</div>
                        <p className="text-[10px] text-gray-600 mt-2 uppercase font-black tracking-widest font-bold">Risk-adjusted</p>
                    </CardContent>
                </Card>
                <Card className="premium-card">
                    <CardHeader className="pb-2 bg-white/[0.02]">
                        <CardTitle className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center">
                            <ShieldAlert className="h-4 w-4 mr-2 text-rose-400" />
                            Max Drawdown
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="text-3xl font-black text-white font-mono tracking-tighter text-rose-400">6.8%</div>
                        <p className="text-[10px] text-rose-500/60 mt-2 uppercase font-black tracking-widest font-bold">Lower than average</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="premium-card h-[450px] flex flex-col">
                <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-black text-white tracking-tight">Strategy Performance Trend</CardTitle>
                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">Backtested Results</div>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 min-h-0 p-8 pt-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={demoData}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#000',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    backdropFilter: 'blur(10px)'
                                }}
                                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                            />
                            <Area type="monotone" dataKey="score" stroke="#10b981" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-gray-600 uppercase tracking-[0.2em] px-2 mb-4">Strategic Catalyst Insights</h3>
                    {[
                        "Your current exposure to tech is yielding high alpha but increasing volatility.",
                        "Rebalancing towards defensive stocks could reduce drawdown by 2.1%.",
                        "NIFTY momentum signals suggest holding current long positions for 2 more weeks."
                    ].map((insight, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start space-x-4 hover:border-white/10 transition-colors">
                            <div className="h-6 w-1 rounded-full bg-primary mt-0.5 shrink-0" />
                            <p className="text-sm text-gray-400 font-medium leading-relaxed">{insight}</p>
                        </div>
                    ))}
                </div>
                <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Optimization Engine</h3>
                        <p className="text-sm text-gray-500 mb-8 leading-relaxed font-medium">
                            Based on your Strategy Efficiency Score of <span className="text-white font-bold">88.4%</span>, we recommend a minor rotation into mid-cap energy stocks. This move historically recovers faster during consolidation phases.
                        </p>
                        <button className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-neutral-200 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-[10px] shadow-2xl">
                            Deploy Auto-Optimization
                        </button>
                    </div>
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-colors duration-700" />
                </div>
            </div>
        </div>
    );
}
