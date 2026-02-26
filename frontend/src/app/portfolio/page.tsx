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
    { name: 'Technology', value: 65, color: '#00d4ff' },
    { name: 'Automotive', value: 15, color: '#10b981' },
    { name: 'Energy', value: 20, color: '#f59e0b' },
];

const performanceData = [
    { month: 'Jan', value: 45000 },
    { month: 'Feb', value: 52000 },
    { month: 'Mar', value: 48000 },
    { month: 'Apr', value: 61000 },
    { month: 'May', value: 68000 },
];

const COLORS = ['#00d4ff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function PortfolioPage() {
    const [holdings, setHoldings] = useState(initialHoldings);

    const totalInvested = holdings.reduce((acc, h) => acc + h.buyPrice * h.qty, 0);
    const currentValue = holdings.reduce((acc, h) => acc + h.currentPrice * h.qty, 0);
    const totalPnL = currentValue - totalInvested;
    const pnlPercent = (totalPnL / totalInvested) * 100;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Portfolio Analyzer</h1>
                    <p className="text-gray-400">Deep dive into your assets and risk profile.</p>
                </div>
                <Button className="bg-[#00d4ff] text-[#0a0f1e] hover:bg-[#00b8e6] font-bold">
                    <Plus className="h-4 w-4 mr-2" /> Add New Holding
                </Button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-[#111827] border-[#1f2937]">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Invested</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white font-mono">${totalInvested.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#111827] border-[#1f2937]">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-wider text-gray-500">Current Value</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white font-mono">${currentValue.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#111827] border-[#1f2937]">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-wider text-gray-500">Overall P&L</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={cn("text-2xl font-bold font-mono", totalPnL >= 0 ? "text-emerald-400" : "text-red-400")}>
                            {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString()}
                        </div>
                        <div className={cn("flex items-center text-xs mt-1 font-bold", totalPnL >= 0 ? "text-emerald-400" : "text-red-400")}>
                            {totalPnL >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                            {pnlPercent.toFixed(2)}%
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-[#111827] border-[#1f2937]">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-widest text-gray-500">Risk Score</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center space-x-3">
                        <div className="text-2xl font-bold text-[#00d4ff] font-mono">68<span className="text-sm text-gray-500 ml-1">/100</span></div>
                        <Badge className="bg-orange-500/10 text-orange-500 border-none font-bold">Moderate</Badge>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Holdings Table */}
                <Card className="lg:col-span-2 bg-[#111827] border-[#1f2937]">
                    <CardHeader className="border-b border-[#1f2937]/50">
                        <CardTitle className="text-lg text-white font-bold flex items-center">
                            <Activity className="h-4 w-4 mr-2 text-[#00d4ff]" />
                            Your Holdings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader className="border-[#1f2937] hover:bg-transparent">
                                <TableRow className="border-[#1f2937] hover:bg-transparent">
                                    <TableHead className="text-gray-500 font-bold">Stock</TableHead>
                                    <TableHead className="text-gray-500 font-bold">Qty</TableHead>
                                    <TableHead className="text-gray-500 font-bold">Buy Price</TableHead>
                                    <TableHead className="text-gray-500 font-bold">Current</TableHead>
                                    <TableHead className="text-gray-500 font-bold text-right">P&L</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {holdings.map((h) => {
                                    const pnl = (h.currentPrice - h.buyPrice) * h.qty;
                                    const pnlPct = ((h.currentPrice - h.buyPrice) / h.buyPrice) * 100;
                                    return (
                                        <TableRow key={h.id} className="border-[#1f2937] hover:bg-[#1f2937]/30">
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold">{h.ticker}</span>
                                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{h.sector}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-gray-300 font-mono">{h.qty}</TableCell>
                                            <TableCell className="text-gray-400 font-mono">${h.buyPrice}</TableCell>
                                            <TableCell className="text-white font-mono font-semibold">${h.currentPrice}</TableCell>
                                            <TableCell className="text-right">
                                                <div className={cn("text-sm font-bold", pnl >= 0 ? "text-emerald-400" : "text-red-400")}>
                                                    {pnl >= 0 ? '+' : ''}${pnl.toLocaleString()}
                                                </div>
                                                <div className={cn("text-[10px] font-bold", pnl >= 0 ? "text-emerald-500" : "text-red-500")}>
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
                    <Card className="bg-[#111827] border-[#1f2937]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-white font-bold flex items-center">
                                <PieChartIcon className="h-4 w-4 mr-2 text-[#00d4ff]" />
                                Sector Allocation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[250px]">
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
                                        contentStyle={{ backgroundColor: '#0a0f1e', border: '1px solid #1f2937', color: '#fff' }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        align="center"
                                        iconType="circle"
                                        formatter={(value) => <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#111827] border-[#1f2937] overflow-hidden">
                        {/* Risk Meter - Custom SVG Gauge */}
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-white font-bold flex items-center">
                                <ShieldAlert className="h-4 w-4 mr-2 text-orange-400" />
                                Risk Exposure
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <div className="relative w-48 h-24 mb-4">
                                <svg className="w-full h-full" viewBox="0 0 100 50">
                                    <path
                                        d="M 10 45 A 40 40 0 0 1 90 45"
                                        fill="none"
                                        stroke="#1f2937"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M 10 45 A 40 40 0 0 1 80 20"
                                        fill="none"
                                        stroke="#00d4ff"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray="125"
                                        strokeDashoffset="20"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                                    <span className="text-2xl font-bold text-white font-mono">68%</span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Moderate-High</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-center text-gray-400 px-4">
                                Your portfolio leans heavily towards Tech. High volatility expected during earnings season.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Portfolio Growth Chart */}
            <Card className="bg-[#111827] border-[#1f2937]">
                <CardHeader>
                    <CardTitle className="text-xl text-white font-bold flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2 text-[#00d4ff]" />
                        Growth Performance
                    </CardTitle>
                    <CardDescription className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">Projected vs Actual Portfolio Value</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                            <XAxis dataKey="month" stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0a0f1e', border: '1px solid #1f2937', color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={3} dot={{ fill: '#00d4ff', r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
