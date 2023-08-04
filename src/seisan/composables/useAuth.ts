const login = (loggedIn: Ref<boolean>) => {
  loggedIn.value = true;
  const to = useRoute().redirectedFrom?.path || '/';
  return navigateTo(to);
}

const logout = (loggedIn: Ref<boolean>) => {
  loggedIn.value = false;
}

export const useAuth = () => {
  // 1. 認証が必要なユーザ情報取得API(/api/users/me)を叩く
  // ※まだAPIを実装していないのでハードコーディングしている

  // 2. (クッキーにセッションIDを保持している)ログイン済みユーザであればユーザ情報が返却される
  // a. ユーザ情報を取得できなかった場合
  // const me = null;

  // b. ユーザ情報を取得できた場合
  const me = {
    id: 1,
    email: 'user1@example.com',
    displayName: 'User 1',
    role: 'admin',
    tenantId: '1',
  }

  // 3. ストア(loggedIn)にログイン済みであることを示す値(true)を格納する
  const loggedIn = useState('loggedIn', () => me ? true : false);

  // 4. ストア(me)に自分のユーザ情報を格納する
  useState('me', () => me);

  // 5. 呼び出し元であるミドルウェアにログイン状態を返却する
  return {
    loggedIn,
  }
}
