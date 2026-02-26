const express = require('express');
const router = express.Router();

// Mock data
const modules = [
    { id: '1', title: 'Basics of Stocks', progress: 0, status: 'unlocked' },
    { id: '2', title: 'Risk vs Return', progress: 0, status: 'locked' },
];

router.get('/modules', (req, res) => {
    res.json(modules);
});

router.post('/progress', (req, res) => {
    res.json({ message: 'Progress updated' });
});

router.post('/quiz', (req, res) => {
    res.json({ message: 'Quiz submitted', score: 100 });
});

module.exports = router;
