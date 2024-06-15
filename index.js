const express = require('express');
const ringtone = require('./scraper/function'); 
const app = express();
const gay = console.log
const {searchYouTube} = require('./scraper/ytSearch')

                            
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

app.get('/search/yt', async(req, res) =>{
    const q = req.query.q
    if (!q) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    await searchYouTube(q)
    .then(data =>{
        return res.json({result:data})
    })
    .catch(e =>{
        return res.json({gay_error:e})
        gay(e)
    })
})

app.listen(8000, () => {
   console.log('Server listening on port 3000');
 });
