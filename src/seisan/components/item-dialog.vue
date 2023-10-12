<template>
  <div>
    <button
      class="btn btn-circle drop-shadow"
      @click="openItemDialog()"
    >
      <IconPencil></IconPencil>
    </button>

    <dialog
      ref="itemDialog"
      class="modal"
    >
      <form method="dialog" class="modal-box w-full h-screen rounded-none">
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

            <option
              :value="category.id"
              v-for="category in categories"
            >
              {{ category.category }}
            </option>
          </select>

          <label class="my-2">日付</label>
          <input
            v-model="paymentDate"
            type="date"
            class="input input-bordered w-full focus:outline-none bg-stone-50"
          />

          <label class="my-2">メモ</label>
          <textarea
            v-model="memo"
            class="textarea textarea-bordered w-full focus:outline-none bg-stone-50"
          />

          <div class="flex justify-between my-2">
            <label class="my-auto">割り勘方法</label>
            <div class="join my-auto">
              <input type="radio" class="join-item btn btn-sm" aria-label="均等" value="均等" v-model="paymentMethod">
              <input type="radio" class="join-item btn btn-sm" aria-label="比率" value="比率" v-model="paymentMethod" checked>
              <input type="radio" class="join-item btn btn-sm" aria-label="金額" value="金額" v-model="paymentMethod">
              <input type="radio" class="join-item btn btn-sm" aria-label="なし" value="なし" v-model="paymentMethod">
            </div>
          </div>
          <div
            class="flex justify-between mb-2"
            v-if="paymentMethod && paymentMethod !== 'なし'"
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
            :disabled="!meta.valid"
            @click="submit()"
          >
            作成
          </button>
        </div>
      </form>
    </dialog>

    <dialog
      ref="loadingDialog"
      class="modal"
    >
      <span class="loading loading-spinner loading-lg"></span>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import dayjs from 'dayjs';
import { useCategoryStore } from '../store/useCategoryStore';
import { useActiveGroupStore } from '../store/useActiveGroupStore';

const itemDialog = ref();
const loadingDialog = ref();

const schema = toTypedSchema(
  z.object({
    amount: z.number().positive(),
    category: z.string().nonempty(),
    paymentDate: z.string().nonempty(),
    memo: z.string().min(0),
    paymentMethod: z.string(),
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
const { value: memo } = useField('memo', undefined, {
  initialValue: '',
});
const { value: paymentMethod } = useField('paymentMethod', undefined, {
  initialValue: 'ratio',
});

const submit = handleSubmit(async (values) => {
  itemDialog.value.close();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(values);
});

watch(isSubmitting, () => {
  if (isSubmitting.value) {
    loadingDialog.value.showModal();
  } else {
    loadingDialog.value.close();
  }
});

const openItemDialog = async () => {
  itemDialog.value.showModal();
  const activeGroupStore = useActiveGroupStore();
  const groupId = activeGroupStore.state.value;
  console.log(groupId);

  if (groupId) await fetchCategory(+groupId);
}

const categoryStore = useCategoryStore();
const categories = categoryStore.state;

const unit = computed(() => {
    if (
      paymentMethod.value === '均等' ||
      paymentMethod.value === '比率'
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
