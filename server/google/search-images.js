const puppeteer = require('puppeteer');
const URL = 'https://www.google.com/search?tbm=isch&hl=en-NL&source=hp&biw=&bih&btnG=Search+Images&gbv=2=&q=';

module.exports.searchImages = async function (query) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto(`${URL}${query}`, {
        waitUntil: 'networkidle2'
    });

    const images = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map((img) => {
            /**
             * @type {HTMLImageElement} img
             */
            return img.getAttribute('src');
        }).filter((src) => {
            return src !== null && src.indexOf('data:image') === 0;
        });
    });

    await browser.close();

    return images;
};
