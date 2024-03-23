import ToastService from "primevue/toastservice/toastservice.esm";

export default defineNuxtPlugin(nuxt => {
    nuxt.vueApp.use(ToastService)
})
