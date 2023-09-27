import * as dayjs from 'dayjs';
import { Detail } from '../types/detail';

export const fetchDetail = async (
  start: string = dayjs().startOf('month').format('YYYY-MM-DD'),
  end: string = dayjs().endOf('month').format('YYYY-MM-DD'),
) => {
  const apiUrl = `http://seisan.local:3001`;
  const { data: details }: { data: Ref<Detail[]> } = await useFetch(`${apiUrl}/transaction?start=${start}&end=${end}`);
}
