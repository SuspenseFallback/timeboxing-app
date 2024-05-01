import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { join } from "node:path";
import { buildSync } from "esbuild";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";
import { fcmSwEnvPlugin } from "./config/vitePlugins";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      plugins: [
        react(),
        tsconfigPaths(),
        VitePWA({
          strategies: "injectManifest",
          injectRegister: null,
          registerType: "autoUpdate",
          devOptions: {
            enabled: true,
            type: "module",
            navigateFallback: "index.html",
          },
          workbox: {
            sourcemap: true,
          },
        }),
        VitePWA({
          registerType: "autoUpdate",
          devOptions: {
            enabled: true,
          },
          includeAssets: [
            "favicon.ico",
            "apple-touch-icon.png",
            "mask-icon.svg",
          ],
          manifest: {
            name: "Samayam",
            short_name: "Samayam",
            theme_color: "#ffffff",
            icons: [
              {
                src: "pwa-64x64.png",
                sizes: "64x64",
                type: "image/png",
              },
              {
                src: "pwa-192x192.png",
                sizes: "192x192",
                type: "image/png",
              },
              {
                src: "pwa-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
              },
              {
                src: "maskable-icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
              },
            ],
          },
        }),
      ],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    };
  } else {
    return {
      plugins: [react(), tsconfigPaths()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      build: {
        target: "es2022",
        rollupOptions: {
          input: {
            main: "./index.html",
            "firebase-messaging-sw": "./src/firebase-messaging-sw.js",
          },
          output: {
            entryFileNames: (chunkInfo) => {
              return chunkInfo.name === "firebase-messaging-sw"
                ? "[name].js" // Output service worker in root
                : "assets/[name]-[hash].js"; // Others in `assets/`
            },
          },
        },
      },
    };
  }
});
