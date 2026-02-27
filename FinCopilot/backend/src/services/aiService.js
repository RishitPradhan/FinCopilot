const axios = require('axios');
require('dotenv').config();

const AI_SERVER_URL = process.env.AI_SERVER_URL || 'http://localhost:8000';

const aiService = {
    getPrediction: async (stock, historicalPrices) => {
        try {
            const response = await axios.post(`${AI_SERVER_URL}/ai/predict`, { stock, data: historicalPrices });
            return response.data;
        } catch (error) {
            console.error('AI Service Prediction Error:', error.message);
            return { prediction: 'NEUTRAL', confidence: 50 };
        }
    },

    getExplanation: async (stock, userPred, actualResult, newsSentiment) => {
        try {
            const response = await axios.post(`${AI_SERVER_URL}/ai/explain`, { stock, userPred, actualResult, newsSentiment });
            return response.data.explanation;
        } catch (error) {
            return 'AI explanation unavailable at the moment.';
        }
    },

    getSentiment: async (articles) => {
        try {
            const response = await axios.post(`${AI_SERVER_URL}/ai/sentiment`, { articles });
            return response.data.sentiment;
        } catch (error) {
            return 'Neutral';
        }
    },

    getAdvisorResponse: async (userMessage, context) => {
        try {
            const response = await axios.post(`${AI_SERVER_URL}/ai/advisor`, { message: userMessage, context });
            return response.data.response;
        } catch (error) {
            return 'I apologize, but I am having trouble connecting to my knowledge base.';
        }
    }
};

module.exports = aiService;
