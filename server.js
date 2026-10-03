require('dotenv').config();
const express = require('express');
const { addonBuilder, getRouter } = require('stremio-addon-sdk');
const axios = require('axios');
const FormData = require('form-data');

const PORT = process.env.PORT || 7000;
const TORBOX_API = "https://api.torbox.app/v1/api";

// ============================================================================
// 1. DATA MAPPING (data.js)
// ============================================================================
const DEFAULT_POSTER = "https://image.tmdb.org/t/p/w500/v5XyXZe8FADwE1WGik9NA3LHLj0.jpg";
const DEFAULT_BACKGROUND = "https://image.tmdb.org/t/p/original/m99F2HNAF335z8D1cZ9H3vCaa5U.jpg";
const MAGNET_HASH = "E0C38EDE05E555D337E7D534F4EAAEBC773BF913";
const MAGNET_URL = "magnet:?xt=urn:btih:E0C38EDE05E555D337E7D534F4EAAEBC773BF913&dn=Naruto%20(2002)%20the%20Ocean%20Cut%20Edition%20No%20filler&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337";
const TRACKERS = [
  "tracker:udp://tracker.opentrackr.org:1337",
  "tracker:udp://open.stealth.si:80/announce",
  "tracker:udp://tracker.torrent.eu.org:451/announce",
  "tracker:udp://tracker.bittor.pw:1337/announce",
  "tracker:udp://public.popcorn-tracker.org:6969/announce",
  "tracker:udp://tracker.dler.org:6969/announce",
  "tracker:udp://exodus.desync.com:6969",
  "tracker:udp://open.demonii.com:1337/announce",
  "tracker:udp://glotorrents.pw:6969/announce",
  "tracker:udp://tracker.coppersurfer.tk:6969",
  "tracker:udp://torrent.gresille.org:80/announce",
  "tracker:udp://p4p.arenabg.com:1337",
  "tracker:udp://tracker.internetwarriors.net:1337"
];

