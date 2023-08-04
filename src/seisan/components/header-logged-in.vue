<template>
  <header class="navbar z-30 bg-base-100 drop-shadow">
    <div class="flex flex-grow items-center justify-between py-4 px-4">
      <!-- Hamburger Toggle Button -->
      <div
        class="lg:hidden items-center gap-2 md:flex md:gap-4"
        @click="toggleSidebar()"
      >
        <icon>
          <IconBaselineMenu></IconBaselineMenu>
        </icon>
      </div>
      <!-- Hamburger Toggle Button -->

      <!-- Middle Area -->
      <div class="md:hidden block">
        真ん中の要素
      </div>
      <!-- Middle Area -->

      <!-- Right Area -->
      <div class="flex items-center gap-3">
        <!-- Icon Sample -->
        <ul class="flex items-center gap-2">
          <li class="relative">
            <icon>
              <IconBaselineNotifications></IconBaselineNotifications>
            </icon>
          </li>
        </ul>
        <!-- Icon Sample -->

        <!-- User Area -->
        <div class="relative">
          <a class="flex items-center gap-4" href="#" @click="dropdownOpen = !dropdownOpen">
            <span class="hidden text-right lg:block">
              <span class="block text-sm font-medium text-black">Ms. Anko</span>
              <span class="block text-xs font-medium">Chief Engineer</span>
            </span>

            <div class="avatar placeholder">
              <div class="bg-stone-400 text-base-100 rounded-full w-8">
                <span class="text-2xl">JP</span>
              </div>
            </div>

            <icon :class="dropdownOpen && 'rotate-180'">
              <IconBaselineExpandMore></IconBaselineExpandMore>
            </icon>
          </a>

          <!-- Dropdown Start -->
          <div v-if="dropdownOpen" class="absolute right-0 mt-4 flex w-64 flex-col rounded-sm border border-stroke bg-base-100 shadow">
            <ul class="flex flex-col gap-5 border-b border-stroke px-6 py-7">
              <li>
                <a href="profile.html" class="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out hover:text-primary">
                  <icon>
                    <IconBaselineAccountCircle></IconBaselineAccountCircle>
                  </icon>
                  My Profile
                </a>
              </li>
              <li>
                <a href="settings.html" class="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out hover:text-primary">
                  <icon>
                    <IconBaselineSettings></IconBaselineSettings>
                  </icon>
                  Account Settings
                </a>
              </li>
              <li>
                <a href="settings.html" class="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out hover:text-primary">
                  <icon>
                    <IconBaselineLogout></IconBaselineLogout>
                  </icon>
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <!-- Dropdown End -->
        </div>
        <!-- User Area -->
      </div>
      <!-- Right Area -->
    </div>
  </header>
</template>

<script setup lang="ts">
import { useVisibleSidebar } from '../composables/useVisibleSidebar';

const visibleSidebar = useVisibleSidebar();
const dropdownOpen = ref(false);

const toggleSidebar = () => {
  visibleSidebar.value = !visibleSidebar.value;
}
</script>
