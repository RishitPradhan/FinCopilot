'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Send,
    Sparkles,
    User,
    Bot,
    Zap,
    MessageSquare,
    History,
    HelpCircle,
    Lightbulb,
    ArrowRight,
    Loader2,
    Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const quickPrompts = [
    "How diversified is my current portfolio?",
    "Analyze the risk of my Apple (AAPL) holding.",
    "What is the current market sentiment for TSLA?",
    "Should I rebalance my portfolio now?",
    "Explain the impact of the latest Fed rate signals."
];

export default function AdvisorPage() {
    const { user } = useAuthStore();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: `Hello ${user?.name?.split(' ')[0] || 'Investor'}! I'm your FinCopilot AI advisor. Based on your Moderate risk appetite and current portfolio (heavy in tech), I'm ready to help you optimize your strategy. What would you like to analyze today?`,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    const handleSend = () => {
        if (!input.trim() || isThinking) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        // Mock AI response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Analyzing your query: "${input}"... Based on current market news and your portfolio data, I recommend looking at your exposure to the technology sector which is currently at 65%. While NIFTY50 is showing bullish signals, diversifying into Energy or Consumer Staples could provide a better risk-adjusted return (Sharpe score improvement of ~0.4).`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsThinking(false);
        }, 2000);
    };

    return (
        <div className="h-[calc(100vh-140px)] flex gap-8 animate-in fade-in duration-500">
            {/* Sidebar - Quick Prompts */}
            <div className="hidden lg:flex flex-col w-72 shrink-0 space-y-6">
                <Card className="bg-card border-border flex-1">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center">
                            <Lightbulb className="h-4 w-4 mr-2 text-white" />
                            Quick Prompts
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {quickPrompts.map((prompt, i) => (
                            <button
                                key={i}
                                onClick={() => setInput(prompt)}
                                className="w-full text-left p-3 rounded-xl bg-secondary border border-border text-xs text-gray-400 hover:text-white hover:border-white/30 transition-all group"
                            >
                                {prompt}
                                <ArrowRight className="h-3 w-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                            </button>
                        ))}
                    </CardContent>
                    <CardFooter className="mt-auto border-t border-border/50 pt-4">
                        <div className="p-3 rounded-xl bg-white/5 border border-border">
                            <p className="text-[10px] text-gray-500 font-medium">
                                AI Advisor uses real-time news sentiment and your portfolio data to provide tailored insights.
                            </p>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Main Chat Interface */}
            <div className="flex-1 flex flex-col h-full">
                <Card className="flex-1 flex flex-col bg-card border-border overflow-hidden">
                    <CardHeader className="border-b border-border px-6 py-4 flex flex-row items-center justify-between bg-black/50 backdrop-blur-xl">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-black" />
                            </div>
                            <div>
                                <CardTitle className="text-white text-lg font-bold">FinCopilot Advisor</CardTitle>
                                <div className="flex items-center text-[10px] font-bold text-white uppercase tracking-tighter">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 animate-pulse" />
                                    AI Model Active
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white" onClick={() => setMessages(messages.slice(0, 1))}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-hidden p-0 relative">
                        <ScrollArea className="h-full px-6 py-8 no-scrollbar" ref={scrollRef}>
                            <div className="space-y-8 pb-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                                            msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                                        )}
                                    >
                                        <Avatar className={cn(
                                            "h-9 w-9 border",
                                            msg.role === 'user' ? "border-border" : "border-white/20 bg-white/5"
                                        )}>
                                            {msg.role === 'user' ? (
                                                <><AvatarImage src="" /><AvatarFallback className="bg-secondary text-white font-bold">{user?.name?.[0] || 'U'}</AvatarFallback></>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Bot className="h-5 w-5 text-white" />
                                                </div>
                                            )}
                                        </Avatar>
                                        <div className={cn(
                                            "flex flex-col max-w-[80%] space-y-1",
                                            msg.role === 'user' ? "items-end" : "items-start"
                                        )}>
                                            <div className={cn(
                                                "rounded-2xl p-4 text-sm leading-relaxed",
                                                msg.role === 'user'
                                                    ? "bg-white text-black font-medium"
                                                    : "bg-secondary border border-border text-gray-200"
                                            )}>
                                                {msg.content}
                                            </div>
                                            <span className="text-[10px] text-gray-600 font-bold px-1 uppercase tracking-tighter">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {isThinking && (
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-9 w-9 border border-white/20 bg-white/5">
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Bot className="h-5 w-5 text-white" />
                                            </div>
                                        </Avatar>
                                        <div className="bg-secondary border border-border rounded-xl px-4 py-3 flex items-center space-x-2">
                                            <Loader2 className="h-3 w-3 text-white animate-spin" />
                                            <span className="text-xs text-gray-500 font-medium">FinCopilot is thinking...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>

                    <CardFooter className="border-t border-border p-6 bg-card/50">
                        <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-secondary focus-within:border-white/50 transition-all pr-12">
                            <Input
                                placeholder="Ask about your portfolio, market sentiment, or strategy..."
                                className="border-none bg-transparent h-14 text-white placeholder:text-gray-600 focus-visible:ring-0"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <Button
                                size="icon"
                                onClick={handleSend}
                                disabled={!input.trim() || isThinking}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-gray-200 rounded-xl h-10 w-10 shrink-0"
                            >
                                {isThinking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
