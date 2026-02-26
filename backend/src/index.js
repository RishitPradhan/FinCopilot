require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const learnRoutes = require('./routes/learn.routes');
const predictRoutes = require('./routes/predict.routes');
const newsRoutes = require('./routes/news.routes');
const portfolioRoutes = require('./routes/portfolio.routes');
const advisorRoutes = require('./routes/advisor.routes');

const app = express();
const PORT = process.env.PORT || 5000;

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

// IQ Score endpoint
app.get('/api/user/iq-score', (req, res) => {
    res.json({ score: 74 });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
