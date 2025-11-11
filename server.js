// server.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Sentiment = require('sentiment');
const cors = require('cors');
const urlLib = require('url');

const app = express();
const sentiment = new Sentiment();

app.use(express.json({ limit: '5mb' }));
app.use(cors()); // Geliştirme için açık bırakıldı. Prod'da kısıtla.

// Statik dosyaları (index.html, main.js, vs) sunmak istersen:
app.use(express.static('.'));

function safeAbsoluteUrl(input) {
  try {
    const u = new urlLib.URL(input);
    return u.href;
  } catch (e) {
    return null;
  }
}

async function fetchHtml(targetUrl) {
  // Basit istek; bazı siteler bloklayabilir.
  const res = await axios.get(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (ReviewAnalyzerBot/1.0)',
      Accept: 'text/html,application/xhtml+xml',
    },
    timeout: 15000,
  });
  return res.data;
}

function extractComments(html) {
  const $ = cheerio.load(html);

  const selectors = [
    '.comment', '.comment-text', '.review', '.review-text',
    '.yorum', '[data-review]', '.customer-review', '.product-review',
    '.review-item', '.review-body', '.comment-body', '.reviewContent'
  ];

  const found = new Set();
  const comments = [];

  // try common selectors first
  for (const sel of selectors) {
    $(sel).each((i, el) => {
      const text = $(el).text().trim().replace(/\s+/g, ' ');
      if (text && text.length > 10) {
        if (!found.has(text)) {
          found.add(text);
          comments.push(text);
        }
      }
    });
    // stop if we already have enough comments
    if (comments.length >= 200) break;
  }

  // Fallback: meta description / paragraphs (limited)
  if (comments.length === 0) {
    $('p').each((i, el) => {
      const text = $(el).text().trim().replace(/\s+/g, ' ');
      if (text && text.length > 30 && !found.has(text)) {
        found.add(text);
        comments.push(text);
      }
      if (comments.length >= 50) return false;
    });
  }

  return comments;
}

function analyzeComments(comments) {
  const results = [];
  let pos = 0, neg = 0, neu = 0;
  const scores = [];

  for (const c of comments) {
    const r = sentiment.analyze(c);
    scores.push(r.score);
    results.push({ text: c, score: r.score, comparative: r.comparative });
    if (r.score > 0) pos++;
    else if (r.score < 0) neg++;
    else neu++;
  }

  // basit şüpheli tespiti: çok benzer (aynı) yorumların sayısı
  const duplicates = comments.length - new Set(comments.map(s => s.trim().toLowerCase())).size;

  return {
    total: comments.length,
    positive: pos,
    negative: neg,
    neutral: neu,
    positivePercentage: comments.length ? Math.round((pos / comments.length) * 100) : 0,
    negativePercentage: comments.length ? Math.round((neg / comments.length) * 100) : 0,
    neutralPercentage: comments.length ? Math.round((neu / comments.length) * 100) : 0,
    suspiciousCount: duplicates,
    sample: results.slice(0, 20),
    scores,
  };
}

app.post('/api/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'url is required' });

    const safe = safeAbsoluteUrl(url);
    if (!safe) return res.status(400).json({ error: 'invalid url' });

    // Fetch
    const html = await fetchHtml(safe);
    // Extract
    const comments = extractComments(html);
    // Analyze
    const analysis = analyzeComments(comments);

    // Response
    return res.json({
      url: safe,
      fetchedAt: new Date().toISOString(),
      ...analysis,
    });
  } catch (err) {
    console.error('Analyze error:', err.message || err);
    return res.status(500).json({ error: 'Failed to analyze target site', detail: String(err.message) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ReviewAnalyzer backend running on http://localhost:${PORT}`);
});
