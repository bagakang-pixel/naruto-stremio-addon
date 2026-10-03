# SupJav Stremio Addon

Addon Stremio tidak resmi untuk streaming video dari [SupJav.com](https://supjav.com). Addon ini mengambil metadata dan link video langsung dari SupJav, lalu memutarnya di Stremio dengan kualitas tertinggi yang tersedia.

> **Disclaimer:** Addon ini hanya untuk penggunaan pribadi. Hormati hukum hak cipta di wilayah Anda. Proyek ini tidak berafiliasi dengan SupJav.

---

## Fitur

- **Katalog Terbaru** – Menampilkan video terbaru dari halaman utama SupJav.
- **Pencarian** – Mendukung pencarian berdasarkan judul atau kode.
- **Paginasi** – Memuat halaman berikutnya melalui parameter `skip`.
- **Metadata Lengkap** – Judul, poster, deskripsi, cast, genre, dan maker.
- **Multi-Server** – Mengekstrak link dari berbagai server (TV, FST, ST, VOE, DOOD, dll.).
- **Pemilihan Kualitas Tertinggi** – Otomatis memprioritaskan 1080p > 720p > 480p.
- **Fallback Proxy** – Menggunakan [supjavd](https://github.com/xbol0/supjavd) jika ekstraksi langsung gagal.
- **Caching** – Cache 10 menit untuk mengurangi beban scraping.

---

## Persyaratan

- **Node.js** v18 atau lebih baru
- **npm** atau **yarn**
- **Chromium/Chrome** (untuk Puppeteer)
- Sistem operasi: Linux, macOS, atau Windows

### Dependensi Sistem (Linux)

```bash
sudo apt-get update
sudo apt-get install -y \
  chromium-browser \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils
