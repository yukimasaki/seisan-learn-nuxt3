<template>
  <div class="flex h-screen overflow-hidden">
    <sidebar></sidebar>
    <div class="relative flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <header></header>
      <slot />
      <footer></footer>
    </div>
  </div>
</template>
