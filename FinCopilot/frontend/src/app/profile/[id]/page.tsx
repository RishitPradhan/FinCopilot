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
        <div className="flex-1 bg-black text-white p-6 overflow-y-auto no-scrollbar">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-neutral-500 hover:text-white px-0 font-bold uppercase tracking-widest text-[10px]"
                >
                    <ArrowLeft className="w-3 h-3 mr-2" /> Back to Exploratory
                </Button>

                {/* Profile Header */}
                <Card className="bg-neutral-950 border-neutral-900 overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border-b border-neutral-800" />
                    <CardContent className="relative px-8 pb-8">
                        <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12">
                            <Avatar className="w-24 h-24 border-4 border-black ring-1 ring-neutral-800">
                                <AvatarFallback className="bg-neutral-900 text-3xl font-bold text-white">
                                    {profile.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl font-bold tracking-tighter">{profile.name}</h1>
                                    <Badge variant="secondary" className="bg-white text-black font-bold uppercase text-[10px] tracking-widest rounded-full px-3">
                                        Pro Member
                                    </Badge>
                                </div>
                                <p className="text-neutral-500 text-sm">{profile.email}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button className="bg-white text-black hover:bg-neutral-200 font-bold px-8 rounded-full uppercase text-xs">
                                    Message
                                </Button>
                            </div>
                        </div>

                        <Separator className="my-8 bg-neutral-900" />

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold flex items-center gap-2">
                                    <TrendingUp className="w-3 h-3" /> Risk Appetite
                                </p>
                                <p className="text-lg font-bold capitalize">{profile.riskAppetite}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold flex items-center gap-2">
                                    <Award className="w-3 h-3" /> Financial IQ
                                </p>
                                <p className="text-lg font-bold">{profile.iqScore}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold flex items-center gap-2">
                                    <Calendar className="w-3 h-3" /> Joined
                                </p>
                                <p className="text-lg font-bold">{new Date(profile.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold flex items-center gap-2">
                                    <ShieldCheck className="w-3 h-3" /> Status
                                </p>
                                <p className="text-lg font-bold">Verified</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Feed */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
                        <h2 className="text-xl font-bold tracking-tight">Recent Insights</h2>
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold bg-neutral-900 px-3 py-1 rounded-full">{posts.length} Posts</span>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-neutral-900 rounded-3xl">
                            <p className="text-neutral-500 text-sm">No community activity yet.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {posts.map((post) => (
                                <Card key={post._id} className="bg-neutral-950 border-neutral-900 hover:border-neutral-800 transition-colors group">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer">
                                                {post.title}
                                            </CardTitle>
                                            <span className="text-[10px] text-neutral-600 font-mono whitespace-nowrap">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-neutral-400 text-sm line-clamp-3 leading-relaxed">
                                            {post.content}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="text-[10px] text-neutral-700 font-bold">#{tag}</span>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-0 flex items-center gap-4 text-neutral-600">
                                        <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                                            <Heart className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-bold">{post.likes.length}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                                            <MessageCircle className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-bold">{post.comments.length}</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
