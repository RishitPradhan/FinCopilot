const axios = require('axios');
const NewsCache = require('../models/NewsCache');
const aiService = require('./aiService');
require('dotenv').config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

const newsService = {
    fetchNews: async (stock) => {
        // Check cache first
        const cached = await NewsCache.findOne({ stock });
        if (cached) return cached;

        try {
            if (!NEWS_API_KEY) throw new Error('NewsAPI key missing');

            const response = await axios.get(`https://newsapi.org/v2/everything?q=${stock}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`);
            const articles = response.data.articles.slice(0, 10);

            // Get sentiment from AI service
            const sentiment = await aiService.getSentiment(articles.map(a => a.title + ' ' + a.description));

            const newCache = await NewsCache.create({
                stock,
                articles,
                sentiment
            });

            return newCache;
        } catch (error) {
            console.error('News Service Error:', error.message);
            // Fallback empty articles
            return { articles: [], sentiment: 'Neutral' };
        }
    }
};

module.exports = newsService;
