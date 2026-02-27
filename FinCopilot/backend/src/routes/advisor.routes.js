const express = require('express');
const router = express.Router();
const advisorController = require('../controllers/advisor.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/chat', authMiddleware, advisorController.chat);
router.get('/history', authMiddleware, advisorController.getHistory);

module.exports = router;
