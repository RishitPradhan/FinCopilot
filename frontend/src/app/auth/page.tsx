'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TrendingUp, Loader2, Mail, Lock, User, ChevronRight } from 'lucide-react';

export default function AuthPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('signup');
    const { setAuth } = useAuthStore();
    const { addNotification } = useNotificationStore();
    const router = useRouter();

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        riskAppetite: 'Moderate' as 'Beginner' | 'Moderate' | 'Aggressive'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id.replace('signup-', '')]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password
            });
            const { user, token } = response.data;
            setAuth(user, token);
            addNotification('success', `Welcome back, ${user.name}!`);
            router.push('/dashboard');
        } catch (error: any) {
            addNotification('error', error.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/auth/signup', formData);
            const { user, token } = response.data;
            setAuth(user, token);
            addNotification('success', 'Account created successfully!');
            router.push('/dashboard');
        } catch (error: any) {
            addNotification('error', error.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black text-white selection:bg-white selection:text-black">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-3xl opacity-20" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="mb-12 flex flex-col items-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        <TrendingUp className="text-black w-8 h-8" />
                    </motion.div>
                    <h1 className="text-4xl font-bold tracking-tighter mb-2">FinCopilot</h1>
                    <p className="text-neutral-500 text-sm font-medium uppercase tracking-widest">Intelligent Financial Analysis</p>
                </div>

                <Card className="bg-black border-neutral-800 shadow-2xl overflow-hidden backdrop-blur-sm bg-black/40">
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-neutral-900/50 p-1">
                            <TabsTrigger
                                value="login"
                                className="data-[state=active]:bg-white data-[state=active]:text-black transition-all duration-300"
                            >
                                Login
                            </TabsTrigger>
                            <TabsTrigger
                                value="signup"
                                className="data-[state=active]:bg-white data-[state=active]:text-black transition-all duration-300"
                            >
                                Sign Up
                            </TabsTrigger>
                        </TabsList>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: activeTab === 'login' ? 20 : -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TabsContent value="login" className="mt-0 border-none outline-none">
                                    <form onSubmit={handleLogin} className="p-4 space-y-4">
                                        <CardHeader className="px-0 pt-4">
                                            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                                            <CardDescription className="text-neutral-500">
                                                Enter your credentials to continue your analysis.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="px-0 space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-neutral-400 text-xs uppercase tracking-wider">Email Address</Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        className="pl-10 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-700 focus:ring-1 focus:ring-white transition-all h-11"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="password" title="password" className="text-neutral-400 text-xs uppercase tracking-wider">Password</Label>
                                                    <button type="button" className="text-[10px] text-neutral-500 hover:text-white transition-colors uppercase tracking-wider font-bold">Forgot Password?</button>
                                                </div>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="pl-10 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-700 focus:ring-1 focus:ring-white transition-all h-11"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="px-0 pb-2">
                                            <Button
                                                className="w-full bg-white text-black hover:bg-neutral-200 font-bold h-11 group"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <span className="flex items-center justify-center">
                                                        Log In <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                )}
                                            </Button>
                                        </CardFooter>
                                    </form>
                                </TabsContent>

                                <TabsContent value="signup" className="mt-0 border-none outline-none">
                                    <form onSubmit={handleSignup} className="p-4 space-y-4">
                                        <CardHeader className="px-0 pt-4">
                                            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                                            <CardDescription className="text-neutral-500">
                                                Start your journey to financial intelligence.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="px-0 space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="signup-name" className="text-neutral-400 text-xs uppercase tracking-wider">Full Name</Label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                                    <Input
                                                        id="signup-name"
                                                        placeholder="John Doe"
                                                        className="pl-10 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-700 focus:ring-1 focus:ring-white transition-all h-11"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="signup-email" className="text-neutral-400 text-xs uppercase tracking-wider">Email Address</Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                                    <Input
                                                        id="signup-email"
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        className="pl-10 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-700 focus:ring-1 focus:ring-white transition-all h-11"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="signup-password" title="password" className="text-neutral-400 text-xs uppercase tracking-wider">Password</Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                                    <Input
                                                        id="signup-password"
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="pl-10 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-700 focus:ring-1 focus:ring-white transition-all h-11"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="risk-appetite" className="text-neutral-400 text-xs uppercase tracking-wider">Risk Appetite</Label>
                                                <Select
                                                    value={formData.riskAppetite}
                                                    onValueChange={(v: any) => setFormData({ ...formData, riskAppetite: v })}
                                                >
                                                    <SelectTrigger id="risk-appetite" className="bg-neutral-900 border-neutral-800 text-white focus:ring-white h-11">
                                                        <SelectValue placeholder="Select risk level" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-neutral-950 border-neutral-800 text-white">
                                                        <SelectItem value="Beginner" className="focus:bg-white focus:text-black">Beginner (Safety First)</SelectItem>
                                                        <SelectItem value="Moderate" className="focus:bg-white focus:text-black">Moderate (Balanced)</SelectItem>
                                                        <SelectItem value="Aggressive" className="focus:bg-white focus:text-black">Aggressive (Growth)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <p className="text-[10px] text-neutral-600 mt-1 uppercase font-semibold">Tailors AI recommendations.</p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="px-0 pb-2">
                                            <Button
                                                className="w-full bg-white text-black hover:bg-neutral-200 font-bold h-11 group"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <span className="flex items-center justify-center">
                                                        Create Account <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                )}
                                            </Button>
                                        </CardFooter>
                                    </form>
                                </TabsContent>
                            </motion.div>
                        </AnimatePresence>
                    </Tabs>
                </Card>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-[10px] text-neutral-600 text-center uppercase tracking-widest font-bold max-w-[280px] mx-auto leading-relaxed"
                >
                    By continuing, you agree to FinCopilot's <span className="text-neutral-400 cursor-pointer hover:text-white transition-colors">Terms of Service</span> and <span className="text-neutral-400 cursor-pointer hover:text-white transition-colors">Privacy Policy</span>.
                </motion.p>
            </motion.div>
        </div>
    );
}
