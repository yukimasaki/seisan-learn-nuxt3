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
            v-model="amount"
            type="number"
            placeholder="1980"
            class="input input-bordered w-full focus:outline-none bg-stone-50"
          />
          <span v-if="errors.amount" class="text-error text-sm">{{ errors.amount }}</span>

          <label class="my-2">カテゴリ</label>
          <select
            v-model="category"
            class="select select-bordered w-full focus:outline-none bg-stone-50"
          >
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <label class="my-2">日付</label>
          <input
            v-model="paymentDate"
            type="date"
            class="input input-bordered w-full focus:outline-none bg-stone-50"
          />

          <label class="my-2">メモ</label>
          <textarea class="textarea textarea-bordered w-full focus:outline-none bg-stone-50" />

          <div class="flex justify-between my-2">
            <label class="my-auto">割り勘方法</label>
            <div class="join my-auto">
              <input type="radio" class="join-item btn btn-sm" name="options" aria-label="均等" value="equal" v-model="selectedButton">
              <input type="radio" class="join-item btn btn-sm" name="options" aria-label="比率" value="ratio" v-model="selectedButton">
              <input type="radio" class="join-item btn btn-sm" name="options" aria-label="金額" value="specifiedAmount" v-model="selectedButton">
              <input type="radio" class="join-item btn btn-sm" name="options" aria-label="なし" value="none" v-model="selectedButton">
            </div>
          </div>
          <div
            class="flex justify-between mb-2"
            v-if="selectedButton && selectedButton !== 'none'"
            v-for="member in members"
            :key="member.id"
          >
            <span>{{ member.name }}</span>
            <div>
              <input
                type="number"
                class="input input-bordered focus:outline-none bg-stone-50 w-16 input-sm"
              >
              <span class="pl-1">{{ unit }}</span>
            </div>
          </div>
        </div>

        <!-- フッター部分 -->
        <div class="modal-action justify-center">
          <button class="btn w-1/2 drop-shadow">
            キャンセル
          </button>

          <button
            class="btn w-1/2 drop-shadow"
            :disabled="!meta.valid || isSubmitting"
            @click="submit()"
          >
            作成
          </button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import dayjs from 'dayjs';

const schema = toTypedSchema(
  z.object({
    amount: z.number().positive(),
    category: z.string().nonempty(),
    paymentDate: z.string().nonempty(),
  })
);

const { errors, meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: amount } = useField('amount');
const { value: category } = useField('category', undefined, {
  initialValue: '1',
});
const { value: paymentDate } = useField('paymentDate', undefined, {
  initialValue: dayjs().format('YYYY-MM-DD'),
});

const submit = handleSubmit(async (values) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(values);
});

const selectedButton = ref(null);

const unit = computed(() => {
    if (
      selectedButton.value === 'equal' ||
      selectedButton.value === 'ratio'
    ) {
      return '%'
    } else {
      return '円'
    }
});

const members = [
  {
    id: 1,
    name: 'member 1',
    email: 'member1@example.com',
  },
  {
    id: 2,
    name: 'member 2',
    email: 'member2@example.com',
  },
  {
    id: 3,
    name: 'member 3',
    email: 'member3@example.com',
  },
];
</script>