const episodes = [
  { id: "oc.naruto:s0e1", name: "Naruto Episode 1 - Enter Naruto Uzumaki!", season: 0, episode: 1, desc: "Land of Waves", filename: "Naruto Episode 1 - Enter Naruto Uzumaki!" },
  { id: "oc.naruto:s0e2", name: "Naruto Episode 2 - Journey To The Land Of Waves!", season: 0, episode: 2, desc: "Land of Waves", filename: "Naruto Episode 2 - Journey To The Land Of Waves!" },
  { id: "oc.naruto:s0e3", name: "Naruto Episode 3 - The Forest of Chakra", season: 0, episode: 3, desc: "Land of Waves", filename: "Naruto Episode 3 - The Forest of Chakra" },
  { id: "oc.naruto:s0e4", name: "Naruto Episode 4 - Hakus Secret Jutsu!", season: 0, episode: 4, desc: "Land of Waves", filename: "Naruto Episode 4 - Hakus Secret Jutsu!" },
  { id: "oc.naruto:s0e5", name: "Naruto Episode 5 - White Past, Hidden Ambition", season: 0, episode: 5, desc: "Land of Waves", filename: "Naruto Episode 5 - White Past, Hidden Ambition" },
  { id: "oc.naruto:s0special1", name: "SPECIAL #1 - Inari's Test of Courage", season: 0, episode: 6, desc: "Land of Waves", filename: "SPECIAL #1 - Inari's Test of Courage" },
  { id: "oc.naruto:s1e6", name: "Naruto Episode 6 - A new Chapter begins!", season: 1, episode: 6, desc: "Chunin Exams", filename: "Naruto Episode 6 - A new Chapter begins!" },
  { id: "oc.naruto:s1e7", name: "Naruto Episode 7 - Genin Takedown!", season: 1, episode: 7, desc: "Chunin Exams", filename: "Naruto Episode 7 - Genin Takedown!" },
  { id: "oc.naruto:s1e8", name: "Naruto Episode 8 - The Forest of Death", season: 1, episode: 8, desc: "Chunin Exams", filename: "Naruto Episode 8 - The Forest of Death" },
  { id: "oc.naruto:s1e9", name: "Naruto Episode 9 - Sakura Blossoms, Sasuke Awakens!", season: 1, episode: 9, desc: "Chunin Exams", filename: "Naruto Episode 9 - Sakura Blossoms, Sasuke Awakens!" },
  { id: "oc.naruto:s1e10", name: "Naruto Episode 10 - Preliminary Persistence", season: 1, episode: 10, desc: "Chunin Exams", filename: "Naruto Episode 10 - Preliminary Persistence" },
  { id: "oc.naruto:s1e11", name: "Naruto Episode 11 - Top Dog", season: 1, episode: 11, desc: "Chunin Exams", filename: "Naruto Episode 11 - Top Dog" },
  { id: "oc.naruto:s1e12", name: "Naruto Episode 12 - Splendid Ninja", season: 1, episode: 12, desc: "Chunin Exams", filename: "Naruto Episode 12 - Splendid Ninja" },
  { id: "oc.naruto:s1e13", name: "Naruto Episode 13 - Naruto's Hardest Training Yet!", season: 1, episode: 13, desc: "Chunin Exams", filename: "Naruto Episode 13 - Naruto's Hardest Training Yet!" },
  { id: "oc.naruto:s1e14", name: "Naruto Episode 14 - The Final Rounds Begin!", season: 1, episode: 14, desc: "Chunin Exams", filename: "Naruto Episode 14 - The Final Rounds Begin!" },
  { id: "oc.naruto:s1e15", name: "Naruto Episode 15 - Dancing Leaf, Squirming Sand!", season: 1, episode: 15, desc: "Chunin Exams", filename: "Naruto Episode 15 - Dancing Leaf, Squirming Sand!" },
  { id: "oc.naruto:s1e16", name: "Naruto Episode 16 - Zero Hour!", season: 1, episode: 16, desc: "Chunin Exams", filename: "Naruto Episode 16 - Zero Hour!" },
  { id: "oc.naruto:s1e17", name: "Naruto Episode 17 - Beyond Darkness And Light", season: 1, episode: 17, desc: "Chunin Exams", filename: "Naruto Episode 17 - Beyond Darkness And Light" },
  { id: "oc.naruto:s1sp2", name: "Special #2 - Kakashi's Face!", season: 1, episode: 18, desc: "Chunin Exams", filename: "Special #2 - Kakashi's Face!" },
  { id: "oc.naruto:s2e18", name: "Naruto Episode 18 - The Morning Mist", season: 2, episode: 18, desc: "Search for Hope", filename: "Naruto Episode 18 - The Morning Mist" },
  { id: "oc.naruto:s2e19", name: "Naruto Episode 19 - A New Training Begins!", season: 2, episode: 19, desc: "Search for Hope", filename: "Naruto Episode 19 - A New Training Begins!" },
  { id: "oc.naruto:s2e20", name: "Naruto Episode 20 - The Necklace of Death!", season: 2, episode: 20, desc: "Search for Hope", filename: "Naruto Episode 20 - The Necklace of Death!" },
  { id: "oc.naruto:s2e21", name: "Naruto Episode 21 - Breakdown!", season: 2, episode: 21, desc: "Search for Hope", filename: "Naruto Episode 21 - Breakdown!" },
  { id: "oc.naruto:s3e22", name: "Naruto Episode 22 - Patients", season: 3, episode: 22, desc: "Retrieval Mission", filename: "Naruto Episode 22 - Patients" },
  { id: "oc.naruto:s3e23", name: "Naruto Episode 23 - Comrades", season: 3, episode: 23, desc: "Retrieval Mission", filename: "Naruto Episode 23 - Comrades" },
  { id: "oc.naruto:s3e24", name: "Naruto Episode 24 - Opponents", season: 3, episode: 24, desc: "Retrieval Mission", filename: "Naruto Episode 24 - Opponents" },
  { id: "oc.naruto:s3e25", name: "Naruto Episode 25 - Warriors", season: 3, episode: 25, desc: "Retrieval Mission", filename: "Naruto Episode 25 - Warriors" },
  { id: "oc.naruto:s3e26", name: "Naruto Episode 26 - Allies", season: 3, episode: 26, desc: "Retrieval Mission", filename: "Naruto Episode 26 - Allies" },
  { id: "oc.naruto:s3e27", name: "Naruto Episode 27 - Brothers", season: 3, episode: 27, desc: "Retrieval Mission", filename: "Naruto Episode 27 - Brothers" },
  { id: "oc.naruto:s3e28", name: "Naruto Episode 28 - Friends", season: 3, episode: 28, desc: "Retrieval Mission", filename: "Naruto Episode 28 - Friends" },
  { id: "oc.naruto:s3sp3", name: "SPECIAL #3 - Boy on the Battlefield", season: 3, episode: 29, desc: "Retrieval Mission", filename: "SPECIAL #3 - Boy on the Battlefield" },
  { id: "oc.naruto:s4e29", name: "Naruto Episode 29 - Homecoming", season: 4, episode: 29, desc: "Kazekage Rescue", filename: "Naruto Episode 29 - Homecoming" },
  { id: "oc.naruto:s4e30", name: "Naruto Episode 30 - Team Kakashi, Deployed", season: 4, episode: 30, desc: "Kazekage Rescue", filename: "Naruto Episode 30 - Team Kakashi, Deployed" },
  { id: "oc.naruto:s4e31", name: "Naruto Episode 31 - A Meeting with Destiny", season: 4, episode: 31, desc: "Kazekage Rescue", filename: "Naruto Episode 31 - A Meeting with Destiny" },
  { id: "oc.naruto:s4e32", name: "Naruto Episode 32 - The Secret of Jinchuriki", season: 4, episode: 32, desc: "Kazekage Rescue", filename: "Naruto Episode 32 - The Secret of Jinchuriki" },
  { id: "oc.naruto:s4e33", name: "Naruto Episode 33 - Kunoichi vs The Puppetmaster", season: 4, episode: 33, desc: "Kazekage Rescue", filename: "Naruto Episode 33 - Kunoichi vs The Puppetmaster" },
  { id: "oc.naruto:s4e34", name: "Naruto Episode 34 - Legacy", season: 4, episode: 34, desc: "Kazekage Rescue", filename: "Naruto Episode 34 - Legacy" },
  { id: "oc.naruto:s5e35", name: "Naruto Episode 35 - The New Target", season: 5, episode: 35, desc: "Tenchi Bridge Investigation", filename: "Naruto Episode 35 - The New Target" },
  { id: "oc.naruto:s5e36", name: "Naruto Episode 36 - The Tenchi Bridge", season: 5, episode: 36, desc: "Tenchi Bridge Investigation", filename: "Naruto Episode 36 - The Tenchi Bridge" },
  { id: "oc.naruto:s5e37", name: "Naruto Episode 37 - Blank Page", season: 5, episode: 37, desc: "Tenchi Bridge Investigation", filename: "Naruto Episode 37 - Blank Page" },
  { id: "oc.naruto:s5e38", name: "Naruto Episode 38 - Reunion", season: 5, episode: 38, desc: "Tenchi Bridge Investigation", filename: "Naruto Episode 38 - Reunion" },
  { id: "oc.naruto:s6e39", name: "Naruto Episode 39 - The Quietly Approaching Threat", season: 6, episode: 39, desc: "Akatsuki Suppression", filename: "Naruto Episode 39 - The Quietly Approaching Threat" },
  { id: "oc.naruto:s6e40", name: "Naruto Episode 40 - Akatsuki Investigation", season: 6, episode: 40, desc: "Akatsuki Suppression", filename: "Naruto Episode 40 - Akatsuki Investigation" },
  { id: "oc.naruto:s6e41", name: "Naruto Episode 41 - Climbing Silver", season: 6, episode: 41, desc: "Akatsuki Suppression", filename: "Naruto Episode 41 - Climbing Silver" },
  { id: "oc.naruto:s6e42", name: "Naruto Episode 42 - Those called Immortal", season: 6, episode: 42, desc: "Akatsuki Suppression", filename: "Naruto Episode 42 - Those called Immortal" },
  { id: "oc.naruto:s6e43", name: "Naruto Episode 43 - The Price of Power", season: 6, episode: 43, desc: "Akatsuki Suppression", filename: "Naruto Episode 43 - The Price of Power" },
  { id: "oc.naruto:s7e44", name: "Naruto Episode 44 - The Serpent's Pupil", season: 7, episode: 44, desc: "Hunt for the Traitor", filename: "Naruto Episode 44 - The Serpent's Pupil" },
  { id: "oc.naruto:s7e45", name: "Naruto Episode 45 - The Hunt", season: 7, episode: 45, desc: "Hunt for the Traitor", filename: "Naruto Episode 45 - The Hunt" },
  { id: "oc.naruto:s7e46", name: "Naruto Episode 46 - The Black Flames of Brotherhood", season: 7, episode: 46, desc: "Hunt for the Traitor", filename: "Naruto Episode 46 - The Black Flames of Brotherhood" },
  { id: "oc.naruto:s7e47", name: "Naruto Episode 47 - The Truth", season: 7, episode: 47, desc: "Hunt for the Traitor", filename: "Naruto Episode 47 - The Truth" },
  { id: "oc.naruto:s8e48", name: "Naruto Episode 48 - Tales of a Gutsy Ninja", season: 8, episode: 48, desc: "Jiraiya the Gallant", filename: "Naruto Episode 48 - Tales of a Gutsy Ninja" },
  { id: "oc.naruto:s8e49", name: "Naruto Episode 49 - Mystery Under The Rainclouds 1", season: 8, episode: 49, desc: "Jiraiya the Gallant", filename: "Naruto Episode 49 - Mystery Under The Rainclouds 1" },
  { id: "oc.naruto:s9e50", name: "Naruto Episode 50 - Wanderer", season: 9, episode: 50, desc: "Unleashed (OPTIONAL)", filename: "Naruto Episode 50 - Wanderer" },
  { id: "oc.naruto:s9e51", name: "Naruto Episode 51 - Master", season: 9, episode: 51, desc: "Unleashed (OPTIONAL)", filename: "Naruto Episode 51 - Master" },
  { id: "oc.naruto:s10e52", name: "Naruto Episode 52 - Somber News", season: 10, episode: 52, desc: "Pain", filename: "Naruto Episode 52 - Somber News" },
  { id: "oc.naruto:s10e53", name: "Naruto Episode 53 - Escalation", season: 10, episode: 53, desc: "Pain", filename: "Naruto Episode 53 - Escalation" },
  { id: "oc.naruto:s10e54", name: "Naruto Episode 54 - Assault", season: 10, episode: 54, desc: "Pain", filename: "Naruto Episode 54 - Assault" },
  { id: "oc.naruto:s10e55", name: "Naruto Episode 55 - The Hero of the Leaf", season: 10, episode: 55, desc: "Pain", filename: "Naruto Episode 55 - The Hero of the Leaf" },
  { id: "oc.naruto:s10e56", name: "Naruto Episode 56 - The Tale Of Naruto Uzumaki", season: 10, episode: 56, desc: "Pain", filename: "Naruto Episode 56 - The Tale Of Naruto Uzumaki" },
  { id: "oc.naruto:s11e57", name: "Naruto Episode 57 - Rising Tensions", season: 11, episode: 57, desc: "Kage Summit", filename: "Naruto Episode 57 - Rising Tensions" },
  { id: "oc.naruto:s11e58", name: "Naruto Episode 58 - The Summit", season: 11, episode: 58, desc: "Kage Summit", filename: "Naruto Episode 58 - The Summit" },
  { id: "oc.naruto:s11e59", name: "Naruto Episode 59 - Racing Minds", season: 11, episode: 59, desc: "Kage Summit", filename: "Naruto Episode 59 - Racing Minds" },
  { id: "oc.naruto:s11e60", name: "Naruto Episode 60 - The Power of the Elder", season: 11, episode: 60, desc: "Kage Summit", filename: "Naruto Episode 60 - The Power of the Elder" },
  { id: "oc.naruto:s11e61", name: "Naruto Episode 61 - High-Level Shinobi", season: 11, episode: 61, desc: "Kage Summit", filename: "Naruto Episode 61 - High-Level Shinobi" },
  { id: "oc.naruto:s11e62", name: "Naruto Episode 62 - Calm before the Storm", season: 11, episode: 62, desc: "Kage Summit", filename: "Naruto Episode 62 - Calm before the Storm" },
  { id: "oc.naruto:s12e63", name: "Naruto Episode 63 - The Waterfall of Truth", season: 12, episode: 63, desc: "Island of Purification", filename: "Naruto Episode 63 - The Waterfall of Truth" },
  { id: "oc.naruto:s12e64", name: "Naruto Episode 64 - The Nine-Tailed Fox", season: 12, episode: 64, desc: "Island of Purification", filename: "Naruto Episode 64 - The Nine-Tailed Fox" },
  { id: "oc.naruto:s12e65", name: "Naruto Episode 65 - The Shark and the Angel", season: 12, episode: 65, desc: "Island of Purification", filename: "Naruto Episode 65 - The Shark and the Angel" },
  { id: "oc.naruto:s13e66", name: "Naruto Episode 66 - Alliance", season: 13, episode: 66, desc: "The War", filename: "Naruto Episode 66 - Alliance" },
  { id: "oc.naruto:s13e67", name: "Naruto Episode 67 - War!", season: 13, episode: 67, desc: "The War", filename: "Naruto Episode 67 - War!" },
  { id: "oc.naruto:s13e68", name: "Naruto Episode 68 - The First Enemy", season: 13, episode: 68, desc: "The War", filename: "Naruto Episode 68 - The First Enemy" },
  { id: "oc.naruto:s13e69", name: "Naruto Episode 69 - Battle On The Beach", season: 13, episode: 69, desc: "The War", filename: "Naruto Episode 69 - Battle On The Beach" },
  { id: "oc.naruto:s13e70", name: "Naruto Episode 70 - Golden Bonds", season: 13, episode: 70, desc: "The War", filename: "Naruto Episode 70 - Golden Bonds" },
  { id: "oc.naruto:s13e71", name: "Naruto Episode 71 - Nightfall", season: 13, episode: 71, desc: "The War", filename: "Naruto Episode 71 - Nightfall" },
  { id: "oc.naruto:s13e72", name: "Naruto Episode 72 - Company 3", season: 13, episode: 72, desc: "The War", filename: "Naruto Episode 72 - Company 3" },
  { id: "oc.naruto:s14e73", name: "Naruto Episode 73 - The Acknowledged One", season: 14, episode: 73, desc: "Naruto's Counterattack", filename: "Naruto Episode 73 - The Acknowledged One" },
  { id: "oc.naruto:s14e74", name: "Naruto Episode 74 - Reinforcements!", season: 14, episode: 74, desc: "Naruto's Counterattack", filename: "Naruto Episode 74 - Reinforcements!" },
  { id: "oc.naruto:s15e75", name: "Naruto Episode 75 - Madara Uchiha", season: 15, episode: 75, desc: "Worst Case Scenario", filename: "Naruto Episode 75 - Madara Uchiha" },
  { id: "oc.naruto:s15e76", name: "Naruto Episode 76 - Tailed Beasts", season: 15, episode: 76, desc: "Worst Case Scenario", filename: "Naruto Episode 76 - Tailed Beasts" },
  { id: "oc.naruto:s15e77", name: "Naruto Episode 77 - Eyes That See in the Dark", season: 15, episode: 77, desc: "Worst Case Scenario", filename: "Naruto Episode 77 - Eyes That See in the Dark" },
  { id: "oc.naruto:s15e78", name: "Naruto Episode 78 - I Will Love You, Always", season: 15, episode: 78, desc: "Worst Case Scenario", filename: "Naruto Episode 78 - I Will Love You, Always" },
  { id: "oc.naruto:s15e79", name: "Naruto Episode 79 - Unmasked", season: 15, episode: 79, desc: "Worst Case Scenario", filename: "Naruto Episode 79 - Unmasked" },
  { id: "oc.naruto:s16e80", name: "Naruto Episode 80 - Hell", season: 16, episode: 80, desc: "Hell", filename: "Naruto Episode 80 - Hell" },
  { id: "oc.naruto:s16e81", name: "Naruto Episode 81 - Allied Resolve", season: 16, episode: 81, desc: "Hell", filename: "Naruto Episode 81 - Allied Resolve" },
  { id: "oc.naruto:s16e82", name: "Naruto Episode 82 - The All-Knowing", season: 16, episode: 82, desc: "Hell", filename: "Naruto Episode 82 - The All-Knowing" },
  { id: "oc.naruto:s16e83", name: "Naruto Episode 83 - The New Sannin", season: 16, episode: 83, desc: "Hell", filename: "Naruto Episode 83 - The New Sannin" },
  { id: "oc.naruto:s16e84", name: "Naruto Episode 84 - Kakashi's Phantom", season: 16, episode: 84, desc: "Hell", filename: "Naruto Episode 84 - Kakashi's Phantom" },
  { id: "oc.naruto:s16e85", name: "Naruto Episode 85 - The Heart", season: 16, episode: 85, desc: "Hell", filename: "Naruto Episode 85 - The Heart" },
  { id: "oc.naruto:s16e86", name: "Naruto Episode 86 - A True Ending", season: 16, episode: 86, desc: "Hell", filename: "Naruto Episode 86 - A True Ending" },
  { id: "oc.naruto:s17e87", name: "Naruto Episode 87 - The Traitor and the Beast", season: 17, episode: 87, desc: "Realm of Infinity", filename: "Naruto Episode 87 - The Traitor and the Beast" },
  { id: "oc.naruto:s17e88", name: "Naruto Episode 88 - World Of Dreams", season: 17, episode: 88, desc: "Realm of Infinity", filename: "Naruto Episode 88 - World Of Dreams" },
  { id: "oc.naruto:s18e89", name: "Naruto Episode 89 - She, Of The Beginning", season: 18, episode: 89, desc: "Finale", filename: "Naruto Episode 89 - She, Of The Beginning" },
  { id: "oc.naruto:s18e90", name: "Naruto Episode 90 - Those Who Inherit The Future", season: 18, episode: 90, desc: "Finale", filename: "Naruto Episode 90 - Those Who Inherit The Future" },
  { id: "oc.naruto:s18e91", name: "Naruto Episode 91 - Ninja", season: 18, episode: 91, desc: "Finale", filename: "Naruto Episode 91 - Ninja" },
  { id: "oc.naruto:s18sp4", name: "Special #4 - Boyhood", season: 18, episode: 92, desc: "Finale", filename: "Special #4 - Boyhood" },
  { id: "oc.naruto:s19e1", name: "Naruto Epilogue Episode 1 - The Strategist", season: 19, episode: 1, desc: "Epilogue (WIP)", filename: "Naruto Epilogue Episode 1 - The Strategist" },
  { id: "oc.naruto:s19e2", name: "Naruto Epilogue Episode 2 - The Last", season: 19, episode: 2, desc: "Epilogue (WIP)", filename: "Naruto Epilogue Episode 2 - The Last" },
  { id: "oc.naruto:s19e3", name: "Naruto Epilogue Episode 3 - The Wanderer", season: 19, episode: 3, desc: "Epilogue (WIP)", filename: "Naruto Epilogue Episode 3 - The Wanderer" },
  { id: "oc.naruto:s19fin", name: "Naruto The Final Episode", season: 19, episode: 4, desc: "Epilogue (WIP)", filename: "Naruto The Final Episode" },
  { id: "oc.naruto:kks1", name: "Kakashi's Story Episode 1 – A Mask That Hides The Heart", season: 99, episode: 1, desc: "Kakashi's Story", filename: "Kakashi's Story Episode 1 – A Mask That Hides The Heart" },
  { id: "oc.naruto:kks2", name: "Kakashi's Story Episode 2 - Jonin Leader", season: 99, episode: 2, desc: "Kakashi's Story", filename: "Kakashi's Story Episode 2 - Jonin Leader" }
];


