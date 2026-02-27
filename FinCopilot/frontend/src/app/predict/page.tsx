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
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Predict Playground</h1>
                    <p className="text-gray-400">Test your market intuition against our advanced AI models.</p>
                </div>
                <div className="flex items-center space-x-3 bg-secondary border border-border p-1 px-3 rounded-full">
                    <History className="h-4 w-4 text-gray-500" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Historical Accuracy: </span>
                    <span className="text-xs font-mono text-white font-bold">78.2%</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <Card className="lg:col-span-2 bg-card border-border overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-border/50">
                        <div className="flex items-center space-x-4">
                            <Select value={selectedStock} onValueChange={setSelectedStock}>
                                <SelectTrigger className="w-[180px] bg-secondary border-border text-white font-bold">
                                    <SelectValue placeholder="Select Stock" />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-border text-white">
                                    <SelectItem value="AAPL">AAPL (Apple)</SelectItem>
                                    <SelectItem value="TSLA">TSLA (Tesla)</SelectItem>
                                    <SelectItem value="GOOGL">GOOGL (Alphabet)</SelectItem>
                                    <SelectItem value="MSFT">MSFT (Microsoft)</SelectItem>
                                    <SelectItem value="NIFTY50">NIFTY 50</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Live Price</span>
                                <span className="text-xl font-mono font-bold text-white">${chartData[chartData.length - 1].price}</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Badge variant="outline" className="border-border text-white">+2.45%</Badge>
                            <Badge variant="outline" className="border-border text-gray-500 flex items-center">
                                <Clock className="w-3 h-3 mr-1" /> 30D
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#4b5563"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    minTickGap={30}
                                />
                                <YAxis
                                    stroke="#4b5563"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => `$${val}`}
                                    domain={['auto', 'auto']}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #222', borderRadius: '4px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#fff"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorPrice)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Prediction Input Section */}
                <Card className="bg-card border-border flex flex-col shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-xl text-white">Make Your Prediction</CardTitle>
                        <CardDescription className="text-gray-400">Predict the price movement for the next 24 hours.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-8">
                        <div className="flex gap-4">
                            <Button
                                onClick={() => setPrediction('UP')}
                                variant="outline"
                                className={cn(
                                    "flex-1 h-20 flex flex-col border-border bg-secondary/50 hover:bg-white/5 hover:border-white transition-all",
                                    prediction === 'UP' && "border-white bg-white/10 ring-1 ring-white"
                                )}
                            >
                                <ArrowUp className={cn("h-6 w-6 mb-1", prediction === 'UP' ? "text-white" : "text-gray-500")} />
                                <span className={cn("text-xs font-bold uppercase", prediction === 'UP' ? "text-white" : "text-gray-500")}>Bullish</span>
                            </Button>
                            <Button
                                onClick={() => setPrediction('DOWN')}
                                variant="outline"
                                className={cn(
                                    "flex-1 h-20 flex flex-col border-border bg-secondary/50 hover:bg-white/5 hover:border-white transition-all",
                                    prediction === 'DOWN' && "border-white bg-white/10 ring-1 ring-white"
                                )}
                            >
                                <ArrowDown className={cn("h-6 w-6 mb-1", prediction === 'DOWN' ? "text-white" : "text-gray-500")} />
                                <span className={cn("text-xs font-bold uppercase", prediction === 'DOWN' ? "text-white" : "text-gray-500")}>Bearish</span>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-semibold text-gray-300">Confidence Level</Label>
                                <span className="text-sm font-mono text-white font-bold">{confidence[0]}%</span>
                            </div>
                            <Slider
                                value={confidence}
                                onValueChange={setConfidence}
                                max={100}
                                min={50}
                                step={1}
                                className="py-4"
                            />
                            <div className="flex justify-between text-[10px] uppercase text-gray-500 font-bold tracking-widest">
                                <span>Careful</span>
                                <span>Highly Confident</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-border flex items-start space-x-3">
                            <Info className="h-4 w-4 text-white shrink-0 mt-0.5" />
                            <p className="text-[11px] text-gray-400">
                                Your prediction will be recorded and compared against the real market price in 24 hours. Gain +50 XP for every correct prediction.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-6 border-t border-border/50">
                        <Button
                            className="w-full bg-white text-black hover:bg-gray-200 font-bold h-12"
                            disabled={!prediction || isSubmitting}
                            onClick={handleSubmit}
                        >
                            {isSubmitting ? "Processing..." : "Submit Prediction"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {showResult && (
                <Card className="bg-white/5 border border-white/10 animate-in slide-in-from-top-4 duration-500">
                    <CardHeader className="flex flex-row items-center space-x-4">
                        <div className="p-3 bg-white/10 rounded-full">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-xl text-white">Prediction Submitted Successfully!</CardTitle>
                            <CardDescription className="text-gray-400 font-medium">You predicted {prediction === 'UP' ? 'Bullish' : 'Bearish'} with {confidence[0]}% confidence.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8 items-center border-t border-white/10 pt-6">
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                <Zap className="h-4 w-4 mr-2 text-white" /> AI Perspective
                            </h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Our AI model currently predicts an <span className="text-white font-bold underline">UPWARD</span> movement for {selectedStock} with <span className="text-white font-bold">82% confidence</span>.
                                Reasoning: Strong volume consolidation at the $178 support level followed by an uptick in MACD momentum suggests a breakout is imminent.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 p-4 rounded-xl bg-secondary border border-border text-center">
                                <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Your Call</p>
                                <p className={cn("text-xl font-bold text-white")}>
                                    {prediction}
                                </p>
                            </div>
                            <div className="flex-1 p-4 rounded-xl bg-secondary border border-border text-center">
                                <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">AI Call</p>
                                <p className="text-xl font-bold text-white">UP</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Prediction History Table */}
            <Card className="bg-card border-border shadow-xl">
                <CardHeader>
                    <CardTitle className="text-xl text-white">Prediction History</CardTitle>
                    <CardDescription className="text-gray-400">Your past predictions and performance metrics.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader className="border-border hover:bg-transparent">
                            <TableRow className="border-border hover:bg-transparent">
                                <TableHead className="text-gray-500 font-bold">Date</TableHead>
                                <TableHead className="text-gray-500 font-bold">Stock</TableHead>
                                <TableHead className="text-gray-500 font-bold">Your Prediction</TableHead>
                                <TableHead className="text-gray-500 font-bold">AI Prediction</TableHead>
                                <TableHead className="text-gray-500 font-bold">Confidence</TableHead>
                                <TableHead className="text-gray-500 font-bold">Actual</TableHead>
                                <TableHead className="text-gray-500 font-bold text-right">Result</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historyData.map((item) => (
                                <TableRow key={item.id} className="border-border hover:bg-secondary/30">
                                    <TableCell className="text-gray-400 text-xs font-mono">{item.date}</TableCell>
                                    <TableCell className="text-white font-bold">{item.stock}</TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "flex items-center text-xs font-bold text-white"
                                        )}>
                                            {item.userPred === 'UP' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                                            {item.userPred}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "flex items-center text-xs font-bold text-gray-400"
                                        )}>
                                            {item.aiPred === 'UP' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                                            {item.aiPred}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-400 text-xs">{item.confidence}%</TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "flex items-center text-xs font-bold text-white"
                                        )}>
                                            {item.actual === 'UP' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                                            {item.actual}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge className={cn(
                                            "font-bold bg-white/10 text-white"
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
