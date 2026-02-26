'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import StockChart from './StockChart';
import SentimentGauge from './SentimentGauge';
import TypingIndicator from './TypingIndicator';

interface Source {
    title: string;
    url: string;
}

interface Event {
    date: string;
    name: string;
    impact: string;
}

export interface BotResponseData {
    text: string;
    showChart?: boolean;
    symbol?: string;
    chartData?: any[];
    snapshot?: Record<string, string>;
    sentiment?: { level: 'bearish' | 'neutral' | 'bullish', bearish: number, neutral: number, bullish: number };
    events?: Event[];
    relatedQuestions?: { question: string, answer: string }[];
    sources?: Source[];
}

interface BotResponseProps {
    response: BotResponseData | null;
    isLoading: boolean;
    onRetry: () => void;
    error: string | null;
}

export const BotResponse = ({ response, isLoading, onRetry, error }: BotResponseProps) => {
    const [activeTab, setActiveTab] = useState<'answer' | 'sources'>('answer');
    const [expandedRelated, setExpandedRelated] = useState<number | null>(null);

    if (error) {
        return (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 mb-6">
                <p className="text-red-300 text-sm mb-4">{error}</p>
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    Try Again
                </button>
            </div>
        )
    }

    if (isLoading && typeof response?.text === 'string' && response.text.length > 0) {
        return (
            <div className="flex items-start gap-3 mb-4">
                <svg className="w-4 h-4 text-neon-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-4a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                </svg>
                <div className="bg-dark-gray border border-neon-green/30 rounded-lg p-4 flex-1">
                    <div className="text-gray-100 text-sm prose prose-invert max-w-none whitespace-pre-wrap">
                        {response.text}
                    </div>
                    <TypingIndicator />
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="bg-dark-gray border border-neon-green/30 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                    <p className="text-gray-300 text-sm">Stocko is thinking...</p>
                </div>
            </div>
        );
    }

    if (!response) return null;

    return (
        <div className="bg-dark-gray border border-neon-green/30 rounded-lg overflow-hidden mb-6 animate-fade-in flex-1">
            {/* Tabs */}
            <div className="flex border-b border-neon-green/30">
                <button
                    onClick={() => setActiveTab('answer')}
                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'answer'
                        ? 'text-neon-green border-b-2 border-neon-green bg-dark-bg'
                        : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    Answer
                </button>
                <button
                    onClick={() => setActiveTab('sources')}
                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'sources'
                        ? 'text-neon-green border-b-2 border-neon-green bg-dark-bg'
                        : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    Sources
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                {activeTab === 'answer' && (
                    <div className="space-y-6">
                        <div className="prose prose-invert max-w-none">
                            {(() => {
                                const lines = response.text.split('\n').map(l => l.trim()).filter(l => l);

                                const renderElements = [];
                                let currentTableRows: { key: string, value: string }[] = [];
                                let inTable = false;

                                const finishTable = () => {
                                    if (currentTableRows.length > 0) {
                                        renderElements.push(
                                            <div key={`table-${renderElements.length}`} className="my-6 bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
                                                <table className="w-full text-sm text-left">
                                                    <tbody>
                                                        {currentTableRows.map((r, i, arr) => (
                                                            <tr key={i} className={i !== arr.length - 1 ? "border-b border-gray-800" : ""}>
                                                                <td className="py-3 px-4 text-gray-400 font-medium w-1/3 align-top">
                                                                    {r.key.replace(/\*\*/g, '')}
                                                                </td>
                                                                <td className="py-3 px-4 text-white align-top">
                                                                    {r.value.replace(/\*\*/g, '')}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        );
                                        currentTableRows = [];
                                        inTable = false;
                                    }
                                };

                                for (let i = 0; i < lines.length; i++) {
                                    const line = lines[i];

                                    if (line.includes(':') && !line.endsWith(':') && line.split(':')[0].length < 40 && !line.startsWith('http') && !line.startsWith('-')) {
                                        const [k, ...rest] = line.split(':');
                                        const value = rest.join(':').trim();
                                        if (value && k.length > 2) {
                                            inTable = true;
                                            currentTableRows.push({ key: k.trim(), value: value });
                                            continue;
                                        }
                                    }

                                    if (line.startsWith('|') && line.endsWith('|')) {
                                        const cells = line.split('|').map(c => c.trim()).filter(c => c);
                                        if (!cells[0].includes('---')) {
                                            inTable = true;
                                            if (cells.length >= 2) {
                                                currentTableRows.push({ key: cells[0], value: cells.slice(1).join(' | ') });
                                            }
                                        }
                                        continue;
                                    }

                                    finishTable();

                                    if (line.match(/^#{1,6}\s+(.*)$/)) {
                                        const match = line.match(/^(#{1,6})\s+(.*)$/);
                                        if (match) {
                                            const level = match[1].length;
                                            const text = match[2].replace(/\*\*/g, '');

                                            const headerClasses: Record<number, string> = {
                                                1: "text-2xl font-bold text-white mt-8 mb-4",
                                                2: "text-xl font-bold text-white mt-8 mb-4 border-b border-gray-800 pb-2",
                                                3: "text-lg font-bold text-[#22c55e] mt-6 mb-3",
                                                4: "text-base font-semibold text-gray-200 mt-5 mb-2",
                                                5: "text-sm font-semibold text-gray-300 mt-4 mb-2",
                                                6: "text-sm font-medium text-gray-400 mt-4 mb-2 uppercase tracking-wide",
                                            };

                                            renderElements.push(
                                                <div key={`header-${i}`} className={headerClasses[level] || headerClasses[3]}>
                                                    {text}
                                                </div>
                                            );
                                            continue;
                                        }
                                    }

                                    if (line.startsWith('**') && line.endsWith('**')) {
                                        renderElements.push(
                                            <h4 key={`text-${i}`} className="text-white font-semibold mt-6 mb-2 text-md">
                                                {line.replace(/\*\*/g, '')}
                                            </h4>
                                        );
                                    }
                                    else if (line.startsWith('**') && line.includes('**')) {
                                        const splitIdx = line.indexOf('**', 2) + 2;
                                        const boldPart = line.substring(0, splitIdx).replace(/\*\*/g, '');
                                        const restPart = line.substring(splitIdx).replace(/^\s*:\s*/, ' ');
                                        renderElements.push(
                                            <p key={`text-${i}`} className="text-gray-300 text-sm leading-relaxed mb-2">
                                                <span className="font-semibold text-white">{boldPart}:</span>{restPart}
                                            </p>
                                        );
                                    }
                                    else if (line.match(/^\d+\.\s*(.*)$/) || line.match(/^[-*•]\s*(.*)$/)) {
                                        let content = line.replace(/^\d+\.\s*|^[-*•]\s*/, '');
                                        if (content.startsWith('**')) {
                                            const splitIdx = content.indexOf('**', 2) + 2;
                                            if (splitIdx > 1) {
                                                const boldPart = content.substring(0, splitIdx).replace(/\*\*/g, '');
                                                let restPart = content.substring(splitIdx);
                                                if (restPart.startsWith(':')) restPart = restPart.substring(1);

                                                renderElements.push(
                                                    <div key={`text-${i}`} className="flex gap-3 mb-3 ml-2">
                                                        <span className="text-[#22c55e] mt-0.5 text-lg leading-none">•</span>
                                                        <p className="text-gray-300 text-sm leading-relaxed">
                                                            <span className="font-semibold text-white">{boldPart}:</span> {restPart.trim()}
                                                        </p>
                                                    </div>
                                                );
                                                continue;
                                            }
                                        }

                                        renderElements.push(
                                            <div key={`text-${i}`} className="flex gap-3 mb-2 ml-2">
                                                <span className="text-[#22c55e] mt-0.5 text-lg leading-none">•</span>
                                                <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
                                            </div>
                                        );
                                    }
                                    else {
                                        renderElements.push(
                                            <p key={`text-${i}`} className="text-gray-300 text-sm leading-relaxed mb-3">
                                                {line.replace(/\*\*/g, '')}
                                            </p>
                                        );
                                    }
                                }

                                finishTable();

                                return <div className="animate-fade-in">{renderElements}</div>;
                            })()}
                        </div>

                        {/* Stock Chart */}
                        {response.showChart && (
                            <div className="mt-6">
                                <StockChart stockSymbol={response.symbol} data={response.chartData} />
                            </div>
                        )}

                        {/* Quick Snapshot Table */}
                        {response.snapshot && (
                            <div className="mt-8 bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
                                <div className="bg-[#242424] px-4 py-3 border-b border-gray-800">
                                    <h4 className="text-white font-semibold text-sm">Current snapshot (as of {new Date().toLocaleDateString('en-GB')})</h4>
                                </div>
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-[#1a1a1a]">
                                        <tr>
                                            <th className="py-3 px-4 text-gray-300 font-medium border-b border-gray-800 w-1/2">Metric</th>
                                            <th className="py-3 px-4 text-gray-300 font-medium border-b border-gray-800 text-right">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(response.snapshot).map(([key, value], i, arr) => (
                                            <tr key={key} className={i !== arr.length - 1 ? "border-b border-gray-800" : ""}>
                                                <td className="py-3 px-4 text-gray-400">{key}</td>
                                                <td className="py-3 px-4 text-white text-right font-medium">{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Sentiment Gauge */}
                        {response.sentiment && (
                            <div className="mt-6 bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 flex justify-center hidden">
                                <SentimentGauge
                                    sentiment={response.sentiment.level}
                                    bearishCount={response.sentiment.bearish}
                                    neutralCount={response.sentiment.neutral}
                                    bullishCount={response.sentiment.bullish}
                                />
                            </div>
                        )}

                        {/* Key Events Table */}
                        {response.events && response.events.length > 0 && (
                            <div className="mt-8 bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
                                <div className="bg-[#242424] px-4 py-3 border-b border-gray-800 text-sm">
                                    <h4 className="text-white font-semibold flex items-center gap-2">
                                        Key events to mark on the price chart ({response.symbol || 'Bajaj Finance'})
                                    </h4>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left min-w-[600px]">
                                        <thead className="bg-[#1a1a1a]">
                                            <tr>
                                                <th className="py-3 px-4 text-gray-300 font-medium border-b border-gray-800 w-1/5">Date</th>
                                                <th className="py-3 px-4 text-gray-300 font-medium border-b border-gray-800 w-1/5">Event type</th>
                                                <th className="py-3 px-4 text-gray-300 font-medium border-b border-gray-800 w-[30%]">Event</th>
                                                <th className="py-3 px-4 text-gray-300 font-medium border-b border-gray-800">Why it matters</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {response.events.map((event, i, arr) => {
                                                const isBlockDeal = event.name.toLowerCase().includes('block') || event.name.toLowerCase().includes('insider');
                                                const isResults = event.name.toLowerCase().includes('result') || event.name.toLowerCase().includes('earning');
                                                const eventType = isBlockDeal ? 'Block deal / Insider' : isResults ? 'Results / business update' : 'Corporate Action';

                                                return (
                                                    <tr key={i} className={i !== arr.length - 1 ? "border-b border-gray-800 hover:bg-[#222] transition-colors" : "hover:bg-[#222] transition-colors"}>
                                                        <td className="py-4 px-4 text-gray-400">{event.date}</td>
                                                        <td className="py-4 px-4 text-gray-400">{eventType}</td>
                                                        <td className="py-4 px-4 text-white font-medium">{event.name}</td>
                                                        <td className="py-4 px-4 text-gray-400 leading-relaxed">{event.impact}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Related Questions */}
                        {response.relatedQuestions && response.relatedQuestions.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-white font-semibold mb-3 text-sm">Related Questions</h4>
                                <div className="space-y-2">
                                    {response.relatedQuestions.map((q, i) => (
                                        <div key={i}>
                                            <button
                                                onClick={() => setExpandedRelated(expandedRelated === i ? null : i)}
                                                className="w-full text-left p-3 rounded-lg bg-dark-bg hover:border border-purple-accent/50 transition-colors group flex items-center justify-between"
                                            >
                                                <span className="text-sm text-gray-300 group-hover:text-neon-green">{q.question}</span>
                                                <ChevronDown
                                                    size={16}
                                                    className={`text-gray-500 transition-transform ${expandedRelated === i ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                            {expandedRelated === i && (
                                                <div className="p-3 bg-dark-bg/50 border-l-2 border-neon-green/50 border-b border-r border-dark-gray/50 rounded-b-lg text-xs text-gray-300 leading-relaxed animate-fade-in">
                                                    {q.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'sources' && (
                    <div className="space-y-3">
                        {response.sources && response.sources.length > 0 ? (
                            response.sources.map((source, i) => (
                                <a
                                    key={i}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 p-3 rounded-lg bg-dark-bg hover:bg-dark-bg/80 hover:border border-neon-green/30 transition-all group"
                                >
                                    <ExternalLink size={16} className="text-neon-green flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-200 group-hover:text-neon-green transition-colors truncate">
                                            {source.title}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">{source.url}</p>
                                    </div>
                                </a>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm">No sources available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BotResponse;
