'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    User,
    Calendar,
    TrendingUp,
    ArrowLeft,
    Heart,
    MessageCircle,
    Award,
    ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import api from '@/services/api';

interface UserProfile {
    name: string;
    email: string;
    riskAppetite: string;
    iqScore: number;
    createdAt: string;
}

interface Post {
    _id: string;
    title: string;
    content: string;
    likes: string[];
    comments: any[];
    tags: string[];
    createdAt: string;
}

export default function ProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get(`/user/profile/${params.id}`);
                if (res.data.success) {
                    setProfile(res.data.user);
                    setPosts(res.data.posts);
                }
            } catch (err) {
                console.error('Failed to fetch profile');
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) fetchProfile();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-black">
                <div className="w-8 h-8 rounded-full border-t-2 border-white animate-spin" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-black text-white space-y-4">
                <p className="text-neutral-500">User not found</p>
                <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-black text-white p-10 overflow-y-auto no-scrollbar animate-in fade-in duration-1000">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-gray-700 hover:text-white px-0 font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:gap-4 flex items-center gap-3"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Exploratory
                </Button>

                {/* Profile Header */}
                <Card className="premium-card overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                    <div className="h-48 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border-b border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent)] opacity-50" />
                    </div>
                    <CardContent className="relative px-12 pb-12">
                        <div className="flex flex-col md:flex-row md:items-end gap-10 -mt-20">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", damping: 15 }}
                            >
                                <Avatar className="w-40 h-40 border-8 border-black shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                                    <AvatarFallback className="bg-white text-black text-5xl font-black italic">
                                        {profile.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                            </motion.div>
                            <div className="flex-1 space-y-3 pb-2">
                                <div className="flex items-center gap-5">
                                    <h1 className="text-5xl font-black tracking-tighter italic uppercase">{profile.name}</h1>
                                    <Badge variant="secondary" className="bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-full px-5 py-1.5 shadow-2xl">
                                        PRO SENTINEL
                                    </Badge>
                                </div>
                                <p className="text-gray-600 text-sm font-black uppercase tracking-[0.3em] ml-1">{profile.email}</p>
                            </div>
                            <div className="flex gap-4 pb-2">
                                <Button className="bg-white text-black hover:bg-gray-200 font-black px-10 h-14 rounded-2xl uppercase text-[11px] tracking-[0.2em] shadow-2xl transition-all active:scale-95">
                                    Initialize Secure Comms
                                </Button>
                            </div>
                        </div>

                        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-12 bg-white/[0.01] border border-white/5 p-10 rounded-[32px] shadow-inner">
                            <div className="space-y-2">
                                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-700 font-black flex items-center gap-3">
                                    <TrendingUp className="w-3.5 h-3.5" /> Risk Appetite
                                </p>
                                <p className="text-xl font-black text-white italic uppercase tracking-tighter">{profile.riskAppetite}</p>
                            </div>
                            <div className="space-y-2 border-l border-white/5 pl-12">
                                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-700 font-black flex items-center gap-3">
                                    <Award className="w-3.5 h-3.5" /> Quant IQ
                                </p>
                                <p className="text-xl font-black text-white font-mono">{profile.iqScore}</p>
                            </div>
                            <div className="space-y-2 border-l border-white/5 pl-12">
                                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-700 font-black flex items-center gap-3">
                                    <Calendar className="w-3.5 h-3.5" /> Commissioned
                                </p>
                                <p className="text-xl font-black text-white italic tracking-tighter uppercase">{new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                            </div>
                            <div className="space-y-2 border-l border-white/5 pl-12">
                                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-700 font-black flex items-center gap-3">
                                    <ShieldCheck className="w-3.5 h-3.5" /> Alignment
                                </p>
                                <p className="text-xl font-black text-white italic uppercase tracking-tighter">Verified Alpha</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Feed */}
                <div className="space-y-10">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">Strategic Output</h2>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 bg-white/[0.03] border border-white/5 px-5 py-2 rounded-full">{posts.length} TRANSMISSIONS</span>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-28 border border-dashed border-white/5 rounded-[48px] bg-white/[0.01]">
                            <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.4em]">Zero Active Transmissions Detected</p>
                        </div>
                    ) : (
                        <div className="grid gap-8">
                            {posts.map((post, idx) => (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                                >
                                    <Card className="premium-card hover:border-white/20 transition-all duration-700 group cursor-pointer overflow-hidden p-0">
                                        <CardHeader className="p-10 pb-4">
                                            <div className="flex justify-between items-start gap-10">
                                                <CardTitle className="text-2xl font-black italic tracking-tighter uppercase transition-colors group-hover:text-white">
                                                    {post.title}
                                                </CardTitle>
                                                <span className="text-[10px] text-gray-700 font-black uppercase tracking-widest whitespace-nowrap bg-white/[0.03] px-4 py-1.5 rounded-full border border-white/5">
                                                    {new Date(post.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                                                </span>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="px-10">
                                            <p className="text-gray-400 text-sm font-medium leading-[1.8] line-clamp-3">
                                                {post.content}
                                            </p>
                                            <div className="flex flex-wrap gap-4 mt-8">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="text-[9px] text-gray-700 font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/[0.02] rounded-md border border-white/5">#{tag}</span>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-10 pt-6 flex items-center gap-10 border-t border-white/5 bg-white/[0.01]">
                                            <div className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-white transition-all group/stat">
                                                <Heart className="w-4 h-4 transition-transform group-hover/stat:scale-125" />
                                                <span className="text-[11px] font-black">{post.likes.length}</span>
                                            </div>
                                            <div className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-white transition-all group/stat">
                                                <MessageCircle className="w-4 h-4 transition-transform group-hover/stat:scale-125" />
                                                <span className="text-[11px] font-black">{post.comments.length}</span>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
