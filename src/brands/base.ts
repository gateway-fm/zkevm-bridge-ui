import Logo from "src/assets/icons/logo-gatewayfm.svg?react";
import { Brand } from "src/brands/brand";

// The default Gateway brand. Its palette, font and header links reproduce the
// values that were previously hard-coded in theme.ts / app.styles.ts /
// header-links, so a build with no `VITE_BRAND` set is byte-identical to before.
export const baseBrand: Brand = {
  assets: {
    Logo,
    LogoMark: Logo,
  },
  faucet: {
    apiUrl: "",
    enabled: false,
    tokenSymbol: "ETH",
  },
  fontFaces: [
    {
      fallbacks: [
        { src: "url('/fonts/modern-era/ModernEra-Regular.woff') format('woff')" },
        { src: "url('/fonts/modern-era/ModernEra-Regular.ttf') format('truetype')" },
      ],
      fontFamily: "Modern Era",
      fontStyle: "normal",
      fontWeight: 400,
      src: "url('/fonts/modern-era/ModernEra-Regular.woff2') format('woff2')",
    },
    {
      fallbacks: [
        { src: "url('/fonts/modern-era/ModernEra-Medium.woff') format('woff')" },
        { src: "url('/fonts/modern-era/ModernEra-Medium.ttf') format('truetype')" },
      ],
      fontFamily: "Modern Era",
      fontStyle: "normal",
      fontWeight: 500,
      src: "url('/fonts/modern-era/ModernEra-Medium.woff2') format('woff2')",
    },
    {
      fallbacks: [
        { src: "url('/fonts/modern-era/ModernEra-Bold.woff') format('woff')" },
        { src: "url('/fonts/modern-era/ModernEra-Bold.ttf') format('truetype')" },
      ],
      fontFamily: "Modern Era",
      fontStyle: "normal",
      fontWeight: 700,
      src: "url('/fonts/modern-era/ModernEra-Bold.woff2') format('woff2')",
    },
    {
      fallbacks: [
        { src: "url('/fonts/modern-era/ModernEra-ExtraBold.woff') format('woff')" },
        { src: "url('/fonts/modern-era/ModernEra-ExtraBold.ttf') format('truetype')" },
      ],
      fontFamily: "Modern Era",
      fontStyle: "normal",
      fontWeight: 800,
      src: "url('/fonts/modern-era/ModernEra-ExtraBold.woff2') format('woff2')",
    },
  ],
  fontFamily: "Modern Era",
  header: {
    deployButton: { title: "Deploy rollup", url: "https://presto.gateway.fm/onboarding" },
    homeUrl: "https://gateway.fm/",
    links: [
      { title: "Rollup", url: "https://gateway.fm/presto" },
      { title: "Stakeway", url: "https://stakeway.com/" },
      { title: "RPC", url: "https://gateway.fm/rpc" },
      { title: "Blog", url: "https://gateway.fm/blog" },
      { title: "About", url: "https://gateway.fm/about" },
      { title: "Careers", url: "https://boards.eu.greenhouse.io/gatewayfm" },
    ],
    poweredByUrl: "https://gateway.fm/",
  },
  id: "base",
  palette: {
    black: "#0a0b0d",
    error: { light: "rgba(232,67,12,0.1)", main: "#e8430d" },
    grey: { dark: "#78798d", light: "#f0f1f6", main: "#e2e5ee", veryDark: "#363740" },
    primary: { dark: "#5a1cc3", light: "#EEE8FF", main: "#7b3fe4", mainRedesign: "#8950FA" },
    success: { light: "rgba(0,255,0,0.1)", main: "#54DC04" },
    transparency: "rgba(8,17,50,0.5)",
    warning: { light: "rgba(225,126,38,0.1)", main: "#e17e26" },
    white: "#ffffff",
  },
};
