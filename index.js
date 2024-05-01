const express = require('express');
const ringtone = require('./function'); 
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    try {
        const ringtones = await ringtone(query);
        res.json(ringtones);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
