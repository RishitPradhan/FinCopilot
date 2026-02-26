'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, ShieldAlert, AlertTriangle, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const riskFactors = [
    { title: 'Sectoral Concentration', score: 85, status: 'High', color: 'trend-down' },
    { title: 'Market Volatility', score: 42, status: 'Moderate', color: 'text-blue-400' },
    { title: 'Liquidity Risk', score: 12, status: 'Low', color: 'trend-up' },
];

export default function RiskReports() {
    return (
        <div className="space-y-12 animate-in fade-in duration-700 no-scrollbar pb-20">
            <div className="flex flex-col space-y-4 border-b border-white/5 pb-10">
                <h1 className="text-6xl font-black text-white flex items-center tracking-tighter italic uppercase">
                    Risk<span className="text-white/20 ml-2">Pulse</span>
                </h1>
                <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-[10px]">Neural Stress Testing & Volatility Synthesis Protocol</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="premium-card group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <CardHeader className="border-b border-white/5 bg-white/[0.02] p-8">
                        <CardTitle className="text-xl font-black text-white italic uppercase tracking-tighter">Portfolio Stress Nodes</CardTitle>
                        <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mt-1">Real-time risk distribution</p>
                    </CardHeader>
                    <CardContent className="space-y-10 p-10">
                        {riskFactors.map((factor, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex justify-between items-end px-1">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-white uppercase tracking-tight">{factor.title}</span>
                                        <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest mt-0.5">Sensor Status</span>
                                    </div>
                                    <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.05] border border-white/5", factor.color)}>{factor.status}</span>
                                </div>
                                <div className="h-2 w-full bg-white/[0.02] rounded-full overflow-hidden border border-white/5 p-[2px]">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${factor.score}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={cn(
                                            "h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]",
                                            factor.status === 'High' ? "bg-rose-500 shadow-rose-500/20" : factor.status === 'Low' ? "bg-emerald-500 shadow-emerald-500/20" : "bg-white shadow-white/20"
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-6">
                    <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center space-x-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 shadow-2xl group">
                        <div className="p-5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                            <ShieldAlert className="h-8 w-8" />
                        </div>
                        <div>
                            <h4 className="text-white font-black text-lg italic uppercase tracking-tighter">Stress Test Passed</h4>
                            <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest mt-1">Simulated -15% market crash survival</p>
                        </div>
                    </div>

                    <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center space-x-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 shadow-2xl group">
                        <div className="p-5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-110 transition-transform duration-500">
                            <AlertTriangle className="h-8 w-8" />
                        </div>
                        <div>
                            <h4 className="text-white font-black text-lg italic uppercase tracking-tighter">Concentration Alert</h4>
                            <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest mt-1">Tech sector exposure exceeds 60%</p>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-8 rounded-[32px] bg-white text-black flex items-center justify-between group cursor-pointer shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                    >
                        <div className="flex items-center space-x-6">
                            <div className="p-5 rounded-2xl bg-black/5">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <div>
                                <h4 className="font-black text-xl italic uppercase tracking-tighter">Generate Audit</h4>
                                <p className="text-[9px] opacity-40 font-black uppercase tracking-[0.3em]">Institutional PDF Integrity Report</p>
                            </div>
                        </div>
                        <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform duration-500" />
                    </motion.div>
                </div>
            </div>

            <Card className="premium-card group">
                <CardHeader className="border-b border-white/5 bg-white/[0.02] p-8">
                    <CardTitle className="text-xl font-black text-white flex items-center tracking-tighter italic uppercase">
                        <Info className="h-5 w-5 mr-4 text-white/40" />
                        Neural Methodology
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-10">
                    <p className="text-sm text-gray-500 leading-relaxed font-black uppercase tracking-[0.05em] opacity-80">
                        Our risk models utilize <span className="text-white">Monte Carlo simulations</span> and <span className="text-white">Historical Volatility Clusters</span> to predict potential drawdowns. The 'Risk Pulse' score is normalized against the NIFTY50 volatility index (VIX) to provide a relative risk benchmark aligned with quantum backtesting protocols.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
