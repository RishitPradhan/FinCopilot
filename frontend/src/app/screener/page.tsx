'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Search,
    Plus,
    TrendingUp,
    TrendingDown,
    Layers,
    Globe,
    Zap,
    Calendar,
    Handshake,
    Activity,
    Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { usePortfolioStore } from '@/store/usePortfolioStore';

// --- MOCK DATA ---

const stockScreenerData = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2985.40, change: 1.25, mktCap: '20.1T', pe: 28.4, sector: 'Energy' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4120.15, change: -0.45, mktCap: '14.9T', pe: 31.2, sector: 'Technology' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1642.80, change: 0.85, mktCap: '12.5T', pe: 18.7, sector: 'Banking' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1540.30, change: 2.10, mktCap: '6.4T', pe: 24.1, sector: 'Technology' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1085.60, change: 0.30, mktCap: '7.6T', pe: 17.5, sector: 'Banking' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 1210.45, change: -1.15, mktCap: '6.8T', pe: 54.2, sector: 'Telecom' },
];

const indexScreenerData = [
    { name: 'NIFTY 50', value: 22450.30, change: 0.65, high: 22510, low: 22380 },
    { name: 'SENSEX', value: 73950.15, change: 0.58, high: 74100, low: 73750 },
    { name: 'NIFTY BANK', value: 47850.80, change: 1.12, high: 48000, low: 47600 },
    { name: 'NIFTY IT', value: 36240.45, change: -0.25, high: 36500, low: 36100 },
    { name: 'S&P 500', value: 5130.60, change: 0.82, high: 5150, low: 5110 },
];

const etfScreenerData = [
    { symbol: 'NIFTYBEES', name: 'Nippon India Nifty BEES', asset: 'Equity', netAssets: '15.4B', expense: 0.05, ytd: 12.4 },
    { symbol: 'GOLDBEES', name: 'Nippon India Gold BEES', asset: 'Commodity', netAssets: '8.2B', expense: 0.10, ytd: 15.6 },
    { symbol: 'BANKBEES', name: 'Nippon India Bank BEES', asset: 'Equity', netAssets: '12.1B', expense: 0.05, ytd: 8.9 },
    { symbol: 'JUNIORBEES', name: 'Nippon India Next 50', asset: 'Equity', netAssets: '5.6B', expense: 0.12, ytd: 18.2 },
];

const ipoScreenerData = [
    { company: 'Ola Electric', date: '2024-06-15', issuePrice: 76, currentPrice: 110, gain: 44.7 },
    { company: 'Brainbees (FirstCry)', date: '2024-05-30', issuePrice: 465, currentPrice: 620, gain: 33.3 },
    { company: 'Indegene Ltd', date: '2024-05-12', issuePrice: 452, currentPrice: 580, gain: 28.3 },
    { company: 'Go Digit', date: '2024-05-20', issuePrice: 272, currentPrice: 320, gain: 17.6 },
];

const dealsScreenerData = [
    { date: '2024-03-05', company: 'Adani Power', client: 'GQG Partners', type: 'Bulk Deal', value: '1.2B', status: 'Completed' },
    { date: '2024-03-04', company: 'Paytm', client: 'Ant Financial', type: 'Block Deal', value: '450M', status: 'In Progress' },
    { date: '2024-03-02', company: 'Vedanta', client: 'Promoters', type: 'Insider Buy', value: '120M', status: 'Completed' },
    { date: '2024-02-28', company: 'Zomato', client: 'SoftBank', type: 'Exit', value: '800M', status: 'Completed' },
];

const intradayScreenerData = [
    { symbol: 'SBIN', volatility: 'High', volume: '15.2M', rsi: 65, signal: 'BUY' },
    { symbol: 'TITAN', volatility: 'Medium', volume: '2.4M', rsi: 42, signal: 'NEUTRAL' },
    { symbol: 'M&M', volatility: 'High', volume: '8.1M', rsi: 72, signal: 'SELL' },
    { symbol: 'COALINDIA', volatility: 'Low', volume: '22.4M', rsi: 55, signal: 'BUY' },
];

