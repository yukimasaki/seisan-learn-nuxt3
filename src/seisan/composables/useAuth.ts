import { LoginResponse } from "../types/login-response";

export const useAuth = () => {
  const auth = async () => {
    // todo: ブラウザのクッキーを取り出し下記のAPIに渡す処理を実装する

    // 1. 認証ガードされたプロフィール取得APIを叩く
    const apiUrl = `http://seisan.local:3001`;
    const { data: loginResponse }: { data: Ref<LoginResponse> } = await useFetch(`${apiUrl}/auth/profile`, {
      credentials: 'include',
    });

    // 2. ストア(loggedIn)にログイン済みであることを示す値(true)を格納する
    const loggedIn = useState('loggedIn', () => loginResponse.value ? true : false);
    // issue: ↓ これがfalsyになるせいで、ログイン成功したにもかかわらずauth-guardによるログイン画面へのリダイレクトが発生してしまう。
    console.log(loggedIn.value);

    // 3. ストアに自分のユーザ情報を格納する
    useState('loginResponse', () => loginResponse.value);

    // 4. 呼び出し元であるミドルウェアにログイン状態を返却する
    return loggedIn.value;
  }

  const login = async (
    email: string,
    password: string,
  ) => {
    const apiUlr = `http://seisan.local:3001`;

    // useFetch
    // const { data: loginResponse }: { data: Ref<LoginResponse> } = await useFetch(`${apiUlr}/auth/login`, {
    //   method: 'POST',
    //   body: {
    //     email,
    //     password,
    //   },
    //   credentials: 'include',
    // });

    // fetch
    fetch(`${apiUlr}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: 'aaa',
      }),
      credentials: 'include',
    })
    .then(async (res) => {
      const loginResponse: Promise<LoginResponse> = await res.json();
      console.log(loginResponse);

      const loggedIn = useState('loggedIn', () => true);
    })


    // return loginResponse.value
  }

  return {
    auth,
    login
  }
}
