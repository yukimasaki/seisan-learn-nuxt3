<template>
  <div>
    <div
      onclick="my_month_picker.showModal()"
      class="btn btn-ghost"
    >
      {{ now.format('YYYY年M月') }}
    </div>

    <dialog id="my_month_picker" class="modal">
      <form method="dialog" class="modal-box">
        <!-- ヘッダー部分 -->
        <div class="flex justify-between">
          <span>＜</span>
          <span>{{ now.format('YYYY') }}</span>
          <span>＞</span>
        </div>

        <!-- ボディ部分 -->
        <div class="grid grid-cols-4 gap-1 ">
          <span
            v-for="month in months"
            class="self-center justify-self-center"
            @click="onSelectMonthPicker()"
          >
            {{ month.format('M') }}月
          </span>
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

const now = ref(dayjs());
const selectedYearMonth: Ref<Dayjs | undefined> = ref();
const months = Array.from({ length: 12 }, (_, monthIndex) => {
  return dayjs().month(monthIndex).startOf('month');
});

const onSelectMonthPicker = () => {}
</script>
