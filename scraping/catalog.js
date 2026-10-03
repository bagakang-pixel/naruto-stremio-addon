const cheerio = require('cheerio');
const { fetchPage } = require('./browser');

const BASE_URL = 'https://supjav.com';

/**
 * SupJav pagination: /page/N/  or /page/N/?s=query
 * Search:  /?s=query  (page 1)  →  /page/N/?s=query (page N)
 *
 * SupJav typically shows ~20 posts per page.
 */
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

  const html = await fetchPage(url);
  const $ = cheerio.load(html);
  const metas = [];

  // SupJav post structure (verified pattern):
  // <div class="post">
  //   <a href="https://supjav.com/428838.html">
  //     <img src="https://img.supjav.com/..." />
  //   </a>
  //   <div class="entry-title">
  //     <a href="https://supjav.com/428838.html">Title Here</a>
  //   </div>
  // </div>
  $('.post, .post-item, article').each((_, el) => {
    const $el = $(el);

    // Find the title link
    const $titleLink = $el.find('.entry-title a, h2 a, .title a').first();
    const title = $titleLink.text().trim();
    const link = $titleLink.attr('href') || $el.find('a').first().attr('href');

    if (!title || !link) return;

    // Extract numeric ID from URL: /428838.html  or  /428838/
    const idMatch = link.match(/\/(\d+)(?:\.html)?\/?$/);
    if (!idMatch) return;

    const numericId = idMatch[1];

    // Poster image
    let poster = $el.find('img').first().attr('src') ||
                 $el.find('img').first().attr('data-src') || '';
    if (poster.startsWith('//')) poster = 'https:' + poster;

    metas.push({
      id: `supjav:${numericId}`,
      type: 'movie',
      name: title,
      poster: poster || undefined,
      description: `SupJav Video #${numericId}`,
    });
  });

  return { metas };
}

module.exports = { getCatalog };
