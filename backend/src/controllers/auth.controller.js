const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');

const authController = {
    signup: async (req, res, next) => {
        try {
            const { name, email, password, riskAppetite } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'User already exists' });
            }

            const user = new User({
                name,
                email,
                password,
                riskAppetite: riskAppetite ? riskAppetite.toLowerCase() : 'moderate'
            });
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

    /**
     * MetaMask / Wallet Authentication
     * Verifies the signed message cryptographically, then finds or creates the user.
     * POST /auth/metamask
     * Body: { address, message, signature }
     */
    metamaskAuth: async (req, res, next) => {
        try {
            const { address, message, signature } = req.body;

            if (!address || !message || !signature) {
                return res.status(400).json({ success: false, message: 'address, message, and signature are required.' });
            }

            // --- Cryptographic Signature Verification ---
            // Recover the address that signed the message
            const recoveredAddress = ethers.verifyMessage(message, signature);

            // Compare case-insensitively
            if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
                return res.status(401).json({ success: false, message: 'Signature verification failed. Address mismatch.' });
            }

            // --- Find or Create User ---
            const normalizedAddress = address.toLowerCase();
            let user = await User.findOne({ walletAddress: normalizedAddress });

            if (!user) {
                // First-time wallet login — auto-create the user
                const shortAddr = `${address.slice(0, 6)}…${address.slice(-4)}`;
                user = new User({
                    name: `Wallet ${shortAddr}`,
                    walletAddress: normalizedAddress,
                    riskAppetite: 'moderate',
                });
                await user.save();
            }

            // --- Issue JWT ---
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email || `${normalizedAddress}@wallet.eth`,
                    riskAppetite: user.riskAppetite,
                    walletAddress: user.walletAddress,
                }
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

