# Pesta 15 Tahun — Ximena (Undangan Digital)

A dependency-free, mobile-first **Pesta 15 Tahun (XV Años / quinceañera)** invitation for Ximena, written in **Bahasa Indonesia**, with an original blush/peach/rose/gold/sage art direction. It uses only HTML, CSS, inline SVG, and JavaScript—no external artwork, libraries, build tooling, or network dependencies (Google Fonts is optional and degrades gracefully to system serif/script fallbacks offline).

This is an **invitation-only** page: it presents the event details and contains **no RSVP form** or attendance-collection controls.

## Language

All user-facing copy is in natural **Bahasa Indonesia** (`<html lang="id">`). The proper noun **Ximena** is preserved. Spanish venue/parent proper names (e.g. Sagrado Corazón, Quinta La Bonita, and family names) are retained as-is. The `.ics` filename remains `xv-anos-ximena.ics`.

## Design direction

- Soft blush background with layered peach, rose-pink, gold, and sage accents
- Original hand-drawn CSS/SVG floral vines, roses, gold flourishes, and a tiara motif
- A gold tiara-clasp opening state that reveals the invitation
- Elegant script display type (`Great Vibes`) paired with a refined serif (`Cormorant Garamond`) and graceful serif/system fallbacks
- Mobile-first composition: centered container (~480px max), fluid `clamp()` typography, 44px+ tap targets, no horizontal scroll

This is an independent visual direction and does not reproduce any third-party photos, layout, or artwork.

## Sections

- Hero — "Pesta 15 Tahun" + name (Ximena) + tiara + **bingkai video intro metalik emas**
- Kutipan pembuka (opening quote)
- Orang Tua & Orang Tua Baptis (parents & godparents)
- Tanggal Acara + live countdown (Hari/Jam/Menit/Detik)
- Misa Syukur (18.00 WIB, Gereja Sagrado Corazón) with a "Lihat Lokasi" Google Maps link
- Resepsi (19.00 WIB, Gedung Pesta Quinta La Bonita) with a maps link
- Rangkaian Acara timeline (Kedatangan, Vals (Waltz), Sesi Foto, Pesta, Penutup)
- **Galeri Foto** — 4 elegant placeholder photo frames (see below)
- Kode Berpakaian (Formal / Etiket)
- Saran Hadiah (bank-transfer details placeholder)
- Penutup "Kami Menantikan Kehadiranmu!"

## Photo gallery (Galeri Foto)

The gallery renders four arch-topped, gold-bordered placeholder frames built entirely from CSS gradients and inline SVG glyphs — **no external images**. It is a single column on mobile and becomes a two-column grid at 480px and wider, with no horizontal overflow at 320/375/430px.

### How to drop in a real photo

Each `<figure class="photo-frame">` contains an HTML comment with step-by-step guidance. To replace a placeholder:

1. Create a `foto/` folder in the project root and save your images there, e.g. `foto/foto-1.jpg`, `foto/foto-2.jpg`, etc.
2. Inside the target frame, delete the `<div class="photo-frame__placeholder">…</div>` block.
3. Replace it with a standard HTML image element pointing to your local path:

   ```html
   <img class="photo-frame__img" src="foto/foto-1.jpg" alt="Ximena tersenyum saat sesi foto" loading="lazy">
   ```

4. Write **descriptive alt text** that explains what the photo shows (for screen-reader accessibility) — avoid generic text like "foto".

The `.photo-frame__img` class inherits the same arch/gold-border/aspect-ratio styling as the placeholder, so swapped-in photos keep the frame aesthetic automatically.

## Video intro (bingkai metalik emas)

Di area hero terdapat sebuah **bingkai vertikal metalik emas** (dibuat sepenuhnya dari CSS: gradien, box-shadow, dan animasi kilau/shimmer yang menghormati `prefers-reduced-motion`) — **tanpa aset berhak cipta**. Di dalamnya ada slot video HTML5 (`muted`, `playsinline`, `loop`, ramah-autoplay) yang bisa Anda ganti dengan video sendiri. Jika file video belum ada, sebuah placeholder elegan otomatis tampil, **tanpa error di console**.

