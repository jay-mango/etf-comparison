const express = require('express');
const router = express.Router();
const { getETFHoldings } = require('../controllers/etfControllers');

// ✅ Route for fetching ETF holdings
router.get('/holdings/:symbol', async (req, res) => {
    const { symbol } = req.params;

    try {
        const holdingsData = await getETFHoldings(symbol);
        res.json(holdingsData);
    } catch (error) {
        res.status(500).json({ error: "Error fetching ETF holdings." });
    }
});

module.exports = router;
