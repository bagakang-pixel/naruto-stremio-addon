// =============================================================
//  data.js — Naruto Ocean Cut (Rich Metadata + Thumbnail unik)
// =============================================================

const SERIES_ID     = 'oc.naruto';
const SERIES_NAME   = 'Naruto Ocean Cut';
const SERIES_POSTER = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/x0T5AnzOhR7npUO7dMdoNdKtC4F.jpg';
const SERIES_BG     = 'https://image.tmdb.org/t/p/original/hMhFCfSDlQ3TZl6oYcVh5qicTsW.jpg';
const SERIES_LOGO   = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Naruto_logo.svg/1280px-Naruto_logo.svg.png';

const CAST = [
  'Junko Takeuchi',
  'Maile Flanagan',
  'Kate Higgins',
  'Noriaki Sugiyama',
  'Yuri Lowenthal',
  'Kazuhiko Inoue',
  'Dave Wittenberg',
  'Hideo Ishikawa',
  'Crispin Freeman'
];

const WRITERS   = ['Masashi Kishimoto'];
const DIRECTORS = ['Hayato Date'];
const TRAILERS  = [{ source: 'QDXvO1TAUUs', type: 'Trailer' }];

// =============================================================
//  SEASON NAMES (berdasarkan folder di torrent)
// =============================================================
const SEASON_NAMES = {
  1:  'Land of Waves',
  2:  'Chunin Exams',
  3:  'Search for Hope',
  4:  'Retrieval Mission',
  5:  'Kazekage Rescue',
  6:  'Tenchi Bridge Investigation',
  7:  'Akatsuki Suppression',
  8:  'Hunt for the Traitor',
  9:  'Jiraiya the Gallant',
  10: 'Unleashed (Optional)',
  11: 'Pain',
  12: 'Kage Summit',
  13: 'Island of Purification',
  14: 'The War',
  15: "Naruto's Counterattack",
  16: 'Worst Case Scenario',
  17: 'Hell',
  18: 'Realm of Infinity',
  19: 'Finale',
  20: 'Epilogue (WIP)',
  0:  "Kakashi's Story (Special)"
};

const SEASON_COLORS = {
  0:  '2c3e50',
  1:  '2980b9',
  2:  'e67e22',
  3:  '27ae60',
  4:  'c0392b',
  5:  '16a085',
  6:  'd35400',
  7:  '8e44ad',
  8:  '7f8c8d',
  9:  'c0392b',
  10: 'a569bd',
  11: 'b03a2e',
  12: '34495e',
  13: '16a085',
  14: '8e44ad',
  15: '2980b9',
  16: '7f8c8d',
  17: '1a1a2e',
  18: 'b03a2e',
  19: '2c3e50',
  20: '2c3e50'
};

function makeThumbnail(seasonNum, epNum, shortTitle) {
  const bg = SEASON_COLORS[seasonNum] || '1a1a2e';
  const s  = String(seasonNum).padStart(2, '0');
  const e  = String(epNum).padStart(2, '0');
  const header = seasonNum === 0 ? `SPECIAL ${e}` : `S${s}E${e}`;
  const label = `${header}\\n\\n${shortTitle}\\n\\nOcean Cut`;
  return `https://placehold.co/500x750/${bg}/ffffff/png?text=${encodeURIComponent(label)}&font=roboto`;
}

