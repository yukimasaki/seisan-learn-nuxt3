<template>
  <div
    class="bg-stone-50"
    v-for="detail in details"
    :key="detail.id"
  >
    <div class="px-4 py-1 border-b">
      <div class="flex justify-between font-semibold">
        <span>{{ detail.genre }}</span>
        <span>{{ detail.amount }}円</span>
      </div>
      <div>
        <span class="px-1 text-sm badge bg-green-600 text-green-50">{{ detail.paymentMethod }}</span>
        <span class="px-1 text-sm">{{ detail.paymentDate.format('YYYY/MM/DD') }}</span>
        <span class="px-1 text-sm">{{ detail.memo }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { randBetween } from '../utils/randBetween';

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

const details = reactive(Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  genre: genre[randBetween(0, genre.length - 1)],
  amount: randBetween(98, 19800).toLocaleString(),
  paymentMethod: paymentMethod[randBetween(0, paymentMethod.length - 1)],
  paymentDate: dayjs(`2023-08-${randBetween(1, 31)}`),
  memo: genre[randBetween(0, genre.length - 1)],
  paidStatus: randBetween(0, 1) ? true : false,
  createdAt: dayjs(`2023-08-${randBetween(1, 31)}`),
})));

// detailsを降順にソート
details.sort((a, b) => b.createdAt.unix() - a.createdAt.unix());
</script>
