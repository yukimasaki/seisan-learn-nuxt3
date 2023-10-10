import { useLoggedInStore } from "../store/useLoggedInStore";
import { useProfileStore } from "../store/useProfileStore";
import { UserOmitPassword } from "../types/user-omit-password";

export const useAuth = () => {
  const auth = async (): Promise<boolean> => {
    const loggedInStore = useLoggedInStore();
    const profileStore = useProfileStore();

    // 1. ストアにユーザー情報が格納されているか確認する
    const authUser = profileStore.state;
    if (authUser.value) return true;

    //2. ストアにない場合は、認証ガードされたプロフィール取得APIを叩く
    const apiUrl = `http://seisan.local:3001`;
    const { data: profile }: { data: Ref<UserOmitPassword> } = await useFetch(`${apiUrl}/auth/profile`, {
      credentials: 'include',
    });

    // 3. (2)が401エラーだった場合はリフレッシュトークンを使ってトークンを再取得する
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


    // 4. ストア(loggedIn)にログイン済みであることを示す値(true)を格納する
    const loggedIn = profile.value?.hasOwnProperty('email');
    loggedInStore.setLoggedIn(loggedIn);

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

  const logout = async () => {
    const apiUrl = `http://seisan.local:3001`;
    // todo: 型定義を追加して78行目のエラーを解消する
    const { data: logoutResult } = await useFetch(`${apiUrl}/auth/logout`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const loggedIn = logoutResult?.value?.result;
    if (!loggedIn) {
      const loggedInStore = useLoggedInStore();
      loggedInStore.setLoggedIn(loggedIn);

      const profileStore = useProfileStore();
      profileStore.setProfile({
        email: '',
        displayName: '',
        membership: '',
      });

      return
    }
  }

  return {
    auth,
    login,
    logout,
  }
}
