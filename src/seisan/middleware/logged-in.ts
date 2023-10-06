export default defineNuxtRouteMiddleware(async (to, from) => {
  const { auth } = await useAuth();
  const loggedIn = await auth();
  const authNotRequiredPaths: string[] = [
    '/login',
  ];

  if (loggedIn && authNotRequiredPaths.includes(to.path)) {
    return navigateTo('/');
  } else if (loggedIn && !authNotRequiredPaths.includes(to.path)) {
    return navigateTo(from.path);
  }
});
