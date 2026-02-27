const mongoose = require('mongoose');

const watchlistItemSchema = new mongoose.Schema({
    ticker: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    change: { type: Number, default: 0 },
    changePercent: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 }, // Number of shares user wants to track
    addedAt: { type: Date, default: Date.now }
});

const watchlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [watchlistItemSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt timestamp on save
watchlistSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Watchlist', watchlistSchema);
