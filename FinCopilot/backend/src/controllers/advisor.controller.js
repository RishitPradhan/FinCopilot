const ChatHistory = require('../models/ChatHistory');
const aiService = require('../services/aiService');
const Portfolio = require('../models/Portfolio');
const NewsCache = require('../models/NewsCache');

const advisorController = {
    chat: async (req, res, next) => {
        try {
            const { message } = req.body;

            // Build context from user data
            const holdings = await Portfolio.find({ userId: req.user.id });
            const recentNews = await NewsCache.find().sort({ cachedAt: -1 }).limit(3);

            const context = {
                holdings: holdings.map(h => h.stock),
                marketNews: recentNews.map(n => n.stock + ': ' + n.sentiment)
            };

            const aiResponse = await aiService.getAdvisorResponse(message, context);

            // Save to history
            await ChatHistory.findOneAndUpdate(
                { userId: req.user.id },
                {
                    $push: {
                        messages: [
                            { role: 'user', content: message },
                            { role: 'assistant', content: aiResponse }
                        ]
                    }
                },
                { upsert: true, new: true }
            );

            res.json({ success: true, response: aiResponse });
        } catch (error) {
            next(error);
        }
    },

    getHistory: async (req, res, next) => {
        try {
            const history = await ChatHistory.findOne({ userId: req.user.id });
            res.json({ success: true, history: history ? history.messages : [] });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = advisorController;
