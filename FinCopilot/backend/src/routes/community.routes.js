const express = require('express');
const router = express.Router();
const communityController = require('../controllers/community.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All community routes are protected
router.use(authMiddleware);

// Posts routes
router.post('/posts', communityController.createPost);
router.get('/posts', communityController.getPosts);
router.post('/posts/:id/like', communityController.likePost);
router.post('/posts/:id/comment', communityController.addComment);

// Messages routes
router.post('/messages', communityController.sendMessage);
router.get('/messages', communityController.getMessages);

// Trending routes
router.get('/trending', communityController.getTrending);

module.exports = router;
