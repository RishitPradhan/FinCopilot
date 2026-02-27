const express = require('express');
const router = express.Router();
const predictController = require('../controllers/predict.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/submit', authMiddleware, predictController.submit);
router.get('/history', authMiddleware, predictController.getHistory);
router.post('/resolve/:id', authMiddleware, predictController.resolve);

module.exports = router;
