const cheerio = require('cheerio');
const axios = require('axios');
const { fetchPage } = require('./browser');
const { decodeLinkRobust } = require('../utils/decode');

const BASE_URL = 'https://supjav.com';
const SUPJAVD_PROXY = 'https://supjavd.orzv.workers.dev';

/**
 * Server name mapping for nicer display.
 * SupJav uses abbreviations: TV, FST, ST, VOE, etc.
 */
const SERVER_LABELS = {
  'TV': 'TurboVidPlay',
  'FST': 'FastStream',
  'ST': 'Streamtape',
  'VOE': 'VOE',
  'DOOD': 'DoodStream',
  'MIX': 'MixDrop',
  'SB': 'StreamSB',
  'UP': 'UptoStream',
  'LP': 'LuluStream',
};

async function getStreams(numericId) {
  const streams = [];
  const detailUrl = `${BASE_URL}/${numericId}.html`;

  // ── Step 1: Fetch detail page ────────────────────────────────
  let html;
  try {
    html = await fetchPage(detailUrl);
  } catch (err) {
    console.error(`[Streams] Detail fetch failed: ${err.message}`);
    return fallbackStreams(numericId);
  }

  const $ = cheerio.load(html);

  // ── Step 2: Extract server buttons ───────────────────────────
  // SupJav places server options under a section containing "Server"
  // Each button has data-link (reversed) or href
  const serverEntries = [];

  // Pattern A: <a class="... " data-link="...">TV</a>
  // Pattern B: <a class="... " href="...">TV</a>
  // Pattern C: <div class="server"><a ...>TV</a></div>
  $('a[data-link], a[href*="supjav.php"], .server a, .server-list a, .btn-server, button[data-link]').each(
    (_, el) => {
      const $el = $(el);
      const text = $el.text().trim();
      const dataLink = $el.attr('data-link');
      const href = $el.attr('href');

      // Skip non-server links
      if (!dataLink && !href) return;
      if (href && !href.includes('supjav.php') && !href.includes('http')) return;
      if (text.length > 30) return; // server names are short

      serverEntries.push({
        name: text || 'Unknown',
        dataLink,
        href,
      });
    }
  );

  // Also try to extract from inline scripts (SupJav sometimes stores server data in JS)
  if (serverEntries.length === 0) {
    $('script').each((_, el) => {
      const script = $(el).html() || '';
      const matches = script.matchAll(/data-link\s*=\s*["']([^"']+)["']/g);
      for (const m of matches) {
        serverEntries.push({ name: 'Server', dataLink: m[1] });
      }
    });
  }

  // ── Step 3: Process each server ───────────────────────────────
  const extractPromises = serverEntries.map(async (entry) => {
    try {
      let embedUrl = null;

      // Strategy 1: data-link reversal
      if (entry.dataLink) {
        embedUrl = decodeLinkRobust(entry.dataLink);
      }

      // Strategy 2: direct href
      if (!embedUrl && entry.href && entry.href.includes('supjav.php')) {
        embedUrl = entry.href.startsWith('http')
          ? entry.href
          : `https://lk1.supremejav.com${entry.href}`;
      }

      if (!embedUrl) return null;

      // Try to extract direct stream URL from the embed page
      const streamUrl = await resolveEmbedToStream(embedUrl, entry.name);
      if (!streamUrl) return null;

      const label = SERVER_LABELS[entry.name.toUpperCase()] || entry.name;
      const quality = streamUrl.quality || 'unknown';

      return {
        url: streamUrl.url,
        name: `${label}${quality !== 'unknown' ? ' ' + quality : ''}`,
        title: `Server ${label} — ${quality !== 'unknown' ? quality : 'Auto'}`,
        quality: quality,
        isFree: true,
      };
    } catch (err) {
      console.error(`[Streams] Server "${entry.name}" failed: ${err.message}`);
      return null;
    }
  });

  const results = (await Promise.all(extractPromises)).filter(Boolean);

  // ── Step 4: Sort by quality (highest first) ──────────────────
  const qualityOrder = { '1080p': 0, '720p': 1, '480p': 2, '360p': 3 };
  results.sort((a, b) => {
    const qa = qualityOrder[a.quality] ?? 99;
    const qb = qualityOrder[b.quality] ?? 99;
    return qa - qb;
  });

  // Prefer direct MP4 over HLS if quality is equal
  results.sort((a, b) => {
    if (a.quality === b.quality) {
      const aMp4 = a.url.includes('.mp4');
      const bMp4 = b.url.includes('.mp4');
      if (aMp4 && !bMp4) return -1;
      if (!aMp4 && bMp4) return 1;
    }
    return 0;
  });

  if (results.length > 0) return results;

  // ── Step 5: Fallback to supjavd proxy ────────────────────────
  return fallbackStreams(numericId);
}

