// =============================================================
//  data.js — Series struktur (Season + Episode)
//  Naruto Ocean Cut Edition
// =============================================================

const SEASON_NAMES = {
  0: 'Land of Waves',
  1: 'Chunin Exams',
  2: 'Search for Hope',
  3: 'Retrieval Mission',
  4: 'Kazekage Rescue',
  5: 'Tenchi Bridge Investigation',
  6: 'Akatsuki Suppression',
  7: 'Hunt for the Traitor',
  8: 'Jiraiya the Gallant',
  9: 'Unleashed (Optional)',
  10: 'Pain',
  11: 'Kage Summit',
  12: 'Island of Purification',
  13: 'The War',
  14: "Naruto's Counterattack",
  15: 'Worst Case Scenario',
  16: 'Hell',
  17: 'Realm of Infinity',
  18: 'Finale',
  19: 'Epilogue (WIP)',
  kk: "Kakashi's Story"
};

const SEASON_POSTERS = {
  0:  'https://static.wikia.nocookie.net/naruto/images/2/21/Land_of_Waves_Arc.png/revision/latest',
  1:  'https://static.wikia.nocookie.net/naruto/images/a/a3/Chunin_Exams_Arc.png/revision/latest',
  2:  'https://static.wikia.nocookie.net/naruto/images/6/6a/Search_for_Tsunade_Arc.png/revision/latest',
  3:  'https://static.wikia.nocookie.net/naruto/images/0/0e/Sasuke_Retrieval_Arc.png/revision/latest',
  4:  'https://static.wikia.nocookie.net/naruto/images/e/e0/Kazekage_Rescue_Arc.png/revision/latest',
  5:  'https://static.wikia.nocookie.net/naruto/images/3/3a/Tenchi_Bridge_Arc.png/revision/latest',
  6:  'https://static.wikia.nocookie.net/naruto/images/4/45/Akatsuki_Suppression_Arc.png/revision/latest',
  7:  'https://static.wikia.nocookie.net/naruto/images/b/be/Itachi_Pursuit_Arc.png/revision/latest',
  8:  'https://static.wikia.nocookie.net/naruto/images/a/a0/Jiraiya_the_Gallant_Arc.png/revision/latest',
  10: 'https://static.wikia.nocookie.net/naruto/images/1/1c/Pain%27s_Assault_Arc.png/revision/latest',
  11: 'https://static.wikia.nocookie.net/naruto/images/f/f3/Five_Kage_Summit_Arc.png/revision/latest',
  13: 'https://static.wikia.nocookie.net/naruto/images/6/6c/Fourth_Shinobi_World_War_Arc.png/revision/latest',
  19: 'https://static.wikia.nocookie.net/naruto/images/5/5c/Epilogue_Arc.png/revision/latest',
  kk: 'https://static.wikia.nocookie.net/naruto/images/1/1c/Kakashi_Chronicles_Arc.png/revision/latest'
};

const SERIES_POSTER = 'https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg';
const SERIES_BG     = 'https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg';
const SERIES_ID     = 'oc.naruto';
const SERIES_NAME   = 'Naruto Ocean Cut';

// Helper untuk memetakan key season -> nomor season Stremio
// Season 0 kita = Season 1 di Stremio (karena S0 di Stremio = Specials)
function toSeasonNumber(seasonKey) {
  if (seasonKey === 'kk') return 100;
  return Number(seasonKey) + 1; // 0→1, 1→2, ..., 19→20
}

