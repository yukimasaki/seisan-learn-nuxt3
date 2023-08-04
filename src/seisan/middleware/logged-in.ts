export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useAuth();
  console.log(`loggedIn: ${loggedIn.value}`);

  if (loggedIn.value && to.path !== '/') {
    return navigateTo('/');
  }
});
