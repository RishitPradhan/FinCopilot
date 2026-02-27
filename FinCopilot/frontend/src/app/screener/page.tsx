'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
    Search, 
    TrendingUp, 
    Star, 
    Building2, 
    LineChart,
    Briefcase,
    Clock,
    Newspaper,
    BarChart3,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw,
    Filter,
    Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWatchlistStore, WatchlistItem } from '@/store/watchlistStore';

// Type definitions
interface ScreenerItem {
    ticker: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    [key: string]: string | number | boolean;
}

// Mock data for different tabs
const stockData: ScreenerItem[] = [
    { ticker: 'AAPL', name: 'Apple Inc.', price: 185.92, change: 2.34, changePercent: 1.27, volume: '52.3M', marketCap: '2.89T', sector: 'Technology' },
    { ticker: 'TSLA', name: 'Tesla Inc.', price: 178.25, change: -3.45, changePercent: -1.90, volume: '98.2M', marketCap: '565B', sector: 'Automotive' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 165.80, change: 1.25, changePercent: 0.76, volume: '21.5M', marketCap: '2.05T', sector: 'Technology' },
    { ticker: 'MSFT', name: 'Microsoft Corp.', price: 425.50, change: 5.20, changePercent: 1.24, volume: '18.9M', marketCap: '3.16T', sector: 'Technology' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.', price: 178.90, change: -1.30, changePercent: -0.72, volume: '35.2M', marketCap: '1.85T', sector: 'E-commerce' },
    { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 875.50, change: 25.40, changePercent: 2.98, volume: '42.1M', marketCap: '2.16T', sector: 'Technology' },
    { ticker: 'META', name: 'Meta Platforms', price: 505.75, change: 8.90, changePercent: 1.79, volume: '15.3M', marketCap: '1.29T', sector: 'Technology' },
    { ticker: 'RELIANCE', name: 'Reliance Industries', price: 2850.00, change: 45.20, changePercent: 1.61, volume: '5.2M', marketCap: '19.2T', sector: 'Energy' },
];

const etfData: ScreenerItem[] = [
    { ticker: 'SPY', name: 'SPDR S&P 500 ETF', price: 512.45, change: 3.25, changePercent: 0.64, volume: '68M', assets: '485B' },
    { ticker: 'QQQ', name: 'Invesco QQQ Trust', price: 438.20, change: 5.80, changePercent: 1.34, volume: '42M', assets: '210B' },
    { ticker: 'VTI', name: 'Vanguard Total Stock', price: 268.90, change: 1.45, changePercent: 0.54, volume: '5.2M', assets: '342B' },
    { ticker: 'IWM', name: 'iShares Russell 2000', price: 198.75, change: -0.85, changePercent: -0.43, volume: '28M', assets: '58B' },
    { ticker: 'VGT', name: 'Vanguard Info Tech', price: 545.30, change: 8.20, changePercent: 1.53, volume: '1.8M', assets: '45B' },
];

const ipoData: ScreenerItem[] = [
    { ticker: 'ARM', name: 'ARM Holdings', price: 58.50, change: 2.30, changePercent: 4.10, date: 'Sep 14, 2023', raised: '$5.2B' },
    { ticker: 'INST', name: 'Instant Brands', price: 12.80, change: -0.45, changePercent: -3.40, date: 'Jun 28, 2023', raised: '$350M' },
    { ticker: 'KLA', name: 'Kenvue Inc.', price: 25.20, change: 0.80, changePercent: 3.28, date: 'Nov 1, 2023', raised: '$4.8B' },
    { ticker: 'LIN', name: 'Linde plc', price: 425.60, change: 3.40, changePercent: 0.81, date: 'Aug 5, 2022', raised: '$3.7B' },
];

const dealsData: ScreenerItem[] = [
    { ticker: 'MA', name: 'Mastercard', price: 458.90, change: 2.15, changePercent: 0.47, deal: 'Acquisition of Recorded Future', value: '$2.6B', status: 'Pending' },
    { ticker: 'DIS', name: 'Walt Disney', price: 112.45, change: -1.20, changePercent: -1.06, deal: 'Asset Sale to NBCUniversal', value: '$1.8B', status: 'Announced' },
    { ticker: 'VZ', name: 'Verizon', price: 38.90, change: 0.45, changePercent: 1.17, deal: 'Acquisition of Frontier', value: '$6.5B', status: 'Completed' },
    { ticker: 'T', name: 'AT&T', price: 17.25, change: -0.15, changePercent: -0.86, deal: 'Spin-off of WarnerBrothers', value: '$7B', status: 'Completed' },
];

const intraDayData: ScreenerItem[] = [
    { ticker: 'NIFTY', name: 'Nifty 50', price: 22580.50, change: 125.30, changePercent: 0.56, high: 22750, low: 22400 },
    { ticker: 'SENSEX', name: 'BSE Sensex', price: 75180.25, change: 285.40, changePercent: 0.38, high: 75600, low: 74800 },
    { ticker: 'BANKNIFTY', name: 'Bank Nifty', price: 48250.00, change: 520.80, changePercent: 1.09, high: 48600, low: 47800 },
    { ticker: 'FINNIFTY', name: 'Fin Nifty', price: 21580.75, change: 185.25, changePercent: 0.87, high: 21750, low: 21400 },
];

const indexData: ScreenerItem[] = [
    { ticker: 'NIFTY 50', name: 'Nifty 50', price: 22580.50, change: 125.30, changePercent: 0.56, pe: 28.5, marketCap: '18.5T' },
    { ticker: 'SENSEX', name: 'BSE Sensex', price: 75180.25, change: 285.40, changePercent: 0.38, pe: 32.1, marketCap: '18.5T' },
    { ticker: 'NIFTY BANK', name: 'Bank Nifty', price: 48250.00, change: 520.80, changePercent: 1.09, pe: 22.8, marketCap: '12.2T' },
    { ticker: 'NIFTY IT', name: 'Nifty IT', price: 38520.00, change: -245.60, changePercent: -0.63, pe: 32.5, marketCap: '8.5T' },
    { ticker: 'NIFTY AUTO', name: 'Nifty Auto', price: 18250.50, change: 125.80, changePercent: 0.69, pe: 42.3, marketCap: '3.2T' },
];

type TabType = 'stock' | 'etf' | 'ipo' | 'deals' | 'intra-day' | 'index';

export default function ScreenerPage() {
    const [activeTab, setActiveTab] = useState<TabType>('stock');
    const [searchQuery, setSearchQuery] = useState('');
    
    const { items: watchlistItems, fetchWatchlist, addItem, removeItem } = useWatchlistStore();
    const watchlist = watchlistItems.map(item => item.ticker);

    useEffect(() => {
        fetchWatchlist();
    }, [fetchWatchlist]);

    const tabs = [
        { id: 'stock' as TabType, label: 'Stock', icon: Building2 },
        { id: 'etf' as TabType, label: 'ETF', icon: BarChart3 },
        { id: 'ipo' as TabType, label: 'IPO', icon: Briefcase },
        { id: 'deals' as TabType, label: 'Deals', icon: Newspaper },
        { id: 'intra-day' as TabType, label: 'Intra-Day', icon: Clock },
        { id: 'index' as TabType, label: 'Index', icon: TrendingUp },
    ];

    const getData = (): ScreenerItem[] => {
        switch (activeTab) {
            case 'stock': return stockData;
            case 'etf': return etfData;
            case 'ipo': return ipoData;
            case 'deals': return dealsData;
            case 'intra-day': return intraDayData;
            case 'index': return indexData;
            default: return stockData;
        }
    };

    const toggleWatchlist = async (ticker: string) => {
        const item = getData().find(s => s.ticker === ticker);
        if (!item) return;
        
        if (watchlist.includes(ticker)) {
            await removeItem(ticker);
        } else {
            await addItem({
                ticker: item.ticker,
                name: item.name,
                price: item.price,
                change: item.change,
                changePercent: item.changePercent,
                quantity: 1
            });
        }
    };

    const filteredData = getData().filter(item => 
        item.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderTableHeader = () => {
        switch (activeTab) {
            case 'stock':
                return (
                    <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Symbol</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Change</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Volume</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Market Cap</th>
                        <th className="text-center py-3 px-4 text-xs font-bold text-gray-500 uppercase">Watch</th>
                    </tr>
                );
            case 'etf':
                return (
                    <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Symbol</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Change</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Volume</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">AUM</th>
                        <th className="text-center py-3 px-4 text-xs font-bold text-gray-500 uppercase">Watch</th>
                    </tr>
                );
            case 'ipo':
                return (
                    <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Symbol</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Change</th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">IPO Date</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Raised</th>
                        <th className="text-center py-3 px-4 text-xs font-bold text-gray-500 uppercase">Watch</th>
                    </tr>
                );
            case 'deals':
                return (
                    <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Symbol</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Change</th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Deal</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Value</th>
                        <th className="text-center py-3 px-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                    </tr>
                );
            case 'intra-day':
                return (
                    <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Index</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Change</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">High</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Low</th>
                        <th className="text-center py-3 px-4 text-xs font-bold text-gray-500 uppercase">Action</th>
                    </tr>
                );
            case 'index':
                return (
                    <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Index</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Change</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">P/E</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Market Cap</th>
                        <th className="text-center py-3 px-4 text-xs font-bold text-gray-500 uppercase">Watch</th>
                    </tr>
                );
        }
    };

    const renderTableRow = (item: ScreenerItem, index: number) => {
        const isPositive = item.change >= 0;
        
        if (activeTab === 'stock') {
            return (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">{item.ticker.slice(0, 2)}</span>
                                </div>
                                <div>
                                    <div className="font-bold text-white">{item.ticker}</div>
                                    <div className="text-xs text-gray-500">{item.name}</div>
                                </div>
                            </div>
                        </td>
                        <td className="text-right py-4 px-4 font-mono font-semibold text-white">${item.price.toFixed(2)}</td>
                        <td className="text-right py-4 px-4">
                            <div className={cn("flex items-center justify-end gap-1 font-mono", isPositive ? "text-green-400" : "text-red-400")}>
                                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                {isPositive ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                            </div>
                        </td>
                        <td className="text-right py-4 px-4 font-mono text-gray-400 text-sm">{item.volume as string}</td>
                        <td className="text-right py-4 px-4 font-mono text-gray-400 text-sm">{item.marketCap as string}</td>
                        <td className="text-center py-4 px-4">
                            <button 
                                onClick={() => toggleWatchlist(item.ticker)}
                                className={cn(
                                    "p-2 rounded-lg transition-colors",
                                    watchlist.includes(item.ticker) 
                                        ? "bg-yellow-500/20 text-yellow-500" 
                                        : "bg-white/5 text-gray-500 hover:text-yellow-500"
                                )}
                                aria-label={watchlist.includes(item.ticker) ? `Remove ${item.ticker} from watchlist` : `Add ${item.ticker} to watchlist`}
                            >
                                <Star className={cn("h-4 w-4", watchlist.includes(item.ticker) && "fill-current")} />
                            </button>
                        </td>
                    </tr>
                );
        }
        
        if (activeTab === 'etf') {
            return (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <BarChart3 className="h-4 w-4 text-blue-400" />
                                </div>
                                <div>
                                    <div className="font-bold text-white">{item.ticker}</div>
                                    <div className="text-xs text-gray-500">{item.name}</div>
                                </div>
                            </div>
                        </td>
                        <td className="text-right py-4 px-4 font-mono font-semibold text-white">${item.price.toFixed(2)}</td>
                        <td className="text-right py-4 px-4">
                            <div className={cn("flex items-center justify-end gap-1 font-mono", isPositive ? "text-green-400" : "text-red-400")}>
                                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                {isPositive ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                            </div>
                        </td>
                        <td className="text-right py-4 px-4 font-mono text-gray-400 text-sm">{item.volume as string}</td>
                        <td className="text-right py-4 px-4 font-mono text-gray-400 text-sm">{item.assets as string}</td>
                        <td className="text-center py-4 px-4">
                            <button 
                                onClick={() => toggleWatchlist(item.ticker)}
                                className={cn(
                                    "p-2 rounded-lg transition-colors",
                                    watchlist.includes(item.ticker) 
                                        ? "bg-yellow-500/20 text-yellow-500" 
                                        : "bg-white/5 text-gray-500 hover:text-yellow-500"
                                )}
                                aria-label={watchlist.includes(item.ticker) ? `Remove ${item.ticker} from watchlist` : `Add ${item.ticker} to watchlist`}
                            >
                                <Star className={cn("h-4 w-4", watchlist.includes(item.ticker) && "fill-current")} />
                            </button>
                        </td>
                    </tr>
                );
        }
        
        if (activeTab === 'ipo') {
            return (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                    <Briefcase className="h-4 w-4 text-purple-400" />
                                </div>
                                <div>
                                    <div className="font-bold text-white">{item.ticker}</div>
                                    <div className="text-xs text-gray-500">{item.name}</div>
                                </div>
                            </div>
                        </td>
                        <td className="text-right py-4 px-4 font-mono font-semibold text-white">${item.price.toFixed(2)}</td>
                        <td className="text-right py-4 px-4">
                            <div className={cn("flex items-center justify-end gap-1 font-mono", isPositive ? "text-green-400" : "text-red-400")}>
                                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                {isPositive ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                            </div>
                        </td>
                        <td className="text-left py-4 px-4 text-gray-400 text-sm">{item.date as string}</td>
                        <td className="text-right py-4 px-4 font-mono text-gray-400 text-sm">{item.raised as string}</td>
                        <td className="text-center py-4 px-4">
                            <button 
                                onClick={() => toggleWatchlist(item.ticker)}
                                className={cn(
                                    "p-2 rounded-lg transition-colors",
                                    watchlist.includes(item.ticker) 
                                        ? "bg-yellow-500/20 text-yellow-500" 
                                        : "bg-white/5 text-gray-500 hover:text-yellow-500"
                                )}
                                aria-label={watchlist.includes(item.ticker) ? `Remove ${item.ticker} from watchlist` : `Add ${item.ticker} to watchlist`}
                            >
                                <Star className={cn("h-4 w-4", watchlist.includes(item.ticker) && "fill-current")} />
                            </button>
                        </td>
                    </tr>
                );
        }
        
        if (activeTab === 'deals') {
            return (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                                    <Newspaper className="h-4 w-4 text-orange-400" />
                                </div>
                                <div>
                                    <div className="font-bold text-white">{item.ticker}</div>
                                    <div className="text-xs text-gray-500">{item.name}</div>
                                </div>
                            </div>
                        </td>
                        <td className="text-right py-4 px-4 font-mono font-semibold text-white">${item.price.toFixed(2)}</td>
                        <td className="text-right py-4 px-4">
                            <div className={cn("flex items-center justify-end gap-1 font-mono", isPositive ? "text-green-400" : "text-red-400")}>
                                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                {isPositive ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                            </div>
                        </td>
                        <td className="text-left py-4 px-4 text-gray-300 text-sm">{item.deal as string}</td>
                        <td className="text-right py-4 px-4 font-mono text-gray-400 text-sm">{item.value as string}</td>
                        <td className="text-center py-4 px-4">
                            <Badge className={cn(
                                "text-[10px] font-bold uppercase",
                                item.status === 'Completed' ? "bg-green-500/20 text-green-400" :
                                item.status === 'Pending' ? "bg-yellow-500/20 text-yellow-400" :
                                "bg-blue-500/20 text-blue-400"
                            )}>
                                {item.status as string}
                            </Badge>
                        </td>
                    </tr>
                );
        }
        
        if (activeTab === 'intra-day') {
            return (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                    <Activity className="h-4 w-4 text-cyan-400" />
                                </div>
                                <div>
                                    <div className="font-bold text-white">{item.ticker}</div>
                                    <div className="text-xs text-gray-500">{item.name}</div>
                                </div>
                            </div>
                        </td>
                        <td className="text-right py-4 px-4 font-mono font-semibold text-white">{item.price.toLocaleString()}</td>
                        <td className="text-right py-4 px-4">
                            <div className={cn("flex items-center justify-end gap-1 font-mono", isPositive ? "text-green-400" : "text-red-400")}>
                                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                {isPositive ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                            </div>
                        </td>
                        <td className="text-right py-4 px-4 font-mono text-gray-400 text-sm">{Number(item.high).toLocaleString()}</td>
                        <td className="text-right py-4 px-4 font-mono text-gray-400 text-sm">{Number(item.low).toLocaleString()}</td>
                        <td className="text-center py-4 px-4">
                            <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white">
                                <Eye className="h-3 w-3 mr-1" /> View
                            </Button>
                        </td>
                    </tr>
                );
        }
        
        if (activeTab === 'index') {
            return (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                    <LineChart className="h-4 w-4 text-indigo-400" />
                                </div>
                                <div>
                                    <div className="font-bold text-white">{item.ticker}</div>
                                    <div className="text-xs text-gray-500">{item.name}</div>
                                </div>
                            </div>
                        </td>
                        <td className="text-right py-4 px-4 font-mono font-semibold text-white">{item.price.toLocaleString()}</td>
                        <td className="text-right py-4 px-4">
                            <div className={cn("flex items-center justify-end gap-1 font-mono", isPositive ? "text-green-400" : "text-red-400")}>
                                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                {isPositive ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                            </div>
                        </td>
                        <td className="text-right py-4 px-4 font-mono text-gray-400 text-sm">{Number(item.pe)}</td>
                        <td className="text-right py-4 px-4 font-mono text-gray-400 text-sm">{item.marketCap as string}</td>
                        <td className="text-center py-4 px-4">
                            <button 
                                onClick={() => toggleWatchlist(item.ticker)}
                                className={cn(
                                    "p-2 rounded-lg transition-colors",
                                    watchlist.includes(item.ticker) 
                                        ? "bg-yellow-500/20 text-yellow-500" 
                                        : "bg-white/5 text-gray-500 hover:text-yellow-500"
                                )}
                                aria-label={watchlist.includes(item.ticker) ? `Remove ${item.ticker} from watchlist` : `Add ${item.ticker} to watchlist`}
                            >
                                <Star className={cn("h-4 w-4", watchlist.includes(item.ticker) && "fill-current")} />
                            </button>
                        </td>
                    </tr>
                );
        }
        
        return null;
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Market Screener</h1>
                    <p className="text-gray-400">Explore stocks, ETFs, IPOs, and market indices</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <Filter className="h-4 w-4 mr-2" /> Filters
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap",
                            activeTab === tab.id 
                                ? "bg-white text-black" 
                                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
            </div>

            {/* Watchlist Summary */}
            <Card className="bg-card border-border shadow-xl">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-white font-bold flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        Your Watchlist ({watchlist.length} items)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {watchlist.map(ticker => (
                            <Badge key={ticker} className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-3 py-1">
                                {ticker}
                                <button 
                                    onClick={() => toggleWatchlist(ticker)}
                                    className="ml-2 hover:text-red-400"
                                    aria-label={`Remove ${ticker} from watchlist`}
                                >
                                    ×
                                </button>
                            </Badge>
                        ))}
                        {watchlist.length === 0 && (
                            <span className="text-gray-500 text-sm">No stocks in watchlist. Click the star icon to add.</span>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Data Table */}
            <Card className="bg-card border-border shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            {renderTableHeader()}
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => renderTableRow(item, index))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* AI-generated insights */}
            <Card className="bg-gradient-to-r from-white/10 to-white/5 border-white/10 shadow-xl">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-white/10">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">AI Market Insights</h3>
                            <p className="text-gray-400 text-sm">
                                {activeTab === 'stock' && "Tech sector shows strong momentum with AI-related stocks leading gains. Consider diversifying with defensive sectors like healthcare."}
                                {activeTab === 'etf' && "Index ETFs continue steady growth. QQQ shows strong performance due to tech concentration. Consider VTI for broader market exposure."}
                                {activeTab === 'ipo' && "Recent IPO market shows mixed results. ARM Holdings gained traction while some consumer brands faced headwinds."}
                                {activeTab === 'deals' && "M&A activity remains robust in tech sector. Telecom consolidation continues with strategic acquisitions."}
                                {activeTab === 'intra-day' && "Bank Nifty leads sectoral gains. Nifty IT faces profit booking. Support levels intact."}
                                {activeTab === 'index' && "Nifty 50 trades near all-time highs. P/E ratio elevated but justified by strong earnings growth."}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
