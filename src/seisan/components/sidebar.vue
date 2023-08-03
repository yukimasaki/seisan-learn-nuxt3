<template>
  <aside
    class="absolute left-0 top-0 z-40 flex h-screen w-64 flex-col overflow-y-hidden duration-300 bg-base-300 ease-linear lg:static lg:translate-x-0"
    :class="visibleSidebar ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- SIDEBAR HEADER -->
    <div class="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
      <!-- Logo -->
      <div class="flex justify-center items-center rounded text-base-100 bg-stone-400 w-28 h-12">LOGO</div>

      <!-- Close Btn -->
      <button
        class="lg:hidden"
        @click="toggleSidebar()"
      >
        <icon-baseline-keyboard-arrow-left></icon-baseline-keyboard-arrow-left>
      </button>
    </div>
    <!-- SIDEBAR HEADER -->

    <!-- SIDEBAR MENU -->
    <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
      <nav class="mt-4 py-1 px-4 lg:mt-5 lg:px-5">
        <ul class="menu mb-6 flex flex-col gap-1">
          <li class="menu-title mb-2 ml-2 text-sm font-medium">メニュー</li>
          <li>
            <a
              class="relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-semibold duration-300 ease-in-out"
              @click="toggleSidebar()"
            >
              <!-- <img :src="item.logo" width="24"> -->
              <!-- <a [routerLink]="item.link">{{ item.label }}</a> -->
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <!-- SIDEBAR MENU -->
  </aside>
</template>

<script setup lang="ts">
import { useVisibleSidebar } from '../composables/useVisibleSidebar';

const visibleSidebar = useVisibleSidebar();

const toggleSidebar = () => {
  visibleSidebar.value = !visibleSidebar.value;
}
</script>
