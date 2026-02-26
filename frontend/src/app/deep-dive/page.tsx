'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { PieChart as PieChartIcon, BarChart3, TrendingUp, Microscope } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const sectorData = [
    { name: 'Technology', value: 28, change: '+2.5%' },
    { name: 'Finance', value: 22, change: '+1.2%' },
    { name: 'Healthcare', value: 15, change: '-0.5%' },
    { name: 'Consumer', value: 18, change: '+1.8%' },
    { name: 'Energy', value: 10, change: '-1.2%' },
    { name: 'Industrials', value: 7, change: '+0.8%' },
];

const industryData = [
    { industry: 'IT Services', stocks: 45, change: '+2.1%', topStock: 'TCS' },
    { industry: 'Banking', stocks: 38, change: '+1.5%', topStock: 'HDFC Bank' },
    { industry: 'Pharmaceuticals', stocks: 32, change: '-0.3%', topStock: 'Sun Pharma' },
    { industry: 'Automobiles', stocks: 28, change: '+1.8%', topStock: 'Maruti' },
    { industry: 'Telecom', stocks: 15, change: '+0.5%', topStock: 'Airtel' },
];

const earningsData = [
    { company: 'TCS', revenue: '₹58,229 Cr', profit: '₹11,342 Cr', growth: '+8.5%' },
    { company: 'Infosys', revenue: '₹38,821 Cr', profit: '₹6,128 Cr', growth: '+7.2%' },
    { company: 'HDFC Bank', revenue: '₹45,230 Cr', profit: '₹12,650 Cr', growth: '+12.3%' },
    { company: 'Reliance', revenue: '₹2,35,450 Cr', profit: '₹18,950 Cr', growth: '+15.8%' },
];

