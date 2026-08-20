import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checkerPlugin from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  build: {
    sourcemap: true,
  },
  define: {
    bridgeVersion: JSON.stringify(process.env.npm_package_version),
  },
  plugins: [
    react(),
    svgr(),
    checkerPlugin({
      eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' },
      overlay: false,
      typescript: true,
    }),
  ],
  resolve: {
    alias: [{ find: "src", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    open: true,
    // Dev-only, opt-in reverse proxy so a same-origin faucet/API can be hit from
    // localhost without CORS. Set FAUCET_PROXY_TARGET when running `npm run dev`
    // and point VITE_FAUCET_API_URL at `/faucet-api/api/claim`. No effect on build.
    proxy: process.env.FAUCET_PROXY_TARGET
      ? {
          "/faucet-api": {
            changeOrigin: true,
            rewrite: (requestPath) => requestPath.replace(/^\/faucet-api/, ""),
            secure: true,
            target: process.env.FAUCET_PROXY_TARGET,
          },
        }
      : undefined,
    watch: {
      ignored: ["!**/*.tsx", "!**/*.ts", "**/*.json", "**/*.svg?react", "**/*.png", "**/*.jpg", "**/*.css"],
    },
  },
});
