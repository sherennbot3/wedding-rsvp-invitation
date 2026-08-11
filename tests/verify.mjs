import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const js = await readFile(new URL('../app.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

// Invitation-only: NO RSVP form / attendance-collection controls must exist.
assert.doesNotMatch(html, /id="rsvp-form"/, 'RSVP form must be removed');
assert.doesNotMatch(html, /id="guest-name"/, 'guest-name input must be removed');
assert.doesNotMatch(html, /id="attendance"/, 'attendance input must be removed');
assert.doesNotMatch(html, /id="guest-count"/, 'guest-count input must be removed');
assert.doesNotMatch(html, /<form/, 'no form element allowed');

// Language: Bahasa Indonesia.
assert.match(html, /<html lang="id">/, 'html lang must be id');
assert.match(html, /Undangan Pesta 15 Tahun Ximena/, 'meta description in Indonesian');
assert.match(html, /<title>Pesta 15 Tahun — Ximena<\/title>/, 'title in Indonesian');

// Opening state (tap to open).
assert.match(html, /id="opening"/);
assert.match(html, /id="open-button"/);
assert.match(html, /Buka Undangan/, 'open button label in Indonesian');
assert.match(html, /Ketuk tombol tiara/, 'sr-only open help in Indonesian');
assert.match(js, /open-button/);
assert.match(js, /is-opened/);
assert.match(css, /\.opening\.is-opened/);

// Hero: eyebrow + name + tiara.
assert.match(html, /PESTA 15 TAHUN/, 'hero eyebrow in Indonesian');
assert.match(html, /id="hero-name"/);
assert.match(html, />Ximena</);
assert.match(html, /class="tiara"/);
assert.match(css, /\.tiara__gem/);

// Opening quote (Indonesian).
assert.match(html, /class="quote"/);
assert.match(html, /meninggalkan masa kanak-kanak/, 'quote translated to Indonesian');

// Padres & padrinos (labels translated, names kept).
assert.match(html, /id="padres-padrinos"/);
assert.match(html, /Dengan Cinta/, 'section title Con amor -> Dengan Cinta');
assert.match(html, /Orang Tua<\/p>/, 'Mis Padres -> Orang Tua');
assert.match(html, /Orang Tua Baptis/, 'Mis Padrinos -> Orang Tua Baptis');
assert.match(html, /Rafael L[oó]pez/);
assert.match(html, /Emilia Peredo/);
assert.match(html, /Freddy P[eé]rez/);
assert.match(html, /M[oó]nica Bernal/);

// Fecha + live countdown (Indonesian labels).
assert.match(html, /id="fecha"/);
assert.match(html, /Tanggal Acara/, 'La Fecha -> Tanggal Acara');
assert.match(html, /Sabtu, 14 Maret 2026/, 'date in Indonesian');
assert.match(html, /id="countdown"/);
assert.match(html, /id="cd-days"/);
assert.match(html, /id="cd-seconds"/);
assert.match(html, /<span>Hari<\/span>/, 'countdown Hari label');
assert.match(html, /<span>Jam<\/span>/, 'countdown Jam label');
assert.match(html, /<span>Menit<\/span>/, 'countdown Menit label');
assert.match(html, /<span>Detik<\/span>/, 'countdown Detik label');
assert.match(html, /Tambah ke Kalender/, 'Agregar al calendario -> Tambah ke Kalender');
assert.match(js, /updateCountdown/);
assert.match(js, /setInterval/);

// Misa section with maps link (Indonesian).
assert.match(html, /id="misa"/);
assert.match(html, /UPACARA/, 'CEREMONIA -> UPACARA');
assert.match(html, /Misa Syukur/, 'Misa de Agradecimiento -> Misa Syukur');
assert.match(html, /id="misa-maps"/);
assert.match(html, /Lihat Lokasi/, 'Ver ubicacion -> Lihat Lokasi');

// Recepción -> Resepsi section with maps link.
assert.match(html, /id="recepcion"/);
assert.match(html, /PERAYAAN/, 'CELEBRACION -> PERAYAAN');
assert.match(html, /Resepsi/, 'Recepcion -> Resepsi');
assert.match(html, /Quinta La Bonita/);
assert.match(html, /id="recepcion-maps"/);
assert.match(html, /google\.com\/maps/);

// Itinerario -> Rangkaian Acara timeline (Indonesian items).
assert.match(html, /id="itinerario"/);
assert.match(html, /Rangkaian Acara/, 'Itinerario -> Rangkaian Acara');
assert.match(html, /class="timeline"/);
assert.match(html, /Kedatangan/, 'timeline item Kedatangan');
assert.match(html, /Vals \(Waltz\)/, 'timeline item Vals (Waltz)');
assert.match(html, /Sesi Foto/, 'timeline item Sesi Foto');
assert.match(html, /Pesta/, 'timeline item Pesta');
assert.match(html, /Penutup/, 'timeline item Penutup');
assert.match(css, /\.timeline__item/);

// Photo gallery (Galeri Foto) — placeholder frames, no external images.
assert.match(html, /id="galeri"/, 'gallery section present');
assert.match(html, /Galeri Foto/, 'gallery title in Indonesian');
assert.match(html, /class="gallery__grid"/, 'gallery grid present');
const frameCount = (html.match(/class="photo-frame"/g) || []).length;
assert.ok(frameCount >= 3 && frameCount <= 4, `expected 3-4 photo frames, found ${frameCount}`);
assert.match(html, /class="photo-frame__placeholder"/, 'placeholder frame present');
assert.match(html, /class="photo-frame__caption"/, 'frame caption present');
assert.match(html, />Foto 1</, 'caption Foto 1 present');
assert.match(html, /foto\/foto-1\.jpg/, 'replacement instructions reference local path');
assert.match(html, /CARA MENGGANTI DENGAN FOTO ASLI/, 'HTML comment with replacement guidance present');
assert.doesNotMatch(html, /<img[^>]+src="https?:/i, 'gallery must not use external images');
assert.match(css, /\.gallery__grid/, 'gallery grid styled');
assert.match(css, /\.photo-frame__placeholder/, 'placeholder styled');
assert.match(css, /grid-template-columns:1fr 1fr/, 'two-column grid at wider widths');

// Código de vestimenta -> Kode Berpakaian.
assert.match(html, /id="dress-code"/);
assert.match(html, /Kode Berpakaian/, 'Codigo de Vestimenta -> Kode Berpakaian');
assert.match(html, /Formal \(Etiket\)/, 'Etiqueta -> Formal (Etiket)');

// Sugerencia de regalos -> Saran Hadiah (bank details placeholder, Indonesian labels).
assert.match(html, /id="gifts"/);
assert.match(html, /Saran Hadiah/, 'Sugerencia de Regalos -> Saran Hadiah');
assert.match(html, /class="bank-details"/);
assert.match(html, /<dt>Bank<\/dt>/, 'bank label');
assert.match(html, /<dt>Atas Nama<\/dt>/, 'account holder label');
assert.match(html, /<dt>Nomor Rekening<\/dt>/, 'account number label');
assert.match(html, /<dt>Kode<\/dt>/, 'code label');

// Closing (Indonesian).
assert.match(html, /Kami Menantikan Kehadiranmu!/, 'closing text in Indonesian');
assert.match(html, /Dengan penuh kasih, Ximena/, 'closing sign in Indonesian');

// .ics calendar (informational) retained; Indonesian eventConfig.
assert.match(html, /id="calendar-button"/);
assert.match(js, /createCalendarFile/);
assert.match(js, /BEGIN:VEVENT/);
assert.match(js, /URL\.createObjectURL/);
assert.match(js, /Pesta 15 Tahun Ximena/, 'eventConfig title in Indonesian');
assert.match(js, /Misa Syukur dan Resepsi/, 'eventConfig description in Indonesian');

// Palette + mobile-first + a11y hooks.
assert.match(css, /--blush:/);
assert.match(css, /--gold:/);
assert.match(css, /--sage:/);
assert.match(css, /--script:/);
assert.match(css, /width:min\(100%,\s*480px\)/);
assert.match(css, /clamp\(/);
assert.match(css, /min-height:44px/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /overflow-x:hidden/);
assert.match(html, /aria-live="polite"/);

// Intro video frame (original CSS metallic gold frame + self-hosted video slot).
assert.match(html, /class="intro-frame"/, 'intro video frame present');
assert.match(html, /id="intro-video"/, 'video element present');
assert.match(html, /<video[\s\S]*?\bmuted\b/, 'intro video is muted');
assert.match(html, /<video[\s\S]*?\bplaysinline\b/, 'intro video is playsinline');
assert.match(html, /<video[\s\S]*?\bloop\b/, 'intro video loops');
assert.match(html, /video\/intro\.mp4/, 'video slot points to local video/intro.mp4');
assert.match(html, /foto\/intro-poster\.jpg/, 'video poster points to local foto/intro-poster.jpg');
assert.match(html, /class="intro-frame__placeholder"/, 'graceful placeholder present when video missing');
assert.match(html, /CARA MEMASANG VIDEO INTRO ASLI/, 'HTML comment explains how to drop in the video');
assert.match(css, /\.intro-frame/, 'intro frame styled');
assert.match(css, /@keyframes intro-shimmer/, 'metallic shimmer animation present');
assert.doesNotMatch(html, /<video[\s\S]*?src="https?:/i, 'intro video must not use external source');

// Background music: audio element + local slot, no autoplay attribute.
assert.match(html, /id="bg-music"/, 'background audio element present');
assert.match(html, /<audio id="bg-music" loop preload="auto">/, 'audio is loop + preload, not autoplay attr');
assert.doesNotMatch(html, /<audio[^>]*\bautoplay\b/, 'audio must not use autoplay attribute');
assert.match(html, /audio\/lagu\.mp3/, 'audio slot points to local audio/lagu.mp3');
assert.match(html, /CARA MEMASANG LAGU LATAR ASLI/, 'HTML comment explains how to drop in the song');

// Music toggle button (accessible, Indonesian aria-label, on-theme gold).
assert.match(html, /id="music-toggle"/, 'music toggle button present');
assert.match(html, /aria-label="Putar atau jeda musik"/, 'music toggle has Indonesian aria-label');
assert.match(html, /<button class="music-toggle"[\s\S]*?aria-pressed=/, 'music toggle reflects state via aria-pressed');
assert.match(css, /\.music-toggle/, 'music toggle styled');

// play() is invoked inside the open-button click handler (user gesture).
assert.match(js, /bgMusic/, 'app.js references background music element');
assert.match(js, /bgMusic\.play\(\)/, 'app.js calls bgMusic.play()');
assert.match(js, /\.catch\(/, 'play() rejection handled silently');
const openHandler = js.match(/openButton\.addEventListener\('click'[\s\S]*?\n\}\);/);
assert.ok(openHandler && /bgMusic\.play\(\)/.test(openHandler[0]),
  'bgMusic.play() must be invoked inside the open-button click handler');

console.log('Static Pesta 15 Tahun (Bahasa Indonesia) invitation contract checks passed.');
