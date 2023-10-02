const login = (loggedIn: Ref<boolean>) => {
  loggedIn.value = true;
  const to = useRoute().redirectedFrom?.path || '/';
  return navigateTo(to);
}

const logout = (loggedIn: Ref<boolean>) => {
  loggedIn.value = false;
}

export const useAuth = async (): Promise<boolean> => {
  // todo: ブラウザのクッキーを取り出し下記のAPIに渡す処理を実装する

  // 1. 認証ガードされたプロフィール取得APIを叩く
  const apiUrl = `http://seisan.local:3001`;
  const { data: profile } = await useFetch(`${apiUrl}/auth/profile`);

  // 2. ストア(loggedIn)にログイン済みであることを示す値(true)を格納する
  // const loggedIn = useState('loggedIn', () => profile.value ? true : false);
  const loggedIn = {
    value: false,
  }

  // 3. ストア(me)に自分のユーザ情報を格納する
  useState('profile', () => profile.value);

  // 4. 呼び出し元であるミドルウェアにログイン状態を返却する
  return loggedIn.value;
}
