'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Search,
    Filter,
    TrendingUp,
    TrendingDown,
    Minus,
    ExternalLink,
    Newspaper,
    BarChart3,
    Calendar
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import api from '@/services/api';

// Mock news data
const mockNews = [
    {
        id: 1,
        headline: "Apple's New AI Strategy Could Drive Upgrade Cycle",
        source: "Bloomberg",
        date: "2024-05-22",
        sentimentValue: 85,
        sentiment: 'Positive',
        summary: "Analysts expect Apple's upcoming integration of generative AI across its device ecosystem to trigger a massive upgrade cycle among existing iPhone users.",
        stock: 'AAPL'
    },
    {
        id: 2,
        headline: "Tesla Faces Growing Competition in Chinese EV Market",
        source: "Reuters",
        date: "2024-05-21",
        sentimentValue: 35,
        sentiment: 'Negative',
        summary: "Tesla's market share in China continues to be pressured by local rivals like BYD and Xiaomi, who are launching more affordable models with advanced tech.",
        stock: 'TSLA'
    },
    {
        id: 3,
        headline: "Federal Reserve Signals Potential Rate Cut in Q4",
        source: "Financial Times",
        date: "2024-05-22",
        sentimentValue: 55,
        sentiment: 'Neutral',
        summary: "The latest FOMC meeting minutes suggest that the Fed is becoming more confident that inflation is cooling, opening the door for a rate cut later this year.",
        stock: 'NIFTY50'
    }
];

// Mock correlation data
const correlationData = [
    { date: '05-15', sentiment: 45, price: 172 },
    { date: '05-16', sentiment: 52, price: 174 },
    { date: '05-17', sentiment: 48, price: 173 },
    { date: '05-18', sentiment: 65, price: 178 },
    { date: '05-19', sentiment: 78, price: 182 },
    { date: '05-20', sentiment: 82, price: 185 },
    { date: '05-21', sentiment: 75, price: 183 },
    { date: '05-22', sentiment: 88, price: 188 },
];