// ============================================================================
// 2. MANIFEST ADDON (manifest.js)
// ============================================================================
const manifest = {
  id: "org.oceancut.naruto",
  version: "1.0.0",
  name: "Naruto Ocean Cut",
  description: "Streaming addon for Naruto (2002) the Ocean Cut Edition. Combines multiple episodes into long cinematic formats.",
  resources: ["catalog", "meta", "stream"],
  types: ["movie"],
  idPrefixes: ["oc.naruto:"],
  behaviorHints: { configurable: true, configurationRequired: false },
  catalogs: [{ type: "movie", id: "oc.naruto.catalog", name: "Naruto Ocean Cut" }]
};


// ============================================================================
// 3. TORBOX API HELPER (torbox.js)
// ============================================================================
const torrentCache = new Map();

async function getTorBoxLink(magnetUrl, infoHash, filenameMatch, apiKey) {
  try {
    const headers = { Authorization: `Bearer ${apiKey}` };
    let torrentId = torrentCache.get(infoHash);
    let torrentInfo = null;

    if (!torrentId) {
      const listRes = await axios.get(`${TORBOX_API}/torrents/mylist`, { headers });
      const activeTorrents = listRes.data?.data || [];
      const existing = activeTorrents.find(t => t.hash.toLowerCase() === infoHash.toLowerCase());

      if (existing) {
        torrentId = existing.id;
        torrentCache.set(infoHash, torrentId);
        torrentInfo = existing;
      } else {
        console.log("Menambahkan magnet ke TorBox...");
        const form = new FormData();
        form.append("magnet", magnetUrl);
        form.append("seed", "1");
        form.append("allow_zip", "false");
        
        const addRes = await axios.post(`${TORBOX_API}/torrents/createtorrent`, form, { headers, ...form.getHeaders() });
        if (addRes.data?.data?.torrent_id) {
            torrentId = addRes.data.data.torrent_id;
            torrentCache.set(infoHash, torrentId);
            await new Promise(r => setTimeout(r, 2000)); // Wait for fetching metadata
        } else {
            throw new Error("Gagal membuat torrent di Torbox");
        }
      }
    }

    if (!torrentInfo) {
      const listRes = await axios.get(`${TORBOX_API}/torrents/mylist`, { headers });
      torrentInfo = listRes.data?.data?.find(t => t.id === torrentId);
    }

    if (!torrentInfo || !torrentInfo.files) {
      throw new Error("Torrent files belum siap di TorBox.");
    }

    const targetFile = torrentInfo.files.find(f => 
        f.name.toLowerCase().includes(filenameMatch.toLowerCase())
    );

    if (!targetFile) {
      throw new Error(`File "${filenameMatch}" tidak ditemukan.`);
    }

    const dlRes = await axios.get(`${TORBOX_API}/torrents/requestdl?torrent_id=${torrentId}&file_id=${targetFile.id}`, { headers });
    if (dlRes.data?.data) return dlRes.data.data;

    throw new Error("Gagal mendapatkan link download dari TorBox");
  } catch (err) {
    console.error("TorBox API Error:", err.response?.data || err.message);
    return null;
  }
}


