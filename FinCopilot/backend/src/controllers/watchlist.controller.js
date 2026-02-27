const Watchlist = require('../models/Watchlist');

const watchlistController = {
    // Get user's watchlist
    getWatchlist: async (req, res, next) => {
        try {
            let watchlist = await Watchlist.findOne({ userId: req.user.id });
            
            if (!watchlist) {
                // Create empty watchlist for new users
                watchlist = new Watchlist({
                    userId: req.user.id,
                    items: []
                });
                await watchlist.save();
            }
            
            res.json({ success: true, watchlist });
        } catch (error) {
            next(error);
        }
    },

    // Add item to watchlist
    addItem: async (req, res, next) => {
        try {
            const { ticker, name, price, change, changePercent, quantity } = req.body;
            
            let watchlist = await Watchlist.findOne({ userId: req.user.id });
            
            if (!watchlist) {
                watchlist = new Watchlist({
                    userId: req.user.id,
                    items: []
                });
            }
            
            // Check if item already exists
            const existingItem = watchlist.items.find(item => item.ticker === ticker);
            if (existingItem) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Item already in watchlist' 
                });
            }
            
            watchlist.items.push({
                ticker,
                name,
                price: price || 0,
                change: change || 0,
                changePercent: changePercent || 0,
                quantity: quantity || 1
            });
            
            await watchlist.save();
            
            res.status(201).json({ 
                success: true, 
                watchlist,
                message: `${ticker} added to watchlist` 
            });
        } catch (error) {
            next(error);
        }
    },

    // Remove item from watchlist
    removeItem: async (req, res, next) => {
        try {
            const { ticker } = req.params;
            
            const watchlist = await Watchlist.findOne({ userId: req.user.id });
            
            if (!watchlist) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Watchlist not found' 
                });
            }
            
            watchlist.items = watchlist.items.filter(item => item.ticker !== ticker);
            await watchlist.save();
            
            res.json({ 
                success: true, 
                watchlist,
                message: `${ticker} removed from watchlist` 
            });
        } catch (error) {
            next(error);
        }
    },

    // Update item quantity
    updateQuantity: async (req, res, next) => {
        try {
            const { ticker } = req.params;
            const { quantity } = req.body;
            
            const watchlist = await Watchlist.findOne({ userId: req.user.id });
            
            if (!watchlist) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Watchlist not found' 
                });
            }
            
            const item = watchlist.items.find(item => item.ticker === ticker);
            if (!item) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Item not found in watchlist' 
                });
            }
            
            item.quantity = quantity;
            await watchlist.save();
            
            res.json({ 
                success: true, 
                watchlist,
                message: `${ticker} quantity updated` 
            });
        } catch (error) {
            next(error);
        }
    },

    // Clear all items from watchlist
    clearWatchlist: async (req, res, next) => {
        try {
            const watchlist = await Watchlist.findOne({ userId: req.user.id });
            
            if (!watchlist) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Watchlist not found' 
                });
            }
            
            watchlist.items = [];
            await watchlist.save();
            
            res.json({ 
                success: true, 
                watchlist,
                message: 'Watchlist cleared' 
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = watchlistController;
