<template>
  <div>
    <div
      onclick="my_month_picker.showModal()"
      class="btn btn-ghost"
    >
      {{ currentYearMonth.format('YYYY年M月') }}
    </div>

    <dialog id="my_month_picker" class="modal">
      <form method="dialog" class="modal-box">
        <!-- ヘッダー部分 -->
        <div class="flex justify-between pb-2">
          <span>＜</span>
          <span>{{ currentYearMonth.format('YYYY') }}</span>
          <span>＞</span>
        </div>

        <!-- ボディ部分 -->
        <div class="grid grid-cols-4 ">
          <button
            v-for="month in months"
            class="modal-action btn btn-ghost self-center justify-self-center m-0"
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

const currentYearMonth = ref(dayjs());

const onSelectMonthPicker = (month: Dayjs) => {
  currentYearMonth.value = month;
}

const months = Array.from({ length: 12 }, (_, monthIndex) => {
  return dayjs().month(monthIndex).startOf('month');
});
</script>
