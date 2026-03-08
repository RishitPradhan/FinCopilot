'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
    Sector
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    Activity,
    Minus,
    Plus,
    Trash2,
    Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const STOCK_DATABASE = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2985.40, sector: 'Energy' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4120.15, sector: 'Technology' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1642.80, sector: 'Banking' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1540.30, sector: 'Technology' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1085.60, sector: 'Banking' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 1210.45, sector: 'Telecom' },
];

const COLORS = ['#ffffff', '#bbbbbb', '#888888', '#555555', '#222222', '#10b981'];

// Custom Active Shape for "3D Floating" effect on hover
const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);

    // Offset for "floating" effect
    const offset = 15;
    const ox = cos * offset;
    const oy = sin * offset;

    return (
        <g style={{ transition: 'all 0.3s ease' }}>
            <text x={cx + ox} y={cy + oy} dy={8} textAnchor="middle" fill="#fff" className="font-black italic uppercase text-[12px] filter drop-shadow-md">
                {payload.name}
            </text>
            {/* Shadow layer */}
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill="rgba(0,0,0,0.5)"
            />
            {/* Floating sector */}
            <Sector
                cx={cx + ox}
                cy={cy + oy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 5}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                stroke="#fff"
                strokeWidth={2}
            />
        </g>
    );
};

