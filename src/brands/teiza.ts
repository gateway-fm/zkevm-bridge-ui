import { baseBrand } from "src/brands/base";
import { Brand } from "src/brands/brand";
import LogoMark from "src/brands/teiza/assets/logo-mark.svg?react";
import Logo from "src/brands/teiza/assets/logo.svg?react";

// TEIZA co-branded skin ("Gateway Makeover x TEIZA" Figma, page "UI Guide").
//
// Co-branding, not white-label: the header carries the TEIZA identity while the
// "Powered by" footer stays Gateway.fm (enforced in layout.view.tsx) and the
// marketing nav points at the Gateway.fm destinations.
//
// Colour hexes, typography (DM Sans) and the logo/mark SVGs are taken straight
// from the Figma file via the API — not eyeballed.
export const teizaBrand: Brand = {
  accentHeadingFirstWord: true,
  assets: {
    Logo,
    LogoMark,
  },
  // Page background per Figma: white fading into a light blue.
  background: "linear-gradient(180deg, #FFFFFF 0%, #FDFCFF 50%, #E2EBFF 100%)",
  // Outlined mark for network selectors; the filled mark stays the token
  // logo and favicon.
  chainIconUrl: "/network-teiza.svg",
  faviconUrl: "/favicon-teiza.svg",
  fontFaces: [
    {
      fontFamily: "DM Sans",
      fontStyle: "normal",
      fontWeight: "400 700",
      src: "url('/fonts/dm-sans/DMSans-latin.woff2') format('woff2')",
      unicodeRange:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
    {
      fontFamily: "DM Sans",
      fontStyle: "normal",
      fontWeight: "400 700",
      src: "url('/fonts/dm-sans/DMSans-latin-ext.woff2') format('woff2')",
      unicodeRange:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
  ],
  fontFamily: "'DM Sans', system-ui, sans-serif",
  // Nav mirrors the Gateway.fm site links (co-branding); only the logo target
  // is the client's own site.
  header: {
    ...baseBrand.header,
    deployButton: { title: "Deploy rollup", url: "https://gateway.fm/presto/" },
    homeUrl: "https://teiza.com/",
    links: baseBrand.header.links.filter(
      ({ title }) => title !== "Stakeway" && title !== "Careers"
    ),
  },
  id: "teiza",
  nativeTokenLogoUri: "/favicon-teiza.svg",
  palette: {
    ...baseBrand.palette,
    black: "#1C1C1C",
    grey: {
      // Secondary text in the design is ink at 50%.
      dark: "rgba(28, 28, 28, 0.5)",
      light: "#F4F6FF",
      main: "#E6E9F5",
      veryDark: "#1C1C1C",
    },
    // Two design blues: #1D4AE1 for text accents, links and marks (main);
    // #3F58FF for CTA button fills (mainRedesign).
    primary: {
      dark: "#1638B8",
      light: "#E2EBFF",
      main: "#1D4AE1",
      mainRedesign: "#3F58FF",
    },
    transparency: "rgba(16,24,64,0.5)",
  },
};
