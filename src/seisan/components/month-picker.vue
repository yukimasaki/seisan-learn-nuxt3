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
          <span>2023</span>
          <span>＞</span>
        </div>

        <!-- ボディ部分 -->
        <div class="grid grid-cols-4 gap-1 ">
          <span
            v-for="month in months"
            class="self-center justify-self-center"
            @click="onSelectMonthPicker()"
          >
            {{ month }}月
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
const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const onSelectMonthPicker = () => {}
</script>
