const mongoose = require('mongoose');

const newsCacheSchema = new mongoose.Schema({
    stock: { type: String, required: true, unique: true },
    articles: [mongoose.Schema.Types.Mixed],
    sentiment: { type: String },
    cachedAt: { type: Date, default: Date.now, expires: 1800 } // 30 mins TTL
});

module.exports = mongoose.model('NewsCache', newsCacheSchema);
