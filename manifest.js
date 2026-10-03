module.exports = {
  id: 'org.oceancut.naruto',
  version: '1.0.0',
  name: 'Naruto Ocean Cut',
  description:
    'Naruto (2002) the Ocean Cut Edition — fan-made re-edit tanpa filler/flashback/rekap. ' +
    'Powered by TorBox. Setiap "episode" adalah video panjang 50 menit – 2 jam.',
  logo: 'https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg',
  background: 'https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg',
  resources: ['catalog', 'meta', 'stream'],
  types: ['movie'],
  catalogs: [
    {
      type: 'movie',
      id: 'naruto-ocean-cut',
      name: 'Naruto Ocean Cut',
      extra: [
        { name: 'search', isRequired: false },
        { name: 'skip', isRequired: false }
      ]
    }
  ],
  idPrefixes: ['oc.naruto:'],
  behaviorHints: {
    configurable: true,
    configurationRequired: false
  }
};