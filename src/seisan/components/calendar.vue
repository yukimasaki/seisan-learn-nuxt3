<template>
  <div class="card bg-stone-50 drop-shadow rounded-none">
    <!-- カレンダーのヘッダー部分 -->
    <div class="p-1 bg-stone-200">
      <div class="flex justify-between px-10 tb:px-4 items-center">
        <MonthPicker></MonthPicker>
        <div class="flex">
          <button class="btn btn-ghost btn-xs" @click="navigateCalendar('prev')">
            <IconBaselineKeyboardArrowLeft></IconBaselineKeyboardArrowLeft>
          </button>
          <button class="btn btn-ghost btn-xs" @click="navigateCalendar('next')">
            <IconBaselineKeyboardArrowRight></IconBaselineKeyboardArrowRight>
          </button>
        </div>
      </div>
      <div>{{ details.length }}</div>
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
    <div
      class="grid grid-cols-7 gap-1"
      v-touch:swipe.left="() => navigateCalendar('next')"
      v-touch:swipe.right="() => navigateCalendar('prev')"
    >
      <div
        v-for="summary in summaries"
        class="flex flex-col h-12 mx-auto justify-center"
      >
        <div class="top h-5 w-full text-sm text-center">{{ summary.label }}</div>
        <div class="bottom flex-grow h-7 py-1 w-full cursor-pointer text-center">
          <div v-if="summary.amount > 0" class="text-xs">{{ summary.amount.toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { Detail } from '../types/detail';
import { Summary } from '../types/summary';

// 現在時刻をストアに格納
const currentYearMonth: Ref<Dayjs> = useState('currentYearMonth', () => dayjs());

// 月末の日にち
const endDate: Ref<number> = ref(currentYearMonth.value.endOf('month').get('date'));

// 月初の曜日
const startWeekday: Ref<number> = ref(currentYearMonth.value.startOf('month').get('day'));

// カレンダーに表示する配列を生成
const summaries: ComputedRef<Summary[]> = computed(() => {
  // 月初までは全てのプロパティに空欄を格納
  const blank = Array.from({ length: startWeekday.value }, (_, index) => {
    const incrementalNumber = index + 1
    return {
      id: incrementalNumber,
      label: '',
      amount: 0,
    }
  });

  // 当月のデータを生成
  const currentMonth = Array.from({ length: endDate.value }, (_, index) => {
    const incrementalNumber = index + 1
    return {
      id: blank.length + incrementalNumber,
      label: incrementalNumber.toString(),
      amount: 777,
    }
  });

  // blankとcurrentMonthを1つの配列に結合
  return [...blank, ...currentMonth];
});

// カレンダーに表示する曜日ラベル
const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];

// カレンダーの戻る・進むボタンが押されるとカレンダーの表示内容を更新する
const navigateCalendar = (direction: string): void => {
  let month: Dayjs;
  if (direction === 'prev') {
    month = dayjs(currentYearMonth.value).subtract(1, 'month');
  } else {
    month = dayjs(currentYearMonth.value).add(1, 'month');
  }
  endDate.value = month.endOf('month').get('date');
  startWeekday.value = month.startOf('month').get('day');
  currentYearMonth.value = month;
}

// 年月ピッカーで月が選択されるとカレンダーの表示内容を更新する
watch(currentYearMonth, (next, prev) => {
  endDate.value = next.endOf('month').get('date');
  startWeekday.value = next.startOf('month').get('day');
});

const details: Ref<Detail[]> = useState('details');

</script>
