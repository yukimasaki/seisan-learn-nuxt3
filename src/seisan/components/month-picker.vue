<template>
  <div>
    <div
      onclick="my_month_picker.showModal()"
      class="btn btn-ghost btn-xs"
    >
      {{ currentYearMonth.format('YYYY年M月') }}
    </div>

    <dialog id="my_month_picker" class="modal">
      <form method="dialog" class="modal-box">
        <!-- ヘッダー部分 -->
        <div class="flex justify-between">
          <div class="btn btn-ghost" @click="navigateMonth('prev')">
            <IconBaselineKeyboardArrowLeft></IconBaselineKeyboardArrowLeft>
          </div>
          <div class="btn btn-ghost">
            {{ pickerYearMonth.format('YYYY') }}
          </div>
          <div class="btn btn-ghost" @click="navigateMonth('next')">
            <IconBaselineKeyboardArrowRight></IconBaselineKeyboardArrowRight>
          </div>
        </div>

        <!-- ボディ部分 -->
        <div class="grid grid-cols-4 ">
          <button
            v-for="month in months"
            class="btn btn-ghost self-center justify-self-center m-0"
            @click="onSelectMonthPicker(month)"
          >
            {{ month.format('M') }}月
          </button>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs';

const currentYearMonth: Ref<Dayjs> = useState('currentYearMonth');

const onSelectMonthPicker = (month: Dayjs): void => {
  currentYearMonth.value = month;
}

const pickerYearMonth: Ref<Dayjs> = ref(dayjs());
pickerYearMonth.value = currentYearMonth.value.clone();

const navigateMonth = (direction: string): void => {
  if (direction === 'prev') {
    pickerYearMonth.value = dayjs(pickerYearMonth.value).subtract(1, 'year');
  } else {
    pickerYearMonth.value = dayjs(pickerYearMonth.value).add(1, 'year');
  }
}

const months: ComputedRef<Dayjs[]> = computed(() => {
  return Array.from({ length: 12 }, (_, monthIndex) => {
    return dayjs(pickerYearMonth.value).month(monthIndex).startOf('month');
  });
});
</script>
