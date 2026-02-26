const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    // Dev Mode Bypass
    if (process.env.NODE_ENV === 'development' && (!req.headers.authorization || req.headers.authorization === 'Bearer dev-token')) {
        try {
            // Find a default user (Financial Wizard) to act as the session user
            let user = await User.findOne({ email: 'wizard@fincopilot.com' });
            if (!user) user = await User.findOne(); // Fallback to any user

            if (user) {
                req.user = user;
                return next();
            }
        } catch (e) {
            console.error('Dev bypass failed:', e);
        }
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
