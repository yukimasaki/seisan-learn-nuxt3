<template>
  <div>
    <button class="btn btn-circle drop-shadow" @click="openItemDialog()">
      <IconPencil></IconPencil>
    </button>

    <dialog ref="itemDialog" class="modal">
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
          <input v-model="form.amount" type="number" placeholder="1980"
            class="input input-bordered w-full focus:outline-none bg-stone-50" @blur="validate('amount', form.amount)" />
          <span v-if="errors.amount" class="text-error text-sm">{{ errors.amount }}</span>

          <label class="my-2">カテゴリ</label>
          <select v-model="form.categoryId" class="select select-bordered w-full focus:outline-none bg-stone-50">
            <option :value="category.id" v-for="category in categories">
              {{ category.category }}
            </option>
          </select>

          <label class="my-2">日付</label>
          <input v-model="form.paymentDate" type="date" class="input input-bordered w-full focus:outline-none bg-stone-50"
            @blur="validate('paymentDate', form.paymentDate)" />
          <span v-if="errors.paymentDate" class="text-error text-sm">{{ errors.paymentDate }}</span>

          <label class="my-2">メモ</label>
          <textarea v-model="form.memo" class="textarea textarea-bordered w-full focus:outline-none bg-stone-50" />

          <div class="flex justify-between mb-2 my-4">
            <label class="my-auto">割り勘方法</label>
            <div class="join my-auto">
              <input v-model="form.method" @click="setValidate('actualPaymentAmountArray', false); clearWarikanArray();"
                type="radio" class="join-item btn btn-sm" aria-label="均等" value="均等">
              <input v-model="form.method" @click="setValidate('actualPaymentAmountArray', false); clearWarikanArray();"
                type="radio" class="join-item btn btn-sm" aria-label="比率" value="比率" checked>
              <input v-model="form.method" @click="setValidate('actualPaymentAmountArray', false); clearWarikanArray();"
                type="radio" class="join-item btn btn-sm" aria-label="金額" value="金額">
              <input v-model="form.method" @click="setValidate('actualPaymentAmountArray', true); clearWarikanArray();"
                type="radio" class="join-item btn btn-sm" aria-label="なし" value="なし">
            </div>
          </div>

          <div class="flex justify-between mb-2" v-if="form.method && form.method !== 'なし'"
            v-for="(member, idx) in members" :key="member.user.id">
            <span>{{ member.user.displayName }}</span>
            <div>
              <!-- <input type="hidden" v-model="form.paymentInfoArray[idx].userId"> -->
              <!-- <input v-model="form.paymentInfoArray[idx].ratio" type="number"
                class="input input-bordered focus:outline-none bg-stone-50 w-16 input-sm"
                @blur="validate('ratioArray', form.ratioArray[idx])"> -->
              <input v-model="form.paymentInfoArray[idx].ratio" type="number"
                class="input input-bordered focus:outline-none bg-stone-50 w-16 input-sm">
              <span class="pl-1">{{ unit }}</span>
            </div>
          </div>
          <span v-if="errors.ratioArray" class="text-error text-sm">{{ errors.ratioArray }}</span>

          <div class="flex justify-between mb-2 my-4" v-if="form.method && form.method !== 'なし'">
            <label class="my-auto">誰がいくら立て替えた？</label>
          </div>

          <div class="flex justify-between mb-2" v-if="form.method && form.method !== 'なし'"
            v-for="(member, idx) in members" :key="member.user.id">
            <span>{{ member.user.displayName }}</span>
            <div>
              <!-- <input v-model="form.paymentInfoArray[idx].amount" type="number"
                class="input input-bordered focus:outline-none bg-stone-50 w-16 input-sm"
                @blur="validate('actualPaymentAmountArray', form.actualPaymentAmountArray[idx])"> -->
              <input v-model="form.paymentInfoArray[idx].amount" type="number"
                class="input input-bordered focus:outline-none bg-stone-50 w-16 input-sm">
              <span class="pl-1">円</span>
            </div>
          </div>
          <span v-if="errors.actualPaymentAmountArray" class="text-error text-sm">{{ errors.actualPaymentAmountArray
          }}</span>
        </div>

        <!-- フッター部分 -->
        <div class="modal-action justify-center">
          <button class="btn w-1/2 drop-shadow" @click="clearAllInputs()">
            キャンセル
          </button>

          <button class="btn w-1/2 drop-shadow" :disabled="!valid" @click="submit(form)">
            作成
          </button>
        </div>
      </form>
    </dialog>

    <dialog ref="loadingDialog" class="modal">
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
import { useProfileStore } from '../store/useProfileStore';
import { TransactionForm } from '../types/transaction';

const itemDialog = ref();
const loadingDialog = ref();

const profileStore = useProfileStore();
const profile = profileStore.state;
const creatorId: number | undefined = profile.value?.id;

const activeGroupStore = useActiveGroupStore();
const groupId = activeGroupStore.state.value;
if (groupId) {
  await fetchCategory(+groupId);
  await fetchMember(+groupId);
}

interface PaymentInfoArray {
  userId: number;
  ratio: number;
  amount: number;
}

interface Form {
  amount: string;
  paymentDate: string;
  method: string;
  categoryId: number;
  title: string;
  memo: string;
  status: string;
  paymentInfoArray: PaymentInfoArray[];
}

const form: Form = reactive({
  amount: '',
  paymentDate: dayjs().format('YYYY-MM-DD').valueOf(),
  method: '比率',
  categoryId: 1,
  title: '',
  memo: '',
  status: '未精算',
  paymentInfoArray: [{
    userId: 0,
    ratio: 0,
    amount: 0,
  }],
});

// バリデーション
const formSchema = {
  amount: z.number().nonnegative(),
  paymentDate: z.string().nonempty(),
  ratioArray: z.number().nonnegative(),
  actualPaymentAmountArray: z.number().nonnegative(),
};
const validator = useBaseValidator(formSchema, form);
const { errors, results, keys, validate, setValidate } = validator;
const valid = computed(() => {
  return Object.values(results).every(result => result === true);
});

const clearWarikanArray = () => {
  // form.ratioArray = [];
  // form.actualPaymentAmountArray = [];
}

const clearAllInputs = async () => {
  await Promise.all([
    form.amount = '',
    form.categoryId = 1,
    form.paymentDate = dayjs().format('YYYY-MM-DD').valueOf(),
    form.memo = '',
    form.method = '比率',
    // form.ratioArray = [],
    // form.actualPaymentAmountArray = [],
    keys.map(key => errors[key] = null),
  ]);
}

const isSubmitting: Ref<boolean> = ref(false);
const submit = async (form: any) => {
  isSubmitting.value = true;
  itemDialog.value.close();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(form);

  // todo: API (POST /transaction)へcreateTransactionComplexを送信する処理
  if (!creatorId || !groupId) return;
  const createTransactionDto: TransactionForm = {
    amount: form.amount,
    paymentDate: dayjs(form.paymentDate).toDate(),
    method: form.method,
    categoryId: form.categoryId,
    title: form.title,
    memo: form.memo,
    status: form.status,
    ratioArray: form.ratioArray,
    actualPaymentAmountArray: form.actualPaymentAmountArray,
    creatorId,
    groupId: +groupId,
  }
  console.log(createTransactionDto);

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

const categoryStore = useCategoryStore();
const categories = categoryStore.state;

const memberStore = useMemberStore();
const members = memberStore.state;

const unit = computed(() => {
  if (
    form.method === '均等' ||
    form.method === '比率'
  ) {
    return '%'
  } else {
    return '円'
  }
});
</script>
