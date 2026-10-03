# 🍥 Naruto Ocean Cut — Stremio Addon

Stremio addon untuk **Naruto (2002) the Ocean Cut Edition** — fan-edit tanpa filler,
flashback berlebihan, dan rekap. Setiap "episode" adalah video panjang 50 menit – 2 jam.
Terintegrasi dengan **TorBox** untuk streaming langsung.

## ✨ Fitur

- 100+ episode terpetakan dari Season 0 – 19 + Kakashi's Story
- Specials (#1–#4) tersedia sebagai entry terpisah
- Integrasi TorBox API (opsional, untuk direct streaming)
- Fallback ke infoHash torrent jika tanpa API key
- Pencarian & pagination di catalog Stremio
- Configure page untuk memasukkan API key

---

## 🚀 Cara Install & Jalankan

### 1. Install dependencies

```bash
mkdir naruto-ocean-cut && cd naruto-ocean-cut
# (copy semua file di atas ke folder ini)
npm install
```

### 2. Setup environment (opsional)

```bash
cp .env.example .env
# edit .env, isi TORBOX_API_KEY=... kalau mau default global
```

### 3. Jalankan

```bash
npm start
```

Output:
```
🍥 Naruto Ocean Cut addon running!
   Manifest : http://127.0.0.1:7000/manifest.json
   Configure: http://127.0.0.1:7000/configure/
```

### 4. Install di Stremio

**Via Configure Page (recommended):**

1. Buka `http://127.0.0.1:7000/configure/`
2. Isi TorBox API Key (opsional)
3. Klik **Install to Stremio** → Stremio terbuka & addon terpasang

**Manual via URL:**

- Stremio Desktop → **Addons** → **Install from URL**
- Masukkan: `http://127.0.0.1:7000/manifest.json`
- Dengan key: `http://127.0.0.1:7000/manifest.json?torbox=YOUR_KEY`

**Stremio Web:**

- Buka `https://web.stremio.com/` → Addons → Install from URL
- Masukkan URL yang sama (ganti host sesuai deployment)

---

## 🌐 Deploy ke Vercel

```bash
npm i -g vercel
vercel
```

Set environment variable di dashboard Vercel:

```
TORBOX_API_KEY = your_key_here   (opsional)
```

URL setelah deploy: `https://<project>.vercel.app/manifest.json`

---

## 🔑 TorBox API Key

1. Daftar di [torbox.app](https://torbox.app)
2. Buka **Settings → API**
3. Copy API key
4. Paste di `/configure/` atau set `TORBOX_API_KEY` di `.env`

**Tanpa API key**, addon tetap berfungsi tapi hanya mengembalikan infoHash
(butuh Stremio torrent engine atau addon torrent lain untuk memutar).

---

## 📂 Struktur File

```
naruto-ocean-cut/
├── package.json
├── .env.example
├── README.md
├── index.js          # Server utama
├── manifest.js       # Manifest Stremio
├── data.js           # Pemetaan episode → filename torrent
├── torbox.js         # TorBox API helper
├── streams.js        # Handler stream
└── public/
    └── configure.html
```

---

## ⚠️ Catatan

- **Nama file di torrent harus match** dengan yang di `data.js`. Kalau torrent di-update
  oleh uploader, update juga `filename` di `data.js`.
- Beberapa folder di torrent punya trailing space (`Season 12 - Island of Purification /`).
  Addon ini melakukan **basename matching** (case-insensitive) supaya tetap cocok
  meski path sedikit berbeda.
- Kalau file belum selesai di-download TorBox, stream akan menampilkan pesan
  "File belum siap". Coba lagi beberapa menit.
- Season 19 (Epilogue) masih berstatus **WIP**.
- Season 9 (Unleashed) bersifat **OPTIONAL**.

---

## 🐛 Troubleshooting

**Addon tidak muncul di Stremio:**
- Pastikan `manifest.json` bisa diakses dari browser.
- Untuk deployment publik, gunakan HTTPS (Stremio Web wajib HTTPS).

**Stream TorBox error:**
- Cek API key valid (`Settings → API` di torbox.app).
- Cek kuota TorBox Anda.
- Cek log console server untuk detail error.

**File not found di torrent:**
- Torrent mungkin belum selesai metadata fetch. Coba lagi.
- Nama file mungkin berubah. Cek log untuk melihat file apa saja yang tersedia.

---

## 📜 Lisensi

Kode addon: MIT. Konten video bukan milik pembuat addon.