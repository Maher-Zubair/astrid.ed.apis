const express = require('express');
const { scrapeTikTok } = require('../scraper/scrapper');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/tiktok', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({
            status: false,
            isDev: "Diegonson",
            error: 'url is required'
        });
    }

    try {
        const result = await scrapeTikTok(url);
        res.json({
            status: true,
            isDev: "Diegonson",
            result: result
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            isDev: "Diegonson",
            error: 'error'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
