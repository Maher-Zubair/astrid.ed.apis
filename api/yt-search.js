const express = require('express');
const { searchYouTube } = require('../scraper/ytSearch');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/yt-search', async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({
            status: false,
            isDev: "Diegonson",
            error: 'Query is required'
        });
    }

    try {
        const results = await searchYouTube(query);
        res.json({
            status: true,
            isDev: "Diegonson",
            results: results
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
