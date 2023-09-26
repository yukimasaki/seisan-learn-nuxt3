import { Detail } from '../types/detail';

export const fetchDetail = async () => {
  const apiUrl = `http://seisan.local:3001`;
  const { data }: { data: globalThis.Ref<Detail[]> } = await useFetch(`${apiUrl}/transaction`);
  const details = data;
  // 取得したデータをストアに格納する
  useState('details', () => details);
}
