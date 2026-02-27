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

    return (
        <div className="space-y-8 animate-in fade-in duration-500 no-scrollbar pb-12">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <Microscope className="mr-3 h-8 w-8 text-white" />
                    Deep Dive Analysis
                </h1>
                <p className="text-gray-500">Granular market intelligence and performance metrics across all hierarchies.</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-4 p-1 bg-secondary/30 rounded-xl w-fit border border-border">
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab('sectors')}
                    className={cn(
                        "rounded-lg px-6 transition-all duration-300",
                        activeTab === 'sectors' ? "bg-white text-black hover:bg-white" : "text-gray-400 hover:text-white"
                    )}
                >
                    All Sectors
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab('industries')}
                    className={cn(
                        "rounded-lg px-6 transition-all duration-300",
                        activeTab === 'industries' ? "bg-white text-black hover:bg-white" : "text-gray-400 hover:text-white"
                    )}
                >
                    All Industries
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab('earnings')}
                    className={cn(
                        "rounded-lg px-6 transition-all duration-300",
                        activeTab === 'earnings' ? "bg-white text-black hover:bg-white" : "text-gray-400 hover:text-white"
                    )}
                >
                    Earnings Summary
                </Button>
            </div>

            {/* Content Views */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === 'sectors' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-card border-border shadow-2xl h-[450px]">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold text-white">Sector Performance</CardTitle>
                            </CardHeader>
                            <CardContent className="h-full flex items-center justify-center">
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={sectorData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {sectorData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid #222', color: '#fff' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border shadow-2xl overflow-hidden">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold text-white">Sector Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {sectorData.map((sector, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-secondary/20 rounded-xl border border-border/50">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                            <span className="text-sm font-medium text-white">{sector.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-white">{sector.value}%</div>
                                            <div className={cn(
                                                "text-[10px] font-bold uppercase",
                                                sector.change.startsWith('+') ? "text-white" : "text-gray-500"
                                            )}>{sector.change}</div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === 'industries' && (
                    <Card className="bg-card border-border shadow-2xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-white">Industry Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="border-border hover:bg-transparent">
                                    <TableRow className="border-border hover:bg-transparent">
                                        <TableHead className="text-gray-500 font-bold uppercase text-[10px]">Industry</TableHead>
                                        <TableHead className="text-gray-500 font-bold uppercase text-[10px] text-right">Stocks</TableHead>
                                        <TableHead className="text-gray-500 font-bold uppercase text-[10px] text-right">Avg Change</TableHead>
                                        <TableHead className="text-gray-500 font-bold uppercase text-[10px] text-right">Top Stock</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {industryData.map((item, i) => (
                                        <TableRow key={i} className="border-border hover:bg-secondary/20 transition-colors">
                                            <TableCell className="font-medium text-white">{item.industry}</TableCell>
                                            <TableCell className="text-right text-gray-400 font-mono">{item.stocks}</TableCell>
                                            <TableCell className={cn(
                                                "text-right font-bold",
                                                item.change.startsWith('+') ? "text-white" : "text-gray-500"
                                            )}>{item.change}</TableCell>
                                            <TableCell className="text-right text-white font-bold">{item.topStock}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'earnings' && (
                    <Card className="bg-card border-border shadow-2xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-white">Latest Earnings Reports</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="border-border hover:bg-transparent">
                                    <TableRow className="border-border hover:bg-transparent">
                                        <TableHead className="text-gray-500 font-bold uppercase text-[10px]">Company</TableHead>
                                        <TableHead className="text-gray-500 font-bold uppercase text-[10px] text-right">Revenue</TableHead>
                                        <TableHead className="text-gray-500 font-bold uppercase text-[10px] text-right">Profit</TableHead>
                                        <TableHead className="text-gray-500 font-bold uppercase text-[10px] text-right">Growth %</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {earningsData.map((item, i) => (
                                        <TableRow key={i} className="border-border hover:bg-secondary/20 transition-colors">
                                            <TableCell className="font-bold text-white">{item.company}</TableCell>
                                            <TableCell className="text-right text-gray-400 font-mono">{item.revenue}</TableCell>
                                            <TableCell className="text-right text-white font-mono">{item.profit}</TableCell>
                                            <TableCell className="text-right text-white font-bold">{item.growth}</TableCell>
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