// ============================================================================
// 4. STREMIO ADDON BUILDER (catalog.js & streams.js)
// ============================================================================
const builder = new addonBuilder(manifest);

// Catalog Handler
builder.defineCatalogHandler(({ type, id }) => {
  if (type === 'movie' && id === 'oc.naruto.catalog') {
    return Promise.resolve({
      metas: episodes.map(ep => ({
        id: ep.id,
        type: 'movie',
        name: ep.name,
        poster: DEFAULT_POSTER,
        description: ep.desc
      }))
    });
  }
  return Promise.resolve({ metas: [] });
});

// Meta Handler
builder.defineMetaHandler(({ type, id }) => {
  if (type === 'movie' && id.startsWith('oc.naruto:')) {
    const ep = episodes.find(e => e.id === id);
    if (ep) {
      return Promise.resolve({
        meta: {
          id: ep.id,
          type: 'movie',
          name: ep.name,
          poster: DEFAULT_POSTER,
          background: DEFAULT_BACKGROUND,
          description: `Kompilasi fan-edit Naruto (Ocean Cut Edition).\nBagian: ${ep.desc}`,
          releaseInfo: "2002",
          runtime: "50-120 min"
        }
      });
    }
  }
  return Promise.resolve({ meta: null });
});

// Stream Handler
builder.defineStreamHandler(async ({ type, id, config }) => {
  if (type !== 'movie' || !id.startsWith('oc.naruto:')) return Promise.resolve({ streams: [] });
  const episode = episodes.find(e => e.id === id);
  if (!episode) return Promise.resolve({ streams: [] });

  const streams = [];
  const apiKey = config?.torbox || process.env.TORBOX_API_KEY;

  if (apiKey) {
    console.log(`Mencoba TorBox API untuk: ${episode.name}`);
    const directUrl = await getTorBoxLink(MAGNET_URL, MAGNET_HASH, episode.filename, apiKey);
    
    if (directUrl) {
      streams.push({
        name: "TorBox",
        title: `▶ ${episode.name}\n📁 ${episode.filename}`,
        url: directUrl,
        behaviorHints: { notWebReady: false, bingeGroup: "torbox-naruto" }
      });
    }
  }

  // Fallback ke InfoHash Torrent
  streams.push({
    name: "Torrent (Ocean Cut)",
    title: `🧲 ${episode.name}\n📁 ${episode.filename}`,
    infoHash: MAGNET_HASH,
    sources: TRACKERS,
    behaviorHints: { bingeGroup: "torrent-naruto" }
  });

  return { streams };
});


