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
import { Detail } from '../types/detail';

// ストアに格納されたデータを取得してくる
const details: Ref<Detail[]> = useState('details');

// detailsを降順にソート
details.value.sort((a, b) => b.createdAt.unix() - a.createdAt.unix());
</script>