export default function NewsPage() {
    const [newsList, setNewsList] = useState<any[]>(mockNews);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStock, setSelectedStock] = useState('ALL');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await api.get('/news', { params: { stock: selectedStock === 'ALL' ? '' : selectedStock } });
                if (res.data && res.data.length > 0) {
                    setNewsList([...res.data, ...mockNews]);
                } else {
                    setNewsList(mockNews);
                }
            } catch (e) {
                setNewsList(mockNews);
            }
        };
        fetchNews();
    }, [selectedStock]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">News Intelligence</h1>
                    <p className="text-gray-400">AI-powered sentiment analysis and market correlation mapping.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search news..."
                            className="pl-10 bg-[#111827] border-[#1f2937] text-white focus:ring-[#00d4ff]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex bg-[#111827] border border-[#1f2937] rounded-lg p-1">
                        {['ALL', 'AAPL', 'TSLA', 'GOOGL'].map((stock) => (
                            <button
                                key={stock}
                                onClick={() => setSelectedStock(stock)}
                                className={cn(
                                    "px-3 py-1 text-xs font-bold rounded-md transition-all",
                                    selectedStock === stock ? "bg-[#00d4ff] text-[#0a0f1e]" : "text-gray-400 hover:text-white"
                                )}
                            >
                                {stock}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* News List */}
                <div className="lg:col-span-2 space-y-6">
                    {newsList.map((news) => (
                        <Card key={news.id} className="bg-[#111827] border-[#1f2937] hover:border-[#00d4ff]/30 transition-all group cursor-pointer overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                <div className="p-6 flex-1 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-3">
                                            <Badge className={cn(
                                                "font-bold uppercase text-[10px]",
                                                news.sentiment === 'Positive' ? "bg-emerald-500/10 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.1)]" :
                                                    news.sentiment === 'Negative' ? "bg-red-500/10 text-red-500" : "bg-gray-500/10 text-gray-500"
                                            )}>
                                                {news.sentiment}
                                            </Badge>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{news.source}</span>
                                        </div>
                                        <span className="text-xs text-gray-600 font-mono">{news.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-[#00d4ff] transition-colors">{news.headline}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-2">{news.summary}</p>
                                    <div className="pt-2 flex items-center justify-between">
                                        <div className="flex space-x-4 items-center">
                                            <div className="flex items-center text-[#00d4ff] font-bold text-xs">
                                                <BarChart3 className="h-3 w-3 mr-1" /> {news.stock}
                                            </div>
                                            <div className="flex items-center text-gray-500 text-xs">
                                                Sentiment Score: <span className={cn("ml-1 font-mono font-bold",
                                                    news.sentimentValue > 60 ? "text-emerald-400" :
                                                        news.sentimentValue < 40 ? "text-red-400" : "text-orange-400"
                                                )}>{news.sentimentValue}%</span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-[#00d4ff] hover:bg-[#00d4ff]/10">
                                            Read More <ExternalLink className="ml-2 h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                {/* Visual side strip */}
                                <div className={cn(
                                    "w-1 md:w-1.5 shrink-0",
                                    news.sentiment === 'Positive' ? "bg-emerald-500" :
                                        news.sentiment === 'Negative' ? "bg-red-500" : "bg-gray-500"
                                )} />
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Intelligence Panel */}
                <div className="space-y-6">
                    <Card className="bg-[#111827] border-[#1f2937]">
                        <CardHeader>
                            <CardTitle className="text-lg text-white font-bold flex items-center">
                                <Newspaper className="h-4 w-4 mr-2 text-[#00d4ff]" />
                                Daily Sentiment Trend
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase">
                                    <span className="text-gray-500 tracking-widest">Market Mood</span>
                                    <span className="text-emerald-400">Bullish 72%</span>
                                </div>
                                <Progress value={72} className="h-2 bg-[#0a0f1e]" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-lg bg-[#0a0f1e] border border-[#1f2937]">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Impact News</p>
                                    <p className="text-xl font-bold text-white">24</p>
                                </div>
                                <div className="p-3 rounded-lg bg-[#0a0f1e] border border-[#1f2937]">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Volatility</p>
                                    <p className="text-xl font-bold text-orange-400">Med</p>
                                </div>
                            </div>

                            <div className="pt-4 space-y-3 border-t border-[#1f2937]/50">
                                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sentiment by Stock</h4>
                                {[
                                    { name: 'AAPL', score: 85, trend: 'up' },
                                    { name: 'TSLA', score: 32, trend: 'down' },
                                    { name: 'GOOGL', score: 58, trend: 'up' },
                                ].map((item) => (
                                    <div key={item.name} className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-white">{item.name}</span>
                                        <div className="flex items-center space-x-3">
                                            <span className={cn(
                                                "text-xs font-mono font-bold",
                                                item.score > 50 ? "text-emerald-400" : "text-red-400"
                                            )}>{item.score}%</span>
                                            {item.trend === 'up' ? <TrendingUp className="h-3 w-3 text-emerald-400" /> : <TrendingDown className="h-3 w-3 text-red-400" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#111827] border-[#1f2937]">
                        <CardHeader>
                            <CardTitle className="text-lg text-white font-bold">Price-Sentiment Correlation</CardTitle>
                            <CardDescription className="text-[10px] uppercase">NIFTY50 Sentiment vs Price</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={correlationData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                    <XAxis dataKey="date" hide />
                                    <YAxis yAxisId="left" hide domain={['auto', 'auto']} />
                                    <YAxis yAxisId="right" hide domain={['auto', 'auto']} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0a0f1e', border: '1px solid #1f2937', color: '#fff' }}
                                    />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="sentiment"
                                        stroke="#00d4ff"
                                        strokeWidth={2}
                                        dot={false}
                                        name="Sentiment Score"
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        dot={false}
                                        name="Stock Price"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
