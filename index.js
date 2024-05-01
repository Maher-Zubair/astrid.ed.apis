const express = require('express');
const ringtone = require('./function'); 
const youtube = require('youtube-sr');
const ChatWithGpt = require('./function');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/gpt-api', async (req, res) => {
  const textMessage = req.body.textMessage;
  try {
    const response = await ChatWithGpt(textMessage);
    res.json({
      status: 200,
      owner: "Diegoson",
      result: response,
      example: `Hello: ${response}`
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      owner: "Diegoson",
      error: error,
      example: `Hello: ${error}`
    });
  }
});
                            
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

app.get('/yt-search', async (req, res) => {
  const query = req.query.query;
  try {
    const videos = await youtube.search(query, { limit: 10 });
    res.json({
      status: 200,
      owner: "Diegoson",
      result: {
        videos
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      owner: "Diegoson",
      error: err.message
    });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
