export default defineNuxtRouteMiddleware(async (to, from) => {
  const { auth } = await useAuth();
  const loggedIn = await auth();

  if (!loggedIn && to.path !== '/login') {
    return navigateTo('/login');
  }
});
