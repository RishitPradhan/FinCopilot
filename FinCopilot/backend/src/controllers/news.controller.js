const newsService = require('../services/newsService');

const newsController = {
    getNews: async (req, res, next) => {
        try {
            const { stock } = req.query;
            if (!stock) return res.status(400).json({ success: false, message: 'Stock query required' });

            const newsData = await newsService.fetchNews(stock);
            res.json({ success: true, ...newsData.toObject ? newsData.toObject() : newsData });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = newsController;
