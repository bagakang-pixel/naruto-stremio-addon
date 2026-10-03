const cheerio = require('cheerio');
const { fetchPage } = require('./browser');

const BASE_URL = 'https://supjav.com';

async function getMeta(numericId) {
  const url = `${BASE_URL}/${numericId}.html`;
  const html = await fetchPage(url);
  const $ = cheerio.load(html);

  // --- Title ---
  const title =
    $('h1').first().text().trim() ||
    $('meta[property="og:title"]').attr('content') ||
    $('title').text().trim();

  // --- Poster ---
  let poster = $('meta[property="og:image"]').attr('content') || '';
  if (poster.startsWith('//')) poster = 'https:' + poster;

  // --- Description ---
  const description =
    $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    '';

  // --- Cast (actress / actor links) ---
  const cast = [];
  // SupJav typically links cast members under "Actress" or "Cast" headings
  $('a[href*="/cast/"], a[href*="/actress/"], a[href*="/star/"]').each(
    (_, el) => {
      const name = $(el).text().trim();
      if (name && !cast.includes(name)) cast.push(name);
    }
  );

  // --- Genres / Tags ---
  const genres = [];
  $('a[href*="/tag/"], a[href*="/category/"], a[href*="/genre/"]').each(
    (_, el) => {
      const tag = $(el).text().trim();
      if (tag && !genres.includes(tag)) genres.push(tag);
    }
  );

  // --- Maker (studio) ---
  const makers = [];
  $('a[href*="/maker/"], a[href*="/studio/"]').each((_, el) => {
    const maker = $(el).text().trim();
    if (maker && !makers.includes(maker)) makers.push(maker);
  });

  // --- Runtime (if available) ---
  let runtime = '';
  $('span, div, li').each((_, el) => {
    const text = $(el).text().trim();
    const match = text.match(/(\d+)\s*(min|minutes?)/i);
    if (match) runtime = `${match[1]} min`;
  });

  const meta = {
    id: `supjav:${numericId}`,
    type: 'movie',
    name: title,
    poster: poster || undefined,
    background: poster || undefined,
    description: description || undefined,
    cast: cast.length ? cast : undefined,
    genres: genres.length ? genres : undefined,
    runtime: runtime || undefined,
    // Extra info visible in Stremio
    website: `${BASE_URL}/${numericId}.html`,
  };

  return { meta };
}

module.exports = { getMeta };
