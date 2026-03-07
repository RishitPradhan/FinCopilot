const User = require('../models/User');
const LearningProgress = require('../models/LearningProgress');
const Portfolio = require('../models/Portfolio');
const CommunityPost = require('../models/CommunityPost');

const userController = {
    getIqScore: async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id).select('iqScore');
            res.json({ success: true, score: user.iqScore });
        } catch (error) {
            next(error);
        }
    },

    getSummary: async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            const progressCount = await LearningProgress.countDocuments({ userId: req.user.id, completed: true });
            const portfolioCount = await Portfolio.countDocuments({ userId: req.user.id });

            res.json({
                success: true,
                user,
                stats: {
                    modulesCompleted: progressCount,
                    totalHoldings: portfolioCount,
                    rank: 'Silver' // Mock rank
                }
            });
        } catch (error) {
            next(error);
        }
    },

    getPublicProfile: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id).select('name email riskAppetite iqScore createdAt');
            if (!user) return res.status(404).json({ success: false, message: 'User not found' });

            const posts = await CommunityPost.find({ author: req.params.id }).sort({ createdAt: -1 });

            res.json({
                success: true,
                user,
                posts
            });
        } catch (error) {
            next(error);
        }
    },

    updatePublicKey: async (req, res, next) => {
        try {
            const { publicKey } = req.body;
            await User.findByIdAndUpdate(req.user.id, { publicKey });
            res.json({ success: true, message: 'Public key updated' });
        } catch (error) {
            next(error);
        }
    },

    getPublicKey: async (req, res, next) => {
        try {
            const { userId, email } = req.query;
            let query = {};
            if (userId) query._id = userId;
            else if (email) query.email = email;
            else return res.status(400).json({ success: false, message: 'UserId or email required' });

            const user = await User.findOne(query).select('publicKey name email');
            if (!user) return res.status(404).json({ success: false, message: 'User not found' });

            res.json({ success: true, publicKey: user.publicKey, user });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = userController;
