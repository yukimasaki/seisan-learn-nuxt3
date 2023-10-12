<template>
  <div class="flex flex-grow p-4">
    <div class="flex flex-col">
      <div>
        <label class="my-2">選択中のグループ</label>
        <select
          v-model="activeGroup"
          class="select select-bordered w-full focus:outline-none bg-stone-50"
        >
          <option
            :value="group.groupId"
            v-for="group in groups"
          >
            {{ group.group.displayName }}
          </option>
        </select>
      </div>

      <div class="pt-4 justify-center">
        <button class="btn w-1/2 drop-shadow">
          キャンセル
        </button>

        <button
          class="btn w-1/2 drop-shadow"
          :disabled="!meta.valid"
          @click="submit()"
        >
          保存
        </button>
      </div>
    </div>

    <dialog
      ref="loadingDialog"
      class="modal"
    >
      <span class="loading loading-spinner loading-lg"></span>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { z } from 'zod';
import { useProfileStore } from '../store/useProfileStore';
import { useActiveGroupStore } from '../store/useActiveGroupStore';

const schema = toTypedSchema(
  z.object({
    activeGroup: z.number(),
  })
);

const { errors, meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: activeGroup } = useField('activeGroup');

const activeGroupStore = useActiveGroupStore();
const { setLocalStorage } = usePersist();
const submit = handleSubmit(async (values) => {
  await Promise.all([
    // activeGroupをストアに保存
    activeGroupStore.setActiveGroup(values.activeGroup.toString()),

    // activeGroupをLocalStorageに永続化
    setLocalStorage('activeGroup', values.activeGroup.toString()),
  ]);
  console.log(values);
});

const loadingDialog = ref();
watch(isSubmitting, () => {
  if (isSubmitting.value) {
    loadingDialog.value.showModal();
  } else {
    loadingDialog.value.close();
  }
});

const profileStore = useProfileStore();
const profile = profileStore.state;
const groups = profile.value?.members;
</script>
