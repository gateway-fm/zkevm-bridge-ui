import { baseBrand } from "src/brands/base";
import { Brand } from "src/brands/brand";
import LogoMark from "src/brands/teiza/assets/logo-mark.svg?react";
import Logo from "src/brands/teiza/assets/logo.svg?react";

// TEIZA white-label brand.
//
// NOTE (client confirmation pending — see docs/branding/teiza.md):
//  - Colour hexes below are read off the client PDF and should be replaced with
//    the exact Figma Dev Mode values.
//  - The typeface is a geometric-sans best match (Poppins) with the bundled
//    Modern Era faces kept as a working fallback. When the client supplies the
//    real TEIZA font files, drop them in /public/fonts/teiza/ and add matching
//    entries to `fontFaces`; the `fontFamily` stack already prefers them.
//  - Header link URLs and support URL are placeholders pending real destinations.
export const teizaBrand: Brand = {
  assets: {
    Logo,
    LogoMark,
  },
  faucet: {
    apiUrl: "",
    enabled: true,
    supportUrl: "https://teiza.io/support",
    tokenSymbol: "TTT",
  },
  // Keep the bundled Modern Era faces so text always renders in a real webfont
  // until the official TEIZA typeface is added.
  fontFaces: baseBrand.fontFaces,
  fontFamily: "Poppins, 'Modern Era', system-ui, sans-serif",
  header: {
    deployButton: { title: "Deploy rollup", url: "https://teiza.io/deploy" },
    homeUrl: "https://teiza.io/",
    links: [
      { title: "Rollup", url: "https://teiza.io/rollup" },
      { title: "Stakeway", url: "https://stakeway.com/" },
      { title: "RPC", url: "https://teiza.io/rpc" },
      { title: "Blog", url: "https://teiza.io/blog" },
      { title: "About", url: "https://teiza.io/about" },
      { title: "Careers", url: "https://teiza.io/careers" },
    ],
    poweredByUrl: "https://teiza.io/",
  },
  id: "teiza",
  palette: {
    ...baseBrand.palette,
    grey: {
      dark: "#6B7280",
      light: "#F4F6FF",
      main: "#E6E9F5",
      veryDark: "#1B1C22",
    },
    primary: {
      dark: "#1E34C9",
      light: "#EDEFFD",
      main: "#2C48F6",
      mainRedesign: "#2C48F6",
    },
    transparency: "rgba(16,24,64,0.5)",
  },
};
