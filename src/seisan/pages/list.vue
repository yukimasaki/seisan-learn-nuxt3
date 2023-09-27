<template>
  <div class="flex flex-grow items-start justify-center">
    <div class="w-full bg-base-100">
      <div class="sticky top-16 z-20">
        <!-- <Calendar></Calendar> -->
      </div>
      <Detail></Detail>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchTransaction } from '../composables/fetchTransaction';

definePageMeta({
  middleware: 'auth-guard',
});

// transactionsを取得、ストアへ格納
await fetchTransaction();
</script>
