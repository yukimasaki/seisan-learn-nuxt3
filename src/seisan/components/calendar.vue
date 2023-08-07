<template>
  <!-- 68px: ヘッダーの高さ、24px: フッターの高さをハードコーディングしている -->
  <div class="w-full bg-base-100">
    <div class="sticky top-16 z-20">
      <div class="card bg-stone-50 drop-shadow rounded-none">
        <!-- カレンダーのヘッダー部分 -->
        <div class="p-4 bg-stone-200 border-stone-300">
          <div class="flex justify-between px-10 tb:px-4 items-center">
            <div class="">2023年 10月</div>
            <div class="">&lt; &gt;</div>
          </div>
        </div>
        <!-- カレンダーのボディ部分 -->
        <table>
          <thead>
            <tr>
              <th v-for="label in daysLabel" class="border-stone-300 border-r border-b text-sm py-1 px-2">{{ label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="week in weeks" :key="week.id" class="text-center">
              <td v-for="day in days" :key="day.id" class="border-stone-300 border p-1 h-12">
                <div class="flex flex-col h-12 mx-auto">
                  <div class="top h-5 w-full">
                    <span class="text-gray-500">{{ day.value }}</span>
                  </div>
                  <div class="bottom flex-grow h-7 py-1 w-full cursor-pointer">
                    <div class="text-sm">12,345</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
</template>

<script setup lang="ts">
const randBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const daysLabel = ['日', '月', '火', '水', '木', '金', '土'];

const days = Array.from({ length: 7 }, (_, index) => ({
  id: index,
  value: index + 1,
}));

const weeks = Array.from({ length: 4 }, (_, index) => ({
  id: index,
  value: index + 1,
}));

const details = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: '食材',
  amount: randBetween(98, 19800),
}));
</script>
