# Mis XV Años — Ximena (Invitación Digital)

A dependency-free, mobile-first **quinceañera (XV Años)** invitation for Ximena, with an original blush/peach/rose/gold/sage art direction. It uses only HTML, CSS, inline SVG, and JavaScript—no external artwork, libraries, build tooling, or network dependencies (Google Fonts is optional and degrades gracefully to system serif/script fallbacks offline).

This is an **invitation-only** page: it presents the event details and contains **no RSVP form** or attendance-collection controls.

## Design direction

- Soft blush background with layered peach, rose-pink, gold, and sage accents
- Original hand-drawn CSS/SVG floral vines, roses, gold flourishes, and a tiara motif
- A gold tiara-clasp opening state that reveals the invitation
- Elegant script display type (`Great Vibes`) paired with a refined serif (`Cormorant Garamond`) and graceful serif/system fallbacks
- Mobile-first composition: centered container (~480px max), fluid `clamp()` typography, 44px+ tap targets, no horizontal scroll

This is an independent visual direction and does not reproduce any third-party photos, layout, or artwork.

## Sections

- Hero — "Mis XV Años" + name (Ximena) + tiara
- Opening poetic quote
- Padres & Padrinos
- Fecha + live countdown to the event
- Misa de Agradecimiento (6:00 PM, Iglesia Sagrado Corazón) with a "Ver ubicación" Google Maps link
- Recepción (7:00 PM, Salón de Fiestas Quinta La Bonita) with a maps link
- Itinerario timeline (Llegada, Vals, Sesión de fotos, Fiesta, Despedida 2:00 AM)
- Código de vestimenta (Etiqueta)
- Sugerencia de regalos (bank-transfer details placeholder)
- Closing "¡Te esperamos!"

## Features

- Opening state with keyboard-accessible tiara button (tap to open)
- Live countdown to the event date
- Downloadable `.ics` "add to calendar" button (informational)
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

The dependency-free verification script confirms the invitation-only markup: the RSVP form is absent, and the opening state, hero/tiara, quote, padres & padrinos, countdown, Misa/Recepción maps links, itinerario timeline, dress code, gifts hooks, closing, palette, script type, mobile query, control sizing, and reduced-motion provision are present.

## Customize

1. Change display copy (names, venues, quote, bank details) in `index.html`.
2. Change calendar/countdown data in `eventConfig` near the top of `app.js`.
3. Update the Google Maps `query` values in the `Ver ubicación` links to the exact venue addresses.

## Deploy to GitHub Pages

1. Push this repository to GitHub (from the branch you want to publish).
2. Go to **Settings → Pages** and select **Deploy from a branch**.
3. Choose that branch and the **/(root)** folder.
4. Save and use the published URL GitHub provides.

## Project files

- `index.html` — semantic invitation structure and Spanish copy
- `styles.css` — responsive visual system, floral/gold ornaments, and accessibility styles
- `app.js` — opening interaction, live countdown, and ICS download
- `tests/verify.mjs` — dependency-free static contract verification
