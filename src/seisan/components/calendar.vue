<template>
  <div class="w-full bg-base-100 calced-height">
    aaaa
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  const headerHeightState = useState('headerHeight');
  const headerHeightValue = `${headerHeightState.value}px`;
  console.log(headerHeightValue);
});
</script>

<style>
.calced-height {
  height: 100vh - v-bind('headerHeightValue');
}
</style>
