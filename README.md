# Wedding RSVP Invitation

A dependency-free, mobile-first wedding invitation and RSVP page. It is designed as an original warm-paper composition with CSS botanical calla lilies and a muted blue envelope—not a reproduction of any third-party invitation.

## Features

- Indonesian invitation copy and a simple opening screen
- Editable event data in `app.js` (`eventConfig`)
- CSS-only envelope and calla-lily-inspired botanical illustration
- RSVP form: name, attendance, guest count, dietary/message notes
- Accessible inline validation and submitted thank-you state
- Calendar download as an `.ics` file
- Keyboard focus states, semantic labels, 44px+ controls, and reduced-motion support
- No build step or dependencies

## Local preview

From the repository root:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>. Stop the server with `Ctrl+C`.

You can also open `index.html` directly, although a local server is recommended for testing downloads.

## Verify

```bash
node tests/verify.mjs
```

This runs static contract checks for the form controls, calendar implementation, accessibility live region, and responsive CSS provisions.

## Customize the event

Update the text in `index.html`, then edit `eventConfig` near the top of `app.js`. Calendar times use UTC in basic ICS format: for a 16.00 WIB start, the included sample is `20261018T090000Z`.

## Deploy to GitHub Pages

1. Create an empty GitHub repository and add it as the `origin` remote.
2. Commit and push the files in this folder to the branch you want to publish (typically `main`).
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your publishing branch and the **/(root)** folder, then save.
6. Wait for GitHub Pages to publish and use the URL GitHub provides.

Because this is a static site, no build command or special GitHub Actions workflow is required.

## Project files

- `index.html` — invitation structure and Indonesian copy
- `styles.css` — responsive visual system and CSS botanical art
- `app.js` — editable calendar config, validation, RSVP success state
- `tests/verify.mjs` — dependency-free static verification
