<template>
  <div
    class="bg-stone-50"
    v-for="transaction in transactions"
    :key="transaction.id"
  >
    <div class="px-4 py-1 border-b">
      <div class="flex justify-between font-semibold">
        <span>{{ transaction.category.category }}</span>
        <span>{{ transaction.amount.toLocaleString() }}円</span>
      </div>
      <div>
        <span class="px-1 text-sm badge bg-green-600 text-green-50">method</span>
        <span class="px-1 text-sm">{{ transaction.paymentDate }}</span>
        <span class="px-1 text-sm">{{ transaction.memo }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from '../store/useTransactionStore';

// ストアに格納されたデータを取得してくる
const transactionStore = useTransactionStore();
const { state: transactions } = transactionStore;
</script>
