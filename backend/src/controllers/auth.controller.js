const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {
    signup: async (req, res, next) => {
        try {
            const { name, email, password, riskAppetite } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'User already exists' });
            }

            const user = new User({ name, email, password, riskAppetite });
            await user.save();

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.status(201).json({
                success: true,
                token,
                user: { id: user._id, name: user.name, email: user.email, riskAppetite: user.riskAppetite }
            });
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.json({
                success: true,
                token,
                user: { id: user._id, name: user.name, email: user.email, riskAppetite: user.riskAppetite }
            });
        } catch (error) {
            next(error);
        }
    },

    getMe: async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.json({ success: true, user });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = authController;
