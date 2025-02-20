require('dotenv').config();
const express = require('express');
const cors = require('cors');

const etfRoutes = require('./routes/etfRoutes'); // Import the ETF routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Register ETF routes under `/api/etfs`
app.use('/api/etfs', etfRoutes);

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send("ETF Comparison API is running!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