const COLORS = ['#ffffff', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252'];

export default function DeepDivePage() {
    const [activeTab, setActiveTab] = useState<'sectors' | 'industries' | 'earnings'>('sectors');

    const SECTOR_COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#059669', '#065f46'];

    return (
        <div className="space-y-12 animate-in fade-in duration-700 no-scrollbar pb-20">
            <div className="flex flex-col space-y-4 border-b border-white/5 pb-10">
                <h1 className="text-6xl font-black text-white flex items-center tracking-tighter italic uppercase">
                    Deep<span className="text-white/20 ml-2">Dive</span>
                </h1>
                <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-[10px]">Granular Market Intelligence & Alpha Synthesis Hierarchies</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-4 p-2 bg-white/[0.02] border border-white/5 rounded-[24px] w-fit backdrop-blur-3xl shadow-2xl">
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab('sectors')}
                    className={cn(
                        "rounded-[20px] px-8 h-12 transition-all duration-500 font-black uppercase tracking-widest text-[10px]",
                        activeTab === 'sectors' ? "bg-white text-black hover:bg-white shadow-xl" : "text-gray-600 hover:text-white hover:bg-white/5"
                    )}
                >
                    Sectors
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab('industries')}
                    className={cn(
                        "rounded-[20px] px-8 h-12 transition-all duration-500 font-black uppercase tracking-widest text-[10px]",
                        activeTab === 'industries' ? "bg-white text-black hover:bg-white shadow-xl" : "text-gray-600 hover:text-white hover:bg-white/5"
                    )}
                >
                    Industries
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab('earnings')}
                    className={cn(
                        "rounded-[20px] px-8 h-12 transition-all duration-500 font-black uppercase tracking-widest text-[10px]",
                        activeTab === 'earnings' ? "bg-white text-black hover:bg-white shadow-xl" : "text-gray-600 hover:text-white hover:bg-white/5"
                    )}
                >
                    Earnings
                </Button>
            </div>

            {/* Content Views */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {activeTab === 'sectors' && (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <Card className="lg:col-span-3 premium-card h-[550px] flex flex-col group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <CardHeader className="bg-white/[0.02] border-b border-white/5 p-8">
                                <CardTitle className="text-xl font-black text-white italic uppercase tracking-tighter">Sector Momentum</CardTitle>
                                <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mt-1">Relative performance weightage</p>
                            </CardHeader>
                            <CardContent className="flex-1 flex items-center justify-center p-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={sectorData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={140}
                                            paddingAngle={8}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {sectorData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} className="hover:opacity-80 transition-opacity cursor-pointer" />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#000',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '16px',
                                                color: '#fff',
                                                backdropFilter: 'blur(20px)',
                                                padding: '16px'
                                            }}
                                            itemStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '12px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-2 mb-4">Allocation Details</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {sectorData.map((sector, i) => (
                                    <div key={i} className="group p-6 bg-white/[0.02] border border-white/5 rounded-[24px] flex items-center justify-between hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                                        <div className="flex items-center space-x-5">
                                            <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: SECTOR_COLORS[i % SECTOR_COLORS.length] }} />
                                            <div>
                                                <span className="text-sm font-black text-white uppercase tracking-tight block">{sector.name}</span>
                                                <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Active Alpha</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-black text-white italic font-mono">{sector.value}%</div>
                                            <div className={cn(
                                                "text-[9px] font-black uppercase tracking-widest",
                                                sector.change.startsWith('+') ? "text-emerald-500" : "text-rose-500"
                                            )}>{sector.change}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'industries' && (
                    <Card className="premium-card overflow-hidden">
                        <CardHeader className="bg-white/[0.02] border-b border-white/5 p-8">
                            <CardTitle className="text-xl font-black text-white italic uppercase tracking-tighter">Industry Alpha</CardTitle>
                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mt-1">Cross-industry performance synthesis</p>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-white/[0.01] border-white/5">
                                    <TableRow className="border-white/5 hover:bg-transparent px-8 h-14">
                                        <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] pl-8">Industry Node</TableHead>
                                        <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] text-right">Asset Count</TableHead>
                                        <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] text-right">Momentum Vector</TableHead>
                                        <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] text-right pr-8">Top Performer</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {industryData.map((item, i) => (
                                        <TableRow key={i} className="border-white/5 hover:bg-white/[0.02] transition-colors group h-16">
                                            <TableCell className="font-black text-white uppercase tracking-tight pl-8">{item.industry}</TableCell>
                                            <TableCell className="text-right text-gray-500 font-black font-mono text-xs">{item.stocks}</TableCell>
                                            <TableCell className={cn(
                                                "text-right font-black italic tracking-tighter text-sm transition-transform group-hover:translate-x-1",
                                                item.change.startsWith('+') ? "text-emerald-500" : "text-rose-500"
                                            )}>{item.change}</TableCell>
                                            <TableCell className="text-right pr-8">
                                                <span className="px-5 py-1.5 bg-white text-black font-black uppercase tracking-widest text-[9px] rounded-full shadow-lg">
                                                    {item.topStock}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'earnings' && (
                    <Card className="premium-card overflow-hidden">
                        <CardHeader className="bg-white/[0.02] border-b border-white/5 p-8">
                            <CardTitle className="text-xl font-black text-white italic uppercase tracking-tighter">Earnings Intelligence</CardTitle>
                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mt-1">Institutional-grade financial reporting summary</p>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-white/[0.01] border-white/5">
                                    <TableRow className="border-white/5 hover:bg-transparent h-14">
                                        <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] pl-8">Asset Entity</TableHead>
                                        <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] text-right">Synthesized Revenue</TableHead>
                                        <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] text-right">Net Alpha Surplus</TableHead>
                                        <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] text-right pr-8">Growth Velocity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {earningsData.map((item, i) => (
                                        <TableRow key={i} className="border-white/5 hover:bg-white/[0.02] transition-colors h-16">
                                            <TableCell className="font-black text-white italic uppercase tracking-tighter pl-8">{item.company}</TableCell>
                                            <TableCell className="text-right text-gray-500 font-black font-mono text-xs">{item.revenue}</TableCell>
                                            <TableCell className="text-right text-white font-black font-mono text-xs">{item.profit}</TableCell>
                                            <TableCell className="text-right pr-8">
                                                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-black italic text-[10px] tracking-widest uppercase">
                                                    {item.growth}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