/**
 * Resolve an embed URL to a direct stream URL.
 * Handles common video host patterns (Streamtape, VOE, DoodStream, etc.)
 */
async function resolveEmbedToStream(embedUrl, serverName) {
  try {
    const { data: html } = await axios.get(embedUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: 'https://supjav.com/',
      },
      timeout: 15000,
      maxRedirects: 5,
    });

    // ── Generic m3u8 / mp4 pattern ─────────────────────────────
    const m3u8Match = html.match(/(https?:\/\/[^"'\s]+\.m3u8[^"'\s]*)/);
    if (m3u8Match) {
      return { url: m3u8Match[1], quality: extractQuality(html) };
    }

    const mp4Match = html.match(/(https?:\/\/[^"'\s]+\.mp4[^"'\s]*)/);
    if (mp4Match) {
      return { url: mp4Match[1], quality: extractQuality(html) };
    }

    // ── Streamtape-specific ────────────────────────────────────
    if (embedUrl.includes('streamtape') || serverName.toUpperCase() === 'ST') {
      const stMatch = html.match(/robotlink['"]\s*\)\.innerHTML\s*=\s*['"]([^'"]+)/);
      if (stMatch) {
        let url = stMatch[1];
        if (url.startsWith('//')) url = 'https:' + url;
        return { url, quality: '1080p' };
      }
    }

    // ── VOE-specific ───────────────────────────────────────────
    if (embedUrl.includes('voe') || serverName.toUpperCase() === 'VOE') {
      // VOE uses a JSON blob in a script tag
      const voeMatch = html.match(/"hls"\s*:\s*"([^"]+)"/);
      if (voeMatch) {
        return { url: voeMatch[1].replace(/\\/g, ''), quality: extractQuality(html) };
      }
    }

    // ── DoodStream-specific ────────────────────────────────────
    if (embedUrl.includes('dood') || serverName.toUpperCase() === 'DOOD') {
      const doodMatch = html.match(/\/pass_md5\/([^'"]+)/);
      if (doodMatch) {
        // DoodStream requires a token follow-up — try direct
        const tokenUrl = `https://dood.to/pass_md5/${doodMatch[1]}`;
        // This often needs a second request; return the token URL as fallback
        return { url: tokenUrl, quality: '720p' };
      }
    }

    return null;
  } catch (err) {
    console.error(`[resolveEmbed] ${err.message}`);
    return null;
  }
}

function extractQuality(html) {
  if (/1080p|fullhd|fhd/i.test(html)) return '1080p';
  if (/720p|hd/i.test(html)) return '720p';
  if (/480p|sd/i.test(html)) return '480p';
  if (/360p/i.test(html)) return '360p';
  return 'unknown';
}

/**
 * Fallback: use the supjavd Cloudflare Workers proxy.
 * This is a community-maintained service that extracts m3u8 from SupJav.
 * https://github.com/xbol0/supjavd
 */
function fallbackStreams(numericId) {
  return [
    {
      url: `${SUPJAVD_PROXY}/${numericId}.m3u8`,
      name: 'SupJavd Proxy',
      title: 'Kualitas Tertinggi (via proxy)',
      quality: '1080p',
      isFree: true,
    },
  ];
}

module.exports = { getStreams };
