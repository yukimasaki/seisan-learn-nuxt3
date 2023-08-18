<template>
  <div class="flex flex-grow items-start justify-center">
    <div class="w-full bg-base-100">
      <div class="sticky top-16 z-20">
        <Calendar></Calendar>
      </div>
      <Detail></Detail>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-guard',
});

</script>