export default function ScreenerPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const { wishlist, toggleWishlist } = usePortfolioStore();
    const { toast } = useToast();

    const handleWishlistToggle = (symbol: string) => {
        const isRemoving = wishlist.includes(symbol);
        toggleWishlist(symbol);
        toast({
            title: isRemoving ? "Removed from Wishlist" : "Added to Portfolio",
            description: isRemoving
                ? `${symbol} has been removed from your radar.`
                : `${symbol} has been added to your wishlist. Go to Portfolio to set quantity.`,
        });
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-5xl font-black text-white mb-2 tracking-tighter uppercase italic">Screeners</h1>
                    <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-black">Multi-Asset Discovery & Filtration Engine</p>
                </div>
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />
                    <Input
                        placeholder="SEARCH ASSETS, DEALS, IPOs..."
                        className="bg-white/[0.03] border-white/10 pl-11 h-12 rounded-2xl text-white font-bold placeholder:text-gray-600 focus:ring-primary/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="stocks" className="space-y-8">
                <TabsList className="bg-black/40 border border-white/5 p-1 h-14 rounded-2xl backdrop-blur-3xl overflow-x-auto no-scrollbar flex-nowrap w-full justify-start md:justify-center">
                    <TabsTrigger value="stocks" className="rounded-xl px-6 data-[state=active]:bg-white data-[state=active]:text-black font-black uppercase tracking-widest text-[9px] flex items-center gap-2">
                        <Layers className="h-4 w-4" /> Stock Screener
                    </TabsTrigger>
                    <TabsTrigger value="index" className="rounded-xl px-6 data-[state=active]:bg-white data-[state=active]:text-black font-black uppercase tracking-widest text-[9px] flex items-center gap-2">
                        <Globe className="h-4 w-4" /> Index Screener
                    </TabsTrigger>
                    <TabsTrigger value="etf" className="rounded-xl px-6 data-[state=active]:bg-white data-[state=active]:text-black font-black uppercase tracking-widest text-[9px] flex items-center gap-2">
                        <Zap className="h-4 w-4" /> ETF Screener
                    </TabsTrigger>
                    <TabsTrigger value="ipo" className="rounded-xl px-6 data-[state=active]:bg-white data-[state=active]:text-black font-black uppercase tracking-widest text-[9px] flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> IPO Screener
                    </TabsTrigger>
                    <TabsTrigger value="deals" className="rounded-xl px-6 data-[state=active]:bg-white data-[state=active]:text-black font-black uppercase tracking-widest text-[9px] flex items-center gap-2">
                        <Handshake className="h-4 w-4" /> Deals Screener
                    </TabsTrigger>
                    <TabsTrigger value="intraday" className="rounded-xl px-6 data-[state=active]:bg-white data-[state=active]:text-black font-black uppercase tracking-widest text-[9px] flex items-center gap-2">
                        <Activity className="h-4 w-4" /> Intraday Screener
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="stocks">
                    <Card className="premium-card overflow-hidden">
                        <Table>
                            <TableHeader className="bg-white/[0.01] border-b border-white/5">
                                <TableRow className="hover:bg-transparent border-white/5">
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 pl-8">SYMBOL</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">NAME</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">PRICE</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">CHANGE</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">MARKET CAP</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">P/E RATIO</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 text-right pr-8">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stockScreenerData.map((s) => (
                                    <TableRow key={s.symbol} className="border-white/5 hover:bg-white/[0.03] transition-colors group">
                                        <TableCell className="pl-8 text-white font-black italic tracking-tighter text-base">{s.symbol}</TableCell>
                                        <TableCell className="text-gray-400 font-bold text-xs uppercase">{s.name}</TableCell>
                                        <TableCell className="text-white font-mono font-black italic">${s.price.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <span className={cn("flex items-center text-[10px] font-black", s.change >= 0 ? "text-emerald-400" : "text-rose-400")}>
                                                {s.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                                {s.change}%
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-gray-300 font-bold text-xs">{s.mktCap}</TableCell>
                                        <TableCell className="text-white font-mono text-xs">{s.pe}</TableCell>
                                        <TableCell className="text-right pr-8">
                                            <Button
                                                onClick={() => handleWishlistToggle(s.symbol)}
                                                variant="ghost"
                                                size="sm"
                                                className={cn(
                                                    "rounded-xl hover:bg-white hover:text-black transition-all group-hover:scale-105",
                                                    wishlist.includes(s.symbol) && "text-primary bg-primary/10"
                                                )}
                                            >
                                                {wishlist.includes(s.symbol) ? <Star className="h-4 w-4 fill-current" /> : <Plus className="h-4 w-4 mr-2" />}
                                                {wishlist.includes(s.symbol) ? "In Wishlist" : "Wishlist"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="index">
                    <Card className="premium-card overflow-hidden">
                        <Table>
                            <TableHeader className="bg-white/[0.01] border-b border-white/5">
                                <TableRow className="hover:bg-transparent border-white/5">
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 pl-8">INDEX NAME</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">VALUE</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">CHANGE %</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">DAY HIGH</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 text-right pr-8">DAY LOW</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {indexScreenerData.map((i) => (
                                    <TableRow key={i.name} className="border-white/5 hover:bg-white/[0.03] transition-colors">
                                        <TableCell className="pl-8 text-white font-black italic text-base">{i.name}</TableCell>
                                        <TableCell className="text-white font-mono font-black italic">{i.value.toLocaleString()}</TableCell>
                                        <TableCell className={cn("text-xs font-black", i.change >= 0 ? "text-emerald-400" : "text-rose-400")}>
                                            {i.change >= 0 ? '+' : ''}{i.change}%
                                        </TableCell>
                                        <TableCell className="text-gray-400 font-mono text-xs">{i.high.toLocaleString()}</TableCell>
                                        <TableCell className="text-right pr-8 text-gray-500 font-mono text-xs">{i.low.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="etf">
                    <Card className="premium-card overflow-hidden">
                        <div className="p-8 text-center bg-white/[0.02] border-b border-white/5">
                            <h3 className="text-white font-black uppercase italic tracking-tighter">Premium ETF Discovery</h3>
                        </div>
                        <Table>
                            <TableHeader className="bg-white/[0.01] border-b border-white/5">
                                <TableRow className="hover:bg-transparent border-white/5">
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 pl-8">TICKER</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">NET ASSETS</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">EXPENSE %</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 text-right pr-8">YTD RETURN</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {etfScreenerData.map((e) => (
                                    <TableRow key={e.symbol} className="border-white/5 hover:bg-white/[0.03]">
                                        <TableCell className="pl-8 font-black text-white italic">{e.symbol}</TableCell>
                                        <TableCell className="text-gray-400 font-bold uppercase text-[11px]">{e.netAssets}</TableCell>
                                        <TableCell className="text-gray-500 font-mono text-xs">{e.expense}%</TableCell>
                                        <TableCell className="text-right pr-8 text-emerald-400 font-black italic">{e.ytd}%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="ipo">
                    <Card className="premium-card overflow-hidden">
                        <Table>
                            <TableHeader className="bg-white/[0.01] border-b border-white/5">
                                <TableRow className="hover:bg-transparent border-white/5">
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 pl-8">COMPANY</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">LIST DATE</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">ISSUE PRICE</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 text-right pr-8">LISTING GAIN</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ipoScreenerData.map((i) => (
                                    <TableRow key={i.company} className="border-white/5 hover:bg-white/[0.03]">
                                        <TableCell className="pl-8 font-black text-white italic">{i.company}</TableCell>
                                        <TableCell className="text-gray-400 font-bold uppercase text-[11px]">{i.date}</TableCell>
                                        <TableCell className="text-gray-500 font-mono text-xs">${i.issuePrice}</TableCell>
                                        <TableCell className="text-right pr-8 text-emerald-400 font-black italic">+{i.gain}%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="deals">
                    <Card className="premium-card overflow-hidden">
                        <Table>
                            <TableHeader className="bg-white/[0.01] border-b border-white/5">
                                <TableRow className="hover:bg-transparent border-white/5">
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 pl-8">DATE</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">COMPANY</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">CLIENT</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 text-right pr-8">VALUE</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dealsScreenerData.map((d, i) => (
                                    <TableRow key={i} className="border-white/5 hover:bg-white/[0.03]">
                                        <TableCell className="pl-8 text-gray-500 font-mono text-[11px]">{d.date}</TableCell>
                                        <TableCell className="text-white font-black italic">{d.company}</TableCell>
                                        <TableCell className="text-gray-400 font-bold uppercase text-[11px]">{d.client}</TableCell>
                                        <TableCell className="text-right pr-8 text-white font-black italic">{d.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="intraday">
                    <Card className="premium-card overflow-hidden">
                        <Table>
                            <TableHeader className="bg-white/[0.01] border-b border-white/5">
                                <TableRow className="hover:bg-transparent border-white/5">
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 pl-8">SYMBOL</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">VOLATILITY</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">VOLUME</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4">RSI</TableHead>
                                    <TableHead className="text-gray-600 font-black uppercase tracking-widest text-[9px] py-4 text-right pr-8">SIGNAL</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {intradayScreenerData.map((id) => (
                                    <TableRow key={id.symbol} className="border-white/5 hover:bg-white/[0.03]">
                                        <TableCell className="pl-8 text-white font-black italic">{id.symbol}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn(
                                                "font-black uppercase tracking-widest text-[9px]",
                                                id.volatility === 'High' ? "border-rose-500 text-rose-500" : "border-emerald-500 text-emerald-500"
                                            )}>{id.volatility}</Badge>
                                        </TableCell>
                                        <TableCell className="text-gray-400 font-mono text-xs">{id.volume}</TableCell>
                                        <TableCell className="text-white font-mono font-black italic">{id.rsi}</TableCell>
                                        <TableCell className="text-right pr-8">
                                            <span className={cn(
                                                "font-black italic uppercase tracking-widest transition-all",
                                                id.signal === 'BUY' ? "text-emerald-400" : id.signal === 'SELL' ? "text-rose-400" : "text-gray-500"
                                            )}>{id.signal}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* AI Advisor Promotion at bottom */}
            <div className="p-8 rounded-[40px] bg-gradient-to-r from-primary/10 to-transparent border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group backdrop-blur-3xl">
                <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500">
                        <Zap className="h-8 w-8 text-black" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-white italic uppercase tracking-tighter mb-1">Stocko Intelligence Alpha</h4>
                        <p className="text-gray-500 font-medium leading-relaxed max-w-lg text-sm">
                            Our proprietary neural scanner detected <span className="text-emerald-400 font-black">4 High-Signal intraday trades</span> in the last 60 minutes. Unlock AI Advisor for real-time alerts.
                        </p>
                    </div>
                </div>
                <Button className="bg-white text-black font-black uppercase tracking-widest text-[10px] h-14 px-10 rounded-2xl shadow-2xl hover:bg-white/90">Upgrade Access</Button>
            </div>
        </div>
    );
}
