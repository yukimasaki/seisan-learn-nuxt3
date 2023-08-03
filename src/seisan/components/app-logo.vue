<template>
  <div>
    <div
      class="flex justify-center items-center rounded text-base-100 bg-stone-400 w-28 h-12"
      @click="toTopPage()"
    >
      LOGO
    </div>
  </div>
</template>

<script setup lang="ts">
const toTopPage = () => {
  return navigateTo('/');
}
</script>
