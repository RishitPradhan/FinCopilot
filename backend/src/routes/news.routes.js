const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const stock = req.query.stock || 'General';
    res.json([
        { id: 1, headline: `Breaking News for ${stock}`, sentiment: 'Positive' }
    ]);
});

module.exports = router;
