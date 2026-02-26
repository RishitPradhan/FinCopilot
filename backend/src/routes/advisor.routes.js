const express = require('express');
const router = express.Router();

router.post('/chat', (req, res) => {
    res.json({ content: 'I am your FinCopilot AI. How can I help you today?' });
});

module.exports = router;
