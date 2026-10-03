// =============================================================
//  index.js — Entry point Stremio Addon
// =============================================================
require('dotenv').config();
const express = require('express');
const path = require('path');

const manifest = require('./manifest');
const { getCatalogItems, getMeta } = require('./data');
const { getStreams } = require('./streams');

const app = express();
const PORT = process.env.PORT || 7000;

// ---- CORS & logging ----
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ---- Helper: ambil TorBox key dari query / env ----
function getTorboxKey(req) {
  return (
    (req.query && req.query.torbox) ||
    process.env.TORBOX_API_KEY ||
    ''
  );
}

// ---- Helper: parse extra segment Stremio (e.g. "search=abc&skip=100") ----
function parseExtra(extraStr = '') {
  const out = {};
  if (!extraStr) return out;
  extraStr.split('&').forEach(pair => {
    const [k, v = ''] = pair.split('=');
    if (k) out[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, ' '));
  });
  return out;
}

// =====================================================
//  1) MANIFEST
// =====================================================
app.get('/manifest.json', (req, res) => {
  res.json(manifest);
});

// =====================================================
//  2) CATALOG
//     /catalog/:type/:id.json
//     /catalog/:type/:id/:extra.json
// =====================================================
function handleCatalog(req, res) {
  const { type, id } = req.params;
  const extra = parseExtra(req.params.extra || '');
  const search = extra.search || req.query.search || '';
  const skip = parseInt(extra.skip || req.query.skip || '0', 10) || 0;

  if (type !== 'series' || id !== 'naruto-ocean-cut') {
    return res.json({ metas: [] });
  }

  const metas = getCatalogItems();
  res.json({ metas });
}

app.get('/catalog/:type/:id.json', handleCatalog);
app.get('/catalog/:type/:id/:extra.json', handleCatalog);

// =====================================================
//  3) META
// =====================================================
app.get('/meta/:type/:id.json', (req, res) => {
  const { id } = req.params;
  const meta = getMeta(id);
  if (!meta) return res.status(404).json({ err: 'not found' });
  res.json({ meta });
});

// =====================================================
//  4) STREAM
// =====================================================
app.get('/stream/:type/:id.json', async (req, res) => {
  const { id } = req.params;
  const torboxKey = getTorboxKey(req);

  try {
    const streams = await getStreams(id, torboxKey);
    res.json({ streams });
  } catch (err) {
    console.error('Stream error:', err);
    res.json({ streams: [] });
  }
});

// =====================================================
//  5) CONFIGURE PAGE
// =====================================================
app.use('/configure', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/configure/');
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ err: 'not found' });
});

// =====================================================
//  START
// =====================================================
app.listen(PORT, () => {
  console.log(`\n🍥 Naruto Ocean Cut addon running!`);
  console.log(`   Manifest : http://127.0.0.1:${PORT}/manifest.json`);
  console.log(`   Configure: http://127.0.0.1:${PORT}/configure/`);
  console.log(`   TorBox   : ${process.env.TORBOX_API_KEY ? 'API key loaded from env ✓' : 'no default key (isi via /configure)'}\n`);
});
