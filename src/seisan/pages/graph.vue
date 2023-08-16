<template>
  <div class="flex flex-grow">
    Graph Page
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-guard',
});
</script>
