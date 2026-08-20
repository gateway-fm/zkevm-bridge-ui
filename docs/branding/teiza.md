# White-label branding & the TEIZA brand

This UI supports multiple client brands from a **single shared codebase and one
branch**. A brand is selected at **build time** via `VITE_BRAND`, so each client
ships as its own image built from the same source. Dependency/security bumps land
once on `develop` and every brand inherits them on the next build — no per-client
branches or forks to rebase.

Branding is **orthogonal** to `VITE_FRONTEND_TYPE` (`old-design` / `new-design`),
which still selects the layout generation. A brand skins whichever layout is
active; `old-design` and `new-design` behave exactly as before.

## Architecture

```
src/brands/
  brand.ts        # Brand type
  index.ts        # registry + `brand` resolved from import.meta.env.VITE_BRAND
  base.ts         # default Gateway brand (reproduces the previous hard-coded values)
  teiza.ts        # TEIZA brand
  teiza/assets/   # TEIZA SVGs (logo, logo-mark, network-mark)
```

A `Brand` bundles: `palette`, `fontFamily` + `fontFaces`, logo `assets`, the
marketing `header` (links + deploy button + home/powered-by URLs), and a

Consumption points (all read the build-time `brand`):

- `src/styles/theme.ts` — palette defaults come from `brand.palette`; individual
  `VITE_THEME_COLOR_*` env vars still override, and `theme.fontFamily` = `brand.fontFamily`.
- `src/views/app.styles.ts` — `@font-face` set and body font from the brand.
- `src/views/shared/header-links/header-links.view.redesign.tsx` — logo, links, deploy button.
- `src/views/core/layout/layout.view.tsx` — "Powered by" footer logo.

**A build with no `VITE_BRAND` is byte-identical to before this change.**

## Onboarding a new client

1. Add `src/brands/<id>.ts` exporting a `Brand` (start from `base`/`teiza`, spread
   `baseBrand.palette` and override only what differs).
2. Add its SVG assets under `src/brands/<id>/assets/`.
3. Register it in `src/brands/index.ts`.
4. Deploy with `BRAND=<id>` (+ per-deployment content vars below).

Keep as much as possible in **tokens** (palette/font/logo) — those cost nothing at
security-update time. Only add per-screen component overrides when a design
restructures layout in a way tokens can't express (TEIZA needed only the new

## Deploying TEIZA

`scripts/deploy.sh` maps container env vars → `VITE_*` → build. Set on the
Deployment/Helm values:

| Container env | Value | Purpose |
|---|---|---|
| `BRAND` | `teiza` | selects the TEIZA palette/font/logo/links |
| `FRONTEND_TYPE` | `new-design` | redesign layout |
| `BRAND_COMPONENTS` | `true` | show marketing header + "Powered by" footer |
| `NETWORK_SYMBOL` | `TTT` | native symbol |
| `LOGO_PATH` | URL/path to the circular network mark | network/token icon in headers |
| `FAVICON_PATH` | TEIZA favicon | browser tab |

(no wallet required) and appears only for TEIZA.

## ⚠️ Pending client confirmation (needed for pixel-exactness)

The implementation is faithful to the deck but the following are **best-effort
placeholders** read off the PDF — replace with the client's real values:

1. **Typeface.** `teiza.ts` uses `Poppins` (geometric-sans best match) with the
   bundled Modern Era faces as a working fallback. Get the real family name +
   font files from Figma → drop them in `public/fonts/teiza/` and add matching
   `fontFaces` entries in `teiza.ts` (the `fontFamily` stack already prefers them).
2. **Exact colours.** Hexes in `teiza.ts` `palette` are eyeballed
   (primary `#2C48F6`, etc.). Replace with the Figma Dev Mode values.
3. **Official SVGs.** `src/brands/teiza/assets/*.svg` are hand-recreated
   (bolt + wordmark + network mark). Replace with the official exports for exact
   letterforms/geometry.
4. **Header link URLs + support URL** in `teiza.ts` are `teiza.io/*` placeholders.
   confirm the real request/response shape and success/error semantics.

Also: the deck shows the header title as two-tone ("TEIZA" blue + "Devnet" black).
Today `NETWORK_NAME` renders as single-colour text; if two-tone is required we can
either set `LOGO_PATH` to the official lockup image or add a two-tone renderer.
