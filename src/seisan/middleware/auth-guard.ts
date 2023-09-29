export default defineNuxtRouteMiddleware(async (to, from) => {
  const loggedIn = await useAuth();

  if (!loggedIn && to.path !== '/login') {
    return navigateTo('/login');
  }
});
