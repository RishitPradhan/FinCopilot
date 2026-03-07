const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/iq-score', authMiddleware, userController.getIqScore);
router.get('/summary', authMiddleware, userController.getSummary);
router.get('/profile/:id', authMiddleware, userController.getPublicProfile);
router.post('/update-public-key', authMiddleware, userController.updatePublicKey);
router.get('/public-key', authMiddleware, userController.getPublicKey);

module.exports = router;
