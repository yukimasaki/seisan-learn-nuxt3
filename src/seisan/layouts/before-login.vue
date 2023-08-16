<template>
  <div class="flex h-screen overflow-hidden">
    <div class="relative flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <HeaderBeforeLogin></HeaderBeforeLogin>
      <slot />
    </div>
  </div>
</template>
