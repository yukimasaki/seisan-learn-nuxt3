import { useLoggedInStore } from "../store/useLoggedInStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { auth } = await useAuth();
  await auth();

  const loggedInStore = useLoggedInStore();
  const loggedIn = loggedInStore.state;

  const authNotRequiredPaths: string[] = [
    '/login',
  ];

  if (loggedIn.value && authNotRequiredPaths.includes(to.path)) {
    return navigateTo('/');
  } else if (loggedIn.value && !authNotRequiredPaths.includes(to.path)) {
    return navigateTo(from.path);
  }
});
