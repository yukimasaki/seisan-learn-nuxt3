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
        <div
          class="top h-5 w-full text-sm text-center"
          :class="isToday(summary.date) && 'text-red-400'"
        >
          {{ summary.label }}
        </div>
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

// detailsをストアから取得
const details: Ref<Detail[]> = useState('details');

// 現在時刻をストアに格納
const currentYearMonth: Ref<Dayjs> = useState('currentYearMonth', () => dayjs());


// 月初の日付
const startDate: Dayjs = currentYearMonth.value.startOf('month');

  // 月末の日付
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
      date: '',
      amount: 0,
    }
  });

  // 当月のデータを生成
  const amountsPerDay = reduceAmounts(details);
  const currentMonth = Array.from({ length: endDate.value }, (_, index) => {
    const incrementalNumber = index + 1
    const date = dayjs(startDate).add(index, 'day').format('YYYY/MM/DD');
    return {
      id: blank.length + incrementalNumber,
      label: incrementalNumber.toString(),
      date,
      amount: amountsPerDay.value.get(date) || 0,
    }
  });

  // blankとcurrentMonthを1つの配列に結合
  return [...blank, ...currentMonth];
});

const reduceAmounts = (
  details: Ref<Detail[]>
): ComputedRef<Map<string, number>> => computed(() => {
  console.log(details.value.length);

  const summaryMap = new Map();

  details.value.forEach(detail => {
    const paymentDateStr = detail.paymentDate.format('YYYY/MM/DD');
    const amount = detail.amount;

    if (summaryMap.has(paymentDateStr)) {
      // Map内に既に存在する日付の場合、金額を加算
      summaryMap.set(paymentDateStr, summaryMap.get(paymentDateStr) + amount);
    } else {
      // Map内に存在しない日付の場合、金額を初期化
      summaryMap.set(paymentDateStr, amount);
    }
  });

  return summaryMap;
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

const isToday = (date: string): boolean => {
  return date === dayjs().format('YYYY/MM/DD');
}
</script>
