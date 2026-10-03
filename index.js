const { addonBuilder, serveHTTP, publishToCentral } = require('stremio-addon-sdk');
const { getCatalog } = require('./scraping/catalog');
const { getMeta } = require('./scraping/meta');
const { getStreams } = require('./scraping/streams');
const { closeBrowser } = require('./scraping/browser');

const manifest = {
  id: 'community.supjav',
  version: '1.0.0',
  name: 'SupJav',
  description: 'Streaming video dari SupJav.com — kualitas tertinggi tersedia',
  logo: 'https://supjav.com/favicon.ico',
  resources: ['catalog', 'meta', 'stream'],
  types: ['movie'],
  idPrefixes: ['supjav:'],
  catalogs: [
    {
      type: 'movie',
      id: 'supjav_catalog',
      name: 'SupJav',
      extra: [
        { name: 'search', isRequired: false },
        { name: 'skip', isRequired: false },
      ],
    },
  ],
  behaviorHints: {
    adult: true,
  },
};

const builder = new addonBuilder(manifest);

// ── Catalog ────────────────────────────────────────────────────
builder.defineCatalogHandler(async ({ type, id, extra }) => {
  if (type !== 'movie' || id !== 'supjav_catalog') {
    return { metas: [] };
  }
  try {
    const metas = await getCatalog({
      search: extra?.search || '',
      skip: extra?.skip || 0,
    });
    return { metas };
  } catch (err) {
    console.error('[Catalog]', err.message);
    return { metas: [] };
  }
});

// ── Meta ───────────────────────────────────────────────────────
builder.defineMetaHandler(async ({ type, id }) => {
  if (type !== 'movie' || !id.startsWith('supjav:')) {
    return { meta: null };
  }
  const numericId = id.replace('supjav:', '');
  try {
    const meta = await getMeta(numericId);
    return { meta };
  } catch (err) {
    console.error('[Meta]', err.message);
    return { meta: null };
  }
});

// ── Stream ─────────────────────────────────────────────────────
builder.defineStreamHandler(async ({ type, id }) => {
  if (type !== 'movie' || !id.startsWith('supjav:')) {
    return { streams: [] };
  }
  const numericId = id.replace('supjav:', '');
  try {
    const streams = await getStreams(numericId);
    return { streams };
  } catch (err) {
    console.error('[Stream]', err.message);
    return { streams: [] };
  }
});

// ── Serve ──────────────────────────────────────────────────────
const interface = builder.getInterface();
const port = process.env.PORT || 7000;

serveHTTP(interface, { port }, () => {
  console.log(`✅ SupJav addon running on http://127.0.0.1:${port}/manifest.json`);
  console.log(`   Install URL: stremio://127.0.0.1:${port}/manifest.json`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down...');
  await closeBrowser();
  process.exit(0);
});
