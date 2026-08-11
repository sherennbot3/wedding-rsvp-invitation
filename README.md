# Midnight Conservatory — Wedding RSVP Invitation

A dependency-free, mobile-first Indonesian wedding invitation with an original **midnight conservatory** art direction. It uses only HTML, CSS, inline SVG, and JavaScript—no external artwork, libraries, build tooling, or network dependencies.

## Design direction

- Matte ink-blue night paper, warm brass accent, and layered paper-card depth
- Original hand-drawn constellation-vine and astral-window SVG/CSS illustrations
- A tactile warm-brass oval clasp that reveals the invitation details
- Editorial serif type paired with a legible system sans-serif
- Portrait-first mobile composition; larger screens gain breathing room without changing the reading order

This is an independent visual direction and does not reproduce any third-party pattern, envelope, seal, monogram, or layout.

## Features

- Opening state with keyboard-accessible brass clasp
- Editable event data in `app.js` (`eventConfig`)
- RSVP form with inline validation, `aria-invalid`, status feedback, and personalized success state
- Downloadable `.ics` calendar file
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

The dependency-free verification script checks the RSVP controls, validation/calendar hooks, midnight-conservatory visual hooks, mobile query, control sizing, and reduced-motion provision.

## Customize

1. Change display copy in `index.html`.
2. Change calendar data in `eventConfig` near the top of `app.js`.
3. Calendar times are UTC basic ICS strings. The sample `20261018T090000Z` equals 16.00 WIB.

## Deploy to GitHub Pages

1. Push this repository to GitHub (from the branch you want to publish).
2. Go to **Settings → Pages** and select **Deploy from a branch**.
3. Choose that branch and the **/(root)** folder.
4. Save and use the published URL GitHub provides.

## Project files

- `index.html` — semantic invitation structure and Indonesian copy
- `styles.css` — responsive visual system, paper texture, astral art, and accessibility styles
- `app.js` — opening interaction, RSVP validation/success state, and ICS download
- `tests/verify.mjs` — dependency-free static contract verification
