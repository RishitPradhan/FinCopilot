const LearningProgress = require('../models/LearningProgress');
const User = require('../models/User');

const learnController = {
    getModules: async (req, res) => {
        // Hardcoded modules as requested, but could be DB-backed later
        const modules = [
            { id: '1', title: 'Basics of Stock Market', duration: '15 min', difficulty: 'Beginner', category: 'Fundamentals' },
            { id: '2', title: 'Technical Analysis 101', duration: '25 min', difficulty: 'Intermediate', category: 'Analysis' },
            { id: '3', title: 'Risk Management Strategies', duration: '20 min', difficulty: 'Beginner', category: 'Strategy' },
            { id: '4', title: 'Understanding Financial Ratios', duration: '30 min', difficulty: 'Intermediate', category: 'Fundamentals' },
            { id: '5', title: 'Options Trading for Beginners', duration: '45 min', difficulty: 'Advanced', category: 'Derivatives' }
        ];
        res.json({ success: true, modules });
    },

    getProgress: async (req, res, next) => {
        try {
            const progress = await LearningProgress.find({ userId: req.user.id });
            res.json({ success: true, progress });
        } catch (error) {
            next(error);
        }
    },

    markComplete: async (req, res, next) => {
        try {
            const { moduleId } = req.body;
            let progress = await LearningProgress.findOne({ userId: req.user.id, moduleId });

            if (!progress) {
                progress = new LearningProgress({ userId: req.user.id, moduleId, completed: true, completedAt: new Date() });
            } else {
                progress.completed = true;
                progress.completedAt = new Date();
            }

            await progress.save();
            res.json({ success: true, progress });
        } catch (error) {
            next(error);
        }
    },

    submitQuiz: async (req, res, next) => {
        try {
            const { moduleId, score } = req.body;
            const progress = await LearningProgress.findOneAndUpdate(
                { userId: req.user.id, moduleId },
                { quizScore: score, completed: true, completedAt: new Date() },
                { upsert: true, new: true }
            );

            // Simple IQ Score update logic: +2 for every quiz passed (score > 60)
            if (score >= 60) {
                await User.findByIdAndUpdate(req.user.id, { $inc: { iqScore: 2 } });
            }

            res.json({ success: true, progress });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = learnController;
