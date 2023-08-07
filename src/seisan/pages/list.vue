<template>
  <div class="bg-base-200 flex items-start justify-center">
    <!-- 68px: ヘッダーの高さ、24px: フッターの高さをハードコーディングしている -->
    <div class="w-full bg-base-100">
      <div class="sticky top-16 z-20">
        <!-- カレンダー全体 -->
        <Calendar></Calendar>
        <div class="p-2 w-full bg-stone-200 drop-shadow">詳細</div>
      </div>

      <div v-for="detail in details" :key="detail.id">
        <div class="px-8 py-1 flex justify-between border-b">
          <span class="">ID: {{ detail.id }}</span>
          <span class="">タイトル: {{ detail.title }}</span>
          <span class="">金額: {{ detail.amount }}円</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-guard',
});

const randBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const details = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: '食材',
  amount: randBetween(98, 19800),
}));
</script>
