const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/search', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const query = `site:${url} reviews OR testimonials`;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    let browser = null;
    try {
        browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        await page.goto(searchUrl, { waitUntil: 'networkidle2' });

        const results = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('div.g'));
            return items.map(item => {
                const title = item.querySelector('h3')?.innerText;
                const link = item.querySelector('a')?.href;
                const snippet = item.querySelector('div[data-sncf="1"]')?.innerText;
                return { title, link, snippet };
            }).filter(item => item.title && item.link);
        });

        res.json(results);
    } catch (error) {
        console.error('Google search error:', error);
        res.status(500).json({ error: 'Failed to fetch search results' });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
