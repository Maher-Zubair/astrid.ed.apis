const express = require('express');
const ringtone = require('./scraper/function'); 
const app = express();

                            
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

app.listen(300, () => {
   console.log('Server listening on port 3000');
 });
