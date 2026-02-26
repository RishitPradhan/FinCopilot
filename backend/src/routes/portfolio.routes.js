const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/holdings', authMiddleware, portfolioController.getHoldings);
router.post('/holdings', authMiddleware, portfolioController.addHolding);
router.delete('/holdings/:id', authMiddleware, portfolioController.removeHolding);
router.get('/analysis', authMiddleware, portfolioController.getAnalysis);
router.get('/risk', authMiddleware, portfolioController.getRisk);

module.exports = router;
