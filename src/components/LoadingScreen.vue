<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(() => {
  // Yükleme simülasyonu (2.5 saniye sonra kapanır)
  setTimeout(() => {
    isLoading.value = false;
  }, 2500);
});
</script>

<template>
  <transition name="fade">
    <div class="loader-overlay" v-if="isLoading">
      <div class="loader-container">
        <div class="bar bar-1"></div>
        <div class="bar bar-2"></div>
        <div class="bar bar-3"></div>
        <div class="bar bar-4"></div>
        <div class="bar bar-5"></div>
      </div>
    </div>
  </transition>
</template>

<style scoped>

.loader-overlay {
  --c-1: #78dee7;
  --c-2: #95b0eb;
  --c-3: #bb85df;
  --c-4: #fe78b2;
  --c-5: #fe78b0;
  
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #F9FAFB; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  gap: 2rem;
}

.loader-container {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 60px;
}

.bar {
  width: 10px;
  height: 20px;
  border-radius: 5px;
  animation: wave 1s ease-in-out infinite;
}

.bar-1 { background-color: var(--c-1); animation-delay: 0.0s; }
.bar-2 { background-color: var(--c-2); animation-delay: 0.1s; }
.bar-3 { background-color: var(--c-3); animation-delay: 0.2s; height: 30px;}
.bar-4 { background-color: var(--c-4); animation-delay: 0.3s; }
.bar-5 { background-color: var(--c-5); animation-delay: 0.4s; }

@keyframes wave {
  0%, 100% {
    height: 20px;
    transform: scaleY(1);
  }
  50% {
    height: 60px;
    transform: scaleY(1.5);
    filter: drop-shadow(0 0 5px rgba(120, 222, 231, 0.5));
  }
}

@keyframes text-fade {
  0%, 100% { opacity: 0.3; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-2px); color: #fe78b2; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>