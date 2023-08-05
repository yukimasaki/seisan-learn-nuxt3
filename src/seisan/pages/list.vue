<template>
  <div class="bg-base-200 flex items-start justify-center">
    <Calendar></Calendar>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-guard',
});
</script>
