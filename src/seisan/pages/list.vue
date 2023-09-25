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
import { fetchDetail } from '../composables/fetchDetail';

definePageMeta({
  middleware: 'auth-guard',
});

// detailsを取得、ストアへ格納
fetchDetail();
</script>
