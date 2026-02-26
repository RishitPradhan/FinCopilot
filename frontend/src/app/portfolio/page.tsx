'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    LineChart,
    Line
} from 'recharts';
import {
    Plus,
    Trash2,
    TrendingUp,
    TrendingDown,
    ShieldAlert,
    PieChart as PieChartIcon,
    BarChart3,
    Activity,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const initialHoldings = [
    { id: '1', ticker: 'AAPL', qty: 10, buyPrice: 150, currentPrice: 185, sector: 'Technology' },
    { id: '2', ticker: 'TSLA', qty: 5, buyPrice: 220, currentPrice: 178, sector: 'Automotive' },
    { id: '3', ticker: 'GOOGL', qty: 8, buyPrice: 130, currentPrice: 165, sector: 'Technology' },
    { id: '4', ticker: 'MSFT', qty: 12, buyPrice: 380, currentPrice: 425, sector: 'Technology' },
    { id: '5', ticker: 'REL-IN', qty: 20, buyPrice: 2400, currentPrice: 2850, sector: 'Energy' },
];

const sectorData = [
    { name: 'Technology', value: 65, color: '#ffffff' },
    { name: 'Automotive', value: 15, color: '#888888' },
    { name: 'Energy', value: 20, color: '#444444' },
];

const performanceData = [
    { month: 'Jan', value: 45000 },
    { month: 'Feb', value: 52000 },
    { month: 'Mar', value: 48000 },
    { month: 'Apr', value: 61000 },
    { month: 'May', value: 68000 },
];

const COLORS = ['#ffffff', '#bbbbbb', '#888888', '#555555', '#222222'];

export default function PortfolioPage() {
    const [holdings, setHoldings] = useState(initialHoldings);

    const totalInvested = holdings.reduce((acc, h) => acc + h.buyPrice * h.qty, 0);
    const currentValue = holdings.reduce((acc, h) => acc + h.currentPrice * h.qty, 0);
    const totalPnL = currentValue - totalInvested;
    const pnlPercent = (totalPnL / totalInvested) * 100;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Portfolio Catalyst</h1>
                    <p className="text-gray-400 font-medium">Deep dive into your assets and risk profile.</p>
                </div>
                <Button className="bg-white text-black hover:bg-neutral-200 font-black px-6 py-2 rounded-xl transition-all active:scale-95 shadow-lg">
                    <Plus className="h-4 w-4 mr-2" /> Add New Holding
                </Button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="premium-card">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Total Invested</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-white font-mono tracking-tighter">${totalInvested.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="premium-card">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Current Value</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-white font-mono tracking-tighter">${currentValue.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="premium-card">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Overall P&L</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={cn("text-3xl font-black font-mono tracking-tighter", totalPnL >= 0 ? "text-emerald-400" : "text-rose-400")}>
                            {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString()}
                        </div>
                        <div className="flex items-center mt-2">
                            <div className={cn(totalPnL >= 0 ? "trend-up" : "trend-down")}>
                                {totalPnL >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                {pnlPercent.toFixed(2)}%
                            </div>
                            <span className="text-[10px] text-gray-600 ml-3 uppercase font-bold tracking-wider">Total Return</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="premium-card">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Risk Score</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center space-x-3">
                        <div className="text-3xl font-black text-white font-mono tracking-tighter">68<span className="text-sm text-gray-600 ml-1">/100</span></div>
                        <Badge className="bg-white/5 text-white border-white/10 font-bold px-3 py-1 rounded-full uppercase tracking-widest text-[10px]">Moderate</Badge>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Holdings Table */}
                <Card className="lg:col-span-2 premium-card">
                    <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                        <CardTitle className="text-xl font-black text-white flex items-center tracking-tight">
                            <Activity className="h-5 w-5 mr-3 text-primary" />
                            Your Holdings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="border-white/5 hover:bg-transparent bg-white/[0.01]">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="text-gray-500 font-black uppercase tracking-widest text-[10px] py-4">Stock</TableHead>
                                    <TableHead className="text-gray-500 font-black uppercase tracking-widest text-[10px] py-4">Qty</TableHead>
                                    <TableHead className="text-gray-500 font-black uppercase tracking-widest text-[10px] py-4">Buy Price</TableHead>
                                    <TableHead className="text-gray-500 font-black uppercase tracking-widest text-[10px] py-4">Current</TableHead>
                                    <TableHead className="text-gray-500 font-black uppercase tracking-widest text-[10px] py-4 text-right">P&L</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {holdings.map((h) => {
                                    const pnl = (h.currentPrice - h.buyPrice) * h.qty;
                                    const pnlPct = ((h.currentPrice - h.buyPrice) / h.buyPrice) * 100;
                                    return (
                                        <TableRow key={h.id} className="border-white/5 hover:bg-white/[0.03] transition-colors group">
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-white font-black tracking-tight group-hover:text-primary transition-colors">{h.ticker}</span>
                                                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">{h.sector}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-gray-300 font-mono font-medium">{h.qty}</TableCell>
                                            <TableCell className="text-gray-500 font-mono">${h.buyPrice}</TableCell>
                                            <TableCell className="text-white font-mono font-black">${h.currentPrice}</TableCell>
                                            <TableCell className="text-right">
                                                <div className={cn("text-sm font-black font-mono", pnl >= 0 ? "text-emerald-400" : "text-rose-400")}>
                                                    {pnl >= 0 ? '+' : ''}${pnl.toLocaleString()}
                                                </div>
                                                <div className={cn("text-[10px] font-bold mt-1", pnl >= 0 ? "text-emerald-500/60" : "text-rose-500/60")}>
                                                    {pnlPct.toFixed(1)}%
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Analytics Section */}
                <div className="space-y-6">
                    <Card className="premium-card">
                        <CardHeader className="pb-2 border-b border-white/5 bg-white/[0.02]">
                            <CardTitle className="text-lg font-black text-white flex items-center tracking-tight">
                                <PieChartIcon className="h-5 w-5 mr-3 text-primary" />
                                Sector Allocation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[250px] p-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sectorData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {sectorData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#0a0a0a',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            color: '#fff',
                                            backdropFilter: 'blur(10px)'
                                        }}
                                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        align="center"
                                        iconType="circle"
                                        formatter={(value) => <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="premium-card bg-gradient-to-b from-card/50 to-rose-500/[0.02]">
                        <CardHeader className="pb-2 border-b border-white/5 bg-white/[0.02]">
                            <CardTitle className="text-lg font-black text-white flex items-center tracking-tight">
                                <ShieldAlert className="h-5 w-5 mr-3 text-rose-400" />
                                Risk Exposure
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center p-6">
                            <div className="relative w-48 h-24 mb-6">
                                <svg className="w-full h-full" viewBox="0 0 100 50">
                                    <path
                                        d="M 10 45 A 40 40 0 0 1 90 45"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.05)"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M 10 45 A 40 40 0 0 1 80 20"
                                        fill="none"
                                        stroke="#fff"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray="125"
                                        strokeDashoffset="20"
                                        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                                    <span className="text-3xl font-black text-white font-mono tracking-tighter">68%</span>
                                    <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Moderate-High</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-center text-gray-500 px-2 font-medium leading-relaxed">
                                Your portfolio leans heavily towards <span className="text-white font-bold">Tech</span>. High volatility expected during earnings season.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Portfolio Growth Chart */}
            <Card className="premium-card">
                <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-xl font-black text-white flex items-center tracking-tight">
                                <BarChart3 className="h-5 w-5 mr-3 text-primary" />
                                Growth Performance
                            </CardTitle>
                            <CardDescription className="text-gray-500 uppercase text-[9px] tracking-[0.2em] font-black mt-1">Projected vs Actual Portfolio Value</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[350px] p-6 pt-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                            <defs>
                                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#fff" stopOpacity={0.2} />
                                    <stop offset="50%" stopColor="#fff" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#fff" stopOpacity={0.2} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="month" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    backdropFilter: 'blur(10px)'
                                }}
                                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="url(#lineGradient)"
                                strokeWidth={4}
                                dot={{ fill: '#fff', r: 4, strokeWidth: 2, stroke: '#000' }}
                                activeDot={{ r: 8, fill: '#fff' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
