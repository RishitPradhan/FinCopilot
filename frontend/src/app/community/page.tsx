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

const DEMO_POSTS: Post[] = [
    {
        _id: 'demo-1',
        author: { _id: 'u1', name: 'Arjun Mehta', email: 'arjun@fincopilot.com' },
        title: 'Why I moved 40% of my portfolio into index funds this quarter',
        content: 'After years of stock-picking, I realized that consistent 12-14% annual returns from Nifty 50 index funds beat my active trading returns 7 out of 10 years. The math is clear: lower fees + compounding = wealth. Stop trying to beat the market and let the market work for you.',
        likes: ['u2', 'u3', 'u4', 'u5', 'u6', 'u7'],
        comments: [{ _id: 'c1' }, { _id: 'c2' }, { _id: 'c3' }],
        tags: ['investing', 'indexfunds', 'stocks'],
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        _id: 'demo-2',
        author: { _id: 'u2', name: 'Priya Sharma', email: 'priya@fincopilot.com' },
        title: 'RBI holds rates steady — what it means for your fixed deposits',
        content: 'The RBI kept repo rate at 6.5% for the 6th consecutive meeting. FD rates at major banks are currently between 7-7.5% for 1-year tenure. If you are parking emergency funds, this is a decent window. But remember, real returns after inflation are barely 1-2%. Equity is still king for long-term wealth creation.',
        likes: ['u1', 'u3', 'u5', 'u8'],
        comments: [{ _id: 'c4' }, { _id: 'c5' }],
        tags: ['economy', 'RBI', 'fixeddeposit'],
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
        _id: 'demo-3',
        author: { _id: 'u3', name: 'Karan Vyas', email: 'karan@fincopilot.com' },
        title: 'Bitcoin just crossed $95K — is it finally time to buy?',
        content: 'The halving effect is real. Every cycle, Bitcoin rallies 6-12 months after the halving event. We are right in that window. I am personally allocating 5% of my portfolio to BTC and ETH. Remember: only invest what you can afford to lose in crypto. This is NOT financial advice.',
        likes: ['u1', 'u4', 'u6', 'u7', 'u9'],
        comments: [{ _id: 'c6' }, { _id: 'c7' }, { _id: 'c8' }, { _id: 'c9' }],
        tags: ['crypto', 'bitcoin', 'investing'],
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
    {
        _id: 'demo-4',
        author: { _id: 'u4', name: 'Sneha Reddy', email: 'sneha@fincopilot.com' },
        title: 'The psychology of panic selling — and how I stopped doing it',
        content: 'In the 2020 crash, I sold everything at the bottom and missed the recovery. It cost me ₹4.2L in unrealized gains. Since then, I have learned to: 1) Set stop-losses BEFORE entering a trade, 2) Never check my portfolio more than once a week, 3) Keep a cash reserve so I am not forced to sell. Discipline > Intelligence in markets.',
        likes: ['u1', 'u2', 'u5', 'u8', 'u9', 'u10', 'u11'],
        comments: [{ _id: 'c10' }, { _id: 'c11' }, { _id: 'c12' }, { _id: 'c13' }, { _id: 'c14' }],
        tags: ['psychology', 'mindset', 'discipline'],
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
    {
        _id: 'demo-5',
        author: { _id: 'u5', name: 'Rahul Desai', email: 'rahul@fincopilot.com' },
        title: 'Tata Motors vs Mahindra — which auto stock is the better bet for 2026?',
        content: 'Both companies are killing it in EVs. Tata has first-mover advantage with Nexon EV, but M&M is catching up fast with XUV400. Revenue-wise: Tata Motors ₹4.1L Cr vs M&M ₹1.5L Cr. But M&M has better margins at 14.2% vs Tata at 8.5%. I am bullish on M&M for the next 2 years. What do you all think?',
        likes: ['u1', 'u3', 'u6'],
        comments: [{ _id: 'c15' }, { _id: 'c16' }],
        tags: ['stocks', 'auto', 'market'],
        createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    },
    {
        _id: 'demo-6',
        author: { _id: 'u6', name: 'Ananya Iyer', email: 'ananya@fincopilot.com' },
        title: 'My SIP strategy: How ₹10K/month became ₹18.7L in 8 years',
        content: 'Started with ₹10,000/month SIP in 2016 across 3 funds: Parag Parikh Flexi Cap, Axis Midcap, and UTI Nifty Index. Total invested: ₹9.6L. Current value: ₹18.7L. XIRR: 16.8%. The secret? I never stopped, not even during COVID crash. Consistency beats timing. Start your SIP today, not tomorrow.',
        likes: ['u1', 'u2', 'u3', 'u4', 'u7', 'u8', 'u9', 'u10'],
        comments: [{ _id: 'c17' }, { _id: 'c18' }, { _id: 'c19' }, { _id: 'c20' }, { _id: 'c21' }, { _id: 'c22' }],
        tags: ['SIP', 'mutualfunds', 'personalfinance'],
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
];

export default function CommunityPage() {
    const { user } = useAuthStore();
    const { addNotification } = useNotificationStore();
    const [posts, setPosts] = useState<Post[]>(DEMO_POSTS);
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
            if (res.data.success && res.data.posts.length > 0) {
                setPosts([...res.data.posts, ...DEMO_POSTS]);
            }
        } catch (err) {
            console.error('Failed to fetch posts — using demo data');
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
            <div className="max-w-6xl mx-auto space-y-3">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-neutral-800/50 pb-4">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-bold tracking-tighter"
                        >
                            Community
                        </motion.h1>
                        <p className="text-neutral-500 mt-2 uppercase tracking-widest text-xs font-bold">Connect & Share Financial Insights</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                            <Input
                                placeholder="Search insights..."
                                className="pl-10 bg-neutral-900/50 border-neutral-800 text-sm h-10 w-[240px] focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all rounded-full"
                            />
                        </div>
                        <Button className="bg-white text-black hover:bg-neutral-200 rounded-full h-10 px-6 font-bold text-xs uppercase tracking-tight">
                            <Plus className="w-4 h-4 mr-2" /> New Post
                        </Button>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-neutral-900/50">
                    <Filter className="w-3 h-3 text-neutral-600 mr-2 flex-shrink-0" />
                    {categories.map(cat => {
                        const catColors: Record<string, string> = {
                            'All': 'bg-white text-black border-white',
                            'Stocks': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                            'Economy': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
                            'Finance': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
                            'Crypto': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
                            'Mindset': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
                        };
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border ${selectedFilter === cat
                                    ? catColors[cat] || 'bg-white text-black border-white'
                                    : 'bg-neutral-950 text-neutral-500 border-neutral-900 hover:border-neutral-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Left Sidebar: Filters/Tags */}
                    <div className="hidden lg:block space-y-3 sticky top-3 self-start h-fit">
                        <Card className="bg-neutral-950/80 border-neutral-800/50 overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 flex items-center gap-2">
                                    <MessageSquare className="w-3 h-3 text-blue-400/60" /> Navigation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                {[
                                    { label: 'Feed', id: 'feed', icon: MessageSquare, color: 'text-blue-400' },
                                    { label: 'Messages', id: 'messages', icon: Send, color: 'text-purple-400' },
                                    { label: 'Trending', id: 'trending', icon: TrendingUp, color: 'text-emerald-400' },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveView(item.id as any)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeView === item.id ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white hover:bg-neutral-900/80'
                                            }`}
                                    >
                                        <item.icon className={`w-4 h-4 ${activeView === item.id ? 'text-black' : item.color}`} /> {item.label}
                                    </button>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Market Pulse Widget */}
                        <Card className="bg-neutral-950/80 border-neutral-800/50 overflow-hidden group">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 flex items-center gap-2">
                                    <Activity className="w-3 h-3 text-emerald-400/60" /> Market Pulse
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-end">
                                        <span className="text-2xl font-black tracking-tighter text-emerald-400">
                                            {trendingData?.marketInsights?.sentiment || 72}%
                                        </span>
                                        <span className="text-[10px] font-bold uppercase text-emerald-500/60 mb-1">Bullish</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${trendingData?.marketInsights?.sentiment || 72}%` }}
                                            className="h-full bg-gradient-to-r from-emerald-500/80 to-emerald-400 transition-all duration-1000 rounded-full"
                                        />
                                    </div>
                                </div>
                                <p className="text-[11px] text-neutral-500 leading-tight">
                                    Community sentiment is currently <span className="text-emerald-400 font-bold">Strongly Bullish</span> based on recent trade discussions.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Top Contributors Sidebar Mini */}
                        <Card className="bg-neutral-950/80 border-neutral-800/50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 flex items-center gap-2">
                                    <Users className="w-3 h-3 text-purple-400/60" /> Top Analysts
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {(trendingData?.marketInsights?.topContributors || []).slice(0, 3).map((contributor, i) => (
                                    <div key={contributor.email} className="flex items-center gap-3 group/item cursor-pointer">
                                        <Avatar className="w-8 h-8 border border-neutral-800 group-hover/item:border-neutral-600 transition-colors">
                                            <AvatarFallback className={`font-bold text-[10px] ${i === 0 ? 'bg-amber-500/10 text-amber-400' :
                                                i === 1 ? 'bg-blue-500/10 text-blue-400' :
                                                    'bg-purple-500/10 text-purple-400'
                                                }`}>{contributor.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-neutral-300 group-hover/item:text-white transition-colors truncate">{contributor.name}</p>
                                            <p className="text-[10px] text-neutral-600 truncate">IQ: <span className="text-amber-400/70">{contributor.iqScore}</span></p>
                                        </div>
                                        {i === 0 && <span className="text-amber-400/50 text-[8px] font-black">👑</span>}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-neutral-950/80 border-neutral-800/50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Trending Topics</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-1.5 pt-0">
                                {(trendingData?.trendingTags || ['Stocks', 'Crypto', 'Market', 'Economy', 'SIP']).map((tag, i) => {
                                    const tagName = typeof tag === 'string' ? tag : tag.name;
                                    const tagColors = [
                                        'bg-emerald-500/5 text-emerald-400/70 hover:bg-emerald-500/10',
                                        'bg-amber-500/5 text-amber-400/70 hover:bg-amber-500/10',
                                        'bg-blue-500/5 text-blue-400/70 hover:bg-blue-500/10',
                                        'bg-purple-500/5 text-purple-400/70 hover:bg-purple-500/10',
                                        'bg-rose-500/5 text-rose-400/70 hover:bg-rose-500/10',
                                    ];
                                    return (
                                        <Badge key={tagName} variant="secondary" className={`cursor-pointer border-none py-0.5 px-2.5 text-[10px] font-bold transition-colors ${tagColors[i % tagColors.length]}`}>
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
                                                <Card className="bg-neutral-950/80 border-neutral-800/40 hover:border-neutral-700/60 transition-all duration-300 group rounded-xl">
                                                    <CardHeader className="flex flex-row items-center gap-3 pb-1 pt-3">
                                                        <Avatar className="w-8 h-8 border border-neutral-800 group-hover:border-neutral-600 transition-colors">
                                                            <AvatarFallback className="bg-blue-500/10 text-blue-400 font-bold text-[10px]">{post.author?.name?.[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <Link href={`/profile/${post.author?._id}`} className="flex-1 group/author min-w-0">
                                                            <div className="flex items-center gap-2 truncate">
                                                                <CardTitle className="text-[11px] font-bold group-hover/author:text-white transition-colors truncate">{post.author?.name}</CardTitle>
                                                                <span className="text-neutral-700 text-[9px] whitespace-nowrap">• {new Date(post.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                            <p className="text-[9px] text-neutral-600 uppercase tracking-wider font-medium truncate">{post.author?.email}</p>
                                                        </Link>
                                                        <Button variant="ghost" size="icon" className="text-neutral-800 hover:text-white h-7 w-7">
                                                            <MoreHorizontal className="w-3 h-3" />
                                                        </Button>
                                                    </CardHeader>
                                                    <CardContent className="space-y-2 pb-3">
                                                        <h3 className="text-base font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">{post.title}</h3>
                                                        <p className="text-neutral-400 text-[11px] leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">{post.content}</p>
                                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                                            {post.tags.map((tag, ti) => {
                                                                const tagTints = [
                                                                    'text-emerald-400/60',
                                                                    'text-blue-400/60',
                                                                    'text-purple-400/60',
                                                                    'text-amber-400/60',
                                                                    'text-rose-400/60',
                                                                ];
                                                                return (
                                                                    <span key={tag} className={`text-[9px] font-bold ${tagTints[ti % tagTints.length]}`}>#{tag}</span>
                                                                );
                                                            })}
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className="flex items-center gap-5 pt-0 border-t border-neutral-800/30 mt-0">
                                                        <button
                                                            onClick={() => handleLike(post._id)}
                                                            className={`flex items-center gap-1.5 py-1.5 transition-colors ${post.likes.includes(user?.id || '') ? 'text-rose-400' : 'text-neutral-600 hover:text-rose-400'}`}
                                                        >
                                                            <Heart className={`w-3 h-3 ${post.likes.includes(user?.id || '') ? 'fill-rose-400' : ''}`} />
                                                            <span className="text-[9px] font-bold">{post.likes.length}</span>
                                                        </button>
                                                        <button className="flex items-center gap-1.5 py-1.5 text-neutral-600 hover:text-blue-400 transition-colors">
                                                            <MessageCircle className="w-3 h-3" />
                                                            <span className="text-[9px] font-bold">{post.comments.length}</span>
                                                        </button>
                                                        <button className="flex items-center gap-1.5 py-1.5 text-neutral-600 hover:text-emerald-400 transition-colors">
                                                            <Share2 className="w-3 h-3" />
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
                                    className="h-[calc(100vh-280px)] min-h-[600px] flex rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950/50 backdrop-blur-xl"
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
                                                <div className="p-4 border-b border-neutral-900 flex items-center justify-between bg-black/40 backdrop-blur-md">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="w-10 h-10 border border-neutral-800/50">
                                                            <AvatarFallback className="bg-neutral-900 text-white font-bold">{activeChat.user.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <h3 className="text-sm font-bold">{activeChat.user.name}</h3>
                                                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Online</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="ghost" size="icon" className="rounded-full text-neutral-400">
                                                            <Search className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="rounded-full text-neutral-400">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Messages Area */}
                                                <div
                                                    ref={scrollRef}
                                                    className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-90"
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
                                                                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-xl ${isMe
                                                                    ? 'bg-white text-black rounded-tr-none'
                                                                    : 'bg-neutral-900 text-neutral-200 rounded-tl-none border border-neutral-800'
                                                                    }`}>
                                                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                                                    <div className={`flex items-center justify-end gap-1 mt-1 ${isMe ? 'text-black/50' : 'text-neutral-500'}`}>
                                                                        <span className="text-[9px] font-bold uppercase">
                                                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                        </span>
                                                                        {isMe && <CheckCheck className="w-3 h-3" />}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Message Input */}
                                                <div className="p-4 border-t border-neutral-900 bg-black/40 backdrop-blur-md">
                                                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                                                        <Button type="button" variant="ghost" size="icon" className="rounded-full text-neutral-500 shrink-0">
                                                            <Paperclip className="w-5 h-5" />
                                                        </Button>
                                                        <div className="flex-1 relative">
                                                            <Input
                                                                value={newMessage.content}
                                                                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                                                                placeholder="Type a message..."
                                                                className="bg-neutral-900/50 border-neutral-800 text-sm h-12 rounded-2xl pr-12 focus:ring-1 focus:ring-white transition-all shadow-inner"
                                                            />
                                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                                                <button type="submit" disabled={!newMessage.content} className="p-2 bg-white text-black rounded-xl hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:scale-95 active:scale-90">
                                                                    <Send className="w-4 h-4" />
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
                                    <Card className="bg-neutral-950 border-neutral-900 overflow-hidden relative group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <CardHeader>
                                            <CardTitle className="text-xs uppercase tracking-widest font-bold text-neutral-500">Market Sentiment</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col items-center justify-center py-8">
                                            <div className="relative w-48 h-48 flex items-center justify-center">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle
                                                        cx="96"
                                                        cy="96"
                                                        r="80"
                                                        stroke="currentColor"
                                                        strokeWidth="12"
                                                        fill="transparent"
                                                        className="text-neutral-900"
                                                    />
                                                    <circle
                                                        cx="96"
                                                        cy="96"
                                                        r="80"
                                                        stroke="currentColor"
                                                        strokeWidth="12"
                                                        fill="transparent"
                                                        strokeDasharray={502.4}
                                                        strokeDashoffset={502.4 - (502.4 * (trendingData?.marketInsights?.sentiment || 75)) / 100}
                                                        className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                                    />
                                                </svg>
                                                <div className="absolute flex flex-col items-center">
                                                    <span className="text-4xl font-bold tracking-tighter">{trendingData?.marketInsights?.sentiment || 75}%</span>
                                                    <span className="text-[10px] uppercase font-bold text-neutral-500">Bullish</span>
                                                </div>
                                            </div>
                                            <p className="mt-6 text-sm text-center text-neutral-400 max-w-[200px]">
                                                The community is currently feeling highly optimistic about the upcoming quarter.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    {/* Hot Stocks */}
                                    <Card className="bg-neutral-950 border-neutral-900">
                                        <CardHeader>
                                            <CardTitle className="text-xs uppercase tracking-widest font-bold text-neutral-500">Most Discussed Stocks</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {(trendingData?.marketInsights?.hotStocks || []).map((stock: TrendingStock) => (
                                                <div key={stock.symbol} className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700 transition-all cursor-pointer group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs">
                                                            {stock.symbol[0]}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold tracking-tight">{stock.symbol}</p>
                                                            <p className="text-[10px] text-neutral-500 font-bold uppercase">{stock.mentions} Mentions</p>
                                                        </div>
                                                    </div>
                                                    <div className={`text-xs font-bold ${stock.change.startsWith('+') ? 'text-white' : 'text-neutral-500'}`}>
                                                        {stock.change}
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>

                                    {/* Top Contributors */}
                                    <Card className="md:col-span-2 bg-neutral-950 border-neutral-900">
                                        <CardHeader>
                                            <CardTitle className="text-xs uppercase tracking-widest font-bold text-neutral-500">Market Mavericks (Top Contributors)</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {(trendingData?.marketInsights?.topContributors || []).map((contributor: Contributor) => (
                                                    <div key={contributor._id} className="p-4 rounded-2xl bg-gradient-to-b from-neutral-900 to-black border border-neutral-800 flex flex-col items-center text-center">
                                                        <Avatar className="w-16 h-16 border-2 border-white mb-4">
                                                            <AvatarFallback className="bg-neutral-800 text-white font-bold text-xl">{contributor.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <h4 className="font-bold text-sm mb-1">{contributor.name}</h4>
                                                        <p className="text-[10px] text-neutral-600 uppercase font-extrabold tracking-tighter mb-4">{contributor.email}</p>
                                                        <div className="w-full flex justify-around border-t border-neutral-800 pt-4">
                                                            <div>
                                                                <p className="text-xs font-bold">{contributor.iqScore}</p>
                                                                <p className="text-[9px] text-neutral-500 uppercase font-bold">IQ Score</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-bold">{Math.floor(Math.random() * 50) + 10}k</p>
                                                                <p className="text-[9px] text-neutral-500 uppercase font-bold">Reach</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Trending Tags (Horizontal) */}
                                    <Card className="md:col-span-2 bg-black border-neutral-800">
                                        <CardContent className="p-6">
                                            <div className="flex flex-wrap items-center justify-center gap-4">
                                                <span className="text-[10px] uppercase font-bold text-neutral-600 mr-2">Top Tags:</span>
                                                {(trendingData?.trendingTags || []).map((tag: TrendingTag) => (
                                                    <Badge key={tag.name} variant="outline" className="px-4 py-2 border-neutral-800 text-neutral-400 hover:text-white hover:border-white transition-all cursor-pointer">
                                                        #{tag.name} <span className="ml-2 opacity-40">({tag.count})</span>
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
