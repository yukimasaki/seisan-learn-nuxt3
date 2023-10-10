import { useLoggedInStore } from "../store/useLoggedInStore";
import { useProfileStore } from "../store/useProfileStore";
import { UserOmitPassword } from "../types/user-omit-password";

export const useAuth = () => {
  const auth = async (): Promise<boolean> => {
    // 1. 認証ガードされたプロフィール取得APIを叩く
    const apiUrl = `http://seisan.local:3001`;
    const { data: profile }: { data: Ref<UserOmitPassword> } = await useFetch(`${apiUrl}/auth/profile`, {
      credentials: 'include',
    });

    // 2. (1)が401エラーだった場合はリフレッシュトークンを使ってトークンを再取得する
    if (!profile.value?.email) {
      const { data: refreshedProfile }: { data: Ref<UserOmitPassword> } = await useFetch(`${apiUrl}/auth/refresh`, {
        credentials: 'include',
      });

      const loggedIn = refreshedProfile.value?.hasOwnProperty('email');
      const loggedInStore = useLoggedInStore();
      loggedInStore.setLoggedIn(loggedIn);

      const profileStore = useProfileStore();
      profileStore.setProfile(refreshedProfile.value);

      return loggedIn;
    }


    // 3. ストア(loggedIn)にログイン済みであることを示す値(true)を格納する
    const loggedIn = profile.value?.hasOwnProperty('email');
    const loggedInStore = useLoggedInStore();
    loggedInStore.setLoggedIn(loggedIn);

    const profileStore = useProfileStore();
    profileStore.setProfile(profile.value);

    return loggedIn;
  }

  const login = async (
    email: string,
    password: string,
  ): Promise<void> => {
    const apiUrl = `http://seisan.local:3001`;
    const { data: profile }: { data: Ref<UserOmitPassword> } = await useFetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      body: {
        email,
        password,
      },
      credentials: 'include',
    });

    const loggedIn = profile.value?.hasOwnProperty('email');
    const loggedInStore = useLoggedInStore();
    loggedInStore.setLoggedIn(loggedIn);

    const profileStore = useProfileStore();
    profileStore.setProfile(profile.value);

    if (loggedIn) return navigateTo('/');
  }

  return {
    auth,
    login
  }
}