// =============================================================
//  RAW DATA — [shortId, title, filename, size, seasonKey, kind]
// =============================================================
const RAW = [
  // ---------- SEASON 0 — Land of Waves ----------
  ['s0e1',  'Enter Naruto Uzumaki!',                              'Season 0 - Land of Waves/Naruto Episode 1 - Enter Naruto Uzumaki!.mp4',                     '3.66 GiB', 0,  'episode'],
  ['s0e2',  'Journey To The Land Of Waves!',                      'Season 0 - Land of Waves/Naruto Episode 2 - Journey To The Land Of Waves!.mp4',              '4.28 GiB', 0,  'episode'],
  ['s0e3',  'The Forest of Chakra',                               'Season 0 - Land of Waves/Naruto Episode 3 - The Forest of Chakra.mp4',                       '3.32 GiB', 0,  'episode'],
  ['s0e4',  'Hakus Secret Jutsu!',                                'Season 0 - Land of Waves/Naruto Episode 4 - Hakus Secret Jutsu!.mp4',                        '3.42 GiB', 0,  'episode'],
  ['s0e5',  'White Past, Hidden Ambition',                        'Season 0 - Land of Waves/Naruto Episode 5 - White Past, Hidden Ambition.mp4',                '2.83 GiB', 0,  'episode'],
  ['s0sp1', "SPECIAL #1 - Inari's Test of Courage",               "Season 0 - Land of Waves/SPECIAL #1 - Inari's Test of Courage.mp4",                          '1.83 GiB', 0,  'special'],

  // ---------- SEASON 1 — Chunin Exams ----------
  ['s1e6',  'A new Chapter begins!',                              'Season 1 - Chunin Exams/Naruto Episode 6 - A new Chapter begins!.mp4',                        '3.13 GiB', 1,  'episode'],
  ['s1e7',  'Genin Takedown!',                                    'Season 1 - Chunin Exams/Naruto Episode 7 - Genin Takedown!.mp4',                              '3.77 GiB', 1,  'episode'],
  ['s1e8',  'The Forest of Death',                                'Season 1 - Chunin Exams/Naruto Episode 8 - The Forest of Death.mp4',                          '3.39 GiB', 1,  'episode'],
  ['s1e9',  'Sakura Blossoms, Sasuke Awakens!',                   'Season 1 - Chunin Exams/Naruto Episode 9 - Sakura Blossoms, Sasuke Awakens!.mp4',             '4.00 GiB', 1,  'episode'],
  ['s1e10', 'Preliminary Persistence',                            'Season 1 - Chunin Exams/Naruto Episode 10 - Preliminary Persistence.m4v',                     '518.48 MiB', 1, 'episode'],
  ['s1e11', 'Top Dog',                                            'Season 1 - Chunin Exams/Naruto Episode 11 - Top Dog.mp4',                                     '2.73 GiB', 1,  'episode'],
  ['s1e12', 'Splendid Ninja',                                     'Season 1 - Chunin Exams/Naruto Episode 12 - Splendid Ninja.m4v',                              '639.65 MiB', 1, 'episode'],
  ['s1e13', "Naruto's Hardest Training Yet!",                     "Season 1 - Chunin Exams/Naruto Episode 13 - Naruto's Hardest Training Yet!.m4v",              '601.61 MiB', 1, 'episode'],
  ['s1e14', 'The Final Rounds Begin!',                            'Season 1 - Chunin Exams/Naruto Episode 14 - The Final Rounds Begin!.m4v',                     '455.02 MiB', 1, 'episode'],
  ['s1e15', 'Dancing Leaf, Squirming Sand!',                      'Season 1 - Chunin Exams/Naruto Episode 15 - Dancing Leaf, Squirming Sand!.m4v',               '479.21 MiB', 1, 'episode'],
  ['s1e16', 'Zero Hour!',                                         'Season 1 - Chunin Exams/Naruto Episode 16 - Zero Hour!.m4v',                                  '637.63 MiB', 1, 'episode'],
  ['s1e17', 'Beyond Darkness And Light',                          'Season 1 - Chunin Exams/Naruto Episode 17 - Beyond Darkness And Light.m4v',                   '863.25 MiB', 1, 'episode'],
  ['s1sp2', "Special #2 - Kakashi's Face!",                       "Season 1 - Chunin Exams/Special #2 - Kakashi's Face!-1.m4v",                                  '662.33 MiB', 1, 'special'],

  // ---------- SEASON 2 — Search for Hope ----------
  ['s2e18', 'The Morning Mist',                                   'Season 2 - Search for Hope/Naruto Episode 18 - The Morning Mist-1.m4v',                       '506.91 MiB', 2, 'episode'],
  ['s2e19', 'A New Training Begins!',                             'Season 2 - Search for Hope/Naruto Episode 19 - A New Training Begins!.mp4',                   '3.77 GiB', 2,  'episode'],
  ['s2e20', 'The Necklace of Death!',                             'Season 2 - Search for Hope/Naruto Episode 20 - The Necklace of Death!.mp4',                   '4.24 GiB', 2,  'episode'],
  ['s2e21', 'Breakdown!',                                         'Season 2 - Search for Hope/Naruto Episode 21 - Breakdown!-1.m4v',                             '484.40 MiB', 2, 'episode'],

  // ---------- SEASON 3 — Retrieval Mission ----------
  ['s3e22', 'Patients',                                           'Season 3 - Retrieval Mission/Naruto Episode 22 - Patients-1.m4v',                             '495.74 MiB', 3, 'episode'],
  ['s3e23', 'Comrades',                                           'Season 3 - Retrieval Mission/Naruto Episode 23 - Comrades.m4v',                               '575.03 MiB', 3, 'episode'],
  ['s3e24', 'Opponents',                                          'Season 3 - Retrieval Mission/Naruto Episode 24 - Opponents-1.m4v',                            '498.26 MiB', 3, 'episode'],
  ['s3e25', 'Warriors',                                           'Season 3 - Retrieval Mission/Naruto Episode 25 - Warriors-1.m4v',                             '695.36 MiB', 3, 'episode'],
  ['s3e26', 'Allies',                                             'Season 3 - Retrieval Mission/Naruto Episode 26 - Allies.mp4',                                 '3.93 GiB', 3,  'episode'],
  ['s3e27', 'Brothers',                                           'Season 3 - Retrieval Mission/Naruto Episode 27 - Brothers.mp4',                               '4.06 GiB', 3,  'episode'],
  ['s3e28', 'Friends',                                            'Season 3 - Retrieval Mission/Naruto Episode 28 - Friends-1.m4v',                              '550.64 MiB', 3, 'episode'],
  ['s3sp3', 'SPECIAL #3 - Boy on the Battlefield',                'Season 3 - Retrieval Mission/SPECIAL #3 - Boy on the Battlefield.mp4',                        '2.32 GiB', 3,  'special'],

  // ---------- SEASON 4 — Kazekage Rescue ----------
  ['s4e29', 'Homecoming',                                         'Season 4 - Kazekage Rescue/Naruto Episode 29 - Homecoming.mp4',                               '2.23 GiB', 4,  'episode'],
  ['s4e30', 'Team Kakashi, Deployed',                             'Season 4 - Kazekage Rescue/Naruto Episode 30 - Team Kakashi, Deployed.mp4',                   '1.94 GiB', 4,  'episode'],
  ['s4e31', 'A Meeting with Destiny',                             'Season 4 - Kazekage Rescue/Naruto Episode 31 - A Meeting with Destiny.mp4',                   '1.31 GiB', 4,  'episode'],
  ['s4e32', 'The Secret of Jinchuriki',                           'Season 4 - Kazekage Rescue/Naruto Episode 32 - The Secret of Jinchuriki.mp4',                 '1.30 GiB', 4,  'episode'],
  ['s4e33', 'Kunoichi vs The Puppetmaster',                       'Season 4 - Kazekage Rescue/Naruto Episode 33 - Kunoichi vs The Puppetmaster.mp4',             '2.40 GiB', 4,  'episode'],
  ['s4e34', 'Legacy',                                             'Season 4 - Kazekage Rescue/Naruto Episode 34 - Legacy.mp4',                                   '1.46 GiB', 4,  'episode'],

  // ---------- SEASON 5 — Tenchi Bridge Investigation ----------
  ['s5e35', 'The New Target',                                     'Season 5 - Tenchi Bridge Investigation/Naruto Episode 35 - The New Target.mp4',               '1.78 GiB', 5,  'episode'],
  ['s5e36', 'The Tenchi Bridge',                                  'Season 5 - Tenchi Bridge Investigation/Naruto Episode 36 - The Tenchi Bridge.mp4',            '1.79 GiB', 5,  'episode'],
  ['s5e37', 'Blank Page',                                         'Season 5 - Tenchi Bridge Investigation/Naruto Episode 37 - Blank Page.mp4',                   '1.46 GiB', 5,  'episode'],
  ['s5e38', 'Reunion',                                            'Season 5 - Tenchi Bridge Investigation/Naruto Episode 38 - Reunion.mp4',                      '905.15 MiB', 5, 'episode'],

  // ---------- SEASON 6 — Akatsuki Suppression ----------
  ['s6e39', 'The Quietly Approaching Threat',                     'Season 6 - Akatsuki Suppression/Naruto Episode 39 - The Quietly Approaching Threat.mp4',     '2.77 GiB', 6,  'episode'],
  ['s6e40', 'Akatsuki Investigation',                             'Season 6 - Akatsuki Suppression/Naruto Episode 40 - Akatsuki Investigation.mp4',              '3.74 GiB', 6,  'episode'],
  ['s6e41', 'Climbing Silver',                                    'Season 6 - Akatsuki Suppression/Naruto Episode 41 - Climbing Silver-1.m4v',                   '724.05 MiB', 6, 'episode'],
  ['s6e42', 'Those called Immortal',                              'Season 6 - Akatsuki Suppression/Naruto Episode 42 - Those called Immortal.mp4',               '4.15 GiB', 6,  'episode'],
  ['s6e43', 'The Price of Power',                                 'Season 6 - Akatsuki Suppression/Naruto Episode 43 - The Price of Power.mp4',                  '3.25 GiB', 6,  'episode'],

  // ---------- SEASON 7 — Hunt for the Traitor ----------
  ['s7e44', "The Serpent's Pupil",                                "Season 7 - Hunt for the Traitor/Naruto Episode 44 - The Serpent's Pupil.m4v",                 '699.17 MiB', 7, 'episode'],
  ['s7e45', 'The Hunt',                                           'Season 7 - Hunt for the Traitor/Naruto Episode 45 - The Hunt.m4v',                            '643.79 MiB', 7, 'episode'],
  ['s7e46', 'The Black Flames of Brotherhood',                    'Season 7 - Hunt for the Traitor/Naruto Episode 46 - The Black Flames of Brotherhood.mp4',     '3.88 GiB', 7,  'episode'],
  ['s7e47', 'The Truth',                                          'Season 7 - Hunt for the Traitor/Naruto Episode 47 - The Truth.mp4',                           '3.09 GiB', 7,  'episode'],

  // ---------- SEASON 8 — Jiraiya the Gallant ----------
  ['s8e48', 'Tales of a Gutsy Ninja',                             'Season 8 - Jiraiya the Gallant/Naruto Episode 48 - Tales of a Gutsy Ninja.mp4',               '2.18 GiB', 8,  'episode'],
  ['s8e49', 'Mystery Under The Rainclouds',                       'Season 8 - Jiraiya the Gallant/Naruto Episode 49 - Mystery Under The Rainclouds 1-1.m4v',     '700.31 MiB', 8, 'episode'],

  // ---------- SEASON 9 — Unleashed (OPTIONAL) ----------
  ['s9e50', 'Wanderer',                                           'Season 9 - Unleashed (OPTIONAL)/Naruto Episode 50 - Wanderer.m4v',                            '584.22 MiB', 9, 'episode'],
  ['s9e51', 'Master',                                             'Season 9 - Unleashed (OPTIONAL)/Naruto Episode 51 - Master.mp4',                              '3.27 GiB', 9,  'episode'],

  // ---------- SEASON 10 — Pain ----------
  ['s10e52', 'Somber News',                                       'Season 10 - Pain/Naruto Episode 52 - Somber News.mp4',                                        '3.81 GiB', 10, 'episode'],
  ['s10e53', 'Escalation',                                        'Season 10 - Pain/Naruto Episode 53 - Escalation.m4v',                                         '1.35 GiB', 10, 'episode'],
  ['s10e54', 'Assault',                                           'Season 10 - Pain/Naruto Episode 54 - Assault-1.m4v',                                          '852.20 MiB', 10, 'episode'],
  ['s10e55', 'The Hero of the Leaf',                              'Season 10 - Pain/Naruto Episode 55 - The Hero of the Leaf_1.mp4',                             '4.56 GiB', 10, 'episode'],
  ['s10e56', 'The Tale Of Naruto Uzumaki',                        'Season 10 - Pain/Naruto Episode 56 - The Tale Of Naruto Uzumaki-1.m4v',                       '2.26 GiB', 10, 'episode'],

  // ---------- SEASON 11 — Kage Summit ----------
  ['s11e57', 'Rising Tensions',                                   'Season 11 - Kage Summit/Naruto Episode 57 - Rising Tensions.mp4',                             '4.70 GiB', 11, 'episode'],
  ['s11e58', 'The Summit',                                        'Season 11 - Kage Summit/Naruto Episode 58 - The Summit.m4v',                                  '1.51 GiB', 11, 'episode'],
  ['s11e59', 'Racing Minds',                                      'Season 11 - Kage Summit/Naruto Episode 59 - Racing Minds.mp4',                                '4.41 GiB', 11, 'episode'],
  ['s11e60', 'The Power of the Elder',                            'Season 11 - Kage Summit/Naruto Episode 60 - The Power of the Elder.mp4',                      '4.73 GiB', 11, 'episode'],
  ['s11e61', 'High-Level Shinobi',                                'Season 11 - Kage Summit/Naruto Episode 61 - High-Level Shinobi.mp4',                          '4.35 GiB', 11, 'episode'],
  ['s11e62', 'Calm before the Storm',                             'Season 11 - Kage Summit/Naruto Episode 62 - Calm before the Storm.mp4',                       '4.28 GiB', 11, 'episode'],

  // ---------- SEASON 12 — Island of Purification ----------
  ['s12e63', 'The Waterfall of Truth',                            'Season 12 - Island of Purification /Naruto Episode 63 - The Waterfall of Truth.mp4',         '4.71 GiB', 12, 'episode'],
  ['s12e64', 'The Nine-Tailed Fox',                               'Season 12 - Island of Purification /Naruto Episode 64 - The Nine-Tailed Fox.m4v',             '1.13 GiB', 12, 'episode'],
  ['s12e65', 'The Shark and the Angel',                           'Season 12 - Island of Purification /Naruto Episode 65 - The Shark and the Angel.mp4',         '4.77 GiB', 12, 'episode'],

  // ---------- SEASON 13 — The War ----------
  ['s13e66', 'Alliance',                                          'Season 13 - The War/Naruto Episode 66 - Alliance.mp4',                                        '4.72 GiB', 13, 'episode'],
  ['s13e67', 'War!',                                              'Season 13 - The War/Naruto Episode 67 - War!.mp4',                                            '3.73 GiB', 13, 'episode'],
  ['s13e68', 'The First Enemy',                                   'Season 13 - The War/Naruto Episode 68 - The First Enemy.mp4',                                 '3.74 GiB', 13, 'episode'],
  ['s13e69', 'Battle On The Beach',                               'Season 13 - The War/Naruto Episode 69 - Battle On The Beach-1.m4v',                           '1.03 GiB', 13, 'episode'],
  ['s13e70', 'Golden Bonds',                                      'Season 13 - The War/Naruto Episode 70 - Golden Bonds.mp4',                                    '4.98 GiB', 13, 'episode'],
  ['s13e71', 'Nightfall',                                         'Season 13 - The War/Naruto Episode 71 - Nightfall-1.m4v',                                     '1.12 GiB', 13, 'episode'],
  ['s13e72', 'Company 3',                                         'Season 13 - The War/Naruto Episode 72 - Company 3.mp4',                                       '3.98 GiB', 13, 'episode'],

  // ---------- SEASON 14 — Naruto's Counterattack ----------
  ['s14e73', 'The Acknowledged One',                              "Season 14 - Naruto's Counterattack/Naruto Episode 73 - The Acknowledged One-1.m4v",           '1.01 GiB', 14, 'episode'],
  ['s14e74', 'Reinforcements!',                                   "Season 14 - Naruto's Counterattack/Naruto Episode 74 - Reinforcements!-1.m4v",                '1.06 GiB', 14, 'episode'],

  // ---------- SEASON 15 — Worst Case Scenario ----------
  ['s15e75', 'Madara Uchiha',                                     'Season 15 - Worst Case Scenario/Naruto Episode 75 - Madara Uchiha.m4v',                       '1.07 GiB', 15, 'episode'],
  ['s15e76', 'Tailed Beasts',                                     'Season 15 - Worst Case Scenario/Naruto Episode 76 - Tailed Beasts.m4v',                       '1.09 GiB', 15, 'episode'],
  ['s15e77', 'Eyes That See in the Dark',                         'Season 15 - Worst Case Scenario/Naruto Episode 77 - Eyes That See in the Dark.mp4',           '4.68 GiB', 15, 'episode'],
  ['s15e78', 'I Will Love You, Always',                           'Season 15 - Worst Case Scenario/Naruto Episode 78 - I Will Love You, Always.m4v',             '991.21 MiB', 15, 'episode'],
  ['s15e79', 'Unmasked',                                          'Season 15 - Worst Case Scenario/Naruto Episode 79 - Unmasked.mp4',                            '4.76 GiB', 15, 'episode'],

  // ---------- SEASON 16 — Hell ----------
  ['s16e80', 'Hell',                                              'Season 16 - Hell/Naruto Episode 80 - Hell.m4v',                                               '1.02 GiB', 16, 'episode'],
  ['s16e81', 'Allied Resolve',                                    'Season 16 - Hell/Naruto Episode 81 - Allied Resolve.m4v',                                     '1.06 GiB', 16, 'episode'],
  ['s16e82', 'The All-Knowing',                                   'Season 16 - Hell/Naruto Episode 82 - The All-Knowing.m4v',                                    '969.84 MiB', 16, 'episode'],
  ['s16e83', 'The New Sannin',                                    'Season 16 - Hell/Naruto Episode 83 - The New Sannin.mp4',                                     '4.76 GiB', 16, 'episode'],
  ['s16e84', "Kakashi's Phantom",                                 "Season 16 - Hell/Naruto Episode 84 - Kakashi's Phantom.m4v",                                  '1.35 GiB', 16, 'episode'],
  ['s16e85', 'The Heart',                                         'Season 16 - Hell/Naruto Episode 85 - The Heart.m4v',                                          '1.20 GiB', 16, 'episode'],
  ['s16e86', 'A True Ending',                                     'Season 16 - Hell/Naruto Episode 86 - A True Ending.mp4',                                      '3.66 GiB', 16, 'episode'],

  // ---------- SEASON 17 — Realm of Infinity ----------
  ['s17e87', 'The Traitor and the Beast',                         'Season 17 - Realm of Infinity /Naruto Episode 87 - The Traitor and the Beast.mp4',            '4.56 GiB', 17, 'episode'],
  ['s17e88', 'World Of Dreams',                                   'Season 17 - Realm of Infinity /Naruto Episode 88 - World Of Dreams.m4v',                      '1.41 GiB', 17, 'episode'],

  // ---------- SEASON 18 — Finale ----------
  ['s18e89', 'She, Of The Beginning',                             'Season 18 - Finale/Naruto Episode 89 - She, Of The Beginning-1.m4v',                          '1.14 GiB', 18, 'episode'],
  ['s18e90', 'Those Who Inherit The Future',                      'Season 18 - Finale/Naruto Episode 90 - Those Who Inherit The Future-1.m4v',                   '1.22 GiB', 18, 'episode'],
  ['s18e91', 'Ninja',                                             'Season 18 - Finale/Naruto Episode 91 - Ninja-1.m4v',                                          '1.12 GiB', 18, 'episode'],
  ['s18sp4', 'Special #4 - Boyhood',                              'Season 18 - Finale/Special #4 - Boyhood-1.m4v',                                               '687.39 MiB', 18, 'special'],

  // ---------- SEASON 19 — Epilogue (WIP) ----------
  ['s19e1',  'Epilogue 1 — The Strategist',                       'Season 19 - Epilogue (WIP)/Naruto Epilogue Episode 1 - The Strategist-1.m4v',                 '957.37 MiB', 19, 'episode'],
  ['s19e2',  'Epilogue 2 — The Last',                             'Season 19 - Epilogue (WIP)/Naruto Epilogue Episode 2 - The Last-1.m4v',                       '1.54 GiB', 19, 'episode'],
  ['s19e3',  'Epilogue 3 — The Wanderer',                         'Season 19 - Epilogue (WIP)/Naruto Epilogue Episode 3 - The Wanderer-1.m4v',                   '1.04 GiB', 19, 'episode'],
  ['s19fin', 'The Final Episode',                                 'Season 19 - Epilogue (WIP)/Naruto The Final Episode-1.m4v',                                   '980.75 MiB', 19, 'final'],

  // ---------- KAKASHI'S STORY ----------
  ['kks1', "Kakashi's Story Ep 1 — A Mask That Hides The Heart",  "Special Season - Kakashi's Story/Kakashi's Story Episode 1 \u2013 A Mask That Hides The Heart-1.m4v", '1.38 GiB', 'kk', 'kakashi'],
  ['kks2', "Kakashi's Story Ep 2 — Jonin Leader",                 "Special Season - Kakashi's Story/Kakashi's Story Episode 2 - Jonin Leader-1.m4v",             '1.29 GiB', 'kk', 'kakashi'],
];

