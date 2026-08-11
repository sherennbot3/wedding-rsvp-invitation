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

// Opening state (tap to open).
assert.match(html, /id="opening"/);
assert.match(html, /id="open-button"/);
assert.match(js, /open-button/);
assert.match(js, /is-opened/);
assert.match(css, /\.opening\.is-opened/);

// Hero: Mis XV Años + name + tiara.
assert.match(html, /MIS XV A/);
assert.match(html, /id="hero-name"/);
assert.match(html, />Ximena</);
assert.match(html, /class="tiara"/);
assert.match(css, /\.tiara__gem/);

// Opening quote.
assert.match(html, /class="quote"/);

// Padres & padrinos.
assert.match(html, /id="padres-padrinos"/);
assert.match(html, /Rafael L[oó]pez/);
assert.match(html, /Emilia Peredo/);
assert.match(html, /Freddy P[eé]rez/);
assert.match(html, /M[oó]nica Bernal/);

// Fecha + live countdown.
assert.match(html, /id="fecha"/);
assert.match(html, /Sábado 14 de Marzo, 2026/);
assert.match(html, /id="countdown"/);
assert.match(html, /id="cd-days"/);
assert.match(html, /id="cd-seconds"/);
assert.match(js, /updateCountdown/);
assert.match(js, /setInterval/);

// Misa section with maps link.
assert.match(html, /id="misa"/);
assert.match(html, /Misa de Agradecimiento/);
assert.match(html, /id="misa-maps"/);
assert.match(html, /Ver ubicaci[oó]n/);

// Recepción section with maps link.
assert.match(html, /id="recepcion"/);
assert.match(html, /Quinta La Bonita/);
assert.match(html, /id="recepcion-maps"/);
assert.match(html, /google\.com\/maps/);

// Itinerario timeline.
assert.match(html, /id="itinerario"/);
assert.match(html, /class="timeline"/);
assert.match(html, /Vals/);
assert.match(html, /Despedida/);
assert.match(css, /\.timeline__item/);

// Código de vestimenta.
assert.match(html, /id="dress-code"/);
assert.match(html, /Etiqueta/);

// Sugerencia de regalos (bank details placeholder).
assert.match(html, /id="gifts"/);
assert.match(html, /class="bank-details"/);
assert.match(html, /CLABE/);

// Closing.
assert.match(html, /¡Te esperamos!/);

// .ics calendar (informational) retained.
assert.match(html, /id="calendar-button"/);
assert.match(js, /createCalendarFile/);
assert.match(js, /BEGIN:VEVENT/);
assert.match(js, /URL\.createObjectURL/);

// Quinceañera palette + script type + mobile-first + a11y hooks.
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

console.log('Static XV Años invitation contract checks passed.');
