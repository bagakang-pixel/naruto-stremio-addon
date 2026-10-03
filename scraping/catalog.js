const cheerio = require('cheerio');
const { fetchPage } = require('./browser');

const BASE_URL = 'https://supjav.com';
const ITEMS_PER_PAGE = 20;

async function getCatalog({ search = '', skip = 0 }) {
  const page = Math.floor(skip / ITEMS_PER_PAGE) + 1;
  let url;

  if (search) {
    url = page === 1
      ? `${BASE_URL}/?s=${encodeURIComponent(search)}`
      : `${BASE_URL}/page/${page}/?s=${encodeURIComponent(search)}`;
  } else {
    url = page === 1 ? BASE_URL : `${BASE_URL}/page/${page}/`;
  }

  // ═══════════════════════════════════════════════════════════════
  // DEBUG START — Blok logging untuk diagnosis
  // ═══════════════════════════════════════════════════════════════
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`[Catalog] REQUEST RECEIVED`);
  console.log(`[Catalog]   search = "${search}"`);
  console.log(`[Catalog]   skip   = ${skip}`);
  console.log(`[Catalog]   page   = ${page}`);
  console.log(`[Catalog]   url    = ${url}`);
  console.log('───────────────────────────────────────────────────────────');
  // ═══════════════════════════════════════════════════════════════

  let html;
  try {
    const startTime = Date.now();
    html = await fetchPage(url);
    const duration = Date.now() - startTime;

    console.log(`[Catalog] FETCH SUCCESS`);
    console.log(`[Catalog]   duration     = ${duration}ms`);
    console.log(`[Catalog]   html length  = ${html.length} chars`);
  } catch (err) {
    console.error(`[Catalog] ✗ FETCH FAILED`);
    console.error(`[Catalog]   message = ${err.message}`);
    console.error(`[Catalog]   code    = ${err.code || 'N/A'}`);
    console.error(`[Catalog]   stack   = ${err.stack}`);
    console.log('═══════════════════════════════════════════════════════════');
    return { metas: [] };
  }

  // ═══════════════════════════════════════════════════════════════
  // Cek apakah halaman Cloudflare atau halaman asli SupJav
  // ═══════════════════════════════════════════════════════════════
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const pageTitle = titleMatch ? titleMatch[1].trim() : 'N/A';
  console.log(`[Catalog] PAGE TITLE = "${pageTitle}"`);

  if (/just a moment|checking your browser|attention required|cf-browser/i.test(html)) {
    console.error(`[Catalog] ⚠️  CLOUDFLARE CHALLENGE DETECTED!`);
    console.error(`[Catalog]    SupJav memblokir IP Render dengan Cloudflare.`);
    console.error(`[Catalog]    Solusi: pindah ke VPS pribadi (Oracle Cloud) atau gunakan proxy.`);
    console.log('═══════════════════════════════════════════════════════════');
    return { metas: [] };
  }

  if (/access denied|403 forbidden|blocked/i.test(pageTitle)) {
    console.error(`[Catalog] ⚠️  ACCESS DENIED — IP kemungkinan diblokir`);
    console.log('═══════════════════════════════════════════════════════════');
    return { metas: [] };
  }

  // Preview HTML untuk memverifikasi konten
  console.log(`[Catalog] HTML PREVIEW (first 800 chars):`);
  console.log('┌─────────────────────────────────────────────────────────');
  console.log(html.substring(0, 800).replace(/\s+/g, ' '));
  console.log('└─────────────────────────────────────────────────────────');

  const $ = cheerio.load(html);
  const metas = [];

  // ═══════════════════════════════════════════════════════════════
  // Cek jumlah elemen untuk berbagai selector
  // ═══════════════════════════════════════════════════════════════
  console.log(`[Catalog] SELECTOR COUNTS:`);
  console.log(`  .post              = ${$('.post').length}`);
  console.log(`  .post-item         = ${$('.post-item').length}`);
  console.log(`  .video-item        = ${$('.video-item').length}`);
  console.log(`  .thumb-block       = ${$('.thumb-block').length}`);
  console.log(`  article            = ${$('article').length}`);
  console.log(`  .entry-title       = ${$('.entry-title').length}`);
  console.log(`  .entry-title a     = ${$('.entry-title a').length}`);
  console.log(`  a[href*=".html"]   = ${$('a[href*=".html"]').length}`);
  console.log(`  a[href*="supjav"]  = ${$('a[href*="supjav"]').length}`);

  // ═══════════════════════════════════════════════════════════════
  // STRATEGI PARSING 1: Selector klasik (coba dulu)
  // ═══════════════════════════════════════════════════════════════
  const seenIds = new Set();

  $('.post, .post-item, .video-item, article').each((_, el) => {
    const $el = $(el);

    const $titleLink = $el.find('.entry-title a, h2 a, h3 a, .title a').first();
    const title = $titleLink.text().trim();
    const link = $titleLink.attr('href') || $el.find('a[href*=".html"]').first().attr('href');

    if (!title || !link) return;

    const idMatch = link.match(/\/(\d{4,})(?:\.html)?\/?$/);
    if (!idMatch) return;

    const numericId = idMatch[1];
    if (seenIds.has(numericId)) return;
    seenIds.add(numericId);

    let poster = $el.find('img').first().attr('src') ||
                 $el.find('img').first().attr('data-src') || '';
    if (poster.startsWith('//')) poster = 'https:' + poster;
    if (poster.startsWith('/')) poster = BASE_URL + poster;

    metas.push({
      id: `supjav:${numericId}`,
      type: 'movie',
      name: title,
      poster: poster || undefined,
      description: `SupJav Video #${numericId}`,
    });
  });

  console.log(`[Catalog] Strategy 1 (classic selectors): ${metas.length} items`);

  // ═══════════════════════════════════════════════════════════════
  // STRATEGI PARSING 2: Fallback berbasis link (jika strategi 1 kosong)
  // ═══════════════════════════════════════════════════════════════
  if (metas.length === 0) {
    console.log(`[Catalog] Strategy 1 yielded 0, trying Strategy 2 (link-based)...`);

    $('a[href]').each((_, el) => {
      const $el = $(el);
      const href = $el.attr('href') || '';

      const match = href.match(/\/(\d{4,})\.html/);
      if (!match) return;

      const numericId = match[1];
      if (seenIds.has(numericId)) return;
      seenIds.add(numericId);

      let title = $el.text().trim();
      if (!title || title.length < 3) {
        title = $el.find('img').first().attr('alt')?.trim() || '';
      }
      if (!title || title.length < 3) {
        title = $el.closest('.post, article, .item, li, div')
                  .find('h2, h3, .title, .entry-title')
                  .first().text().trim();
      }
      if (!title) title = `SupJav Video #${numericId}`;

      let poster =
        $el.find('img').first().attr('src') ||
        $el.find('img').first().attr('data-src') ||
        $el.closest('.post, article, .item, li, div')
            .find('img').first().attr('src') ||
        $el.closest('.post, article, .item, li, div')
            .find('img').first().attr('data-src') || '';

      if (poster.startsWith('//')) poster = 'https:' + poster;
      if (poster.startsWith('/')) poster = BASE_URL + poster;

      metas.push({
        id: `supjav:${numericId}`,
        type: 'movie',
        name: title,
        poster: poster || undefined,
        description: `SupJav Video #${numericId}`,
      });
    });

    console.log(`[Catalog] Strategy 2 (link-based): ${metas.length} items`);
  }

  // ═══════════════════════════════════════════════════════════════
  // Log sampel hasil
  // ═══════════════════════════════════════════════════════════════
  if (metas.length > 0) {
    console.log(`[Catalog] SAMPLE (first 3 items):`);
    metas.slice(0, 3).forEach((m, i) => {
      console.log(`  [${i + 1}] id=${m.id}`);
      console.log(`      name=${m.name.substring(0, 60)}`);
      console.log(`      poster=${(m.poster || '').substring(0, 80)}`);
    });
  } else {
    console.warn(`[Catalog] ⚠️  NO ITEMS PARSED`);
    console.warn(`[Catalog]    HTML mungkin tidak mengandung struktur yang dikenal.`);
    console.warn(`[Catalog]    Periksa HTML PREVIEW di atas.`);
  }

  console.log(`[Catalog] RETURNING ${metas.length} metas`);
  console.log('═══════════════════════════════════════════════════════════');

  return { metas };
}

module.exports = { getCatalog };
