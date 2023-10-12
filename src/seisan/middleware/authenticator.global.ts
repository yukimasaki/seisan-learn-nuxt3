import { useLoggedInStore } from "../store/useLoggedInStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const excludePaths: string[] = [
    '/welcome',
    '/login',
  ];

  const { auth } = await useAuth();
  await auth();

  const loggedInStore = useLoggedInStore();
  const loggedIn = loggedInStore.state;

  if (!loggedIn.value &&  !excludePaths.includes(to.path)) {
    return navigateTo('/login');
  }
});
