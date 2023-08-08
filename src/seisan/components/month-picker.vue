<template>
  <div>
    <div onclick="my_month_picker.showModal()">
      <span>2023</span>
      <span>年</span>
      <span>8</span>
      <span>月</span>
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
        <div class="gird grid-cols-4 gap-1">
          <div
            v-for="month in months"
          >
            {{ month }}
          </div>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
</script>