// =============================================================
//  RAW DATA — [shortId, title, filename, size, seasonNum, kind]
//  seasonNum = nomor Stremio (folder S0 → Stremio S1, dst.)
// =============================================================
const RAW = [
  // ---------- S1 — Land of Waves (folder: Season 0) ----------
  ['s0e1',  'Episode 1 - Enter Naruto Uzumaki!',           'Season 0 - Land of Waves/Naruto Episode 1 - Enter Naruto Uzumaki!.mp4',                      '3.66 GiB',   1, 'episode'],
  ['s0e2',  'Episode 2 - Journey To The Land Of Waves!',   'Season 0 - Land of Waves/Naruto Episode 2 - Journey To The Land Of Waves!.mp4',               '4.28 GiB',   1, 'episode'],
  ['s0e3',  'Episode 3 - The Forest of Chakra',            'Season 0 - Land of Waves/Naruto Episode 3 - The Forest of Chakra.mp4',                        '3.32 GiB',   1, 'episode'],
  ['s0e4',  'Episode 4 - Hakus Secret Jutsu!',             'Season 0 - Land of Waves/Naruto Episode 4 - Hakus Secret Jutsu!.mp4',                         '3.42 GiB',   1, 'episode'],
  ['s0e5',  'Episode 5 - White Past, Hidden Ambition',     'Season 0 - Land of Waves/Naruto Episode 5 - White Past, Hidden Ambition.mp4',                 '2.83 GiB',   1, 'episode'],
  ['s0sp1', "SPECIAL #1 - Inari's Test of Courage",        "Season 0 - Land of Waves/SPECIAL #1 - Inari's Test of Courage.mp4",                           '1.83 GiB',   1, 'special'],

  // ---------- S2 — Chunin Exams (folder: Season 1) ----------
  ['s1e6',  'Episode 6 - A new Chapter begins!',           'Season 1 - Chunin Exams/Naruto Episode 6 - A new Chapter begins!.mp4',                        '3.13 GiB',   2, 'episode'],
  ['s1e7',  'Episode 7 - Genin Takedown!',                 'Season 1 - Chunin Exams/Naruto Episode 7 - Genin Takedown!.mp4',                              '3.77 GiB',   2, 'episode'],
  ['s1e8',  'Episode 8 - The Forest of Death',             'Season 1 - Chunin Exams/Naruto Episode 8 - The Forest of Death.mp4',                          '3.39 GiB',   2, 'episode'],
  ['s1e9',  'Episode 9 - Sakura Blossoms, Sasuke Awakens!','Season 1 - Chunin Exams/Naruto Episode 9 - Sakura Blossoms, Sasuke Awakens!.mp4',             '4.00 GiB',   2, 'episode'],
  ['s1e10', 'Episode 10 - Preliminary Persistence',        'Season 1 - Chunin Exams/Naruto Episode 10 - Preliminary Persistence.m4v',                     '518.48 MiB', 2, 'episode'],
  ['s1e11', 'Episode 11 - Top Dog',                        'Season 1 - Chunin Exams/Naruto Episode 11 - Top Dog.mp4',                                     '2.73 GiB',   2, 'episode'],
  ['s1e12', 'Episode 12 - Splendid Ninja',                 'Season 1 - Chunin Exams/Naruto Episode 12 - Splendid Ninja.m4v',                              '639.65 MiB', 2, 'episode'],
  ['s1e13', "Episode 13 - Naruto's Hardest Training Yet!", "Season 1 - Chunin Exams/Naruto Episode 13 - Naruto's Hardest Training Yet!.m4v",              '601.61 MiB', 2, 'episode'],
  ['s1e14', 'Episode 14 - The Final Rounds Begin!',        'Season 1 - Chunin Exams/Naruto Episode 14 - The Final Rounds Begin!.m4v',                     '455.02 MiB', 2, 'episode'],
  ['s1e15', 'Episode 15 - Dancing Leaf, Squirming Sand!',  'Season 1 - Chunin Exams/Naruto Episode 15 - Dancing Leaf, Squirming Sand!.m4v',               '479.21 MiB', 2, 'episode'],
  ['s1e16', 'Episode 16 - Zero Hour!',                     'Season 1 - Chunin Exams/Naruto Episode 16 - Zero Hour!.m4v',                                  '637.63 MiB', 2, 'episode'],
  ['s1e17', 'Episode 17 - Beyond Darkness And Light',      'Season 1 - Chunin Exams/Naruto Episode 17 - Beyond Darkness And Light.m4v',                   '863.25 MiB', 2, 'episode'],
  ['s1sp2', "SPECIAL #2 - Kakashi's Face!",                "Season 1 - Chunin Exams/Special #2 - Kakashi's Face!-1.m4v",                                  '662.33 MiB', 2, 'special'],

  // ---------- S3 — Search for Hope (folder: Season 2) ----------
  ['s2e18', 'Episode 18 - The Morning Mist',               'Season 2 - Search for Hope/Naruto Episode 18 - The Morning Mist-1.m4v',                       '506.91 MiB', 3, 'episode'],
  ['s2e19', 'Episode 19 - A New Training Begins!',         'Season 2 - Search for Hope/Naruto Episode 19 - A New Training Begins!.mp4',                   '3.77 GiB',   3, 'episode'],
  ['s2e20', 'Episode 20 - The Necklace of Death!',         'Season 2 - Search for Hope/Naruto Episode 20 - The Necklace of Death!.mp4',                   '4.24 GiB',   3, 'episode'],
  ['s2e21', 'Episode 21 - Breakdown!',                     'Season 2 - Search for Hope/Naruto Episode 21 - Breakdown!-1.m4v',                             '484.40 MiB', 3, 'episode'],

  // ---------- S4 — Retrieval Mission (folder: Season 3) ----------
  ['s3e22', 'Episode 22 - Patients',                       'Season 3 - Retrieval Mission/Naruto Episode 22 - Patients-1.m4v',                             '495.74 MiB', 4, 'episode'],
  ['s3e23', 'Episode 23 - Comrades',                       'Season 3 - Retrieval Mission/Naruto Episode 23 - Comrades.m4v',                               '575.03 MiB', 4, 'episode'],
  ['s3e24', 'Episode 24 - Opponents',                      'Season 3 - Retrieval Mission/Naruto Episode 24 - Opponents-1.m4v',                            '498.26 MiB', 4, 'episode'],
  ['s3e25', 'Episode 25 - Warriors',                       'Season 3 - Retrieval Mission/Naruto Episode 25 - Warriors-1.m4v',                             '695.36 MiB', 4, 'episode'],
  ['s3e26', 'Episode 26 - Allies',                         'Season 3 - Retrieval Mission/Naruto Episode 26 - Allies.mp4',                                 '3.93 GiB',   4, 'episode'],
  ['s3e27', 'Episode 27 - Brothers',                       'Season 3 - Retrieval Mission/Naruto Episode 27 - Brothers.mp4',                               '4.06 GiB',   4, 'episode'],
  ['s3e28', 'Episode 28 - Friends',                        'Season 3 - Retrieval Mission/Naruto Episode 28 - Friends-1.m4v',                              '550.64 MiB', 4, 'episode'],
  ['s3sp3', 'SPECIAL #3 - Boy on the Battlefield',         'Season 3 - Retrieval Mission/SPECIAL #3 - Boy on the Battlefield.mp4',                        '2.32 GiB',   4, 'special'],

  // ---------- S5 — Kazekage Rescue (folder: Season 4) ----------
  ['s4e29', 'Episode 29 - Homecoming',                     'Season 4 - Kazekage Rescue/Naruto Episode 29 - Homecoming.mp4',                               '2.23 GiB',   5, 'episode'],
  ['s4e30', 'Episode 30 - Team Kakashi, Deployed',         'Season 4 - Kazekage Rescue/Naruto Episode 30 - Team Kakashi, Deployed.mp4',                   '1.94 GiB',   5, 'episode'],
  ['s4e31', 'Episode 31 - A Meeting with Destiny',         'Season 4 - Kazekage Rescue/Naruto Episode 31 - A Meeting with Destiny.mp4',                   '1.31 GiB',   5, 'episode'],
  ['s4e32', 'Episode 32 - The Secret of Jinchuriki',       'Season 4 - Kazekage Rescue/Naruto Episode 32 - The Secret of Jinchuriki.mp4',                 '1.30 GiB',   5, 'episode'],
  ['s4e33', 'Episode 33 - Kunoichi vs The Puppetmaster',   'Season 4 - Kazekage Rescue/Naruto Episode 33 - Kunoichi vs The Puppetmaster.mp4',             '2.40 GiB',   5, 'episode'],
  ['s4e34', 'Episode 34 - Legacy',                         'Season 4 - Kazekage Rescue/Naruto Episode 34 - Legacy.mp4',                                   '1.46 GiB',   5, 'episode'],

  // ---------- S6 — Tenchi Bridge (folder: Season 5) ----------
  ['s5e35', 'Episode 35 - The New Target',                 'Season 5 - Tenchi Bridge Investigation/Naruto Episode 35 - The New Target.mp4',               '1.78 GiB',   6, 'episode'],
  ['s5e36', 'Episode 36 - The Tenchi Bridge',              'Season 5 - Tenchi Bridge Investigation/Naruto Episode 36 - The Tenchi Bridge.mp4',            '1.79 GiB',   6, 'episode'],
  ['s5e37', 'Episode 37 - Blank Page',                     'Season 5 - Tenchi Bridge Investigation/Naruto Episode 37 - Blank Page.mp4',                   '1.46 GiB',   6, 'episode'],
  ['s5e38', 'Episode 38 - Reunion',                        'Season 5 - Tenchi Bridge Investigation/Naruto Episode 38 - Reunion.mp4',                      '905.15 MiB', 6, 'episode'],

  // ---------- S7 — Akatsuki Suppression (folder: Season 6) ----------
  ['s6e39', 'Episode 39 - The Quietly Approaching Threat', 'Season 6 - Akatsuki Suppression/Naruto Episode 39 - The Quietly Approaching Threat.mp4',     '2.77 GiB',   7, 'episode'],
  ['s6e40', 'Episode 40 - Akatsuki Investigation',         'Season 6 - Akatsuki Suppression/Naruto Episode 40 - Akatsuki Investigation.mp4',              '3.74 GiB',   7, 'episode'],
  ['s6e41', 'Episode 41 - Climbing Silver',                'Season 6 - Akatsuki Suppression/Naruto Episode 41 - Climbing Silver-1.m4v',                   '724.05 MiB', 7, 'episode'],
  ['s6e42', 'Episode 42 - Those called Immortal',          'Season 6 - Akatsuki Suppression/Naruto Episode 42 - Those called Immortal.mp4',               '4.15 GiB',   7, 'episode'],
  ['s6e43', 'Episode 43 - The Price of Power',             'Season 6 - Akatsuki Suppression/Naruto Episode 43 - The Price of Power.mp4',                  '3.25 GiB',   7, 'episode'],

  // ---------- S8 — Hunt for the Traitor (folder: Season 7) ----------
  ['s7e44', "Episode 44 - The Serpent's Pupil",            "Season 7 - Hunt for the Traitor/Naruto Episode 44 - The Serpent's Pupil.m4v",                 '699.17 MiB', 8, 'episode'],
  ['s7e45', 'Episode 45 - The Hunt',                       'Season 7 - Hunt for the Traitor/Naruto Episode 45 - The Hunt.m4v',                            '643.79 MiB', 8, 'episode'],
  ['s7e46', 'Episode 46 - The Black Flames of Brotherhood','Season 7 - Hunt for the Traitor/Naruto Episode 46 - The Black Flames of Brotherhood.mp4',     '3.88 GiB',   8, 'episode'],
  ['s7e47', 'Episode 47 - The Truth',                      'Season 7 - Hunt for the Traitor/Naruto Episode 47 - The Truth.mp4',                           '3.09 GiB',   8, 'episode'],

  // ---------- S9 — Jiraiya the Gallant (folder: Season 8) ----------
  ['s8e48', 'Episode 48 - Tales of a Gutsy Ninja',         'Season 8 - Jiraiya the Gallant/Naruto Episode 48 - Tales of a Gutsy Ninja.mp4',               '2.18 GiB',   9, 'episode'],
  ['s8e49', 'Episode 49 - Mystery Under The Rainclouds',   'Season 8 - Jiraiya the Gallant/Naruto Episode 49 - Mystery Under The Rainclouds 1-1.m4v',     '700.31 MiB', 9, 'episode'],

  // ---------- S10 — Unleashed (folder: Season 9) ----------
  ['s9e50', 'Episode 50 - Wanderer',                       'Season 9 - Unleashed (OPTIONAL)/Naruto Episode 50 - Wanderer.m4v',                            '584.22 MiB', 10, 'episode'],
  ['s9e51', 'Episode 51 - Master',                         'Season 9 - Unleashed (OPTIONAL)/Naruto Episode 51 - Master.mp4',                              '3.27 GiB',   10, 'episode'],

  // ---------- S11 — Pain (folder: Season 10) ----------
  ['s10e52', 'Episode 52 - Somber News',                   'Season 10 - Pain/Naruto Episode 52 - Somber News.mp4',                                        '3.81 GiB',   11, 'episode'],
  ['s10e53', 'Episode 53 - Escalation',                    'Season 10 - Pain/Naruto Episode 53 - Escalation.m4v',                                         '1.35 GiB',   11, 'episode'],
  ['s10e54', 'Episode 54 - Assault',                       'Season 10 - Pain/Naruto Episode 54 - Assault-1.m4v',                                          '852.20 MiB', 11, 'episode'],
  ['s10e55', 'Episode 55 - The Hero of the Leaf',          'Season 10 - Pain/Naruto Episode 55 - The Hero of the Leaf_1.mp4',                             '4.56 GiB',   11, 'episode'],
  ['s10e56', 'Episode 56 - The Tale Of Naruto Uzumaki',    'Season 10 - Pain/Naruto Episode 56 - The Tale Of Naruto Uzumaki-1.m4v',                       '2.26 GiB',   11, 'episode'],

  // ---------- S12 — Kage Summit (folder: Season 11) ----------
  ['s11e57', 'Episode 57 - Rising Tensions',               'Season 11 - Kage Summit/Naruto Episode 57 - Rising Tensions.mp4',                             '4.70 GiB',   12, 'episode'],
  ['s11e58', 'Episode 58 - The Summit',                    'Season 11 - Kage Summit/Naruto Episode 58 - The Summit.m4v',                                  '1.51 GiB',   12, 'episode'],
  ['s11e59', 'Episode 59 - Racing Minds',                  'Season 11 - Kage Summit/Naruto Episode 59 - Racing Minds.mp4',                                '4.41 GiB',   12, 'episode'],
  ['s11e60', 'Episode 60 - The Power of the Elder',        'Season 11 - Kage Summit/Naruto Episode 60 - The Power of the Elder.mp4',                      '4.73 GiB',   12, 'episode'],
  ['s11e61', 'Episode 61 - High-Level Shinobi',            'Season 11 - Kage Summit/Naruto Episode 61 - High-Level Shinobi.mp4',                          '4.35 GiB',   12, 'episode'],
  ['s11e62', 'Episode 62 - Calm before the Storm',         'Season 11 - Kage Summit/Naruto Episode 62 - Calm before the Storm.mp4',                       '4.28 GiB',   12, 'episode'],

  // ---------- S13 — Island of Purification (folder: Season 12) ----------
  ['s12e63', 'Episode 63 - The Waterfall of Truth',        'Season 12 - Island of Purification /Naruto Episode 63 - The Waterfall of Truth.mp4',         '4.71 GiB',   13, 'episode'],
  ['s12e64', 'Episode 64 - The Nine-Tailed Fox',           'Season 12 - Island of Purification /Naruto Episode 64 - The Nine-Tailed Fox.m4v',             '1.13 GiB',   13, 'episode'],
  ['s12e65', 'Episode 65 - The Shark and the Angel',       'Season 12 - Island of Purification /Naruto Episode 65 - The Shark and the Angel.mp4',         '4.77 GiB',   13, 'episode'],

  // ---------- S14 — The War (folder: Season 13) ----------
  ['s13e66', 'Episode 66 - Alliance',                      'Season 13 - The War/Naruto Episode 66 - Alliance.mp4',                                        '4.72 GiB',   14, 'episode'],
  ['s13e67', 'Episode 67 - War!',                          'Season 13 - The War/Naruto Episode 67 - War!.mp4',                                            '3.73 GiB',   14, 'episode'],
  ['s13e68', 'Episode 68 - The First Enemy',               'Season 13 - The War/Naruto Episode 68 - The First Enemy.mp4',                                 '3.74 GiB',   14, 'episode'],
  ['s13e69', 'Episode 69 - Battle On The Beach',           'Season 13 - The War/Naruto Episode 69 - Battle On The Beach-1.m4v',                           '1.03 GiB',   14, 'episode'],
  ['s13e70', 'Episode 70 - Golden Bonds',                  'Season 13 - The War/Naruto Episode 70 - Golden Bonds.mp4',                                    '4.98 GiB',   14, 'episode'],
  ['s13e71', 'Episode 71 - Nightfall',                     'Season 13 - The War/Naruto Episode 71 - Nightfall-1.m4v',                                     '1.12 GiB',   14, 'episode'],
  ['s13e72', 'Episode 72 - Company 3',                     'Season 13 - The War/Naruto Episode 72 - Company 3.mp4',                                       '3.98 GiB',   14, 'episode'],

  // ---------- S15 — Counterattack (folder: Season 14) ----------
  ['s14e73', 'Episode 73 - The Acknowledged One',          "Season 14 - Naruto's Counterattack/Naruto Episode 73 - The Acknowledged One-1.m4v",           '1.01 GiB',   15, 'episode'],
  ['s14e74', 'Episode 74 - Reinforcements!',               "Season 14 - Naruto's Counterattack/Naruto Episode 74 - Reinforcements!-1.m4v",                '1.06 GiB',   15, 'episode'],

  // ---------- S16 — Worst Case Scenario (folder: Season 15) ----------
  ['s15e75', 'Episode 75 - Madara Uchiha',                 'Season 15 - Worst Case Scenario/Naruto Episode 75 - Madara Uchiha.m4v',                       '1.07 GiB',   16, 'episode'],
  ['s15e76', 'Episode 76 - Tailed Beasts',                 'Season 15 - Worst Case Scenario/Naruto Episode 76 - Tailed Beasts.m4v',                       '1.09 GiB',   16, 'episode'],
  ['s15e77', 'Episode 77 - Eyes That See in the Dark',     'Season 15 - Worst Case Scenario/Naruto Episode 77 - Eyes That See in the Dark.mp4',           '4.68 GiB',   16, 'episode'],
  ['s15e78', 'Episode 78 - I Will Love You, Always',       'Season 15 - Worst Case Scenario/Naruto Episode 78 - I Will Love You, Always.m4v',             '991.21 MiB', 16, 'episode'],
  ['s15e79', 'Episode 79 - Unmasked',                      'Season 15 - Worst Case Scenario/Naruto Episode 79 - Unmasked.mp4',                            '4.76 GiB',   16, 'episode'],

  // ---------- S17 — Hell (folder: Season 16) ----------
  ['s16e80', 'Episode 80 - Hell',                          'Season 16 - Hell/Naruto Episode 80 - Hell.m4v',                                               '1.02 GiB',   17, 'episode'],
  ['s16e81', 'Episode 81 - Allied Resolve',                'Season 16 - Hell/Naruto Episode 81 - Allied Resolve.m4v',                                     '1.06 GiB',   17, 'episode'],
  ['s16e82', 'Episode 82 - The All-Knowing',               'Season 16 - Hell/Naruto Episode 82 - The All-Knowing.m4v',                                    '969.84 MiB', 17, 'episode'],
  ['s16e83', 'Episode 83 - The New Sannin',                'Season 16 - Hell/Naruto Episode 83 - The New Sannin.mp4',                                     '4.76 GiB',   17, 'episode'],
  ['s16e84', "Episode 84 - Kakashi's Phantom",             "Season 16 - Hell/Naruto Episode 84 - Kakashi's Phantom.m4v",                                  '1.35 GiB',   17, 'episode'],
  ['s16e85', 'Episode 85 - The Heart',                     'Season 16 - Hell/Naruto Episode 85 - The Heart.m4v',                                          '1.20 GiB',   17, 'episode'],
  ['s16e86', 'Episode 86 - A True Ending',                 'Season 16 - Hell/Naruto Episode 86 - A True Ending.mp4',                                      '3.66 GiB',   17, 'episode'],

  // ---------- S18 — Realm of Infinity (folder: Season 17) ----------
  ['s17e87', 'Episode 87 - The Traitor and the Beast',     'Season 17 - Realm of Infinity /Naruto Episode 87 - The Traitor and the Beast.mp4',            '4.56 GiB',   18, 'episode'],
  ['s17e88', 'Episode 88 - World Of Dreams',               'Season 17 - Realm of Infinity /Naruto Episode 88 - World Of Dreams.m4v',                      '1.41 GiB',   18, 'episode'],

  // ---------- S19 — Finale (folder: Season 18) ----------
  ['s18e89', 'Episode 89 - She, Of The Beginning',         'Season 18 - Finale/Naruto Episode 89 - She, Of The Beginning-1.m4v',                          '1.14 GiB',   19, 'episode'],
  ['s18e90', 'Episode 90 - Those Who Inherit The Future',  'Season 18 - Finale/Naruto Episode 90 - Those Who Inherit The Future-1.m4v',                   '1.22 GiB',   19, 'episode'],
  ['s18e91', 'Episode 91 - Ninja',                         'Season 18 - Finale/Naruto Episode 91 - Ninja-1.m4v',                                          '1.12 GiB',   19, 'episode'],
  ['s18sp4', 'Special #4 - Boyhood',                       'Season 18 - Finale/Special #4 - Boyhood-1.m4v',                                               '687.39 MiB', 19, 'special'],

  // ---------- S20 — Epilogue (folder: Season 19) ----------
  ['s19e1',  'Epilogue 1 - The Strategist',                'Season 19 - Epilogue (WIP)/Naruto Epilogue Episode 1 - The Strategist-1.m4v',                 '957.37 MiB', 20, 'episode'],
  ['s19e2',  'Epilogue 2 - The Last',                      'Season 19 - Epilogue (WIP)/Naruto Epilogue Episode 2 - The Last-1.m4v',                       '1.54 GiB',   20, 'episode'],
  ['s19e3',  'Epilogue 3 - The Wanderer',                  'Season 19 - Epilogue (WIP)/Naruto Epilogue Episode 3 - The Wanderer-1.m4v',                   '1.04 GiB',   20, 'episode'],
  ['s19fin', 'The Final Episode',                          'Season 19 - Epilogue (WIP)/Naruto The Final Episode-1.m4v',                                   '980.75 MiB', 20, 'final'],

  // ---------- S0 — Kakashi's Story (folder: Special Season) ----------
  ['kks1', "Kakashi's Story Ep 1 - A Mask That Hides The Heart",  "Special Season - Kakashi's Story/Kakashi's Story Episode 1 \u2013 A Mask That Hides The Heart-1.m4v", '1.38 GiB', 0, 'special'],
  ['kks2', "Kakashi's Story Ep 2 - Jonin Leader",                 "Special Season - Kakashi's Story/Kakashi's Story Episode 2 - Jonin Leader-1.m4v",             '1.29 GiB',   0, 'special']
];

