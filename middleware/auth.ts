export default defineNuxtRouteMiddleware((to, from) => {
    if (!useNuxtApp().$pb.authStore.isValid && to.path !== '/login') {
        return navigateTo("/login");
    }
});
