const express = require('express');
const router = express.Router();

router.get('/history', (req, res) => {
    res.json([]);
});

router.post('/submit', (req, res) => {
    res.json({ id: 'res-1', status: 'pending' });
});

router.get('/result/:id', (req, res) => {
    res.json({ id: req.params.id, result: 'UP', accuracy: 85 });
});

module.exports = router;
