const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stock: { type: String, required: true },
    quantity: { type: Number, required: true },
    buyPrice: { type: Number, required: true },
    buyDate: { type: Date, default: Date.now },
    sector: { type: String }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
