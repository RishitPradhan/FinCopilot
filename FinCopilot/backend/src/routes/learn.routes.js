const express = require('express');
const router = express.Router();
const learnController = require('../controllers/learn.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/modules', authMiddleware, learnController.getModules);
router.get('/progress', authMiddleware, learnController.getProgress);
router.post('/progress', authMiddleware, learnController.markComplete);
router.post('/quiz', authMiddleware, learnController.submitQuiz);

module.exports = router;
