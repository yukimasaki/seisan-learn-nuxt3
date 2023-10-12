import { useActiveGroupStore } from "../store/useActiveGroupStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const excludePaths: string[] = [
    '/welcome',
    '/login',
    '/setting',
  ];

  const { getLocalStorage } = usePersist();
  const activeGroupStore = useActiveGroupStore();

  // ローカルストレージに永続化されている「アクティブなグループ」を、ストアに引っ張り出す
  const activeGroup: string | null = getLocalStorage('activeGroup');
  activeGroupStore.setActiveGroup(activeGroup);

  // todo: メッセージをトーストで表示する
  console.log(`アクティブなグループを設定してください`);

  // ストアがnullの場合は「アクティブなグループ」を選択する画面に遷移
  if (!activeGroup && !excludePaths.includes(to.path)) return navigateTo('/setting');

});
