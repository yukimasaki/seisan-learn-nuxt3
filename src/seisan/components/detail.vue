<template>
  <div
    class="bg-stone-50"
    v-for="transaction in sortedTransactions"
    :key="transaction.id"
  >
    <div class="px-4 py-1 border-b">
      <div class="flex justify-between font-semibold">
        <span>{{ transaction.category.category }}</span>
        <span>{{ transaction.amount.toLocaleString() }}円</span>
      </div>
      <div>
        <span class="px-1 text-sm badge bg-green-600 text-green-50">method</span>
        <span class="px-1 text-sm">{{ paymentDate(transaction.paymentDate) }}</span>
        <span class="px-1 text-sm">{{ transaction.memo }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as dayjs from 'dayjs';
import { useTransactionStore } from '../store/useTransactionStore';
import { Transaction } from '../types/transaction';

// ストアに格納されたデータを取得してくる
const transactionStore = useTransactionStore();
const { state: transactions } = transactionStore;

const paymentDate = (date: Date): string => {
  return dayjs(date).format('YYYY/MM/DD HH:mm');
}

const sortedTransactions: ComputedRef<Transaction[]> = computed(() => {
  return transactions.value.slice().sort((older, newer) => {
    const olderDate = new Date(older.paymentDate).valueOf();
    const newerDate = new Date(newer.paymentDate).valueOf();
    return newerDate - olderDate;
  });
});
</script>
