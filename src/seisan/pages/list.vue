<template>
  <div>
    List Page
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-guard',
});
</script>