// =============================================================
//  BUILD EPISODES (dengan nomor season & episode per-arc)
// =============================================================
const EPISODES = [];
const seasonCounters = {};

RAW.forEach(([shortId, title, filename, size, seasonKey, kind], idx) => {
  const seasonNum = toSeasonNumber(seasonKey);
  if (!seasonCounters[seasonNum]) seasonCounters[seasonNum] = 0;
  seasonCounters[seasonNum] += 1;
  const epNum = seasonCounters[seasonNum];

  const seasonLabel = SEASON_NAMES[seasonKey] || `Season ${seasonKey}`;
  const poster      = SEASON_POSTERS[seasonKey] || SERIES_POSTER;

  EPISODES.push({
    id: `${SERIES_ID}:${seasonNum}:${epNum}`,  // ID dipakai Stremio
    shortId,
    season: seasonNum,
    episode: epNum,
    title,
    rawTitle: title,
    filename,
    size,
    seasonKey,
    seasonLabel,
    kind,
    order: idx,
    poster,
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

// Catalog: hanya 1 item (series utama)
function getCatalogItems() {
  return [{
    id: SERIES_ID,
    type: 'series',
    name: SERIES_NAME,
    poster: SERIES_POSTER,
    posterShape: 'poster',
    description:
      'Naruto (2002) — The Ocean Cut Edition. Fan-made re-edit tanpa filler, ' +
      'flashback berlebihan, dan rekap. Setiap "episode" adalah video panjang 50 menit – 2 jam.',
    releaseInfo: '2002–2007',
    genres: ['Anime', 'Action', 'Adventure']
  }];
}

// Meta: 1 series dengan semua video
function getMeta(fullId) {
  if (fullId !== SERIES_ID) return null;

  const videos = EPISODES.map(e => ({
    id: e.id,
    title: e.title,
    season: e.season,
    episode: e.episode,
    thumbnail: e.poster,
    overview: e.description,
    released: new Date(Date.UTC(2002, 9, 3)).toISOString()
  }));

  return {
    id: SERIES_ID,
    type: 'series',
    name: SERIES_NAME,
    poster: SERIES_POSTER,
    background: SERIES_BG,
    logo: SERIES_POSTER,
    description:
      'Naruto (2002) — The Ocean Cut Edition.\n\n' +
      'Fan-made re-edit tanpa filler, flashback berlebihan, rekap, dan pacing lambat. ' +
      'Setiap "episode" adalah video panjang 50 menit – 2 jam, mengelompokkan beberapa ' +
      'episode TV menjadi satu tontonan sinematik.',
    releaseInfo: '2002–2007',
    genres: ['Anime', 'Action', 'Adventure'],
    videos
  };
}

module.exports = {
  EPISODES,
  SEASON_NAMES,
  SEASON_POSTERS,
  SERIES_POSTER,
  SERIES_ID,
  findEpisode,
  getCatalogItems,
  getMeta
};
