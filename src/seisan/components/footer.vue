<template>
  <div class="sticky bottom-0 z-30 p-4 tb:p-2 flex w-full drop-shadow">
    <div class="flex flex-grow items-center justify-between px-6">
      <button
        class="btn btn-circle drop-shadow"
        @click="navigateToHome()"
      >
        <IconBaselineHome></IconBaselineHome>
      </button>
      <ItemDialog></ItemDialog>
      <button
        class="btn btn-circle drop-shadow"
        @click="navigateToList()"
      >
        <IconBaselineFormatListBulleted></IconBaselineFormatListBulleted>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const navigateToHome = () => {
  return navigateTo('/');
}

const navigateToList = () => {
  return navigateTo('/list');
}
</script>
