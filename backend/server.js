const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./src/routes/auth.routes');
const learnRoutes = require('./src/routes/learn.routes');
const predictRoutes = require('./src/routes/predict.routes');
const newsRoutes = require('./src/routes/news.routes');
const portfolioRoutes = require('./src/routes/portfolio.routes');
const advisorRoutes = require('./src/routes/advisor.routes');
const userRoutes = require('./src/routes/user.routes');
const errorHandler = require('./src/middleware/error.middleware');
const rateLimiter = require('./src/middleware/rateLimit.middleware');

const app = express();

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fincopilot')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/', rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/learn', learnRoutes);
app.use('/api/predict', predictRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/advisor', advisorRoutes);
app.use('/api/user', userRoutes);

// Health Check
app.get('/health', (req, res) => res.json({ status: 'OK', database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected' }));

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
