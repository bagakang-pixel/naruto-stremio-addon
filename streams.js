// =============================================================
//  streams.js — Handler untuk endpoint /stream/movie/:id.json
// =============================================================
const { findEpisode } = require('./data');
const torbox = require('./torbox');

// --- Magnet & tracker (dari sumber user) ---
const INFO_HASH = 'E0C38EDE05E555D337E7D534F4EAAEBC773BF913';
const MAGNET =
  'magnet:?xt=urn:btih:' + INFO_HASH +
  '&dn=Naruto%20(2002)%20the%20Ocean%20Cut%20Edition%20No%20filler' +
  '&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337' +
  '&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce' +
  '&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce' +
  '&tr=udp%3A%2F%2Ftracker.bittor.pw%3A1337%2Fannounce' +
  '&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969%2Fannounce' +
  '&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce' +
  '&tr=udp%3A%2F%2Fexodus.desync.com%3A6969' +
  '&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce' +
  '&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce' +
  '&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969' +
  '&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce' +
  '&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337' +
  '&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337';

const TRACKERS = [
  'udp://tracker.opentrackr.org:1337',
  'udp://open.stealth.si:80/announce',
  'udp://tracker.torrent.eu.org:451/announce',
  'udp://tracker.bittor.pw:1337/announce',
  'udp://public.popcorn-tracker.org:6969/announce',
  'udp://tracker.dler.org:6969/announce',
  'udp://exodus.desync.com:6969',
  'udp://open.demonii.com:1337/announce',
  'udp://glotorrents.pw:6969/announce',
  'udp://tracker.coppersurfer.tk:6969',
  'udp://torrent.gresille.org:80/announce',
  'udp://p4p.arenabg.com:1337',
  'udp://tracker.internetwarriors.net:1337'
];

// --- Simple in-memory cache ---
const cache = {
  torrentId: null,
  torrentInfo: null,
  lastFetch: 0,
  fileMap: null // basename(lowercase) -> fileId
};

const TTL = 5 * 60 * 1000; // 5 menit

function basename(p = '') {
  return p.split('/').pop().trim();
}

function resetCache() {
  cache.torrentId = null;
  cache.torrentInfo = null;
  cache.lastFetch = 0;
  cache.fileMap = null;
}

async function findOrCreateTorrent(apiKey) {
  // 1. Cari di mylist
  const list = await torbox.getMyList(apiKey);
  const torrents = (list && list.data) || [];
  const found = torrents.find(
    t => (t.hash || '').toUpperCase() === INFO_HASH.toUpperCase()
  );
  if (found) return found.id;

  // 2. Belum ada → buat baru
  try {
    const created = await torbox.createTorrentFromMagnet(MAGNET, apiKey);
    const id =
      created?.data?.torrent_id ||
      created?.data?.id ||
      created?.torrent_id ||
      created?.id;
    if (!id) throw new Error('Tidak dapat torrent_id: ' + JSON.stringify(created));
    return id;
  } catch (err) {
    // Mungkin sudah ada, retry list sekali lagi
    const list2 = await torbox.getMyList(apiKey);
    const torrents2 = (list2 && list2.data) || [];
    const found2 = torrents2.find(
      t => (t.hash || '').toUpperCase() === INFO_HASH.toUpperCase()
    );
    if (found2) return found2.id;
    throw err;
  }
}

async function getTorrentWithFiles(apiKey) {
  const now = Date.now();
  if (cache.torrentId && cache.torrentInfo && now - cache.lastFetch < TTL) {
    return cache.torrentInfo;
  }

  const torrentId = cache.torrentId || (await findOrCreateTorrent(apiKey));
  cache.torrentId = torrentId;

  const info = await torbox.getMyList(apiKey, torrentId);
  const torrent = info?.data;
  if (!torrent) throw new Error('Torrent info kosong');

  cache.torrentInfo = torrent;
  cache.lastFetch = now;

  // Build file map
  const map = {};
  (torrent.files || []).forEach(f => {
    const name = f.name || f.path || '';
    map[basename(name).toLowerCase()] = f.id;
  });
  cache.fileMap = map;
  return torrent;
}

function findFileId(torrent, filename) {
  if (!torrent || !torrent.files) return null;
  const target = basename(filename).toLowerCase();

  // Exact basename match
  for (const f of torrent.files) {
    const name = basename(f.name || f.path || '').toLowerCase();
    if (name === target) return f.id;
  }
  // Fallback: partial match
  for (const f of torrent.files) {
    const name = basename(f.name || f.path || '').toLowerCase();
    if (name.includes(target.replace(/\.[^.]+$/, ''))) return f.id;
  }
  return null;
}

async function getStreams(fullId, apiKey) {
  const ep = findEpisode(fullId);
  if (!ep) return [];

  const streams = [];

  // === 1) TorBox direct stream (kalau ada API key) ===
  if (apiKey) {
    try {
      const torrent = await getTorrentWithFiles(apiKey);
      const fileId = findFileId(torrent, ep.filename);

      if (fileId) {
        const dl = await torbox.requestDownloadLink(
          cache.torrentId,
          fileId,
          apiKey
        );
        const url = dl?.data;
        if (url) {
          streams.push({
            name: '⚡ TorBox',
            title:
              `▶ ${ep.rawTitle}\n` +
              `📁 ${basename(ep.filename)}\n` +
              `💾 ${ep.size}\n` +
              `🎬 ${ep.seasonLabel}`,
            url,
            behaviorHints: {
              notWebReady: false,
              bingeGroup: 'torbox-naruto'
            }
          });
        }
      } else {
        // File belum ada / masih proses
        const dlState = torrent.download_state || torrent.download_finished ? '' : ' (mungkin masih download)';
        streams.push({
          name: '⏳ TorBox',
          title:
            `File belum siap${dlState}.\n` +
            `Coba lagi beberapa menit, atau buka TorBox langsung.`,
          externalUrl: 'https://torbox.app'
        });
      }
    } catch (err) {
      streams.push({
        name: '⚠ TorBox (error)',
        title: `${err.message}\n\nPastikan API key TorBox valid.`,
        externalUrl: 'https://torbox.app'
      });
    }
  }

  // === 2) Fallback: torrent infoHash (pakai torrent engine bawaan Stremio / addon pihak ketiga) ===
  streams.push({
    name: '🧲 Torrent (Ocean Cut)',
    title:
      `▶ ${ep.rawTitle}\n` +
      `📁 ${basename(ep.filename)}\n` +
      `💾 ${ep.size}\n` +
      `🎬 ${ep.seasonLabel}\n` +
      (apiKey
        ? `(stream via TorBox di atas)`
        : `(pasang API key TorBox untuk streaming langsung)`),
    infoHash: INFO_HASH,
    sources: TRACKERS.map(t => `tracker:${t}`),
    behaviorHints: {
      bingeGroup: 'torrent-naruto'
    }
  });

  return streams;
}

module.exports = { getStreams, resetCache, INFO_HASH, MAGNET };