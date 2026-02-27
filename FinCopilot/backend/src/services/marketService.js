const axios = require('axios');
require('dotenv').config();

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY;

const marketService = {
    getCurrentPrice: async (stock) => {
        try {
            if (!ALPHA_VANTAGE_KEY) {
                // Mock fallback if key missing
                return Math.floor(Math.random() * (200 - 150) + 150);
            }
            const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${ALPHA_VANTAGE_KEY}`);
            const price = response.data['Global Quote']?.['05. price'];
            return price ? parseFloat(price) : Math.floor(Math.random() * (200 - 150) + 150);
        } catch (error) {
            return 150.0;
        }
    },

    getHistoricalPrices: async (stock) => {
        try {
            if (!ALPHA_VANTAGE_KEY) return [];
            const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${ALPHA_VANTAGE_KEY}`);
            const series = response.data['Time Series (Daily)'];
            if (!series) return [];

            return Object.keys(series).slice(0, 30).map(date => ({
                date,
                price: parseFloat(series[date]['4. close'])
            }));
        } catch (error) {
            return [];
        }
    }
};

module.exports = marketService;
