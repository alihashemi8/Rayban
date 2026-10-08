# Verification — 2026-10-07

The strict TypeScript, client/SSR build and 13-page prerender passed. Node checks passed for content validation, public React interactions, actual HTTP security/persistence and the admin UI connected to an isolated HTTP backend.

The latest interaction checks verify that former collaborators remain in the team directory and profile pages but are absent from the homepage; themed messenger marks and additional programming symbols are rendered. Language/theme persistence, menu dismissal, project filtering, contact URLs, creation/editing/deletion and logout remain covered.

Backend tests cover salted scrypt password hashes, HttpOnly/SameSite cookies, Origin and CSRF rejection, unauthenticated writes, validation, revision conflicts, session expiry, rate limiting and persistence across restart. Tests create their own guarded temporary directories and never configure the real admin account or replace its content. Credentials, server data, local reports and build artifacts are excluded from Git.

## Rendered checks

Unchanged Lighthouse final-screenshot artifacts were visually inspected. Reports/screenshots are local artifacts in the ignored qa/ directory.

| Light theme route | Viewport | Performance | Accessibility | Best practices | SEO |
|---|---|---:|---:|---:|---:|
| Persian home | 390 × 1000 | 92 | 100 | 96 | 100 |
| Persian contact | 320 × 640 | 95 | 100 | 100 | 100 |
| English team, final | 1440 × 1000 | 97 | 100 | 100 | 100 |

The initial home audit used a preference fixture without API forwarding, causing its single console-error failure. The fixture now forwards public content reads to the actual backend; subsequent contact/team audits pass that check. The home report also emitted a nonfatal NO_LCP Lantern insight diagnostic while still producing category scores and a screenshot.

The light palette now includes the CSS core fallback, Three.js material/light properties, floating cards, project dashboard previews, profiles, technology code window, contacts and section backgrounds. The final team check followed removal of a remaining dark section gradient. Mobile navigation reserves enough height and uses compact controls on short screens, with inner overflow disabled. The floating cards are below the scene canvas and emblem in the mobile stacking order.

## Limits

The computer-use kernel cannot initialize because of helper_unknown_error: setup refresh had errors. Direct browser interactions, expanded-menu geometry, physical touch smoothness and active WebGL colors could not be visually rechecked through that tool. React interactions were verified in jsdom; Lighthouse screenshots show rendered layouts and the CSS scene fallback. Those are distinct forms of evidence.

Scores are local synthetic measurements. No live-site deployment or physical-device performance guarantee is implied. The first publication to GitHub contains application source and asset references, not admin data. Three demo member biographies and three concept projects remain clearly labeled. Instagram awaits account creation.

## Mobile vertical navigation correction — 2026-10-08

The closed mobile rail contains only the logo and chevron. Opening reveals compact icon navigation below them at the same 54px width; the rail height follows its contents instead of spacing controls across a tall panel. Desktop/tablet rules remain unchanged. Production build, DOM navigation interactions and diff checks passed. The local mobile Lighthouse accessibility audit scored 100. Expanded geometry remains subject to the browser-tool limitation described above.


## Synchronized mobile rail motion — 2026-10-08

Mobile navigation now unfolds with a 420ms grid-row transition and opacity fade. Main content and footer have zero lateral gutter while closed and animate their logical start margin to 72px while open, following Persian/English direction. Hidden controls remain outside keyboard navigation through visibility. Reduced-motion preferences disable these transitions. Production build and DOM integration passed; direct animation geometry remains unverified because of the browser-tool limitation above.

