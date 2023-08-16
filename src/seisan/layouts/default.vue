<template>
  <div class="flex h-screen">
    <!-- サイドバー -->
    <Sidebar></Sidebar>

    <!-- コンテンツエリア -->
    <div class="flex flex-col overflow-y-auto w-full">
      <!-- メインコンテンツヘッダー -->
      <HeaderLoggedIn></HeaderLoggedIn>
      <slot />
      <Footer></Footer>
    </div>
  </div>
</template>
