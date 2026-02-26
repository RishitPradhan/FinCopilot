const express = require('express');
const router = express.Router();

router.get('/holdings', (req, res) => {
    res.json([]);
});

router.post('/holdings', (req, res) => {
    res.json({ message: 'Holding added' });
});

router.get('/analysis', (req, res) => {
    res.json({ riskScore: 68 });
});

module.exports = router;
