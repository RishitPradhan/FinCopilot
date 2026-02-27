'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Wallet, TrendingUp, BookOpen, Zap, ArrowUpRight, ArrowDownRight, ArrowUp, ArrowDown, History, Target, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

// Mock chart data generator
const generateMockChartData = (stock: string) => {
    const data = [];
    let price = stock === 'AAPL' ? 150 : stock === 'TSLA' ? 200 : stock === 'NIFTY50' ? 22000 : 100;
    for (let i = 30; i >= 0; i--) {
        price = price + (Math.random() - 0.5) * (stock === 'NIFTY50' ? 200 : 5);
        data.push({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: parseFloat(price.toFixed(2)),
        });
    }
    return data;
};

const predictionHistoryData = [
    { id: 1, date: '2024-05-20', stock: 'AAPL', userPred: 'UP', aiPred: 'UP', actual: 'UP', result: 'WIN', confidence: 85 },
    { id: 2, date: '2024-05-18', stock: 'TSLA', userPred: 'DOWN', aiPred: 'UP', actual: 'UP', result: 'LOSS', confidence: 70 },
    { id: 3, date: '2024-05-15', stock: 'GOOGL', userPred: 'UP', aiPred: 'UP', actual: 'UP', result: 'WIN', confidence: 90 },
];

