import dayjs from 'dayjs';
import { randBetween } from '../utils/randBetween';
import { Detail } from '../types/detail';

export const fetchDetail = (): void => {
  // サンプルデータ（バックエンドとの繋ぎ込みが完了したら削除する）
  const genre = [
    '通信費',
    '食費',
    '外食費',
    '住居費',
    '光熱費',
    '水道費',
    '美容費',
    '税金・保険費',
    '分類不能',
  ];

  const paymentMethod = [
    '比率',
    '金額',
    '均等',
  ];

  const details: Detail[] = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    genre: genre[randBetween(0, genre.length - 1)],
    amount: randBetween(98, 19800),
    paymentMethod: paymentMethod[randBetween(0, paymentMethod.length - 1)],
    paymentDate: dayjs(`2023-08-${randBetween(1, 31)}`),
    memo: genre[randBetween(0, genre.length - 1)],
    paidStatus: randBetween(0, 1) ? true : false,
    createdAt: dayjs(`2023-08-${randBetween(1, 31)}`),
  }));

  // 取得したデータをストアに格納する
  useState('details', () => details);
}
