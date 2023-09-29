export default defineNuxtRouteMiddleware(async (to, from) => {
  const loggedIn = await useAuth();

  if (loggedIn && to.path !== '/') {
    return navigateTo('/');
  }
});
