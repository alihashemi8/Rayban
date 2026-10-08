# Rayban

A Persian-first software and AI studio showcase with an English interface. React 19, TypeScript, Vite, Framer Motion and Three.js; self-hosted Vazirmatn. A local Node.js backend provides authenticated editing and persistent shared content.

## Run locally

```sh
npm ci
npm run build
npm start -- --port 4188
```

Open http://localhost:4188. The preview command starts the same application and API. The server binds to loopback. Build before starting: the backend imports the compiled content schema from .ssr-build/.

For frontend development, keep the backend running and use:

```sh
npm run dev -- --port 5188 --strictPort
```

Vite proxies /api to port 4188. Node.js 22.12+ is required; this version was tested with Node.js 26.5.

## Admin and content

Visit /admin directly; public pages contain no admin link. On the first local visit, choose a username and a password of at least 12 characters. There is no default password. Afterwards, /admin/login requires those credentials. The old /studio route redirects to the protected admin area.

- Add, edit and delete members and projects, including bilingual biographies, skills, social links, project details and contributor assignments.
- Mark members as current or former collaborators, with an optional collaboration period. Removing a member clears their project assignments.
- Export JSON backups or import validated files. Import replaces shared content. Invalid references, duplicate IDs, unsafe URLs and malformed data are rejected.
- Shared content persists in .data/content.json. The account's salted scrypt hash is in .data/admin.json; no plaintext password is stored. Back up this directory privately. It is ignored by Git and not served publicly.
- Random sessions use HttpOnly, SameSite=Strict cookies, expire after eight hours and are invalidated on logout or server restart. Writes require CSRF protection, an allowed Origin and the current content revision. Login attempts are rate limited.
- Older browser-local edits are preserved. An explicit import option appears after signing in if a valid legacy backup exists. Import replaces server content and is never automatic.

Ali Hashemi's details were supplied by the owner. Sara Mehr, Armin Rad and Nika Farzan have explicitly fictional demonstration biographies; Nika demonstrates former collaborators. Raein and Bokhar are real projects described from local repository documentation. Three other projects are concept studies. UI previews are HTML/CSS illustrations, not actual product screenshots. Unknown contributors and release dates are not invented.

## Public site

- Navy glass and light themes with persisted language preferences. The vertical nav is right in Persian and left in English. Desktop/tablet behavior is preserved. Mobile starts with the logo and a downward chevron. It expands vertically into a compact icon rail of the same width, with outside-click and Escape dismissal.
- Homepage project and member rows scroll horizontally with touch momentum and proximity snapping, without vertical scrolling. Desktop arrows overlay cards and disappear on touch/tablet/mobile layouts. /projects and /team provide full directories and detail pages.
- The homepage shows only current members. Former collaborators remain in the full /team directory. The footer has simple links without a repeated name/logo. Public editing links and the old conversation form are removed.
- Sparse page-anchored Docker, React, Python, GitHub, TypeScript, Kubernetes, PostgreSQL and AI symbols float behind content and respect reduced motion. The neural scene is lazy loaded, capped at 24 frames per second and paused outside the viewport. Its Three.js materials and CSS fallback use distinct, coordinated dark/light palettes; mobile floating cards sit behind the core. Mobile navigation adapts to short viewports without scrolling.
- /contact contains phone, email, Telegram, Eitaa, Rubika, Bale, LinkedIn, GitHub and WhatsApp. Eitaa/Bale use monochrome glyphs derived from their official shapes; Rubika uses a custom outline cube mark. All three inherit the site palette rather than showing original colored badges. Instagram is marked coming soon until the owner creates an account.

Sources are recorded in public/brands/SOURCES.md. The owner-supplied Rayban logo is unchanged.

## Verification

```sh
npm run build
node scripts/check-content.mjs
node scripts/check-interactions.mjs
node scripts/check-server.mjs
node scripts/check-admin-ui.mjs
```

Backend tests use isolated temporary data and never configure the real admin account. The build prerenders 13 public pages. Reports and screenshots are in the ignored qa/ directory; see docs/verification.md for the tracked verification record.

## Hosting

No remote deployment has been performed. Host the Node application together with dist/ and .ssr-build/; a static-only host cannot provide authenticated writes. Set up the account locally before exposing a deployment, configure the real domain in allowed Origins and metadata, and use HTTPS through a trusted reverse proxy. RAYBAN_SECURE_COOKIE=1 enables Secure cookies for HTTPS. Built HTML contains seed content; browser JavaScript loads current server content. Rebuild to refresh prerendered seed metadata after changing defaults.
