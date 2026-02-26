'use client';

import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './components/ChatMessage';
import BotResponse, { BotResponseData } from './components/BotResponse';
import ChatInputBar from './components/ChatInputBar';
import { ArrowUp } from 'lucide-react';
import api from '@/services/api';

interface Message {
    type: 'user' | 'bot';
    content: string | BotResponseData;
    timestamp: string;
    isLoading?: boolean;
}

export default function AdvisorPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/advisor/history');
                if (response.data && response.data.history) {
                    const formattedHistory = response.data.history.map((msg: any) => ({
                        type: msg.role === 'user' ? 'user' : 'bot',
                        content: msg.role === 'user' ? msg.content : parseBotResponse(msg.content, extractSymbolFromMessage(msg.content) || 'BAJFINANCE'),
                        timestamp: new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                    }));
                    setMessages(formattedHistory);
                }
            } catch (err) {
                console.error('Failed to load chat history', err);
            }
        };
        fetchHistory();
    }, []);

    const handleSendMessage = async (userText: string) => {
        if (!userText.trim()) return;

        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const userMessage: Message = {
            type: 'user',
            content: userText,
            timestamp
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        // Placeholder for bot response
        setMessages(prev => [
            ...prev,
            {
                type: 'bot',
                content: '',
                isLoading: true,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
            }
        ]);

        try {
            // Direct API call without streaming for simplicity in this implementation
            const response = await api.post('/advisor/chat', { message: userText });
            const fullResponseText = response.data.message;
            const symbol = extractSymbolFromMessage(userText);

            const parsedResponse = parseBotResponse(fullResponseText, symbol, userText);

            setMessages(prev => [
                ...prev.slice(0, -1),
                {
                    type: 'bot',
                    content: parsedResponse,
                    isLoading: false,
                    timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                }
            ]);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to get response');
            setMessages(prev => prev.slice(0, -1)); // Remove loading placeholder
        } finally {
            setIsLoading(false);
        }
    }

    const handleRetry = () => {
        if (messages.length > 0) {
            const lastUserMessage = [...messages].reverse().find(m => m.type === 'user');
            if (lastUserMessage && typeof lastUserMessage.content === 'string') {
                setMessages(prev => prev.slice(0, -1)); // Remove the error message
                handleSendMessage(lastUserMessage.content);
            }
        }
    }

    // Helper functions adapted from ai-server implementation
    const extractSymbolFromMessage = (text: string) => {
        const upperText = text.toUpperCase();
        const symbolMap: Record<string, string[]> = {
            'LENSKART': ['LENSKART'],
            'DMART': ['DMART', 'D-MART'],
            'TCS': ['TCS', 'TATA CONSULTANCY'],
            'INFY': ['INFY', 'INFOSYS'],
            'WIPRO': ['WIPRO'],
            'RELIANCE': ['RELIANCE', 'RIL'],
            'HDFC': ['HDFC', 'HDFC BANK'],
            'JIOFINANCE': ['JIOFINANCE', 'JIO FINANCIAL', 'JF'],
            'BAJFINANCE': ['BAJAJ FINANCE', 'BAJAJ FIN', 'BAJFINANCE']
        };

        for (const [symbol, variations] of Object.entries(symbolMap)) {
            for (const variation of variations) {
                if (upperText.includes(variation)) {
                    return symbol;
                }
            }
        }
        return '';
    }

    const parseBotResponse = (text: string, symbol: string, originalUserText: string = ''): BotResponseData => {
        const shouldShowChart = text.toLowerCase().includes('chart') ||
            text.toLowerCase().includes('price') ||
            text.toLowerCase().includes('technical') ||
            originalUserText.toLowerCase().includes('chart') ||
            originalUserText.toLowerCase().includes('plot');

        return {
            text,
            showChart: shouldShowChart && symbol !== '',
            symbol: symbol || undefined,
            chartData: shouldShowChart ? undefined : undefined, // Will use generated mock data in StockChart
            snapshot: shouldShowChart ? {
                'Current Price': '₹' + (Math.random() * 8000 + 1000).toFixed(2),
                '52W High': '₹' + ((Math.random() * 8000 + 1000) * 1.2).toFixed(2),
                '52W Low': '₹' + ((Math.random() * 8000 + 1000) * 0.8).toFixed(2),
                'Volume': (Math.random() * 2 + 1).toFixed(2) + 'M',
                'P/E Ratio': (Math.random() * 40 + 15).toFixed(2),
                'Market Cap': '₹' + (Math.random() * 8 + 1).toFixed(2) + 'L Cr'
            } : undefined,
            sentiment: shouldShowChart ? {
                level: Math.random() > 0.6 ? 'bullish' : Math.random() > 0.3 ? 'neutral' : 'bearish',
                bearish: Math.floor(Math.random() * 5),
                neutral: Math.floor(Math.random() * 8 + 2),
                bullish: Math.floor(Math.random() * 10 + 2)
            } : undefined,
            events: shouldShowChart ? [
                { date: '2024-01-15', name: 'Q3 Results', impact: 'Positive earnings beat drove stock up 5%' },
                { date: '2024-02-01', name: 'CEO Announcement', impact: 'New product launch, bullish for growth' }
            ] : undefined,
            relatedQuestions: generateRelatedQuestions(symbol || 'SENSEX'),
            sources: generateCompanySources(symbol || 'SENSEX')
        };
    }

    const generateRelatedQuestions = (symbol: string) => {
        return [
            {
                question: `What are the key metrics for ${symbol}?`,
                answer: `Key metrics for ${symbol} include the Price-to-Earnings (P/E) ratio, Market Cap, Dividend Yield, and Return on Equity (ROE).`
            },
            {
                question: `How does this compare to competitors?`,
                answer: `${symbol} demonstrates strong competitive positioning with comparable or superior metrics to its peers.`
            },
            {
                question: `What are the analyst ratings?`,
                answer: `Most major analysts have positive outlooks on ${symbol} with ratings ranging from "Hold" to "Strong Buy".`
            }
        ];
    }

    const generateCompanySources = (symbol: string) => {
        const companyNames: Record<string, string> = {
            'LENSKART': 'Lenskart',
            'DMART': 'Avenue Supermarts',
            'TCS': 'Tata Consultancy Services',
            'INFY': 'Infosys',
            'RELIANCE': 'Reliance Industries',
            'BAJFINANCE': 'Bajaj Finance',
            'SENSEX': 'BSE SENSEX'
        };
        const companyName = companyNames[symbol] || symbol;

        return [
            { title: `${companyName} Stock Overview`, url: `https://www.google.com/finance?q=${encodeURIComponent(companyName)}` },
            { title: `Latest News on ${companyName}`, url: `https://www.google.com/search?q=${encodeURIComponent(companyName + ' stock market news')}&tbm=nws` },
            { title: 'Investor Relations & Filings', url: `https://www.google.com/search?q=${encodeURIComponent(companyName + ' investor relations')}` }
        ];
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-dark-bg font-sharp">
            {/* Header */}
            <div className="bg-dark-gray border-b border-dark-gray p-4 flex items-center justify-between shrink-0">
                <div>
                    <h2 className="text-white font-bold">Stocko Chat</h2>
                    <p className="text-xs text-gray-400">Your AI Stock Market Assistant</p>
                </div>
                <button
                    onClick={() => { }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dark-gray hover:border-neon-green text-gray-300 hover:text-neon-green transition-all duration-300 text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    History
                </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="mb-8">
                            <svg className="w-16 h-16 text-neon-green/50 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-gray-400 text-sm">Start a conversation to get stock insights</p>
                    </div>
                ) : (
                    messages.map((message, index) =>
                        message.type === 'user' ? (
                            <ChatMessage
                                key={index}
                                type="user"
                                content={message.content as string}
                                timestamp={message.timestamp}
                            />
                        ) : (
                            <div key={index}>
                                <BotResponse
                                    response={message.content as BotResponseData}
                                    isLoading={message.isLoading || false}
                                    onRetry={handleRetry}
                                    error={null}
                                />
                            </div>
                        )
                    )
                )}
                {error && (
                    <BotResponse
                        response={null}
                        isLoading={false}
                        onRetry={handleRetry}
                        error={error}
                    />
                )}
                {isLoading && messages[messages.length - 1]?.type === 'user' && (
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-neon-green animate-pulse"></div>
                        <p className="text-gray-400 text-sm">Stocko is analyzing...</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <ChatInputBar
                onSendMessage={handleSendMessage}
                onNewChat={() => setMessages([])}
                isLoading={isLoading}
            />

            {/* Scroll to bottom button */}
            {messages.length > 0 && (
                <button
                    onClick={scrollToBottom}
                    className="absolute bottom-24 right-6 p-3 rounded-full bg-neon-green/20 border border-neon-green text-neon-green hover:bg-neon-green/30 transition-all z-10 shadow-lg"
                    title="Scroll to bottom"
                >
                    <ArrowUp size={18} className="transform rotate-180" />
                </button>
            )}
        </div>
    )
}
