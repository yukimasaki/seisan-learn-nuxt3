<template>
  <div class="card bg-stone-50 drop-shadow rounded-none">
    <!-- カレンダーのヘッダー部分 -->
    <div class="p-1 bg-stone-200">
      <div class="flex justify-between px-10 tb:px-4 items-center">
        <MonthPicker></MonthPicker>
        <div class="flex">
          <button class="btn btn-ghost btn-xs" @click="navigateMonth('prev')">
            <IconBaselineKeyboardArrowLeft></IconBaselineKeyboardArrowLeft>
          </button>
          <button class="btn btn-ghost btn-xs" @click="navigateMonth('next')">
            <IconBaselineKeyboardArrowRight></IconBaselineKeyboardArrowRight>
          </button>
        </div>
      </div>
    </div>
    <!-- カレンダーのボディ部分 -->
    <div class="grid grid-cols-7 gap-1">
      <span
        class="self-center justify-self-center border-stone-300 text-stone-400 text-xs pt-0.5 px-2"
        v-for="dayLabel in dayLabels"
      >
        {{ dayLabel }}
      </span>
    </div>
    <div class="grid grid-cols-7 gap-1">
      <div
        v-for="date in dates"
        class="flex flex-col h-12 mx-auto justify-center"
      >
        <div class="top h-5 w-full text-sm text-center">{{ date }}</div>
        <div class="bottom flex-grow h-7 py-1 w-full cursor-pointer text-center">
          <div class="text-xs">7,777</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { randBetween } from '../utils/randBetween';
import dayjs from 'dayjs';

// 月末の日にち
const endDate = ref(dayjs().endOf('month').get('date'));

// 月初の曜日
const startWeekday = ref(dayjs().startOf('month').get('day'));

// カレンダーに表示する配列を生成
const dates = computed(() => {
  let data: string[] = [];
  // 月初までは空欄を表示
  Array.from({ length: startWeekday.value }, (_, index) => data.push(''));

  // 当月の日付を表示
  Array.from({ length: endDate.value }, (_, index) => data.push((index + 1).toString()));

  return data;
});

// カレンダーに表示する曜日ラベル
const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];

// カレンダーの戻る・進むボタンを押した回数に応じてカレンダーの表示内容を更新する
const navigateCount = ref(1);
const navigateMonth = (direction: string): void => {
  const count = navigateCount.value++
  if (direction === 'prev') {
    // 1か月前
    endDate.value = dayjs().subtract(count, 'month').endOf('month').date();
    startWeekday.value = dayjs().subtract(count, 'month').startOf('month').get('day');
  } else {
    // 1か月後
    endDate.value = dayjs().add(count, 'month').endOf('month').date();
    startWeekday.value = dayjs().add(count, 'month').startOf('month').get('day');
  }
}
</script>
