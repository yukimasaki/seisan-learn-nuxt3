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
            v-model="createTransactionForm.amount"
            type="number"
            placeholder="1980"
            class="input input-bordered w-full focus:outline-none bg-stone-50"
            @blur="validate(schema, 'amount', createTransactionForm.amount)"
          />
          <span v-if="errors.amount" class="text-error text-sm">{{ errors.amount }}</span>

          <label class="my-2">カテゴリ</label>
          <select
            v-model="createTransactionForm.category"
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
            v-model="createTransactionForm.paymentDate"
            type="date"
            class="input input-bordered w-full focus:outline-none bg-stone-50"
          />

          <label class="my-2">メモ</label>
          <textarea
            v-model="createTransactionForm.memo"
            class="textarea textarea-bordered w-full focus:outline-none bg-stone-50"
          />

          <div class="flex justify-between mb-2 my-4">
            <label class="my-auto">割り勘方法</label>
            <div class="join my-auto">
              <!-- issue: クリックするとボタン色が反転せずに全部押された状態になってしまう -->
              <input type="radio" class="join-item btn btn-sm" aria-label="均等" value="均等" v-model="createTransactionForm.paymentMethod">
              <input type="radio" class="join-item btn btn-sm" aria-label="比率" value="比率" v-model="createTransactionForm.paymentMethod" checked>
              <input type="radio" class="join-item btn btn-sm" aria-label="金額" value="金額" v-model="createTransactionForm.paymentMethod">
              <input type="radio" class="join-item btn btn-sm" aria-label="なし" value="なし" v-model="createTransactionForm.paymentMethod">
            </div>
          </div>

          <div
            class="flex justify-between mb-2"
            v-if="createTransactionForm.paymentMethod && createTransactionForm.paymentMethod !== 'なし'"
            v-for="member in members"
            :key="member.user.id"
          >
            <span>{{ member.user.displayName }}</span>
            <div>
              <input
                type="number"
                class="input input-bordered focus:outline-none bg-stone-50 w-16 input-sm"
              >
              <span class="pl-1">{{ unit }}</span>
            </div>
          </div>

          <div
            class="flex justify-between mb-2 my-4"
            v-if="createTransactionForm.paymentMethod && createTransactionForm.paymentMethod !== 'なし'"
          >
            <label class="my-auto">負担金額</label>
          </div>
          <div
            class="flex justify-between mb-2"
            v-if="createTransactionForm.paymentMethod && createTransactionForm.paymentMethod !== 'なし'"
            v-for="(member, idx) in members"
            :key="member.user.id"
          >
            <span>{{ member.user.displayName }}</span>
            <div>
              <input
                v-model="createTransactionForm.actualPaymentAmounts[idx]"
                type="number"
                class="input input-bordered focus:outline-none bg-stone-50 w-16 input-sm"
              >
              <span class="pl-1">円</span>
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
            @click="submit(createTransactionForm)"
          >
          <!-- <button
            class="btn w-1/2 drop-shadow"
            :disabled="!valid"
            @click="submit(createTransactionForm)"
          > -->
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
import * as z from 'zod';
import dayjs from 'dayjs';
import { useCategoryStore } from '../store/useCategoryStore';
import { useMemberStore } from '../store/useMemberStore';
import { useActiveGroupStore } from '../store/useActiveGroupStore';
import { useBaseValidator } from '../validations/BaseValidator';

const itemDialog = ref();
const loadingDialog = ref();

const createTransactionForm = reactive({
  amount: '',
  category: 1,
  paymentDate: dayjs().format('YYYY-MM-DD').valueOf(),
  memo: '',
  paymentMethod: '比率',
  actualPaymentAmounts: [],
});

// バリデーション
const schema = {
  amount: z.number().positive(),
  category: z.string().nonempty(),
  paymentDate: z.string().nonempty(),
  memo: z.string().min(0),
  paymentMethod: z.string(),
  actualPaymentAmounts: z.array(z.number()),
};
const validator = useBaseValidator(schema);
const { errors, validate } = validator;

const isSubmitting: Ref<boolean> = ref(false);
const submit = async (createTransactionForm: any) => {
  isSubmitting.value = true;
  itemDialog.value.close();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(createTransactionForm);
  isSubmitting.value = false;
};

watch(isSubmitting, () => {
  if (isSubmitting.value) {
    loadingDialog.value.showModal();
  } else {
    loadingDialog.value.close();
  }
});

const openItemDialog = async () => {
  itemDialog.value.showModal();
}

const activeGroupStore = useActiveGroupStore();
const groupId = activeGroupStore.state.value;
if (groupId) {
  await fetchCategory(+groupId);
  await fetchMember(+groupId);
}

const categoryStore = useCategoryStore();
const categories = categoryStore.state;

const memberStore = useMemberStore();
const members = memberStore.state;

const unit = computed(() => {
    if (
      createTransactionForm.paymentMethod === '均等' ||
      createTransactionForm.paymentMethod === '比率'
    ) {
      return '%'
    } else {
      return '円'
    }
});
</script>
