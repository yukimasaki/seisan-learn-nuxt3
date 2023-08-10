export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useAuth();

  if (!loggedIn.value && to.path !== '/login') {
    return navigateTo('/login');
  }
});
