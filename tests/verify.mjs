import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const js = await readFile(new URL('../app.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

// Core RSVP and calendar contract.
assert.match(html, /<form[^>]+id="rsvp-form"/);
assert.match(html, /id="guest-name"/);
assert.match(html, /id="attendance"/);
assert.match(html, /id="guest-count"/);
assert.match(html, /id="notes"/);
assert.match(html, /id="calendar-button"/);
assert.match(html, /aria-live="polite"/);
assert.match(js, /createCalendarFile/);
assert.match(js, /BEGIN:VEVENT/);
assert.match(js, /URL\.createObjectURL/);
assert.match(js, /form\.addEventListener\('submit'/);
assert.match(js, /aria-invalid/);

// Midnight Conservatory visual and opening-state contract.
assert.match(html, /id="opening"/);
assert.match(html, /id="brass-clasp"/);
assert.match(html, /constellation-vine/);
assert.match(html, /id="event-details"/);
assert.match(html, /Buka malam ini/);
assert.match(css, /--ink-blue:/);
assert.match(css, /\.constellation-vine/);
assert.match(css, /\.brass-clasp/);
assert.match(css, /\.opening\.is-opened/);
assert.match(css, /min-height:\s*(44|48)px/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /@media \(max-width:\s*599px\)/);

console.log('Static RSVP + midnight conservatory contract checks passed.');
