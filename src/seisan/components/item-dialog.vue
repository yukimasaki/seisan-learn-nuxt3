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
          <label class="my-2">金額</label>
          <input
            type="number"
            placeholder="1980"
            class="input input-bordered w-full focus:outline-none bg-stone-50"
          />

          <label class="my-2">カテゴリ</label>
          <select class="select select-bordered w-full focus:outline-none bg-stone-50">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <label class="my-2">日付</label>
          <input
            type="date"
            class="input input-bordered w-full focus:outline-none bg-stone-50"
          />

          <label class="my-2">メモ</label>
          <textarea class="textarea textarea-bordered w-full focus:outline-none bg-stone-50" />

          <div class="flex justify-between my-2">
            <label class="my-auto">割り勘方法</label>
            <div class="join my-auto">
              <input type="radio" class="join-item btn btn-xs" name="options" aria-label="均等">
              <input type="radio" class="join-item btn btn-xs" name="options" aria-label="比率">
              <input type="radio" class="join-item btn btn-xs" name="options" aria-label="金額">
              <input type="radio" class="join-item btn btn-xs" name="options" aria-label="なし">
            </div>
          </div>
        </div>

        <!-- フッター部分 -->
        <div class="modal-action justify-center">
          <button class="btn w-1/2 drop-shadow">
            キャンセル
          </button>

          <button class="btn w-1/2 btn-disabled drop-shadow">
            作成
          </button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
</script>
