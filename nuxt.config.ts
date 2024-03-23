// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue'
  ],
    plugins: [
        '~/plugins/tooltip.ts',
        '~/plugins/toast.ts',
        '~/plugins/pocketbase.ts'
    ],
  primevue: {

  },
  css: [
      'primevue/resources/themes/aura-light-green/theme.css',
      'primeicons/primeicons.css',
      'primeflex/primeflex.css',
      'quill/dist/quill.core.css',
      'quill/dist/quill.snow.css',
  ]
})
