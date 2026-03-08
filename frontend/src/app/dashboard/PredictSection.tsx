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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import {
    Info,
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

export function PredictSection() {
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
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <Select value={selectedStock} onValueChange={setSelectedStock}>
                                <SelectTrigger className="w-[180px] h-11 bg-white/[0.05] border-white/10 text-white font-bold uppercase tracking-widest text-[9px] rounded-xl shadow-xl focus:ring-white/20">
                                    <SelectValue placeholder="Asset" />
                                </SelectTrigger>
                                <SelectContent className="bg-black/95 border-white/10 text-white backdrop-blur-3xl rounded-xl p-1">
                                    <SelectItem value="AAPL" className="rounded-lg">AAPL · Apple Inc</SelectItem>
                                    <SelectItem value="TSLA" className="rounded-lg">TSLA · Tesla Motors</SelectItem>
                                    <SelectItem value="GOOGL" className="rounded-lg">GOOGL · Alphabet</SelectItem>
                                    <SelectItem value="MSFT" className="rounded-lg">MSFT · Microsoft</SelectItem>
                                    <SelectItem value="NIFTY50" className="rounded-lg">NIFTY 50 · Index</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex flex-col">
                                <span className="text-xl font-black font-mono text-white tracking-tighter">${chartData[chartData.length - 1].price}</span>
                                <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">+2.45%</span>
                            </div>
                        </div>
                        <Badge variant="outline" className="border-white/5 bg-white/5 text-gray-500 text-[9px] font-black tracking-widest px-3 py-1 rounded-full flex items-center">
                            <Clock className="w-3 h-3 mr-2" /> 30D Window
                        </Badge>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorPricePredict" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="date" stroke="#444" fontSize={10} tickLine={false} axisLine={false} minTickGap={30} />
                                <YAxis stroke="#444" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} domain={['auto', 'auto']} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorPricePredict)" animationDuration={1000} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Prediction Input Card */}
                <Card className="bg-card/50 border border-white/5 p-6 space-y-6">
                    <div>
                        <h3 className="text-sm font-black text-white italic uppercase tracking-tighter">Your Thesis</h3>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[8px] mt-1">24H Vector Analysis</p>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            onClick={() => setPrediction('UP')}
                            variant="outline"
                            className={cn(
                                "flex-1 h-20 flex flex-col border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl",
                                prediction === 'UP' && "border-white bg-white text-black"
                            )}
                        >
                            <ArrowUp className="h-5 w-5 mb-1" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Bullish</span>
                        </Button>
                        <Button
                            onClick={() => setPrediction('DOWN')}
                            variant="outline"
                            className={cn(
                                "flex-1 h-20 flex flex-col border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl",
                                prediction === 'DOWN' && "border-white bg-white text-black"
                            )}
                        >
                            <ArrowDown className="h-5 w-5 mb-1" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Bearish</span>
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <Label className="text-[8px] font-black text-gray-600 uppercase">Certainty</Label>
                            <span className="text-xs font-black text-white">{confidence[0]}%</span>
                        </div>
                        <Slider value={confidence} onValueChange={setConfidence} max={100} min={50} step={1} />
                    </div>

                    <Button
                        className="w-full bg-white text-black font-black uppercase tracking-widest text-[9px] h-11 rounded-xl shadow-lg disabled:opacity-20"
                        disabled={!prediction || isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? "Synthesizing..." : "Submit Thesis"}
                    </Button>
                </Card>
            </div>

            <AnimatePresence>
                {showResult && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                        <Card className="bg-white/[0.03] border border-white/10 p-6 relative">
                            <button onClick={() => setShowResult(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                                <XCircle className="w-4 h-4" />
                            </button>
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <div className="space-y-1 flex-1">
                                    <h4 className="text-lg font-black text-white italic tracking-tight">Intelligence Confirmed</h4>
                                    <p className="text-xs text-gray-400 font-medium leading-relaxed">
                                        Neural models indicate an <span className="text-white font-bold">UPWARD</span> vector for {selectedStock} at 82% probability.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/5 text-center">
                                        <p className="text-[8px] text-gray-500 uppercase font-bold">You</p>
                                        <p className={cn("text-lg font-black", prediction === 'UP' ? 'text-emerald-400' : 'text-rose-400')}>{prediction}</p>
                                    </div>
                                    <div className="px-4 py-2 rounded-xl bg-white text-black text-center">
                                        <p className="text-[8px] text-black/40 uppercase font-bold">AI</p>
                                        <p className="text-lg font-black">UP</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* History Table Small Version */}
            <div className="bg-card/30 rounded-2xl border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Transmission Logs</h4>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-[9px] font-black uppercase text-gray-600 pl-6 h-11">Date</TableHead>
                            <TableHead className="text-[9px] font-black uppercase text-gray-600 h-11">Asset</TableHead>
                            <TableHead className="text-[9px] font-black uppercase text-gray-600 h-11">Thesis</TableHead>
                            <TableHead className="text-[9px] font-black uppercase text-gray-600 h-11">AI Signal</TableHead>
                            <TableHead className="text-[9px] font-black uppercase text-gray-600 h-11 text-right pr-6">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {historyData.map((item) => (
                            <TableRow key={item.id} className="border-white/5 transition-colors">
                                <TableCell className="text-[10px] text-gray-500 pl-6">{item.date}</TableCell>
                                <TableCell className="text-white font-bold text-xs">{item.stock}</TableCell>
                                <TableCell className={cn("text-[10px] font-black italic", item.userPred === 'UP' ? 'text-emerald-400' : 'text-rose-400')}>{item.userPred}</TableCell>
                                <TableCell className="text-[10px] text-gray-400 font-bold">{item.aiPred}</TableCell>
                                <TableCell className="text-right pr-6">
                                    <span className={cn("text-[8px] font-black px-2 py-0.5 rounded-full uppercase", item.result === 'WIN' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400')}>
                                        {item.result}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
