import { FC, SVGProps } from "react";

// A Brand bundles everything that varies between white-label deployments of the
// bridge UI: the colour palette, the UI font, logo assets, the marketing header
// links, and optional per-brand features (e.g. the TEIZA faucet). Brands are
// resolved at BUILD time from the `VITE_BRAND` env var (see ./index.ts), so each
// client ships as its own Docker image from a single shared source tree.
//
// This is orthogonal to `VITE_FRONTEND_TYPE` (old-design / new-design), which
// selects the layout generation. A brand skins whichever layout is active.

export type BrandFontFace = {
  fallbacks?: { src: string }[];
  fontFamily: string;
  fontStyle: string;
  fontWeight: number;
  src: string;
};

// Mirrors the string fields of `Theme["palette"]`. A brand supplies the DEFAULT
// values; individual `VITE_THEME_COLOR_*` env vars still override them at build
// time (see src/styles/theme.ts), preserving the existing override behaviour.
export type BrandPalette = {
  black: string;
  error: { light: string; main: string };
  grey: { dark: string; light: string; main: string; veryDark: string };
  primary: { dark: string; light: string; main: string; mainRedesign: string };
  success: { light: string; main: string };
  transparency: string;
  warning: { light: string; main: string };
  white: string;
};

export type BrandLink = {
  title: string;
  url: string;
};

export type Brand = {
  assets: {
    // Horizontal lockup shown in the header and "Powered by" footer.
    Logo: FC<SVGProps<SVGSVGElement>>;
    // Compact square/icon mark.
    LogoMark: FC<SVGProps<SVGSVGElement>>;
  };
  faucet: {
    // POST endpoint that funds an address; when empty the request button is
    // disabled and the screen renders in a preview-only state.
    apiUrl: string;
    // When enabled, a `/faucet` route is registered (see routes.ts / router).
    enabled: boolean;
    supportUrl?: string;
    tokenSymbol: string;
  };
  fontFaces: BrandFontFace[];
  fontFamily: string;
  header: {
    deployButton?: BrandLink;
    homeUrl: string;
    links: BrandLink[];
    poweredByUrl: string;
  };
  id: string;
  palette: BrandPalette;
};
