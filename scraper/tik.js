const { chromium } = require('playwright');
const cheerio = require('cheerio');

/*
ANGGAP AJA INI WM :V
SCRAPER INI PUNYA YANZBOTZ
OWNER: Diegonson
DON'T CLAIM OKEY
*/

async function scrapeTikTok(url) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 375, height: 812 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    });
    const page = await context.newPage();

    await page.goto('https://musicaldown.com/id');
    await page.fill('#link_url', url);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(5000);

    const html = await page.content();
    const $ = cheerio.load(html);
    let result = {
        type: "video",
        url: null,
    };

    $('.col.s12.l8 a.btn').each((index, element) => {
        if ($(element).text().trim() === 'Unduh MP4 Sekarang') {
            result.url = $(element).attr('href');
        }
    });

    await browser.close();
    return result;
}

module.exports = { scrapeTikTok };
      