### Cara memasang video intro asli

1. Buat folder bernama `video/` di root proyek (sejajar dengan `index.html`).
2. Simpan file video Anda di dalamnya sebagai `video/intro.mp4`.
3. (Opsional) Simpan gambar poster di `foto/intro-poster.jpg` agar tampil sebelum video diputar.
4. Selesai — video akan muncul otomatis di dalam bingkai emas.

Video sengaja dibuat **tanpa suara (muted)** agar tidak bentrok dengan lagu latar.

## Lagu latar (background music)

Halaman memuat elemen `<audio id="bg-music" loop preload="auto">` (tanpa atribut `autoplay`). Lagu mulai **tepat saat tamu menekan "Buka Undangan"** — ketukan itu adalah interaksi pengguna yang diizinkan browser untuk memutar suara. Sebuah tombol bulat emas di kanan-bawah (target sentuh 44px+, `aria-label` "Putar atau jeda musik", status via `aria-pressed`) memungkinkan tamu menjeda/melanjutkan lagu. Jika file lagu belum ada, semuanya tetap berjalan **tanpa error di console**.

### Cara memasang lagu latar asli

1. Buat folder bernama `audio/` di root proyek (sejajar dengan `index.html`).
2. Simpan file lagu Anda di dalamnya sebagai `audio/lagu.mp3`.
3. Selesai — lagu akan mulai otomatis saat undangan dibuka.

## Local folders & files (media)

| Path | Fungsi | Wajib? |
| --- | --- | --- |
| `video/intro.mp4` | Video intro di dalam bingkai emas hero | Opsional (placeholder tampil bila kosong) |
| `foto/intro-poster.jpg` | Poster/thumbnail video intro | Opsional |
| `audio/lagu.mp3` | Lagu latar yang diputar saat undangan dibuka | Opsional |
| `foto/foto-1.jpg` … `foto-4.jpg` | Foto galeri | Opsional |

## Features

- Opening state with keyboard-accessible tiara button (tap to open)
- Metallic gold intro-video frame with graceful placeholder fallback (self-hosted, replaceable)
- Background music that starts on the "Buka Undangan" tap, with an accessible gold play/pause toggle
- Live countdown to the event date
- Downloadable `.ics` "Tambah ke Kalender" button (informational)
- Editable event data in `app.js` (`eventConfig`)
- Visible keyboard focus, 44px+ interactive controls, and `prefers-reduced-motion` support
- Static hosting ready; no dependencies or build step

## Local preview

From the repository root:

```bash
python3 -m http.server 8080
```

Open <http://localhost:8080>. Stop with `Ctrl+C`.

## Verify

```bash
node tests/verify.mjs
```

The dependency-free verification script confirms the invitation-only markup: the RSVP form is absent, and the Indonesian copy, `lang="id"`, opening state, hero/tiara, quote, orang tua & orang tua baptis, countdown (Hari/Jam/Menit/Detik), Misa/Resepsi maps links, rangkaian acara timeline, **Galeri Foto placeholder frames**, dress code, gifts hooks, closing, palette, script type, mobile query, control sizing, and reduced-motion provision are present.

## Customize

1. Change display copy (names, venues, quote, bank details) in `index.html`.
2. Change calendar/countdown data in `eventConfig` near the top of `app.js`.
3. Update the Google Maps `query` values in the `Lihat Lokasi` links to the exact venue addresses.
4. Add real photos to the `Galeri Foto` frames (see "How to drop in a real photo" above).

## Deploy to GitHub Pages

1. Push this repository to GitHub (from the branch you want to publish).
2. Go to **Settings → Pages** and select **Deploy from a branch**.
3. Choose that branch and the **/(root)** folder.
4. Save and use the published URL GitHub provides.

## Project files

- `index.html` — semantic invitation structure and Bahasa Indonesia copy (incl. intro-video frame + background audio)
- `styles.css` — responsive visual system, floral/gold ornaments, gallery frames, metallic intro frame, music toggle, and accessibility styles
- `app.js` — opening interaction (starts the background song), music play/pause toggle, live countdown, and ICS download
- `tests/verify.mjs` — dependency-free static contract verification
