import { FC, SVGProps } from "react";

// A Brand bundles everything that varies between white-label deployments of the
// bridge UI: the colour palette, the UI font, logo assets, the marketing header
// links, and per-brand assets. Brands are
// resolved at BUILD time from the `VITE_BRAND` env var (see ./index.ts), so each
// client ships as its own Docker image from a single shared source tree.
//
// This is orthogonal to `VITE_FRONTEND_TYPE` (old-design / new-design), which
// selects the layout generation. A brand skins whichever layout is active.

export type BrandFontFace = {
  fallbacks?: { src: string }[];
  fontFamily: string;
  fontStyle: string;
  // A single weight (400) or a variable-font range ("400 700").
  fontWeight: number | string;
  src: string;
  unicodeRange?: string;
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
  // Render the first word of the home heading in the primary colour.
  accentHeadingFirstWord?: boolean;
  assets: {
    // Horizontal lockup shown in the header. The "Powered by" footer always
    // renders the Gateway logo (co-branding invariant, see layout.view.tsx).
    Logo: FC<SVGProps<SVGSVGElement>>;
    // Compact square/icon mark.
    LogoMark: FC<SVGProps<SVGSVGElement>>;
  };
  // CSS background for the page in the new design; falls back to the stock
  // background image / grey when unset.
  background?: string;
  // Icon shown for the L2 chain in network selectors; the
  // VITE_CHAIN_ICON_PATH env var still takes precedence.
  chainIconUrl?: string;
  // Favicon used when VITE_FAVICON_PATH is unset.
  faviconUrl?: string;
  fontFaces: BrandFontFace[];
  fontFamily: string;
  header: {
    deployButton?: BrandLink;
    homeUrl: string;
    links: BrandLink[];
  };
  id: string;
  // Logo for the chains' native gas token; defaults to the ETH logo.
  nativeTokenLogoUri?: string;
  palette: BrandPalette;
};
