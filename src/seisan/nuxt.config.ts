// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@vite-pwa/nuxt',
    '@nuxtjs/dayjs',
  ],
  app: {
    head: {
      link: [
        { rel: "manifest", href: "/manifest.webmanifest" },
      ],
    },
  },
  pwa: {
    registerType: "autoUpdate",
    includeAssets: ["favicon.ico"],
    client: {
      installPrompt: true,
    },
    manifest: {
      name: 'seisan-learn',
      description: "description",
      theme_color: "#B3DBA9",
      lang: "ja",
      short_name: "seisan",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      icons: [
        {
          src: "_nuxt/assets/pwa_icons/36x36.png",
          sizes: "36x36",
          type: "image/png"
        },
        {
          src: "_nuxt/assets/pwa_icons/48x48.png",
          sizes: "48x48",
          type: "image/png"
        },
        {
          src: "_nuxt/assets/pwa_icons/72x72.png",
          sizes: "72x72",
          type: "image/png"
        },
        {
          src: "_nuxt/assets/pwa_icons/96x96.png",
          sizes: "96x96",
          type: "image/png"
        },
        {
          src: "_nuxt/assets/pwa_icons/144x144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "_nuxt/assets/pwa_icons/192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "_nuxt/assets/pwa_icons/512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    },
    workbox: {
      navigateFallback: null
    },
    devOptions: {
      enabled: true,
      type: "module"
    },
    // icon: {
    //   source: "icon.png",
    // }
  },
})
