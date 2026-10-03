// =============================================================
//  torbox.js — Helper untuk TorBox API
//  Docs: https://api-docs.torbox.app/
// =============================================================
const axios = require('axios');

const API_BASE = 'https://api.torbox.app/v1/api';

function http(apiKey) {
  return axios.create({
    baseURL: API_BASE,
    timeout: 30000,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });
}

async function createTorrentFromMagnet(magnet, apiKey, name) {
  const c = http(apiKey);
  const body = { magnet, name: name || 'Naruto Ocean Cut' };
  const res = await c.post('/torrents/createtorrent', body);
  return res.data;
}

async function getMyList(apiKey, id) {
  const c = http(apiKey);
  const params = id ? { id, bypass_cache: true } : { bypass_cache: true };
  const res = await c.get('/torrents/mylist', { params });
  return res.data;
}

async function requestDownloadLink(torrentId, fileId, apiKey) {
  const c = http(apiKey);
  const res = await c.get('/torrents/requestdl', {
    params: {
      token: apiKey,
      torrent_id: torrentId,
      file_id: fileId,
      redirect: false
    }
  });
  return res.data;
}

async function checkCached(hash, apiKey) {
  const c = http(apiKey);
  const res = await c.get('/torrents/checkcached', {
    params: { hash, format: 'object' }
  });
  return res.data;
}

module.exports = {
  createTorrentFromMagnet,
  getMyList,
  requestDownloadLink,
  checkCached
};