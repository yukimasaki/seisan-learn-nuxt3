<template>
  <div class="sticky bottom-0 z-30 p-4 tb:p-2 flex w-full drop-shadow">
    <div class="flex flex-grow items-center justify-between px-6">
      <button
        class="btn btn-circle drop-shadow"
        @click="navigateToHome()"
      >
        <IconBaselineHome></IconBaselineHome>
      </button>
      <ItemDialog></ItemDialog>
      <button
        class="btn btn-circle drop-shadow"
        @click="navigateToList()"
      >
        <IconBaselineFormatListBulleted></IconBaselineFormatListBulleted>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { Transaction } from '../types/transaction';

const navigateToHome = () => {
  return navigateTo('/');
}

const add = () => {
  const transaction: Transaction = {
    id: 51,
    categories: '分類不能',
    amount: 9999,
    paymentMethod: '金額指定',
    paymentDate: dayjs(`2023-08-31`),
    memo: 'added',
    paidStatus: false,
    createdAt: dayjs(`2023-08-31`),
  }

  const transactions: Ref<Transaction[]> = useState('transactions');
  transactions.value.push(transaction);
  transactions.value.sort((a, b) => b.createdAt.unix() - a.createdAt.unix());
}

const navigateToList = () => {
  return navigateTo('/list');
}
</script>
