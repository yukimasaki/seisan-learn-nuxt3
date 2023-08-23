<template>
  <div class="flex flex-grow items-start justify-center">
    <div class="w-full bg-base-100">
      <div class="form p-4">
        <div class="flex flex-col mb-2">
          <label>メールアドレス</label>
          <input type="text" v-model="email">
          <span v-if="errors.email" class="text-error text-sm">{{ errors.email }}</span>
        </div>

        <div class="flex flex-col mb-2">
          <label>パスワード</label>
          <input type="text" v-model="password">
          <span v-if="errors.password" class="text-error text-sm">{{ errors.password }}</span>
        </div>
      </div>

      <div class="flex justify-end p-4">
        <button
          class="btn drop-shadow"
          :disabled="!meta.valid || isSubmitting"
          @click="submit()"
        >
          ログイン
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const schema = toTypedSchema(
  z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  })
);

const { errors, meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: email } = useField('email');
const { value: password } = useField('password');

const submit = handleSubmit(async (values) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(values);
});
</script>
