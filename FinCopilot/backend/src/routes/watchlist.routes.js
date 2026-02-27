const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlist.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authMiddleware);

// Get user's watchlist
router.get('/', watchlistController.getWatchlist);

// Add item to watchlist
router.post('/add', watchlistController.addItem);

// Remove item from watchlist
router.delete('/remove/:ticker', watchlistController.removeItem);

// Update item quantity
router.put('/update/:ticker', watchlistController.updateQuantity);

// Clear all items
router.delete('/clear', watchlistController.clearWatchlist);

module.exports = router;
