<template>
  <header class="sticky top-0 z-30 p-3.5 tb:p-2 flex w-full bg-base-100 drop-shadow">
    <div class="flex flex-grow items-center justify-between">
      <!-- Hamburger Toggle Button -->
      <button
        class="lg:hidden btn btn-square btn-ghost"
        @click="toggleSidebar()"
      >
        <span>
          <IconBaselineMenu></IconBaselineMenu>
        </span>
      </button>
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
            <span>
              <IconBaselineNotifications></IconBaselineNotifications>
            </span>
          </li>
        </ul>
        <!-- Icon Sample -->

        <!-- User Area -->
        <div class="relative">
          <div class="flex items-center gap-4" @click="dropdownOpen = !dropdownOpen">
            <span class="hidden text-right lg:block">
              <span class="block text-sm font-medium text-black">Ms. Anko</span>
              <span class="block text-xs font-medium">Chief Engineer</span>
            </span>

            <div class="avatar placeholder">
              <div class="bg-stone-400 text-base-100 rounded-full w-8">
                <span class="text-md">MA</span>
              </div>
            </div>

            <span :class="dropdownOpen && 'rotate-180'">
              <IconBaselineExpandMore></IconBaselineExpandMore>
            </span>
          </div>

          <!-- Dropdown Start -->
          <div v-if="dropdownOpen" class="absolute right-0 mt-4 flex w-64 flex-col rounded-sm border border-stroke bg-base-100 shadow">
            <ul class="flex flex-col gap-5 border-b border-stroke px-6 py-7">
              <li>
                <a href="profile.html" class="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out hover:text-primary">
                  <span>
                    <IconBaselineAccountCircle></IconBaselineAccountCircle>
                  </span>
                  My Profile
                </a>
              </li>
              <li>
                <a href="settings.html" class="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out hover:text-primary">
                  <span>
                    <IconBaselineSettings></IconBaselineSettings>
                  </span>
                  Account Settings
                </a>
              </li>
              <li>
                <a
                  class="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out hover:text-primary"
                  to="/login"
                  @click="submitLogout()"
                >
                  <span>
                    <IconBaselineLogout></IconBaselineLogout>
                  </span>
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

const submitLogout = async () => {
  const { logout } = useAuth();
  await logout();
}
</script>
