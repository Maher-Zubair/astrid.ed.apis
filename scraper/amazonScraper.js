// amazonScraper.js
const { chromium } = require('playwright');
const cheerio = require('cheerio');

async function amazonScraper(productUrl) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    const page = await context.newPage();

    await page.goto(productUrl);
    const content = await page.content();
    const $ = cheerio.load(content);

    const title = $('#productTitle').text().trim();
    const price = $('#priceblock_ourprice, #priceblock_dealprice').text().trim();
    const rating = $('span.a-icon-alt').first().text().trim();
    const thumbnail = $('#landingImage').attr('src');

    await browser.close();

    return { title, price, rating, thumbnail };
}

module.exports = { amazonScraper };
