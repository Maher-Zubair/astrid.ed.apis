const express = require('express');
const { amazonScraper } = require('../scraper/amazonScraper');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/amazone', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({
            status: false,
            isDev: "Diegonson",
            error: 'URL is required'
        });
    }

    try {
        const productDetails = await amazonScraper(url);
        res.json({
            status: true,
            isDev: "Diegonson",
            result: productDetails
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            isDev: "Diegonson",
            error: 'Failed to scrape product details'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
          
