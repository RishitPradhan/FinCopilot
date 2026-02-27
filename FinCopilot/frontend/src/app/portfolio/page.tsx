'use client';

import React, { useState, useEffect } from 'react';
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
    ArrowDownRight,
    Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWatchlistStore, WatchlistItem } from '@/store/watchlistStore';

// Chart colors for pie chart
const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

export default function PortfolioPage() {
    const { items: watchlistItems, fetchWatchlist, removeItem, updateQuantity, isLoading } = useWatchlistStore();
    
    useEffect(() => {
        fetchWatchlist();
    }, [fetchWatchlist]);

    // Calculate totals from watchlist
    const totalValue = watchlistItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalChange = watchlistItems.reduce((acc, item) => acc + (item.change * item.quantity), 0);
    const totalChangePercent = watchlistItems.length > 0 
        ? (totalChange / (totalValue - totalChange)) * 100 
        : 0;

    // P&L data for bar chart (using mock buy prices for demonstration)
    const pnlData = watchlistItems.map(item => {
        const mockBuyPrice = item.price * 0.9; // Simulating 10% lower buy price
        const currentValue = item.price * item.quantity;
        const investedValue = mockBuyPrice * item.quantity;
        const pnl = currentValue - investedValue;
        return {
            name: item.ticker,
            pnl: pnl,
            isProfit: pnl >= 0
        };
    });

    // Pie chart data for quantity allocation
    const pieData = watchlistItems.map((item, index) => ({
        name: item.ticker,
        value: item.quantity,
        color: CHART_COLORS[index % CHART_COLORS.length]
    }));

    const handleQuantityChange = async (ticker: string, newQty: number) => {
        if (newQty > 0) {
            await updateQuantity(ticker, newQty);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
                    <p className="text-gray-400">Track your watchlist investments and performance.</p>
                </div>
                <Button className="bg-white text-black hover:bg-gray-200 font-bold">
                    <Plus className="h-4 w-4 mr-2" /> Add Stock
                </Button>
            </div>

            {/* Top Section: 3 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Total Value Card */}
                <Card className="bg-card border-border shadow-xl">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Portfolio Value</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-white font-mono">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className={cn("flex items-center text-sm mt-2 font-bold", totalChange >= 0 ? "text-green-400" : "text-red-400")}>
                            {totalChange >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                            {totalChange >= 0 ? '+' : ''}${totalChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({totalChangePercent.toFixed(2)}%)
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            Based on {watchlistItems.length} stocks in watchlist
                        </div>
                    </CardContent>
                </Card>

                {/* Middle: P&L Bar Chart */}
                <Card className="bg-card border-border shadow-xl">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-wider text-gray-500">Profit & Loss</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[140px]">
                        {pnlData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={pnlData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                                    <XAxis type="number" stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                                    <YAxis type="category" dataKey="name" stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} width={50} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #222', color: '#fff' }}
                                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'P&L']}
                                    />
                                    <Bar dataKey="pnl" radius={[0, 4, 4, 0]}>
                                        {pnlData.map((entry, index) => (
                                            <Cell key={index} fill={entry.isProfit ? '#10b981' : '#ef4444'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                No stocks in watchlist
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Right: 3D Pie Chart */}
                <Card className="bg-card border-border shadow-xl">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-wider text-gray-500">Quantity Allocation</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[140px]">
                        {pieData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={30}
                                        outerRadius={50}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #222', color: '#fff' }}
                                    />
                                    <Legend
                                        verticalAlign="middle"
                                        align="right"
                                        layout="vertical"
                                        iconType="circle"
                                        formatter={(value) => <span className="text-[10px] font-bold text-gray-400">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                No stocks to display
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Bottom: Watchlist Table */}
            <Card className="bg-card border-border shadow-xl">
                <CardHeader className="border-b border-border/50">
                    <CardTitle className="text-lg text-white font-bold flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        Your Watchlist
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Stocks from screener - quantities can be adjusted
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {watchlistItems.length > 0 ? (
                        <Table>
                            <TableHeader className="border-border hover:bg-transparent">
                                <TableRow className="border-border hover:bg-transparent">
                                    <TableHead className="text-gray-500 font-bold">Stock</TableHead>
                                    <TableHead className="text-gray-500 font-bold text-right">Price</TableHead>
                                    <TableHead className="text-gray-500 font-bold text-right">Change</TableHead>
                                    <TableHead className="text-gray-500 font-bold text-center">Quantity</TableHead>
                                    <TableHead className="text-gray-500 font-bold text-right">Total Value</TableHead>
                                    <TableHead className="text-gray-500 font-bold text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {watchlistItems.map((item) => {
                                    const totalItemValue = item.price * item.quantity;
                                    const isPositive = item.change >= 0;
                                    return (
                                        <TableRow key={item.ticker} className="border-border hover:bg-secondary/30">
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold">{item.ticker}</span>
                                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{item.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right text-white font-mono font-semibold">
                                                ${item.price.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className={cn("flex items-center justify-end gap-1 font-mono", isPositive ? "text-green-400" : "text-red-400")}>
                                                    {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                                    {isPositive ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="h-7 w-7 p-0"
                                                        onClick={() => handleQuantityChange(item.ticker, item.quantity - 1)}
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="text-white font-mono w-8 text-center">{item.quantity}</span>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="h-7 w-7 p-0"
                                                        onClick={() => handleQuantityChange(item.ticker, item.quantity + 1)}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right text-white font-mono font-semibold">
                                                ${totalItemValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    className="text-red-400 hover:text-red-300"
                                                    onClick={() => removeItem(item.ticker)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                            <Star className="h-12 w-12 mb-4 opacity-50" />
                            <p className="text-lg font-bold">No stocks in watchlist</p>
                            <p className="text-sm">Add stocks from the Screener page to see them here</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
