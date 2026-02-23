<template>
  <div>
    <GradientLoader :loading="isLoading" />

    <Transition name="fade">
      <div v-if="!isLoading">
          <router-view />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import GradientLoader from './components/LoadingScreen.vue';
const isLoading = ref(true);

onMounted(() => {
  console.log("Site verileri yükleniyor...");
  setTimeout(() => {
    isLoading.value = false;
    console.log("Yükleme tamamlandı, HomeView gösteriliyor.");
  }, 3000);
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>