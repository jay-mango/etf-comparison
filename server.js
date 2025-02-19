const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<form method="POST" action="/compare"><input name="etf1" placeholder="Enter ETF 1"><input name="etf2" placeholder="Enter ETF 2"><button type="submit">Compare</button></form>');
});

app.post('/compare', async (req, res) => {
    const { etf1, etf2 } = req.body;

    try {
        const response1 = await axios.get(`https://api.tradefeeds.com/etf/holdings`, {
            params: { etf: etf1, apikey: 'your_api_key' }
        });

        const response2 = await axios.get(`https://api.tradefeeds.com/etf/holdings`, {
            params: { etf: etf2, apikey: 'your_api_key' }
        });

        res.json({
            etf1: response1.data,
            etf2: response2.data
        });
    } catch (error) {
        res.status(500).send('Error fetching ETF data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
