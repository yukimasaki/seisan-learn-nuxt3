<template>
  <div class="bg-base-200 absolute inset-0 flex items-center justify-center">
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">seisan</h1>
          <p class="py-6">seisanはグループによる精算を手助けする家計簿アプリです。</p>
          <button
            class="btn btn-primary text-base-100 drop-shadow w-40"
            @click="toLoginPage()"
          >
            ログイン / 登録
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'before-login',
});

const toLoginPage = () => {
  return navigateTo('/login');
}
</script>
