<template>
  <div class="flex flex-grow">
    Setting Page
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-guard',
});
</script>
