'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, ShieldAlert, AlertTriangle, CheckCircle2, Info, ArrowRight } from 'lucide-react';

const riskFactors = [
    { title: 'Sectoral Concentration', score: 85, status: 'High', color: 'text-white' },
    { title: 'Market Volatility', score: 42, status: 'Moderate', color: 'text-gray-400' },
    { title: 'Liquidity Risk', score: 12, status: 'Low', color: 'text-gray-600' },
];

export default function RiskReports() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 no-scrollbar">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-white flex items-center">
                    <BarChart3 className="mr-3 h-8 w-8 text-white" />
                    Risk Reports
                </h1>
                <p className="text-gray-500">Comprehensive risk assessment and stress testing for your financial portfolio.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-card border-border shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-white">Portfolio Risk Pulse</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {riskFactors.map((factor, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-medium text-gray-300">{factor.title}</span>
                                    <span className={cn("text-xs font-bold uppercase", factor.color)}>{factor.status}</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white transition-all duration-1000"
                                        style={{ width: `${factor.score}%`, opacity: factor.score / 100 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-4">
                    <div className="p-6 rounded-2xl bg-white/5 border border-border flex items-center space-x-4">
                        <div className="p-3 rounded-full bg-white/10 text-white">
                            <ShieldAlert className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Stress Test Passed</h4>
                            <p className="text-xs text-gray-500">Your portfolio survived a simulated -15% market crash.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-border flex items-center space-x-4">
                        <div className="p-3 rounded-full bg-white/10 text-white">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Concentration Alert</h4>
                            <p className="text-xs text-gray-500">Tech sector exceeds 60% of total allocation.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white text-black flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-black/10">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold">Generate Full Audit</h4>
                                <p className="text-xs opacity-60">PDF Risk Assessment Report</p>
                            </div>
                        </div>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>

            <Card className="bg-card border-border shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-white flex items-center">
                        <Info className="h-4 w-4 mr-2" />
                        Methodology
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Our risk models utilize Monte Carlo simulations and historical volatility clusters to predict potential drawdowns. The 'Risk Pulse' score is normalized against the NIFTY50 volatility index (VIX) to provide a relative risk benchmark.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

// Minimal cn helper since it's used
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
