import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const js = await readFile(new URL('../app.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

assert.match(html, /<form[^>]+id="rsvp-form"/);
assert.match(html, /id="guest-name"/);
assert.match(html, /id="attendance"/);
assert.match(html, /id="guest-count"/);
assert.match(html, /id="notes"/);
assert.match(html, /id="calendar-button"/);
assert.match(html, /aria-live="polite"/);
assert.match(js, /createCalendarFile/);
assert.match(js, /URL\.createObjectURL/);
assert.match(js, /form\.addEventListener\('submit'/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /min-height:\s*44px/);
console.log('Static RSVP contract checks passed.');
