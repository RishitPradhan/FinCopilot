'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw, Newspaper, BarChart3, Clock, Tag, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import { fetchStockNews, NewsArticle } from '@/services/newsContent';
import { Badge } from '@/components/ui/badge';
import { CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const SECTORS = ['All Sectors', 'Technology', 'Banking', 'Energy', 'Pharma', 'FMCG', 'Auto', 'Realty', 'Metal', 'IT'];
const TIME_RANGES = ['Today', 'This Week', 'This Month'];
const NEWS_TYPES = ['All Types', 'Earnings', 'Mergers', 'Market Updates', 'IPO', 'Dividends', 'Analyst Ratings'];

// Custom Fonts
const serifFont = "font-serif"; // Playfair Display (mapped in globals.css)
const monoFont = "font-mono"; // IBM Plex Mono (mapped in globals.css)
const sansFont = "font-sans"; // IBM Plex Sans (mapped in globals.css)

export default function NewsPage() {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [selectedSector, setSelectedSector] = useState('All Sectors');
    const [selectedTimeRange, setSelectedTimeRange] = useState('Today');
    const [selectedNewsType, setSelectedNewsType] = useState('All Types');

    // Debounce handle
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const loadNews = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const data = await fetchStockNews({
                query: debouncedQuery,
                sector: selectedSector,
                timeRange: selectedTimeRange,
                newsType: selectedNewsType
            });
            setNews(data);
        } catch (error) {
            console.error('Failed to load news:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadNews();
    }, [debouncedQuery, selectedSector, selectedTimeRange, selectedNewsType]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden pb-12">
            {/* Background Gradient - Removed colors for monochrome theme */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px] opacity-10" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px] opacity-10" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 pt-8">
                {/* Unified Header & Controls */}
                <div className="mb-12 flex flex-col gap-6">
                    {/* Search Bar */}
                    <div className="relative max-w-2xl w-full mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search market intelligence..."
                            className="w-full bg-white/5 border-white/10 h-14 pl-12 pr-4 rounded-2xl text-lg focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all placeholder:text-neutral-600 shadow-2xl backdrop-blur-md"
                        />
                    </div>

                    {/* Market Intelligence Control Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-1 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md">
                        {/* Sector Dropdown */}
                        <div className="flex flex-col gap-1 px-3 py-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Sector</label>
                            <Select value={selectedSector} onValueChange={setSelectedSector}>
                                <SelectTrigger className="bg-transparent border-none p-0 h-auto text-sm font-bold hover:text-white transition-colors focus:ring-0">
                                    <SelectValue placeholder="All Sectors" />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-900 border-white/10 text-white">
                                    {SECTORS.map(s => (
                                        <SelectItem key={s} value={s} className="focus:bg-white focus:text-black">
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* News Type Dropdown */}
                        <div className="flex flex-col gap-1 px-3 py-2 border-l border-white/5">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Intel Category</label>
                            <Select value={selectedNewsType} onValueChange={setSelectedNewsType}>
                                <SelectTrigger className="bg-transparent border-none p-0 h-auto text-sm font-bold hover:text-white transition-colors focus:ring-0">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-900 border-white/10 text-white">
                                    {NEWS_TYPES.map(t => (
                                        <SelectItem key={t} value={t} className="focus:bg-white focus:text-black">
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Time Range Dropdown */}
                        <div className="flex flex-col gap-1 px-3 py-2 border-l border-white/5">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Time Horizon</label>
                            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                                <SelectTrigger className="bg-transparent border-none p-0 h-auto text-sm font-bold hover:text-white transition-colors focus:ring-0">
                                    <SelectValue placeholder="Today" />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-900 border-white/10 text-white">
                                    {TIME_RANGES.map(r => (
                                        <SelectItem key={r} value={r} className="focus:bg-white focus:text-black">
                                            {r}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6 px-2">
                    <p className={cn("text-[10px] tracking-[0.2em] font-black text-neutral-500 uppercase", monoFont)}>
                        Found {news.length} Intelligence Markers
                    </p>
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin text-neutral-500" />}
                </div>

                {/* Feed Content */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-[220px] rounded-2xl bg-white/5 border border-white/10 animate-pulse flex flex-col p-6 gap-4">
                                <div className="flex gap-2">
                                    <div className="w-16 h-5 bg-white/10 rounded-md" />
                                    <div className="w-24 h-5 bg-white/10 rounded-md" />
                                </div>
                                <div className="w-full h-8 bg-white/10 rounded-md" />
                                <div className="w-[80%] h-4 bg-white/10 rounded-md" />
                                <div className="w-full h-4 bg-white/10 rounded-md" />
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <AlertCircle className="w-12 h-12 text-white/20 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Neural Link Interrupted</h3>
                        <p className="text-neutral-500 text-sm mb-6">Failed to authenticate with intelligence network.</p>
                        <Button onClick={loadNews} className="bg-white text-black hover:bg-neutral-200">
                            <RotateCcw className="w-4 h-4 mr-2" /> Retry Connection
                        </Button>
                    </div>
                ) : news.length === 0 ? (
                    <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <p className="text-neutral-400 font-bold mb-1">No results found</p>
                        <p className="text-neutral-600 text-xs">Try adjusting your filters or search query.</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {news.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                whileHover={{ y: -5, boxShadow: '0 0 30px rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255,255,255,0.2)' }}
                                className="group bg-white/[0.035] border border-white/[0.07] rounded-3xl p-6 transition-all backdrop-blur-xl relative flex flex-col h-full"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Badge className={cn("bg-white/10 text-white border-none font-black tracking-widest text-[10px]", monoFont)}>
                                            {item.ticker}
                                        </Badge>
                                        <div className={cn(
                                            "flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter",
                                            item.sentiment === 'positive' ? "bg-white text-black" :
                                                item.sentiment === 'negative' ? "bg-white/20 text-white" :
                                                    "bg-neutral-500/10 text-neutral-500"
                                        )}>
                                            {item.sentiment} {item.change && `(${item.change})`}
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-neutral-600 font-bold flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                                    </div>
                                </div>

                                <CardTitle className={cn("text-2xl mb-3 leading-tight text-white group-hover:text-white transition-colors", serifFont)}>
                                    {item.headline}
                                </CardTitle>

                                <p className={cn("text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3", sansFont)}>
                                    {item.summary}
                                </p>

                                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                            <Newspaper className="w-4 h-4 text-neutral-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest font-black text-white">{item.source}</p>
                                            <p className="text-[9px] text-neutral-600 uppercase font-bold">{item.newsType}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="border-white/10 text-neutral-500 text-[9px] font-black uppercase group-hover:bg-white group-hover:text-black transition-all">
                                        {item.sector}
                                    </Badge>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