// =============================================================
//  BUILD EPISODES
// =============================================================
const EPISODES = [];
const seasonCounters = {};

RAW.forEach(([shortId, title, filename, size, seasonNum, kind], idx) => {
  if (!seasonCounters[seasonNum]) seasonCounters[seasonNum] = 0;
  seasonCounters[seasonNum] += 1;
  const epNum = seasonCounters[seasonNum];

  const seasonLabel = SEASON_NAMES[seasonNum] || `Season ${seasonNum}`;
  const shortTitle  = (title.split(' - ').slice(1).join(' - ') || title).slice(0, 40);
  const thumbnail   = makeThumbnail(seasonNum, epNum, shortTitle);

  EPISODES.push({
    id: `${SERIES_ID}:${seasonNum}:${epNum}`,
    shortId,
    season: seasonNum,
    episode: epNum,
    title,
    rawTitle: title,
    filename,
    size,
    seasonLabel,
    kind,
    order: idx,
    thumbnail,
    description:
      `[${seasonLabel}] ${title}\n\n` +
      `File: ${filename.split('/').pop()}\n` +
      `Size: ${size}\n` +
      `Type: ${kind}`
  });
});

const EPISODES_BY_ID = Object.fromEntries(EPISODES.map(e => [e.id, e]));

function findEpisode(fullId) {
  return EPISODES_BY_ID[fullId] || null;
}

