const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

const SYSTEM_PROMPT = `You are Stocko, an expert AI financial advisor specializing in Indian stock market analysis, fintech insights, and investment guidance.

Your expertise includes:
- Stock analysis and technical/fundamental analysis
- Portfolio assessment and red flag identification
- Company financial reports and earnings summaries
- Market trends and economic indicators
- Risk management and investment strategies
- Real-time market insights

When responding:
1. Be direct, data-driven, and professional
2. Use clear formatting with bullet points where appropriate
3. Always cite data sources when discussing specific stocks
4. Provide actionable insights, not just information
5. For stock queries, NEVER use placeholder variables like X, Y, Z, or '₹X'. ALWAYS provide your best realistic estimated numbers based on historical data up to your knowledge cutoff.
6. Include relevant metrics (P/E ratio, market cap, EPS, Dividend Yield, etc.) with concrete estimated values.
7. Use the chart component for price visualizations when helpful
8. Always explain the "why" behind your analysis

Formatting guidelines:
- Use markdown for better readability
- Bold important metrics and conclusions
- Use bullet points for lists
- Keep paragraphs concise

Remember: You're helping Indian investors make informed decisions.`;

const aiService = {
    getPrediction: async (stock, historicalPrices) => {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: `You are an AI model predicting stock movement. Output strictly JSON: {"prediction": "BULLISH" | "BEARISH" | "NEUTRAL", "confidence": number}` },
                    { role: 'user', content: `Predict the next 7 days movement for ${stock} given these closing prices: ${historicalPrices.join(', ')}` }
                ],
                response_format: { type: 'json_object' }
            });
            return JSON.parse(response.choices[0].message.content);
        } catch (error) {
            console.error('AI Service Prediction Error:', error.message);
            return { prediction: 'NEUTRAL', confidence: 50 };
        }
    },

    getExplanation: async (stock, userPred, actualResult, newsSentiment) => {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: 'Explain why a stock moved the way it did based on the provided context. Be concise.' },
                    { role: 'user', content: `Stock: ${stock}, User predicted: ${userPred}, Actual outcome: ${actualResult}, Recent news sentiment: ${newsSentiment}. Explain the outcome.` }
                ]
            });
            return response.choices[0].message.content;
        } catch (error) {
            return 'AI explanation unavailable at the moment.';
        }
    },

    getSentiment: async (articles) => {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: `You are a sentiment analysis engine. Analyze the following articles and return a single word: Bullish, Bearish, or Neutral.` },
                    { role: 'user', content: articles.join('\n') }
                ]
            });
            return response.choices[0].message.content.trim();
        } catch (error) {
            return 'Neutral';
        }
    },

    getAdvisorResponse: async (userMessage, context) => {
        try {
            let contextString = '';
            if (context) {
                contextString = `--- CONTEXT ---\nUser's Current Holdings: ${context.holdings?.join(', ') || 'None'}\nRecent Market News Themes: ${context.marketNews?.join(', ') || 'None'}\n--- END CONTEXT ---\n`;
            }

            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: `${contextString}\nUser Query: ${userMessage}` }
                ],
                temperature: 0.7,
                max_tokens: 1500
            });
            return response.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI Advisor Error:', error);
            return 'I apologize, but I am having trouble connecting to my neural core. Please verify your OpenAI API key is correctly configured in the backend environment.';
        }
    }
};

module.exports = aiService;
