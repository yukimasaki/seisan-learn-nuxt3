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
            {{ currentYearMonth.format('YYYY') }}
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

const onSelectMonthPicker = (month: Dayjs) => {
  currentYearMonth.value = month;
}

const navigateMonth = (direction: string) => {
  if (direction === 'prev') {
    console.log(`前月を表示する`);
  } else {
    console.log(`次月を表示する`);
  }
}

const months = computed(() => {
  return Array.from({ length: 12 }, (_, monthIndex) => {
    return dayjs(currentYearMonth.value).month(monthIndex).startOf('month');
  });
});
</script>