// =============================================================
//  CATALOG
// =============================================================
function getCatalogItems() {
  return [{
    id: SERIES_ID,
    type: 'series',
    name: SERIES_NAME,
    poster: SERIES_POSTER,
    posterShape: 'poster',
    description:
      'Naruto (2002) — The Ocean Cut Edition. Fan-made re-edit tanpa filler, ' +
      'flashback berlebihan, dan rekap.',
    releaseInfo: '2002–2007',
    imdbRating: '8.4',
    genres: ['Animation', 'Action', 'Adventure']
  }];
}

// =============================================================
//  META (rich)
// =============================================================
function getMeta(fullId) {
  if (fullId !== SERIES_ID) return null;

  const videos = EPISODES.map(e => ({
    id: e.id,
    title: e.title,
    season: e.season,
    episode: e.episode,
    thumbnail: e.thumbnail,
    overview: e.description,
    released: new Date(Date.UTC(2002, 9, 3)).toISOString(),
    runtime: '60 min'
  }));

  return {
    id: SERIES_ID,
    type: 'series',
    name: SERIES_NAME,
    poster: SERIES_POSTER,
    posterShape: 'poster',
    background: SERIES_BG,
    logo: SERIES_LOGO,
    description:
      'Naruto (2002) — The Ocean Cut Edition.\n\n' +
      'Fan-made re-edit yang memadatkan beberapa episode TV menjadi video ' +
      'panjang 50 menit – 2 jam, tanpa filler, flashback berlebihan, rekap, ' +
      'dan pacing lambat. Setiap arc disusun menjadi tontonan sinematik.\n\n' +
      'Season 1–20: Main Series (arc-based)\n' +
      "Season 0: Kakashi's Story (Special)",
    releaseInfo: '2002–2007',
    runtime: '60 min',
    imdbRating: '8.4',
    genres: ['Animation', 'Action', 'Adventure'],
    cast: CAST,
    director: DIRECTORS,
    writer: WRITERS,
    trailers: TRAILERS,
    videos
  };
}

module.exports = {
  EPISODES,
  SEASON_NAMES,
  SEASON_COLORS,
  CAST,
  TRAILERS,
  SERIES_POSTER,
  SERIES_BG,
  SERIES_LOGO,
  SERIES_ID,
  findEpisode,
  getCatalogItems,
  getMeta
};
