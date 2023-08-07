<template>
  <div class="card bg-stone-50 drop-shadow rounded-none">
    <!-- カレンダーのヘッダー部分 -->
    <div class="p-1 bg-stone-200">
      <div class="flex justify-between px-10 tb:px-4 items-center">
        <div class="">2023年 10月</div>
        <div class="">&lt; &gt;</div>
      </div>
    </div>
    <!-- カレンダーのボディ部分 -->
    <table>
      <thead>
        <tr>
          <th v-for="label in daysLabel" class="border-stone-300 text-stone-400 font-normal text-sm pt-0.5 px-2">{{ label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeks" :key="week.id" class="text-center">
          <td v-for="day in days" :key="day.id" class="border-stone-300 px-1 pt-0.5 h-12">
            <div class="flex flex-col h-12 mx-auto">
              <div class="top h-5 w-full">
                <span class="text-black font-bold">{{ day.value }}</span>
              </div>
              <div class="bottom flex-grow h-7 py-1 w-full cursor-pointer">
                <div class="text-xs">{{ day.amount }}</div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { randBetween } from '../utils/randBetween';

const daysLabel = ['日', '月', '火', '水', '木', '金', '土'];

const days = Array.from({ length: 7 }, (_, index) => ({
  id: index,
  value: index + 1,
  amount: randBetween(98, 19800),
}));

const weeks = Array.from({ length: 4 }, (_, index) => ({
  id: index,
  value: index + 1,
}));
</script>
