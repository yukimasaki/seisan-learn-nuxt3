<template>
  <div>
    <button
      class="btn btn-circle drop-shadow"
      onclick="itemDialog.showModal()"
    >
      <IconPencil></IconPencil>
    </button>

    <dialog
      id="itemDialog"
      class="modal"
    >
      <form method="dialog" class="modal-box">
        <!-- ヘッダー部分 -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">
            支出を登録
          </h2>

          <span>
            <IconHelpCircleOutline></IconHelpCircleOutline>
          </span>
        </div>

        <!-- ボディ部分 -->
        <div class="flex flex-col">

        </div>

        <!-- フッター部分 -->
        <div class="modal-action justify-center">
          <button class="btn w-1/2">
            キャンセル
          </button>

          <button class="btn w-1/2">
            作成
          </button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">

</script>
