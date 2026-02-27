require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const learnRoutes = require('./routes/learn.routes');
const predictRoutes = require('./routes/predict.routes');
const newsRoutes = require('./routes/news.routes');
const portfolioRoutes = require('./routes/portfolio.routes');
const mongoose = require('mongoose');
const advisorRoutes = require('./routes/advisor.routes');
const communityRoutes = require('./routes/community.routes');
const userRoutes = require('./routes/user.routes');
const watchlistRoutes = require('./routes/watchlist.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fincopilot')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

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

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
