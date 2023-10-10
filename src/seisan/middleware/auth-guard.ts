import { useLoggedInStore } from "../store/useLoggedInStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { auth } = await useAuth();
  await auth();

  const loggedInStore = useLoggedInStore();
  const loggedIn = loggedInStore.state;

  if (!loggedIn.value && to.path !== '/login') {
    return navigateTo('/login');
  }
});
