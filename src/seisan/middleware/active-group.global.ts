export default defineNuxtRouteMiddleware(async (to, from) => {
  const excludePaths: string[] = [
    '/welcome',
    '/login',
    '/setting',
  ];

  const { getLocalStorage } = usePersist();

  // ローカルストレージに永続化されている「アクティブなグループ」を、ストアに引っ張り出す (ActiveGroup | null)
  const activeGroupId: string | null = getLocalStorage('activeGroup');

  // todo: メッセージをトーストで表示する
  console.log(`アクティブなグループを設定してください`);

  // ストアがnullの場合は「アクティブなグループ」を選択する画面に遷移
  if (!activeGroupId && !excludePaths.includes(to.path)) return navigateTo('/setting');

});
