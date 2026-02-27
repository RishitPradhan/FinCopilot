const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stock: { type: String, required: true },
    userPrediction: { type: String, enum: ['UP', 'DOWN'], required: true },
    aiPrediction: { type: String, enum: ['UP', 'DOWN'] },
    confidence: { type: Number },
    actualResult: { type: String, enum: ['UP', 'DOWN'] },
    explanation: { type: String },
    isResolved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', predictionSchema);
