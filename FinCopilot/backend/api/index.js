require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('../src/routes/auth.routes');
const learnRoutes = require('../src/routes/learn.routes');
const predictRoutes = require('../src/routes/predict.routes');
const newsRoutes = require('../src/routes/news.routes');
const portfolioRoutes = require('../src/routes/portfolio.routes');
const mongoose = require('mongoose');
const advisorRoutes = require('../src/routes/advisor.routes');
const communityRoutes = require('../src/routes/community.routes');
const userRoutes = require('../src/routes/user.routes');
const watchlistRoutes = require('../src/routes/watchlist.routes');
const errorHandler = require('../src/middleware/error.middleware');

const app = express();

// Database Connection
let cachedDb = null;
async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }
    const db = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fincopilot');
    cachedDb = db;
    return db;
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/learn', learnRoutes);
app.use('/api/predict', predictRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/advisor', advisorRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/user', userRoutes);
app.use('/api/watchlist', watchlistRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Error Handler
app.use(errorHandler);

// Export for Vercel serverless
module.exports = async (req, res) => {
    await connectToDatabase();
    return app(req, res);
};
