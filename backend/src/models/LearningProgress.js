const mongoose = require('mongoose');

const learningProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moduleId: { type: String, required: true },
    completed: { type: Boolean, default: false },
    quizScore: { type: Number, default: 0 },
    completedAt: { type: Date }
});

module.exports = mongoose.model('LearningProgress', learningProgressSchema);
