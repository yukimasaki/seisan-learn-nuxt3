<template>
  <div class="flex h-screen overflow-hidden">
    <TestSidebar></TestSidebar>
    <div class="relative flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <TestHeader></TestHeader>
      <slot />
      <TestFooter></TestFooter>
    </div>
  </div>
</template>
