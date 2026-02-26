'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
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
import { TrendingUp, Loader2 } from 'lucide-react';
import { useNotificationStore } from '@/store/useNotificationStore';

export default function AuthPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuth } = useAuthStore();
    const { addNotification } = useNotificationStore();
    const router = useRouter();

    const handleAuth = async (e: React.FormEvent, type: 'login' | 'signup') => {
        e.preventDefault();
        setIsLoading(true);

        // Mock auth for now
        setTimeout(() => {
            const mockUser = {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                riskAppetite: 'Moderate' as const,
            };
            const mockToken = 'mock-jwt-token';

            setAuth(mockUser, mockToken);
            setIsLoading(false);
            addNotification('success', `Welcome back, ${mockUser.name}!`);
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
            <div className="mb-8 flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <TrendingUp className="text-black w-6 h-6" />
                </div>
                <span className="text-white font-bold text-3xl tracking-tight">FinCopilot</span>
            </div>

            <Card className="w-full max-w-md bg-card border-border text-white shadow-xl">
                <Tabs defaultValue="login" className="w-full">
                    <CardHeader className="pb-2">
                        <TabsList className="grid w-full grid-cols-2 bg-black">
                            <TabsTrigger value="login" className="data-[state=active]:bg-secondary data-[state=active]:text-white">Login</TabsTrigger>
                            <TabsTrigger value="signup" className="data-[state=active]:bg-secondary data-[state=active]:text-white">Signup</TabsTrigger>
                        </TabsList>
                    </CardHeader>

                    <TabsContent value="login">
                        <form onSubmit={(e) => handleAuth(e, 'login')}>
                            <CardHeader>
                                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Enter your credentials to access your dashboard.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="name@example.com" className="bg-secondary border-border text-white placeholder:text-gray-600 focus:ring-white" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" className="bg-secondary border-border text-white focus:ring-white" required />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Log In'}
                                </Button>
                            </CardFooter>
                        </form>
                    </TabsContent>

                    <TabsContent value="signup">
                        <form onSubmit={(e) => handleAuth(e, 'signup')}>
                            <CardHeader>
                                <CardTitle className="text-2xl">Create Account</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Start your journey to financial intelligence.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-name">Full Name</Label>
                                        <Input id="signup-name" placeholder="John Doe" className="bg-secondary border-border text-white placeholder:text-gray-600 focus:ring-white" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-email">Email</Label>
                                        <Input id="signup-email" type="email" placeholder="name@example.com" className="bg-secondary border-border text-white placeholder:text-gray-600 focus:ring-white" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <Input id="signup-password" type="password" className="bg-secondary border-border text-white focus:ring-white" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="risk-appetite">Risk Appetite</Label>
                                    <Select defaultValue="Moderate">
                                        <SelectTrigger id="risk-appetite" className="bg-secondary border-border text-white">
                                            <SelectValue placeholder="Select risk level" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-card border-border text-white">
                                            <SelectItem value="Beginner">Beginner (Safety First)</SelectItem>
                                            <SelectItem value="Moderate">Moderate (Balanced)</SelectItem>
                                            <SelectItem value="Aggressive">Aggressive (Growth)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-[10px] text-gray-500 mt-1">This helps us tailor AI recommendations.</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
                                </Button>
                            </CardFooter>
                        </form>
                    </TabsContent>
                </Tabs>
            </Card>

            <p className="mt-8 text-sm text-gray-500">
                By continuing, you agree to FinCopilot's Terms of Service and Privacy Policy.
            </p>
        </div>
    );
}
