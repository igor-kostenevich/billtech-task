export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  components: true,
  ssr: false,
  runtimeConfig: {
    public: {
      baseURL: 'https://avs-backend.vercel.app'
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap',
          onload: "this.onload=null;this.rel='stylesheet'",
        },
      ],
      noscript: [
        {
          innerHTML: `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap">`,
        },
      ],
    },
  },
  typescript: {
    strict: true,
  },
  nitro: {
    compressPublicAssets: true
  },
  vite: {
    build: {
      target: 'esnext',
      minify: 'terser',
    },
    logLevel: 'error',
  },
  build: {
    transpile: ['swiper'],
  },
  compatibilityDate: '2025-01-30',
})
