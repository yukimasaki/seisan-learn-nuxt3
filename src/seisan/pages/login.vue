<template>
  <div class="bg-base-200 absolute inset-0 flex items-center justify-center">
    <div class="card bg-base-100 drop-shadow-lg w-96 sm:w-80">
      <div class="card-body">
        <h2 class="card-title pb-4">ログイン</h2>
        <div
          class="text-error text-xs"
        >
        </div>
        <input
          v-model="email"
          formControlName="email"
          type="text"
          placeholder="メールアドレス"
          class="input input-bordered w-full max-w-xs focus:outline-none focus:ring-4 focus:border-transparent focus:ring-daisy-primary"
        />
        <ul
          v-if="showError.email"
          class="list-inside list-disc"
        >
          <li
            class="text-error text-xs"
          >
            <!-- {{ error }} -->
          </li>
        </ul>

        <input
          v-model="password"
          formControlName="password"
          type="password"
          placeholder="パスワード"
          class="input input-bordered w-full max-w-xs focus:outline-none focus:ring-4 focus:border-transparent focus:ring-daisy-primary"
        />
        <ul
          v-if="showError.password"
          class="list-inside list-disc"
        >
          <li
            class="text-error text-xs"
          >
            <!-- {{ error }} -->
          </li>
        </ul>

        <div class="flex justify-start">
          <div class="pt-2 text-stone-500">パスワードを忘れた場合</div>
        </div>
        <div class="card-actions flex justify-end pt-4">
          <div class="flex justify-end">
            <div class="pt-4 pe-4 text-stone-500">ユーザ登録</div>
          </div>
          <button
            class="btn btn-primary text-base-100 drop-shadow"
            :disabled="!loginForm.valid"
            @click="submitLogin(email, password)"
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'authenticated',
  layout: 'before-login',
});

const showError = reactive({
  email: false,
  password: false,
});

// const errorResponse = ref('sample error');

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');

const submitLogin = async (
  email: string,
  password: string,
  ) => {
  const { login } = useAuth();
  await login(email, password);
}

const loginForm = {
  valid: true,
}
</script>
