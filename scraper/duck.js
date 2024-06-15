const { chromium } = require('playwright');
const cheerio = require('cheerio');

async function duckDuckGoSearch(query) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    const page = await context.newPage();

    const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    await page.goto(url);

    const content = await page.content();
    const $ = cheerio.load(content);
    let results = [];

    $('.result__body').each((index, element) => {
        const title = $(element).find('.result__title a').text();
        const link = $(element).find('.result__title a').attr('href');
        const snippet = $(element).find('.result__snippet').text();
        const thumbnail = $(element).find('.result__extras__thumb img').attr('src') || null;

        results.push({ title, link, snippet, thumbnail });
    });

    await browser.close();
    return results;
}

module.exports = { duckDuckGoSearch };
      
