import * as dayjs from 'dayjs';
import { Transaction } from '../types/transaction';

export const fetchTransaction = async (
  start: string = dayjs().startOf('month').format('YYYY-MM-DD'),
  end: string = dayjs().endOf('month').format('YYYY-MM-DD'),
) => {
  const apiUrl = `http://seisan.local:3001`;
  const { data: transactions }: { data: Ref<Transaction[]> } = await useFetch(`${apiUrl}/transaction?start=${start}&end=${end}`);
}
