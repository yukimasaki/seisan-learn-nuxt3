<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar></Sidebar>
    <div class="relative flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <!-- <HeaderLoggedIn></HeaderLoggedIn> -->
      <HeaderLoggedInNew></HeaderLoggedInNew>
      <slot />
      <Footer></Footer>
    </div>
  </div>
</template>