// ============================================================================
// 5. SERVER RUNTIME & CONFIG UI (index.js & html)
// ============================================================================
const app = express();

const HTML_CONFIG = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configure Naruto Ocean Cut</title>
    <style>
        body { font-family: sans-serif; background: #121212; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .card { background: #1e1e1e; padding: 2rem; border-radius: 12px; text-align: center; max-width: 400px; width: 100%; box-sizing: border-box; }
        h1 { color: #f39c12; font-size: 1.5rem; margin-top: 0; }
        p { color: #ccc; font-size: 0.95rem; margin-bottom: 1.5rem; }
        input { width: 100%; padding: 12px; border-radius: 6px; border: 1px solid #333; background: #2a2a2a; color: #fff; margin-bottom: 1.5rem; box-sizing: border-box; }
        button { background: #8e44ad; color: #fff; border: none; padding: 12px; border-radius: 6px; cursor: pointer; width: 100%; font-weight: bold; margin-bottom: 10px; }
        button:hover { background: #9b59b6; }
        .skip { background: transparent; border: 1px solid #555; color: #ccc; }
        .skip:hover { background: #333; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Naruto Ocean Cut</h1>
        <p>Masukkan <b>TorBox API Key</b> Anda untuk direct stream. (Opsional)</p>
        <input type="text" id="apikey" placeholder="TorBox API Key">
        <button onclick="installAddon(false)">Install to Stremio</button>
        <button class="skip" onclick="installAddon(true)">Install tanpa TorBox</button>
    </div>
    <script>
        function installAddon(skip) {
            const key = document.getElementById('apikey').value.trim();
            const urlBase = (window.location.protocol === 'https:' ? 'stremio://' : 'stremio://') + window.location.host + '/';
            window.location.href = skip || !key ? urlBase + 'manifest.json' : urlBase + 'torbox=' + encodeURIComponent(key) + '/manifest.json';
        }
    </script>
</body>
</html>
`;

app.get('/', (req, res) => res.redirect('/configure'));
app.get('/configure', (req, res) => res.send(HTML_CONFIG));
app.use('/', getRouter(builder));

app.listen(PORT, () => {
    console.log(`[Naruto Ocean Cut] Single-file Addon running!`);
    console.log(`- Config UI: http://127.0.0.1:${PORT}/configure`);
    console.log(`- Manifest : http://127.0.0.1:${PORT}/manifest.json`);
});
