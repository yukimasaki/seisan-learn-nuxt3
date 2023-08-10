<template>
  <div>
    <div
      onclick="yearMonthPicker.showModal()"
      class="btn btn-ghost btn-xs"
    >
      {{ headerLabel.format('YYYY年M月') }}
    </div>

    <dialog
      id="yearMonthPicker"
      class="modal"
      v-touch:swipe.left="() => navigateMonth('next')"
      v-touch:swipe.right="() => navigateMonth('prev')"
    >
      <form method="dialog" class="modal-box">
        <!-- ヘッダー部分 -->
        <div class="flex justify-between">
          <div class="btn btn-ghost" @click="navigateMonth('prev')">
            <IconBaselineKeyboardArrowLeft></IconBaselineKeyboardArrowLeft>
          </div>
          <div class="btn btn-ghost">
            {{ pickerLabel.format('YYYY') }}
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

// カレンダー(親コンポーネント)のヘッダー部分に表示される年月ラベル
const headerLabel: Ref<Dayjs> = useState('currentYearMonth');

// 年月ピッカーを選択時に年月ラベルの値を更新する
const onSelectMonthPicker = (month: Dayjs): void => {
  headerLabel.value = month;
}

// 年月ピッカー(自コンポーネント)のヘッダー部分に表示される年ラベル
const pickerLabel: Ref<Dayjs> = ref(dayjs());
watch(headerLabel, (next, prev) => {
  pickerLabel.value = headerLabel.value;
});


// 年月ピッカーの戻る進むボタンを押した時に年ラベルの表示内容を更新する
const navigateMonth = (direction: string): void => {
  if (direction === 'prev') {
    pickerLabel.value = dayjs(pickerLabel.value).subtract(1, 'year');
  } else {
    pickerLabel.value = dayjs(pickerLabel.value).add(1, 'year');
  }
}

const months: ComputedRef<Dayjs[]> = computed(() => {
  return Array.from({ length: 12 }, (_, monthIndex) => {
    return dayjs(pickerLabel.value).month(monthIndex).startOf('month');
  });
});
</script>
