const CommunityPost = require('../models/CommunityPost');
const Message = require('../models/Message');
const User = require('../models/User');

const communityController = {
    // Posts
    createPost: async (req, res, next) => {
        try {
            const { title, content, tags } = req.body;
            const post = new CommunityPost({
                author: req.user.id,
                title,
                content,
                tags
            });
            await post.save();
            const populatedPost = await CommunityPost.findById(post._id).populate('author', 'name email');
            res.status(201).json({ success: true, post: populatedPost });
        } catch (error) {
            next(error);
        }
    },

    getPosts: async (req, res, next) => {
        try {
            const posts = await CommunityPost.find()
                .sort({ createdAt: -1 })
                .populate('author', 'name email')
                .populate('comments.author', 'name');
            res.json({ success: true, posts });
        } catch (error) {
            next(error);
        }
    },

    likePost: async (req, res, next) => {
        try {
            const post = await CommunityPost.findById(req.params.id);
            if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

            const likeIndex = post.likes.indexOf(req.user.id);
            if (likeIndex === -1) {
                post.likes.push(req.user.id);
            } else {
                post.likes.splice(likeIndex, 1);
            }
            await post.save();
            res.json({ success: true, likes: post.likes });
        } catch (error) {
            next(error);
        }
    },

    addComment: async (req, res, next) => {
        try {
            const post = await CommunityPost.findById(req.params.id);
            if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

            const comment = {
                author: req.user.id,
                content: req.body.content
            };
            post.comments.push(comment);
            await post.save();
            const updatedPost = await CommunityPost.findById(post._id).populate('comments.author', 'name');
            res.json({ success: true, comment: updatedPost.comments[post.comments.length - 1] });
        } catch (error) {
            next(error);
        }
    },

    // Messaging
    sendMessage: async (req, res, next) => {
        try {
            const { receiverEmail, content } = req.body;
            const receiver = await User.findOne({ email: receiverEmail });
            if (!receiver) return res.status(404).json({ success: false, message: 'User not found' });

            const message = new Message({
                sender: req.user.id,
                receiver: receiver._id,
                content
            });
            await message.save();
            const populatedMessage = await Message.findById(message._id)
                .populate('sender', 'name email')
                .populate('receiver', 'name email');
            res.status(201).json({ success: true, message: populatedMessage });
        } catch (error) {
            next(error);
        }
    },

    getMessages: async (req, res, next) => {
        try {
            const messages = await Message.find({
                $or: [{ sender: req.user.id }, { receiver: req.user.id }]
            })
                .sort({ createdAt: 1 })
                .populate('sender', 'name email')
                .populate('receiver', 'name email');
            res.json({ success: true, messages });
        } catch (error) {
            next(error);
        }
    },

    getTrending: async (req, res, next) => {
        try {
            // Aggregate tags from recent posts
            const recentPosts = await CommunityPost.find().sort({ createdAt: -1 }).limit(50);
            const tagMap = {};
            let totalLikes = 0;

            recentPosts.forEach(post => {
                totalLikes += post.likes.length;
                post.tags.forEach(tag => {
                    tagMap[tag] = (tagMap[tag] || 0) + 1;
                });
            });

            const trendingTags = Object.entries(tagMap)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);

            // Mocked market data for insights
            const marketInsights = {
                sentiment: 68, // 68% Bullish based on "totalLikes" and post density
                hotStocks: [
                    { symbol: 'RELIANCE', mentions: 12, change: '+2.4%' },
                    { symbol: 'HDFCBANK', mentions: 8, change: '-0.5%' },
                    { symbol: 'TATASTEEL', mentions: 7, change: '+1.2%' },
                    { symbol: 'INFY', mentions: 5, change: '+0.8%' }
                ],
                topContributors: await User.find().limit(3).select('name email iqScore')
            };

            res.json({
                success: true,
                trendingTags,
                marketInsights
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = communityController;

module.exports = communityController;
