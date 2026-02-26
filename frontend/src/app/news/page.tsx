'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw, Newspaper, BarChart3, Clock, Tag, ChevronRight, AlertCircle, Loader2, AlertTriangle, History as HistoryIcon } from 'lucide-react';
import { fetchStockNews, NewsArticle } from '@/services/newsContent';
import { analyzeNewsForAlerts } from '@/services/alertService';
import { useAlertStore } from '@/store/useAlertStore';
import { DrasticEventAlert } from '@/components/news/DrasticEventAlert';
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

    const { addAlerts, alerts, markAllAsRead } = useAlertStore();
    const [showHistory, setShowHistory] = useState(false);

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

            // Hook: Analyze for Drastic Events
            if (data.length > 0) {
                const newAlerts = await analyzeNewsForAlerts(data);
                if (newAlerts.length > 0) {
                    addAlerts(newAlerts);
                }
            }
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

            <DrasticEventAlert />

            <div className="max-w-6xl mx-auto px-6 relative z-10 pt-8">
                {/* Unified Header & Controls */}
                <div className="mb-12 flex flex-col gap-6">
                    <div className="flex flex-col items-center justify-center text-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-3">
                                <Newspaper className="w-8 h-8 text-white" />
                                <h1 className={cn("text-5xl font-black uppercase tracking-tighter italic", serifFont)}>Market Intelligence</h1>
                            </div>
                            <p className="text-neutral-500 text-sm font-medium tracking-widest uppercase">Institutional Grade News & Analysis Feed</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setShowHistory(!showHistory);
                                markAllAsRead();
                            }}
                            className="bg-white/5 border-white/10 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest gap-2 rounded-full px-6"
                        >
                            <HistoryIcon className="w-4 h-4" /> Alert History
                        </Button>
                    </div>

                    {/* Alert History Log (Expandable) */}
                    <AnimatePresence>
                        {showHistory && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mb-4"
                            >
                                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">Drastic Event Log</h3>
                                        <p className="text-[9px] font-bold text-neutral-600 uppercase italic">Past 24 Hours</p>
                                    </div>
                                    {alerts.length === 0 ? (
                                        <p className="text-center py-8 text-neutral-600 text-xs italic">No high-impact events recorded recently.</p>
                                    ) : (
                                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                                            {alerts.map(alert => (
                                                <div key={alert.id} className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-white/20 transition-all">
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                                        alert.severity === 'Critical' ? "bg-red-500/20 text-red-500" : "bg-yellow-500/20 text-yellow-500"
                                                    )}>
                                                        <AlertTriangle className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className={cn(
                                                                "text-[9px] font-black uppercase tracking-tighter",
                                                                alert.severity === 'Critical' ? "text-red-500" : "text-yellow-500"
                                                            )}>{alert.severity}</span>
                                                            <span className="text-[9px] font-bold text-neutral-600">• {alert.affectedSector}</span>
                                                            <span className="ml-auto text-[8px] font-bold text-neutral-700">{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
                                                        </div>
                                                        <p className="text-sm font-bold text-white mb-1 truncate">{alert.headline}</p>
                                                        <p className="text-[10px] text-neutral-500 line-clamp-1">{alert.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-1 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-md max-w-4xl mx-auto w-full">
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
                <div className="flex flex-col items-center justify-center mb-10 gap-2">
                    <p className={cn("text-[10px] tracking-[0.3em] font-black text-neutral-600 uppercase text-center", monoFont)}>
                        Scanning Intelligence Core... Found {news.length} Key Markers
                    </p>
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                    <div className="w-12 h-1 bg-primary/20 rounded-full overflow-hidden">
                        <motion.div
                            className="w-full h-full bg-primary"
                            initial={{ x: "-100%" }}
                            animate={{ x: isLoading ? "0%" : "100%" }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </div>
                </div>

                {/* Feed Content */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-[250px] rounded-3xl premium-card animate-pulse flex flex-col p-8 gap-5">
                                <div className="flex gap-3">
                                    <div className="w-20 h-6 bg-white/5 rounded-full" />
                                    <div className="w-28 h-6 bg-white/5 rounded-full" />
                                </div>
                                <div className="w-full h-10 bg-white/5 rounded-xl" />
                                <div className="w-[85%] h-5 bg-white/5 rounded-lg" />
                                <div className="w-full h-5 bg-white/5 rounded-lg" />
                                <div className="mt-auto w-32 h-4 bg-white/5 rounded-full" />
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center py-24 premium-card border-dashed">
                        <div className="p-6 rounded-3xl bg-rose-500/10 mb-6">
                            <AlertCircle className="w-12 h-12 text-rose-500" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 tracking-tight">Neural Link Interrupted</h3>
                        <p className="text-gray-500 text-sm mb-10 font-medium">Failed to authenticate with intelligence network.</p>
                        <Button onClick={loadNews} className="bg-white text-black hover:bg-neutral-200 px-8 py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl transition-all active:scale-95">
                            <RotateCcw className="w-5 h-5 mr-3" /> Retry Connection
                        </Button>
                    </div>
                ) : news.length === 0 ? (
                    <div className="text-center py-32 premium-card border-dashed">
                        <p className="text-white font-black text-xl mb-2 tracking-tight uppercase">No results found</p>
                        <p className="text-gray-600 text-sm font-medium">Try adjusting your filters or search query.</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {news.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                whileHover={{ y: -8, boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.15)' }}
                                className="group premium-card transition-all relative flex flex-col h-full overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Badge className={cn("bg-white/5 text-white border-white/10 font-black tracking-widest text-[9px] px-3 py-1", monoFont)}>
                                            {item.ticker}
                                        </Badge>
                                        <div className={cn(
                                            "flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                            item.sentiment === 'positive' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                item.sentiment === 'negative' ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                                                    "bg-white/5 text-gray-500 border-white/5"
                                        )}>
                                            {item.sentiment} {item.change && `(${item.change})`}
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-gray-600 font-black flex items-center gap-2 uppercase tracking-widest">
                                        <Clock className="w-3.5 h-3.5" />
                                        {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                                    </div>
                                </div>

                                <CardTitle className={cn("text-2xl mb-4 leading-[1.15] text-white group-hover:text-primary transition-colors font-black tracking-tight", serifFont)}>
                                    {item.headline}
                                </CardTitle>

                                <p className={cn("text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium", sansFont)}>
                                    {item.summary}
                                </p>

                                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                            <Newspaper className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white">{item.source}</p>
                                            <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest">{item.newsType}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="border-white/10 text-gray-500 text-[9px] font-black uppercase tracking-widest px-3 py-1 group-hover:bg-white group-hover:text-black transition-all rounded-full">
                                        {item.sector}
                                    </Badge>
                                </div>

                                {/* Subtle hover gradient overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
