'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare,
    Heart,
    MessageCircle,
    Share2,
    Search,
    Plus,
    Send,
    User,
    ChevronRight,
    TrendingUp,
    MoreHorizontal,
    Filter,
    ArrowLeft,
    Check,
    CheckCheck,
    Paperclip,
    Activity,
    Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import api from '@/services/api';
import { useRef } from 'react';

interface Post {
    _id: string;
    author: {
        _id: string;
        name: string;
        email: string;
    };
    title: string;
    content: string;
    likes: string[];
    comments: any[];
    tags: string[];
    createdAt: string;
}

interface Message {
    _id: string;
    sender: { _id: string; name: string; email: string };
    receiver: { _id: string; name: string; email: string };
    content: string;
    createdAt: string;
}

interface TrendingStock {
    symbol: string;
    mentions: number;
    change: string;
}

interface Contributor {
    _id: string;
    name: string;
    email: string;
    iqScore: number;
}

interface TrendingTag {
    name: string;
    count: number;
}

interface TrendingData {
    trendingTags: TrendingTag[];
    marketInsights: {
        sentiment: number;
        hotStocks: TrendingStock[];
        topContributors: Contributor[];
    };
}

export default function CommunityPage() {
    const { user } = useAuthStore();
    const { addNotification } = useNotificationStore();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
    const [isCreating, setIsCreating] = useState(false);
    const [activeView, setActiveView] = useState<'feed' | 'messages' | 'trending'>('feed');
    const [trendingData, setTrendingData] = useState<TrendingData | null>(null);
    const [selectedFilter, setSelectedFilter] = useState('All');

    const categories = ['All', 'Stocks', 'Economy', 'Finance', 'Crypto', 'Mindset'];

    // Messages state
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState({ recipient: '', content: '' });
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Group messages into conversations
    const conversations = messages.reduce((acc, msg) => {
        const otherUser = msg.sender._id === user?.id ? msg.receiver : msg.sender;
        if (!acc[otherUser._id]) {
            acc[otherUser._id] = {
                user: otherUser,
                messages: []
            };
        }
        acc[otherUser._id].messages.push(msg);
        return acc;
    }, {} as Record<string, { user: { _id: string, name: string, email: string }, messages: Message[] }>);

    const sortedConversations = Object.values(conversations).sort((a, b) => {
        const lastA = a.messages[a.messages.length - 1].createdAt;
        const lastB = b.messages[b.messages.length - 1].createdAt;
        return new Date(lastB).getTime() - new Date(lastA).getTime();
    });

    const activeChat = selectedUserId ? conversations[selectedUserId] : null;

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeChat, activeView]);

    useEffect(() => {
        fetchPosts();
        fetchMessages();
        fetchTrending();
    }, []);

    const fetchTrending = async () => {
        try {
            const res = await api.get('/community/trending');
            if (res.data.success) setTrendingData(res.data);
        } catch (err) {
            console.error('Failed to fetch trending data');
        }
    };

    const fetchPosts = async () => {
        try {
            const res = await api.get('/community/posts');
            if (res.data.success) setPosts(res.data.posts);
        } catch (err) {
            console.error('Failed to fetch posts');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredPosts = posts.filter(post => {
        if (selectedFilter === 'All') return true;
        const filterLower = selectedFilter.toLowerCase();
        // Map UI filter to common tags
        const tagMap: Record<string, string[]> = {
            'stocks': ['stocks', 'investing', 'market'],
            'economy': ['economy', 'macro', 'policy'],
            'finance': ['personalfinance', 'savings', 'wealth'],
            'crypto': ['crypto', 'bitcoin', 'web3', 'blockchain'],
            'mindset': ['psychology', 'mindset', 'discipline']
        };
        const targets = tagMap[filterLower] || [filterLower];
        return post.tags.some(tag => targets.some(t => tag.toLowerCase().includes(t))) ||
            post.title.toLowerCase().includes(filterLower);
    });

    const fetchMessages = async () => {
        try {
            const res = await api.get('/community/messages');
            if (res.data.success) setMessages(res.data.messages);
        } catch (err) {
            console.error('Failed to fetch messages');
        }
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            const res = await api.post('/community/posts', {
                ...newPost,
                tags: newPost.tags.split(',').map(tag => tag.trim()).filter(t => t)
            });
            if (res.data.success) {
                setPosts([res.data.post, ...posts]);
                setNewPost({ title: '', content: '', tags: '' });
                addNotification('success', 'Post shared with community!');
            }
        } catch (err) {
            addNotification('error', 'Failed to share post');
        } finally {
            setIsCreating(false);
        }
    };

    const handleLike = async (postId: string) => {
        try {
            const res = await api.post(`/community/posts/${postId}/like`);
            if (res.data.success) {
                setPosts(posts.map(p =>
                    p._id === postId ? { ...p, likes: res.data.likes } : p
                ));
            }
        } catch (err) {
            console.error('Failed to like post');
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const recipient = selectedUserId ? conversations[selectedUserId].user.email : newMessage.recipient;
        if (!recipient || !newMessage.content) return;

        try {
            const res = await api.post('/community/messages', {
                receiverEmail: recipient,
                content: newMessage.content
            });
            if (res.data.success) {
                setMessages([...messages, res.data.message]);
                setNewMessage({ ...newMessage, content: '' });
            }
        } catch (err) {
            addNotification('error', 'Failed to send message');
        }
    };

    return (
        <div className="flex-1 bg-black text-white p-2 md:p-3 overflow-y-auto no-scrollbar">
            <div className="max-w-6xl mx-auto space-y-6 pb-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 pt-4">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-black tracking-tighter text-white uppercase italic"
                        >
                            Community
                        </motion.h1>
                        <p className="text-gray-500 mt-2 uppercase tracking-[0.3em] text-[10px] font-black">Financial Intelligence Network</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                            <Input
                                placeholder="Search insights..."
                                className="pl-12 bg-white/[0.03] border-white/10 text-sm h-12 w-[300px] focus:ring-1 focus:ring-white transition-all rounded-2xl placeholder:text-gray-700"
                            />
                        </div>
                        <Button className="bg-white text-black hover:bg-neutral-200 rounded-2xl h-12 px-8 font-black text-[10px] uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
                            <Plus className="w-4 h-4 mr-2" /> Share Insight
                        </Button>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar border-b border-white/5">
                    <Filter className="w-3.5 h-3.5 text-gray-700 mr-3 flex-shrink-0" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedFilter(cat)}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${selectedFilter === cat
                                ? 'bg-white text-black border-white shadow-xl scale-105'
                                : 'bg-white/[0.03] text-gray-500 border-white/5 hover:border-white/20 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Left Sidebar: Filters/Tags */}
                    <div className="hidden lg:block space-y-6 sticky top-3 self-start h-fit">
                        <Card className="premium-card">
                            <CardHeader className="pb-2 bg-white/[0.02] border-b border-white/5">
                                <CardTitle className="text-[9px] uppercase tracking-[0.2em] font-black text-gray-500 flex items-center gap-2">
                                    <MessageSquare className="w-3.5 h-3.5" /> Navigation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1 p-3">
                                {[
                                    { label: 'Feed', id: 'feed', icon: MessageSquare },
                                    { label: 'Messages', id: 'messages', icon: Send },
                                    { label: 'Trending', id: 'trending', icon: TrendingUp },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveView(item.id as any)}
                                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeView === item.id ? 'bg-white text-black shadow-2xl scale-[1.02]' : 'text-gray-500 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <item.icon className="w-4 h-4" /> {item.label}
                                    </button>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Market Pulse Widget */}
                        <Card className="premium-card group overflow-hidden">
                            <CardHeader className="pb-2 bg-white/[0.02] border-b border-white/5">
                                <CardTitle className="text-[9px] uppercase tracking-[0.2em] font-black text-gray-500 flex items-center gap-2">
                                    <Activity className="w-3.5 h-3.5" /> Market Pulse
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 p-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-3xl font-black tracking-tighter text-white">
                                            {trendingData?.marketInsights?.sentiment || 50}%
                                        </span>
                                        <span className="text-[9px] font-black uppercase text-emerald-500 mb-1 tracking-widest">Bullish</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${trendingData?.marketInsights?.sentiment || 50}%` }}
                                            className="h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-1000"
                                        />
                                    </div>
                                </div>
                                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                                    Community sentiment is currently <span className="text-emerald-400 font-bold uppercase tracking-widest">Strongly Bullish</span> based on recent discussions.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Top Contributors Sidebar Mini */}
                        <Card className="premium-card">
                            <CardHeader className="pb-2 bg-white/[0.02] border-b border-white/5">
                                <CardTitle className="text-[9px] uppercase tracking-[0.2em] font-black text-gray-500 flex items-center gap-2">
                                    <Users className="w-3.5 h-3.5" /> Top Analysts
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 p-4">
                                {(trendingData?.marketInsights?.topContributors || []).slice(0, 3).map((contributor) => (
                                    <div key={contributor.email} className="flex items-center gap-4 group/item cursor-pointer">
                                        <Avatar className="w-10 h-10 border border-white/10 group-hover/item:border-white transition-all shadow-xl">
                                            <AvatarFallback className="bg-white/5 text-white font-black text-xs">{contributor.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black text-gray-400 group-hover/item:text-white transition-colors truncate tracking-tight">{contributor.name}</p>
                                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mt-0.5">IQ: {contributor.iqScore}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="premium-card">
                            <CardHeader className="pb-2 bg-white/[0.02] border-b border-white/5">
                                <CardTitle className="text-[9px] uppercase tracking-[0.2em] font-black text-gray-500">Trending Topics</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2 p-4">
                                {(trendingData?.trendingTags || ['Stocks', 'Crypto', 'Market']).map(tag => {
                                    const tagName = typeof tag === 'string' ? tag : tag.name;
                                    return (
                                        <Badge key={tagName} variant="secondary" className="bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 cursor-pointer border-white/5 py-1 px-3 text-[9px] font-black uppercase tracking-widest">
                                            #{tagName}
                                        </Badge>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-6">
                        <AnimatePresence mode="wait">
                            {activeView === 'feed' ? (
                                <motion.div
                                    key="feed"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-2"
                                >
                                    {/* Create Post Card */}
                                    <Card className="bg-neutral-950 border-neutral-900/50">
                                        <CardContent className="p-3">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-8 h-8 border border-neutral-900 flex-shrink-0">
                                                    <AvatarFallback className="bg-neutral-900 text-white font-bold text-xs">{user?.name?.[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 flex items-center gap-3">
                                                    <Input
                                                        value={newPost.title}
                                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                                        placeholder="What's your market insight?"
                                                        className="bg-neutral-900/30 border-neutral-900 h-9 text-xs rounded-full focus:ring-1 focus:ring-white/20 transition-all placeholder:text-neutral-700 px-4"
                                                    />
                                                    <Button
                                                        onClick={handleCreatePost}
                                                        disabled={!newPost.title || !newPost.content || isCreating}
                                                        className="bg-white text-black hover:bg-neutral-200 font-bold px-4 h-9 text-[10px] uppercase tracking-wider rounded-full flex-shrink-0"
                                                    >
                                                        {isCreating ? '...' : 'Post'}
                                                    </Button>
                                                </div>
                                            </div>
                                            {newPost.title && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="mt-3 space-y-3 pt-3 border-t border-neutral-900"
                                                >
                                                    <textarea
                                                        value={newPost.content}
                                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                                        placeholder="Share the details..."
                                                        className="w-full bg-transparent border-none resize-none focus:outline-none min-h-[50px] text-neutral-400 placeholder:text-neutral-700 text-xs px-1"
                                                    />
                                                    <Input
                                                        value={newPost.tags}
                                                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                                                        placeholder="Tags (stocks, crypto...)"
                                                        className="bg-neutral-900/50 border-neutral-800 text-[10px] h-7 px-3 w-full"
                                                    />
                                                </motion.div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* Feed Posts */}
                                    <div className="space-y-1.5">
                                        {filteredPosts.map((post) => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                key={post._id}
                                            >
                                                <Card className="premium-card hover:border-white/10 transition-all group overflow-hidden">
                                                    <CardHeader className="flex flex-row items-center gap-4 pb-2 pt-6 px-6">
                                                        <Avatar className="w-9 h-9 border border-white/10 group-hover:border-white/30 transition-colors shadow-lg">
                                                            <AvatarFallback className="bg-white/5 text-white font-black text-xs">{post.author?.name?.[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <Link href={`/profile/${post.author?._id}`} className="flex-1 group/author min-w-0">
                                                            <div className="flex items-center gap-2 truncate">
                                                                <CardTitle className="text-xs font-black group-hover/author:text-primary transition-colors truncate tracking-tight">{post.author?.name}</CardTitle>
                                                                <span className="text-gray-700 text-[9px] font-black uppercase tracking-widest whitespace-nowrap opacity-60">• {new Date(post.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                            <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black truncate">{post.author?.email}</p>
                                                        </Link>
                                                        <Button variant="ghost" size="icon" className="text-gray-700 hover:text-white h-8 w-8 hover:bg-white/5">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </CardHeader>
                                                    <CardContent className="space-y-3 pb-4 px-6 pt-2">
                                                        <h3 className="text-xl font-black tracking-tight text-white leading-tight">{post.title}</h3>
                                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all font-medium">{post.content}</p>
                                                        <div className="flex flex-wrap gap-3 pt-2">
                                                            {post.tags.map(tag => (
                                                                <span key={tag} className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] italic opacity-80 group-hover:opacity-100 group-hover:text-white transition-all">#{tag}</span>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className="flex items-center gap-6 py-4 px-6 border-t border-white/5 bg-white/[0.01]">
                                                        <button
                                                            onClick={() => handleLike(post._id)}
                                                            className={`flex items-center gap-2 py-1 transition-all ${post.likes.includes(user?.id || '') ? 'text-primary' : 'text-gray-600 hover:text-white'}`}
                                                        >
                                                            <Heart className={`w-3.5 h-3.5 ${post.likes.includes(user?.id || '') ? 'fill-primary' : ''}`} />
                                                            <span className="text-[10px] font-black tracking-widest">{post.likes.length}</span>
                                                        </button>
                                                        <button className="flex items-center gap-2 py-1 text-gray-600 hover:text-white transition-all">
                                                            <MessageCircle className="w-3.5 h-3.5" />
                                                            <span className="text-[10px] font-black tracking-widest">{post.comments.length}</span>
                                                        </button>
                                                        <button className="flex items-center gap-2 py-1 text-gray-600 hover:text-white transition-all">
                                                            <Share2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </CardFooter>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : activeView === 'messages' ? (
                                <motion.div
                                    key="messages"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="h-[calc(100vh-280px)] min-h-[600px] flex rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-2xl shadow-2xl"
                                >
                                    {/* Conversations Sidebar */}
                                    <div className="w-full md:w-[350px] border-r border-neutral-900 flex flex-col bg-black/40">
                                        <div className="p-4 border-b border-neutral-900 flex items-center justify-between">
                                            <h2 className="text-lg font-bold">Messages</h2>
                                            <Button variant="ghost" size="icon" className="rounded-full">
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div className="p-4">
                                            <div className="relative group">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                                                <Input
                                                    placeholder="Search chats..."
                                                    className="pl-9 bg-neutral-900/50 border-neutral-800 text-xs h-9 focus:ring-1 focus:ring-white transition-all rounded-full"
                                                />
                                            </div>
                                        </div>
                                        <ScrollArea className="flex-1">
                                            <div className="p-2 space-y-1">
                                                {sortedConversations.length === 0 ? (
                                                    <div className="py-12 text-center">
                                                        <MessageCircle className="w-8 h-8 text-neutral-800 mx-auto mb-3" />
                                                        <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">No conversations</p>
                                                    </div>
                                                ) : (
                                                    sortedConversations.map((conv) => {
                                                        const lastMsg = conv.messages[conv.messages.length - 1];
                                                        const isActive = selectedUserId === conv.user._id;
                                                        return (
                                                            <button
                                                                key={conv.user._id}
                                                                onClick={() => setSelectedUserId(conv.user._id)}
                                                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-white text-black' : 'hover:bg-neutral-900'}`}
                                                            >
                                                                <Avatar className="w-11 h-11 border border-neutral-800/50">
                                                                    <AvatarFallback className={`${isActive ? 'bg-black text-white' : 'bg-neutral-900 text-neutral-400'} font-bold`}>
                                                                        {conv.user.name[0]}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="flex-1 text-left min-w-0">
                                                                    <div className="flex justify-between items-baseline mb-0.5">
                                                                        <span className="text-sm font-bold truncate">{conv.user.name}</span>
                                                                        <span className={`text-[10px] ${isActive ? 'text-black/60' : 'text-neutral-600'}`}>
                                                                            {new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                        </span>
                                                                    </div>
                                                                    <p className={`text-xs truncate ${isActive ? 'text-black/70' : 'text-neutral-500'}`}>
                                                                        {lastMsg.sender._id === user?.id ? 'You: ' : ''}{lastMsg.content}
                                                                    </p>
                                                                </div>
                                                            </button>
                                                        );
                                                    })
                                                )}
                                            </div>
                                        </ScrollArea>
                                    </div>

                                    {/* Chat Window */}
                                    <div className="flex-1 flex flex-col bg-black/20 relative">
                                        {activeChat ? (
                                            <>
                                                {/* Chat Header */}
                                                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.03] backdrop-blur-3xl">
                                                    <div className="flex items-center gap-4">
                                                        <Avatar className="w-12 h-12 border border-white/10 shadow-xl">
                                                            <AvatarFallback className="bg-white/5 text-white font-black">{activeChat.user.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <h3 className="text-sm font-black text-white tracking-tight">{activeChat.user.name}</h3>
                                                            <p className="text-[9px] text-emerald-500 uppercase tracking-[0.2em] font-black mt-0.5">Active Now</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Button variant="ghost" size="icon" className="rounded-xl text-gray-500 hover:text-white hover:bg-white/5">
                                                            <Search className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="rounded-xl text-gray-500 hover:text-white hover:bg-white/5">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Messages Area */}
                                                <div
                                                    ref={scrollRef}
                                                    className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar"
                                                >
                                                    {activeChat.messages.map((msg, i) => {
                                                        const isMe = msg.sender._id === user?.id;
                                                        return (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                key={msg._id}
                                                                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                                            >
                                                                <div className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-2xl ${isMe
                                                                    ? 'bg-white text-black rounded-tr-none font-medium'
                                                                    : 'bg-white/[0.05] text-gray-200 rounded-tl-none border border-white/5 backdrop-blur-md'
                                                                    }`}>
                                                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                                                    <div className={`flex items-center justify-end gap-2 mt-2 ${isMe ? 'text-black/40' : 'text-gray-600'}`}>
                                                                        <span className="text-[9px] font-black uppercase tracking-widest">
                                                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                        </span>
                                                                        {isMe && <CheckCheck className="w-3.5 h-3.5" />}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Message Input */}
                                                <div className="p-6 border-t border-white/5 bg-white/[0.03] backdrop-blur-3xl">
                                                    <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                                                        <Button type="button" variant="ghost" size="icon" className="rounded-xl text-gray-500 shrink-0 hover:bg-white/5 hover:text-white">
                                                            <Paperclip className="w-5 h-5" />
                                                        </Button>
                                                        <div className="flex-1 relative">
                                                            <Input
                                                                value={newMessage.content}
                                                                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                                                                placeholder="Type a message..."
                                                                className="bg-white/[0.05] border-white/10 text-sm h-14 rounded-2xl pr-16 focus:ring-1 focus:ring-white/20 transition-all shadow-xl placeholder:text-gray-700 font-medium"
                                                            />
                                                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                                <button type="submit" disabled={!newMessage.content} className="p-3 bg-white text-black rounded-xl hover:bg-gray-200 transition-all disabled:opacity-30 active:scale-90 shadow-lg">
                                                                    <Send className="w-4 h-4 fill-black" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-40">
                                                <div className="w-20 h-20 rounded-full bg-neutral-900/50 flex items-center justify-center mb-6 border border-neutral-800">
                                                    <MessageSquare className="w-10 h-10 text-neutral-600" />
                                                </div>
                                                <h3 className="text-xl font-bold tracking-tight mb-2">Select a Conversation</h3>
                                                <p className="text-sm text-neutral-500 max-w-xs mx-auto">Click on a contact to start chatting or share financial insights via direct message.</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="trending"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {/* Market Sentiment */}
                                    <Card className="premium-card group relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                        <CardHeader className="bg-white/[0.02] border-b border-white/5">
                                            <CardTitle className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-500">Global Sentiment</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col items-center justify-center py-12">
                                            <div className="relative w-56 h-56 flex items-center justify-center">
                                                <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
                                                    <circle
                                                        cx="112"
                                                        cy="112"
                                                        r="90"
                                                        stroke="currentColor"
                                                        strokeWidth="14"
                                                        fill="transparent"
                                                        className="text-white/5"
                                                    />
                                                    <circle
                                                        cx="112"
                                                        cy="112"
                                                        r="90"
                                                        stroke="currentColor"
                                                        strokeWidth="14"
                                                        fill="transparent"
                                                        strokeDasharray={565.2}
                                                        strokeDashoffset={565.2 - (565.2 * (trendingData?.marketInsights?.sentiment || 75)) / 100}
                                                        className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                                                    />
                                                </svg>
                                                <div className="absolute flex flex-col items-center">
                                                    <span className="text-5xl font-black tracking-tighter text-white italic">{trendingData?.marketInsights?.sentiment || 75}%</span>
                                                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-emerald-500 mt-1">Bullish</span>
                                                </div>
                                            </div>
                                            <p className="mt-10 text-[11px] text-center text-gray-600 max-w-[240px] font-medium leading-relaxed uppercase tracking-widest">
                                                The community is currently feeling <span className="text-white">highly optimistic</span> about the current cycle.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    {/* Hot Stocks */}
                                    <Card className="premium-card">
                                        <CardHeader className="bg-white/[0.02] border-b border-white/5">
                                            <CardTitle className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-500">Hot Discussions</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 p-6">
                                            {(trendingData?.marketInsights?.hotStocks || []).map((stock: TrendingStock) => (
                                                <div key={stock.symbol} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer group shadow-lg">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-xs shadow-2xl">
                                                            {stock.symbol[0]}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black tracking-tight text-white">{stock.symbol}</p>
                                                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mt-1">{stock.mentions} Mentions</p>
                                                        </div>
                                                    </div>
                                                    <div className={`text-[10px] font-black tracking-widest italic ${stock.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                        {stock.change}
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>

                                    {/* Top Contributors */}
                                    <Card className="md:col-span-2 premium-card overflow-hidden">
                                        <CardHeader className="bg-white/[0.02] border-b border-white/5">
                                            <CardTitle className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-500">Market Mavericks (Top Contributors)</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-8">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {(trendingData?.marketInsights?.topContributors || []).map((contributor: Contributor) => (
                                                    <div key={contributor._id} className="p-6 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 flex flex-col items-center text-center shadow-2xl hover:border-white/10 transition-all group">
                                                        <Avatar className="w-20 h-20 border-2 border-white/10 group-hover:border-white transition-all mb-6 shadow-2xl">
                                                            <AvatarFallback className="bg-white/5 text-white font-black text-2xl uppercase italic">{contributor.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <h4 className="font-black text-sm mb-1 text-white tracking-tight">{contributor.name}</h4>
                                                        <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-6 opacity-60 italic">{contributor.email}</p>
                                                        <div className="w-full flex justify-around border-t border-white/5 pt-6">
                                                            <div>
                                                                <p className="text-sm font-black text-white">{contributor.iqScore}</p>
                                                                <p className="text-[8px] text-gray-600 uppercase font-black tracking-[0.2em] mt-1">IQ Score</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-black text-white">{Math.floor(Math.random() * 50) + 10}k</p>
                                                                <p className="text-[8px] text-gray-600 uppercase font-black tracking-[0.2em] mt-1">Reach</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Trending Tags (Horizontal) */}
                                    <Card className="md:col-span-2 bg-white/[0.01] border-white/5 rounded-[40px]">
                                        <CardContent className="p-10">
                                            <div className="flex flex-wrap items-center justify-center gap-6">
                                                <span className="text-[9px] uppercase font-black text-gray-700 tracking-[0.4em] mr-4">Network Nodes:</span>
                                                {(trendingData?.trendingTags || []).map((tag: TrendingTag) => (
                                                    <Badge key={tag.name} variant="outline" className="px-8 py-3 border-white/5 text-gray-500 hover:text-white hover:border-white/20 transition-all cursor-pointer rounded-2xl text-[10px] uppercase font-black tracking-widest bg-white/[0.02] shadow-xl">
                                                        #{tag.name} <span className="ml-3 opacity-20 font-medium">({tag.count})</span>
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
