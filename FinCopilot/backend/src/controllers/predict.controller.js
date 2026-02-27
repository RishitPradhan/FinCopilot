const Prediction = require('../models/Prediction');
const aiService = require('../services/aiService');
const marketService = require('../services/marketService');

const predictController = {
    submit: async (req, res, next) => {
        try {
            const { stock, userPrediction, confidence } = req.body;

            // Get AI prediction for immediate comparison
            const aiResult = await aiService.getPrediction(stock);

            const prediction = new Prediction({
                userId: req.user.id,
                stock,
                userPrediction,
                aiPrediction: aiResult.prediction,
                confidence,
                explanation: 'Awaiting market resolution...'
            });

            await prediction.save();
            res.status(201).json({ success: true, prediction });
        } catch (error) {
            next(error);
        }
    },

    getHistory: async (req, res, next) => {
        try {
            const history = await Prediction.find({ userId: req.user.id }).sort({ createdAt: -1 });
            res.json({ success: true, history });
        } catch (error) {
            next(error);
        }
    },

    resolve: async (req, res, next) => {
        try {
            const { id } = req.params;
            const prediction = await Prediction.findById(id);
            if (!prediction) return res.status(404).json({ success: false, message: 'Not found' });

            // In a real app, track the price at submit vs price now
            const actualPrice = await marketService.getCurrentPrice(prediction.stock);
            // Mock logic for up/down resolution
            const actualResult = Math.random() > 0.5 ? 'UP' : 'DOWN';

            prediction.actualResult = actualResult;
            prediction.isResolved = true;

            // Get AI explanation for the resolution
            prediction.explanation = await aiService.getExplanation(
                prediction.stock,
                prediction.userPrediction,
                actualResult,
                'Neutral'
            );

            await prediction.save();
            res.json({ success: true, prediction });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = predictController;
