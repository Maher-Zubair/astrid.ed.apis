const ytSearch = require('yt-search');

async function searchYouTube(query) {
    const { videos } = await ytSearch(query);
    return videos.slice(0, 15).map(video => ({
        title: video.title,
        url: video.url,
        timestamp: video.timestamp,
        views: video.views,
        thumbnail: video.thumbnail,
        author: video.author.name,
    }));
}

module.exports = { searchYouTube };
