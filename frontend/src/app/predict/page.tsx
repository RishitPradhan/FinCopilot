'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import api from '@/services/api';
import { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    Minus,
    Info,
    History,
    Zap,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Mock chart data
const generateMockChartData = (stock: string) => {
    const data = [];
    let price = stock === 'AAPL' ? 150 : stock === 'TSLA' ? 200 : 100;
    for (let i = 30; i >= 0; i--) {
        price = price + (Math.random() - 0.5) * 5;
        data.push({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: parseFloat(price.toFixed(2)),
        });
    }
    return data;
};

const historyData = [
    { id: 1, date: '2024-05-20', stock: 'AAPL', userPred: 'UP', aiPred: 'UP', actual: 'UP', result: 'WIN', confidence: 85 },
    { id: 2, date: '2024-05-18', stock: 'TSLA', userPred: 'DOWN', aiPred: 'UP', actual: 'UP', result: 'LOSS', confidence: 70 },
    { id: 3, date: '2024-05-15', stock: 'GOOGL', userPred: 'UP', aiPred: 'UP', actual: 'UP', result: 'WIN', confidence: 90 },
];

export default function PredictPage() {
    const [selectedStock, setSelectedStock] = useState('AAPL');
    const [prediction, setPrediction] = useState<'UP' | 'DOWN' | null>(null);
    const [confidence, setConfidence] = useState([75]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const chartData = useMemo(() => generateMockChartData(selectedStock), [selectedStock]);

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowResult(true);
        }, 1500);
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
                <div>
                    <h1 className="text-5xl font-black text-white mb-3 tracking-tighter uppercase italic">Predict</h1>
                    <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-black">AI-Augmented Market Intuition Playground</p>
                </div>
                <div className="flex items-center space-x-4 bg-white/[0.03] border border-white/5 p-2 px-6 rounded-full shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em] mb-0.5">Global Precision</span>
                        <div className="flex items-center gap-3">
                            <History className="h-3 w-3 text-white/40" />
                            <span className="text-sm font-black text-white italic">78.2%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <Card className="lg:col-span-2 premium-card overflow-hidden">
                    <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/5 bg-white/[0.02] p-8">
                        <div className="flex flex-wrap items-center gap-8">
                            <Select value={selectedStock} onValueChange={setSelectedStock}>
                                <SelectTrigger className="w-[200px] h-14 bg-white/[0.05] border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl focus:ring-white/20">
                                    <SelectValue placeholder="Select Asset" />
                                </SelectTrigger>
                                <SelectContent className="bg-black/95 border-white/10 text-white backdrop-blur-3xl rounded-2xl p-2">
                                    <SelectItem value="AAPL" className="rounded-xl focus:bg-white/10">AAPL · Apple Inc</SelectItem>
                                    <SelectItem value="TSLA" className="rounded-xl focus:bg-white/10">TSLA · Tesla Motors</SelectItem>
                                    <SelectItem value="GOOGL" className="rounded-xl focus:bg-white/10">GOOGL · Alphabet</SelectItem>
                                    <SelectItem value="MSFT" className="rounded-xl focus:bg-white/10">MSFT · Microsoft</SelectItem>
                                    <SelectItem value="NIFTY50" className="rounded-xl focus:bg-white/10">NIFTY 50 · Index</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mb-1">Real-time Feed</span>
                                <span className="text-2xl font-black font-mono text-white italic tracking-tighter">${chartData[chartData.length - 1].price}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full">+2.45%</Badge>
                            <Badge variant="outline" className="border-white/5 bg-white/5 text-gray-500 text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full flex items-center">
                                <Clock className="w-3.5 h-3.5 mr-2" /> 30D Window
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#444"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    minTickGap={30}
                                />
                                <YAxis
                                    stroke="#444"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => `$${val}`}
                                    domain={['auto', 'auto']}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#000',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorPrice)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Prediction Input Section */}
                <Card className="premium-card flex flex-col group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <CardHeader className="bg-white/[0.02] border-b border-white/5 p-8">
                        <CardTitle className="text-xl font-black text-white italic uppercase tracking-tighter">Your Thesis</CardTitle>
                        <CardDescription className="text-gray-600 font-black uppercase tracking-widest text-[9px] mt-1">Next 24-Hour Trajectory</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-10 p-8 pt-10">
                        <div className="flex gap-4">
                            <Button
                                onClick={() => setPrediction('UP')}
                                variant="outline"
                                className={cn(
                                    "flex-1 h-32 flex flex-col border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all rounded-[32px] group/btn shadow-xl",
                                    prediction === 'UP' && "border-white bg-white shadow-[0_0_40px_rgba(255,255,255,0.15)] ring-1 ring-white"
                                )}
                            >
                                <ArrowUp className={cn("h-8 w-8 mb-3 transition-transform duration-500 group-hover/btn:-translate-y-1", prediction === 'UP' ? "text-black" : "text-gray-700")} />
                                <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", prediction === 'UP' ? "text-black" : "text-gray-600")}>Bullish</span>
                            </Button>
                            <Button
                                onClick={() => setPrediction('DOWN')}
                                variant="outline"
                                className={cn(
                                    "flex-1 h-32 flex flex-col border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all rounded-[32px] group/btn shadow-xl",
                                    prediction === 'DOWN' && "border-white bg-white shadow-[0_0_40px_rgba(255,255,255,0.15)] ring-1 ring-white"
                                )}
                            >
                                <ArrowDown className={cn("h-8 w-8 mb-3 transition-transform duration-500 group-hover/btn:translate-y-1", prediction === 'DOWN' ? "text-black" : "text-gray-700")} />
                                <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", prediction === 'DOWN' ? "text-black" : "text-gray-600")}>Bearish</span>
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center px-1">
                                <Label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Certainty Level</Label>
                                <span className="text-sm font-black text-white italic">{confidence[0]}%</span>
                            </div>
                            <Slider
                                value={confidence}
                                onValueChange={setConfidence}
                                max={100}
                                min={50}
                                step={1}
                                className="py-2"
                            />
                            <div className="flex justify-between text-[8px] uppercase text-gray-700 font-black tracking-[0.4em] px-1">
                                <span>Speculative</span>
                                <span>High Signal</span>
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-start space-x-4 shadow-inner">
                            <Info className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-gray-600 font-medium leading-relaxed uppercase tracking-widest">
                                Your thesis will be locked for <span className="text-white">24 hours</span>. Correct synthesis yields <span className="text-white">+50 XP</span> & Authority score.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="p-8 pt-0">
                        <Button
                            className="w-full bg-white text-black hover:bg-gray-200 font-black uppercase tracking-[0.2em] text-[10px] h-16 rounded-2xl shadow-2xl transition-all active:scale-[0.98] disabled:opacity-20"
                            disabled={!prediction || isSubmitting}
                            onClick={handleSubmit}
                        >
                            {isSubmitting ? "Synthesizing..." : "Submit Thesis"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <AnimatePresence>
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full"
                    >
                        <Card className="premium-card overflow-hidden border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.1)] relative">
                            <div className="absolute top-0 right-0 p-8">
                                <Button variant="ghost" size="icon" onClick={() => setShowResult(false)} className="rounded-xl text-gray-700 hover:text-white hover:bg-white/5">
                                    <XCircle className="w-5 h-5" />
                                </Button>
                            </div>
                            <CardHeader className="flex flex-row items-center gap-6 p-10 bg-white/[0.03]">
                                <div className="w-16 h-16 bg-white text-black rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                                    <CheckCircle2 className="h-8 w-8" />
                                </div>
                                <div>
                                    <CardTitle className="text-3xl font-black text-white italic uppercase tracking-tighter">Thesis Synthesized</CardTitle>
                                    <CardDescription className="text-gray-500 font-black uppercase tracking-widest text-[10px] mt-1">Confirmed with {confidence[0]}% Signal strength</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-12 items-center p-10 border-t border-white/5">
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] flex items-center">
                                        <Zap className="h-4 w-4 mr-3 text-white" /> Intelligence Report
                                    </h4>
                                    <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                        Our neural models align with an <span className="text-white font-black italic underline underline-offset-4">UPWARD</span> vector for {selectedStock} at <span className="text-white font-black">82% probability</span>.
                                        Liquidity clusters at $178 remain intact, while RSI shows bullish divergence on the 4H timeframe.
                                    </p>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-1 p-8 rounded-[32px] bg-white/[0.03] border border-white/5 text-center shadow-2xl group">
                                        <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.2em] mb-3">Your Call</p>
                                        <p className={cn("text-3xl font-black italic tracking-tighter transition-all group-hover:scale-110", prediction === 'UP' ? 'text-emerald-500' : 'text-rose-500')}>
                                            {prediction}
                                        </p>
                                    </div>
                                    <div className="flex-1 p-8 rounded-[32px] bg-white text-black text-center shadow-[0_0_40px_rgba(255,255,255,0.1)] group">
                                        <p className="text-[9px] font-black text-black/40 uppercase tracking-[0.2em] mb-3">AI Engine</p>
                                        <p className="text-3xl font-black italic tracking-tighter transition-all group-hover:scale-110">UP</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Prediction History Table */}
            <Card className="premium-card overflow-hidden">
                <CardHeader className="bg-white/[0.02] border-b border-white/5 p-8">
                    <CardTitle className="text-xl font-black text-white italic uppercase tracking-tighter">Transmission Logs</CardTitle>
                    <CardDescription className="text-gray-600 font-black uppercase tracking-widest text-[9px] mt-1">Historical Performance & Signal Integrity</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/[0.01] border-white/5">
                            <TableRow className="border-white/5 hover:bg-transparent px-8">
                                <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] h-14 pl-8">Timestamp</TableHead>
                                <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] h-14">Asset</TableHead>
                                <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] h-14">Thesis</TableHead>
                                <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] h-14">AI Signal</TableHead>
                                <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] h-14">Strength</TableHead>
                                <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] h-14">Market Actual</TableHead>
                                <TableHead className="text-gray-700 font-black uppercase tracking-widest text-[9px] h-14 text-right pr-8">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historyData.map((item) => (
                                <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                    <TableCell className="text-gray-500 text-[10px] font-black font-mono pl-8">{item.date}</TableCell>
                                    <TableCell className="text-white font-black italic tracking-tighter">{item.stock}</TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "flex items-center text-[10px] font-black italic tracking-widest transition-transform group-hover:translate-x-1",
                                            item.userPred === 'UP' ? 'text-emerald-500' : 'text-rose-500'
                                        )}>
                                            {item.userPred === 'UP' ? <ArrowUp className="w-3.5 h-3.5 mr-2" /> : <ArrowDown className="w-3.5 h-3.5 mr-2" />}
                                            {item.userPred}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "flex items-center text-[10px] font-black text-gray-600 uppercase tracking-widest",
                                        )}>
                                            {item.aiPred === 'UP' ? <ArrowUp className="w-3 h-3 mr-2 opacity-50" /> : <ArrowDown className="w-3 h-3 mr-2 opacity-50" />}
                                            {item.aiPred}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-white font-black italic text-xs tracking-tighter">{item.confidence}%</TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "flex items-center text-[10px] font-black white italic tracking-widest",
                                        )}>
                                            {item.actual === 'UP' ? <ArrowUp className="w-3.5 h-3.5 mr-2 text-white" /> : <ArrowDown className="w-3.5 h-3.5 mr-2 text-white" />}
                                            {item.actual}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <Badge className={cn(
                                            "font-black uppercase tracking-widest text-[9px] px-4 py-1 rounded-full",
                                            item.result === 'WIN' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                        )}>
                                            {item.result}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