export default function PortfolioPage() {
    const { holdings, wishlist, updateQuantity, removeHolding, totalInvested, currentValue } = usePortfolioStore();
    const [activeIndex, setActiveIndex] = useState(-1);

    const totalPnL = currentValue - totalInvested;
    const pnlPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

    // Data for Bar Chart: P&L per stock
    const barData = useMemo(() => {
        return holdings.map(h => ({
            name: h.ticker,
            pnl: (h.currentPrice - h.buyPrice) * h.quantity
        }));
    }, [holdings]);

    // Data for Pie Chart: Allocation
    const pieData = useMemo(() => {
        return holdings.map(h => ({
            name: h.ticker,
            value: h.currentPrice * h.quantity
        }));
    }, [holdings]);

    const wishlistStocks = useMemo(() => {
        return STOCK_DATABASE.filter(s => wishlist.includes(s.symbol));
    }, [wishlist]);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(-1);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-5xl font-black text-white mb-2 tracking-tighter uppercase italic">Portfolio</h1>
                    <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-black">Holdings & Asset Synthesis Engine</p>
                </div>
            </div>

            {/* TOP SECTION: 3 CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 1. Total Amount */}
                <Card className="premium-card bg-gradient-to-br from-white/[0.03] to-transparent p-6 flex flex-col justify-center">
                    <CardHeader className="p-0 mb-4">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Net Portfolio Value</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="text-5xl font-black text-white font-mono tracking-tighter mb-4 italic">${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className="flex items-center gap-4">
                            <div className={cn("flex items-center px-4 py-2 rounded-2xl font-black text-sm italic border", totalPnL >= 0 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20")}>
                                {totalPnL >= 0 ? <TrendingUp className="h-4 w-4 mr-2" /> : <TrendingDown className="h-4 w-4 mr-2" />}
                                {totalPnL >= 0 ? '+' : ''}{totalPnL.toLocaleString(undefined, { maximumFractionDigits: 2 })} ({pnlPercent.toFixed(2)}%)
                            </div>
                            <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest leading-none">Overall Profit/Loss</span>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Bar Graph: P&L per stock */}
                <Card className="premium-card p-6 min-h-[350px] relative">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-white">Profit & Loss Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 h-[250px]">
                        {holdings.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#fff"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                                        className="font-black italic uppercase"
                                    />
                                    <YAxis
                                        stroke="#fff"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                                        className="font-mono"
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                                        itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                                    />
                                    <Bar dataKey="pnl" radius={[6, 6, 0, 0]}>
                                        {barData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.pnl >= 0 ? '#10b981' : '#f43f5e'}
                                                className="transition-all duration-300 hover:opacity-80 shadow-2xl"
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-700 font-bold uppercase text-[9px] tracking-widest">No Holdings Detected</div>
                        )}
                    </CardContent>
                </Card>

                {/* 3. 3D-style Pie Chart: Allocation */}
                <Card className="premium-card p-6 min-h-[350px]">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-white">Asset Allocation (3D Sync)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 h-[250px] flex items-center justify-center relative">
                        {holdings.length > 0 ? (
                            <div className="w-full h-full transform transition-transform duration-700" style={{ perspective: '1000px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart style={{ transform: 'rotateX(35deg)' }}>
                                        <Pie
                                            activeIndex={activeIndex}
                                            activeShape={renderActiveShape}
                                            data={pieData}
                                            innerRadius={65}
                                            outerRadius={85}
                                            paddingAngle={8}
                                            dataKey="value"
                                            stroke="none"
                                            onMouseEnter={onPieEnter}
                                            onMouseLeave={onPieLeave}
                                            animationBegin={0}
                                            animationDuration={1500}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                    className="outline-none"
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                            formatter={(val) => <span className="text-[10px] font-black uppercase text-gray-400 italic tracking-tighter">{val}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-700 font-bold uppercase text-[9px] tracking-widest">Awaiting Accumulation</div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* BOTTOM SECTION: WISHLIST & QUANTITY UPDATES */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Your Wishlist Tracker */}
                <Card className="premium-card">
                    <CardHeader className="bg-white/[0.02] border-b border-white/5 p-8 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-black text-white italic uppercase tracking-tighter">Wishlist Pipeline</CardTitle>
                            <CardDescription className="text-gray-600 font-black uppercase tracking-widest text-[9px] mt-1">Acquisition Opportunities from Screener</CardDescription>
                        </div>
                        <Badge variant="outline" className="border-white/5 bg-white/5 text-gray-400 text-[10px] font-black">{wishlist.length} Assets</Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {wishlistStocks.length > 0 ? wishlistStocks.map((s) => {
                                const currentHolding = holdings.find(h => h.ticker === s.symbol);
                                return (
                                    <div key={s.symbol} className="p-8 flex items-center justify-between hover:bg-white/[0.01] transition-colors group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center font-black italic text-white group-hover:bg-white group-hover:text-black transition-all">
                                                {s.symbol.substring(0, 2)}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-black italic uppercase tracking-tighter">{s.symbol}</h4>
                                                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{s.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-10">
                                            <div className="text-right">
                                                <p className="text-white font-mono font-black italic">${s.price.toLocaleString()}</p>
                                                <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest">Market Price</p>
                                            </div>
                                            <div className="flex items-center bg-black/40 border border-white/5 rounded-2xl p-1 gap-1 shadow-2xl">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-xl text-gray-500 hover:text-white hover:bg-white/[0.05]"
                                                    onClick={() => updateQuantity(s.symbol, (currentHolding?.quantity || 0) - 1, s.price, s.name, s.sector)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <div className="w-12 text-center text-xs font-black text-white font-mono">
                                                    {currentHolding?.quantity || 0}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-xl text-gray-500 hover:text-white hover:bg-white/[0.05]"
                                                    onClick={() => updateQuantity(s.symbol, (currentHolding?.quantity || 0) + 1, s.price, s.name, s.sector)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="p-20 text-center flex flex-col items-center justify-center space-y-4">
                                    <Activity className="h-12 w-12 text-gray-800" />
                                    <p className="text-gray-600 font-black uppercase tracking-[0.2em] text-[10px]">Your wishlist is offline. Add stocks from the Screener.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Right: Active Portfolio Status */}
                <Card className="premium-card">
                    <CardHeader className="bg-white/[0.02] border-b border-white/5 p-8">
                        <CardTitle className="text-xl font-black text-white italic uppercase tracking-tighter">Synthesis Terminal</CardTitle>
                        <CardDescription className="text-gray-600 font-black uppercase tracking-widest text-[9px] mt-1">Live Holding Status & Liquidity</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="border-white/5 bg-white/[0.01]">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 pl-8">Asset</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">Shares</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 text-right pr-8">Allocation</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {holdings.length > 0 ? holdings.map((h) => (
                                    <TableRow key={h.ticker} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <TableCell className="pl-8">
                                            <div className="flex flex-col">
                                                <span className="text-white font-black italic tracking-tighter uppercase">{h.ticker}</span>
                                                <span className="text-[8px] text-gray-600 lowercase font-bold font-mono tracking-tighter">{h.sector}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-white font-mono font-black italic">{h.quantity}</TableCell>
                                        <TableCell className="text-right pr-8">
                                            <div className="text-white font-mono font-black italic">${(h.currentPrice * h.quantity).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                            <div className="text-[8px] text-gray-500 uppercase font-black tracking-widest">{((h.currentPrice * h.quantity) / currentValue * 100).toFixed(1)}%</div>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-64 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <Briefcase className="h-10 w-10 text-gray-800" />
                                                <p className="text-gray-700 font-black uppercase text-[9px] tracking-widest italic leading-none">Zero Active Positions Detected</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
