// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: false,
  devtools: { enabled: true },
  devServer: {
    port: 5173,
    host: "0.0.0.0",
  },
  vite: {
    server: {
      hmr: {
        host: "localhost",
        port: 5173,
        protocol: "ws",
        // clientPort: 5173,
      },
    },
  },
  routeRules: {
    "/": { redirect: "/requests" },
  },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "@vite-pwa/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },
  app: {
    head: {
      link: [
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
          sizes: "180x180",
        },
        { rel: "manifest", href: "/manifest.webmanifest" },
      ],
      meta: [
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
        { name: "apple-mobile-web-app-title", content: "AD app" },
        { name: "theme-color", content: "#3b82f6" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  pwa: {
    registerType: "autoUpdate",
    devOptions: { enabled: true },
    client: { installPrompt: true },
    manifest: {
      name: "mini AD app",
      short_name: "AD app",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#3b82f6",
      icons: [
        { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        {
          src: "/pwa-512x512-maskable.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      cleanupOutdatedCaches: true,
      navigateFallback: "/",
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === "navigate",
          handler: "NetworkFirst",
        },
        {
          urlPattern: ({ url }) => url.origin === self.location.origin,
          handler: "CacheFirst",
          options: { cacheName: "static-resources" },
        },
      ],
    },
  },
});