export default function DashboardPage() {
    const { user } = useAuthStore();
    const [iqScore, setIqScore] = useState(74);

    // Prediction state
    const [selectedStock, setSelectedStock] = useState('NIFTY50');
    const [prediction, setPrediction] = useState<'UP' | 'DOWN' | null>(null);
    const [confidence, setConfidence] = useState([75]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const chartData = useMemo(() => generateMockChartData(selectedStock), [selectedStock]);

    useEffect(() => {
        const fetchIq = async () => {
            try {
                const res = await api.get('/user/iq-score');
                setIqScore(res.data.score);
            } catch (e) { /* fallback to default */ }
        };
        fetchIq();
    }, []);

    const handleSubmitPrediction = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowResult(true);
        }, 1500);
    };

    const stats = [
        {
            title: 'Portfolio Value',
            value: '$124,592.50',
            change: '+12.5%',
            trend: 'up',
            icon: Wallet,
            color: 'text-white',
        },
        {
            title: 'Prediction Accuracy',
            value: '78.2%',
            change: '+2.4%',
            trend: 'up',
            icon: Target,
            color: 'text-white',
        },
        {
            title: 'Modules Completed',
            value: '12 / 15',
            change: '80%',
            trend: 'neutral',
            icon: BookOpen,
            color: 'text-white',
        },
        {
            title: 'Market Mood',
            value: 'Fear & Greed: 64',
            change: 'Greed',
            trend: 'up',
            icon: Zap,
            color: 'text-white',
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-xl bg-secondary p-8 border border-border shadow-2xl">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Hello, {user?.name?.split(' ')[0] || 'Investor'}. Your Financial IQ Score: <span className="text-primary">{iqScore}</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl">
                        You're in the top 15% of investors this week. Your portfolio diversification is looking strong, but keep an eye on your tech sector exposure.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl -mr-20 -mt-20 rounded-full" />
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="bg-card border-border hover:border-white/50 transition-all duration-300 shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={cn("h-4 w-4", stat.color)} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                            <div className="flex items-center mt-1">
                                {stat.trend === 'up' ? (
                                    <ArrowUpRight className="h-4 w-4 text-white mr-1" />
                                ) : stat.trend === 'down' ? (
                                    <ArrowDownRight className="h-4 w-4 text-gray-400 mr-1" />
                                ) : null}
                                <span className={cn(
                                    "text-xs font-medium",
                                    stat.trend === 'up' ? "text-white" : stat.trend === 'down' ? "text-gray-400" : "text-gray-400"
                                )}>
                                    {stat.change}
                                </span>
                                <span className="text-[10px] text-gray-500 ml-2 uppercase">vs last week</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Prediction Section - Moved from Predict Page */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Predict Playground</h2>
                    <p className="text-gray-400">Test your market intuition against our AI models.</p>
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
                                    <SelectItem value="NIFTY50">NIFTY 50</SelectItem>
                                    <SelectItem value="AAPL">AAPL (Apple)</SelectItem>
                                    <SelectItem value="TSLA">TSLA (Tesla)</SelectItem>
                                    <SelectItem value="GOOGL">GOOGL (Alphabet)</SelectItem>
                                    <SelectItem value="MSFT">MSFT (Microsoft)</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Live Price</span>
                                <span className="text-xl font-mono font-bold text-white">{selectedStock === 'NIFTY50' ? chartData[chartData.length - 1].price.toLocaleString() : '$' + chartData[chartData.length - 1].price}</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Badge variant="outline" className="border-border text-white">+2.45%</Badge>
                            <Badge variant="outline" className="border-border text-gray-500 flex items-center">
                                30D
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 h-[300px]">
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
                                    tickFormatter={(val) => selectedStock === 'NIFTY50' ? val.toLocaleString() : `$${val}`}
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
                    <CardContent className="flex-1 space-y-6">
                        <div className="flex gap-4">
                            <Button
                                onClick={() => setPrediction('UP')}
                                variant="outline"
                                className={cn(
                                    "flex-1 h-16 flex flex-col border-border bg-secondary/50 hover:bg-white/5 hover:border-white transition-all",
                                    prediction === 'UP' && "border-white bg-white/10 ring-1 ring-white"
                                )}
                            >
                                <ArrowUp className={cn("h-5 w-5 mb-1", prediction === 'UP' ? "text-white" : "text-gray-500")} />
                                <span className={cn("text-xs font-bold uppercase", prediction === 'UP' ? "text-white" : "text-gray-500")}>Bullish</span>
                            </Button>
                            <Button
                                onClick={() => setPrediction('DOWN')}
                                variant="outline"
                                className={cn(
                                    "flex-1 h-16 flex flex-col border-border bg-secondary/50 hover:bg-white/5 hover:border-white transition-all",
                                    prediction === 'DOWN' && "border-white bg-white/10 ring-1 ring-white"
                                )}
                            >
                                <ArrowDown className={cn("h-5 w-5 mb-1", prediction === 'DOWN' ? "text-white" : "text-gray-500")} />
                                <span className={cn("text-xs font-bold uppercase", prediction === 'DOWN' ? "text-white" : "text-gray-500")}>Bearish</span>
                            </Button>
                        </div>

                        <div className="space-y-3">
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
                                className="py-2"
                            />
                        </div>

                        <div className="p-3 rounded-xl bg-white/5 border border-border flex items-start space-x-2">
                            <Info className="h-4 w-4 text-white shrink-0 mt-0.5" />
                            <p className="text-[10px] text-gray-400">
                                Your prediction will be recorded and compared against the real market price in 24 hours.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-border/50">
                        <Button
                            className="w-full bg-white text-black hover:bg-gray-200 font-bold"
                            disabled={!prediction || isSubmitting}
                            onClick={handleSubmitPrediction}
                        >
                            {isSubmitting ? "Processing..." : "Submit Prediction"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Prediction Result */}
            {showResult && (
                <Card className="bg-white/5 border border-white/10 animate-in slide-in-from-top-4 duration-500">
                    <CardHeader className="flex flex-row items-center space-x-4">
                        <div className="p-3 bg-white/10 rounded-full">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-xl text-white">Prediction Submitted!</CardTitle>
                            <CardDescription className="text-gray-400 font-medium">You predicted {prediction === 'UP' ? 'Bullish' : 'Bearish'} with {confidence[0]}% confidence.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6 items-center border-t border-white/10 pt-4">
                        <div className="space-y-2">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                <Zap className="h-4 w-4 mr-2 text-white" /> AI Perspective
                            </h4>
                            <p className="text-sm text-gray-300">
                                Our AI model predicts an <span className="text-white font-bold underline">UPWARD</span> movement for {selectedStock} with <span className="text-white font-bold">82% confidence</span>.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 p-3 rounded-xl bg-secondary border border-border text-center">
                                <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Your Call</p>
                                <p className="text-lg font-bold text-white">{prediction}</p>
                            </div>
                            <div className="flex-1 p-3 rounded-xl bg-secondary border border-border text-center">
                                <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">AI Call</p>
                                <p className="text-lg font-bold text-white">UP</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Prediction History Table */}
            <Card className="bg-card border-border shadow-xl">
                <CardHeader>
                    <CardTitle className="text-lg text-white">Prediction History</CardTitle>
                    <CardDescription className="text-gray-400">Your past predictions and performance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader className="border-border hover:bg-transparent">
                            <TableRow className="border-border hover:bg-transparent">
                                <TableHead className="text-gray-500 font-bold">Date</TableHead>
                                <TableHead className="text-gray-500 font-bold">Stock</TableHead>
                                <TableHead className="text-gray-500 font-bold">Your Pred</TableHead>
                                <TableHead className="text-gray-500 font-bold">AI Pred</TableHead>
                                <TableHead className="text-gray-500 font-bold">Actual</TableHead>
                                <TableHead className="text-gray-500 font-bold text-right">Result</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {predictionHistoryData.map((item) => (
                                <TableRow key={item.id} className="border-border hover:bg-secondary/30">
                                    <TableCell className="text-gray-400 text-xs font-mono">{item.date}</TableCell>
                                    <TableCell className="text-white font-bold">{item.stock}</TableCell>
                                    <TableCell>
                                        <span className={cn("flex items-center text-xs font-bold text-white")}>
                                            {item.userPred === 'UP' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                                            {item.userPred}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={cn("flex items-center text-xs font-bold text-gray-400")}>
                                            {item.aiPred === 'UP' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                                            {item.aiPred}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={cn("flex items-center text-xs font-bold text-white")}>
                                            {item.actual === 'UP' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                                            {item.actual}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge className={cn("font-bold bg-white/10 text-white")}>
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
