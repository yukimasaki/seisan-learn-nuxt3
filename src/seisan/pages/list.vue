<template>
  <div>
    <Calendar></Calendar>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-guard',
});
</script>
