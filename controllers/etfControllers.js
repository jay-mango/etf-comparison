const axios = require('axios');

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

/**
 * Fetch ETF holdings from Finnhub
 */
async function getETFHoldings(symbol) {
    try {
        const url = `${FINNHUB_BASE_URL}/etf/holdings?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
        const response = await axios.get(url);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching ETF holdings:", error);
        throw new Error("Failed to retrieve ETF holdings.");
    }
}

module.exports = { getETFHoldings };

console.log("Using API Key:", FINNHUB_API_KEY);
