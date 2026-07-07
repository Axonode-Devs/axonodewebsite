<template>
  <div class="banner-wrapper">
    <div class="white-banner" :style="{ backgroundImage: `url('${bannerImage}')` }">
      <button class="banner-button">{{ $t('banner.button') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const bannerImage = computed(() => {
  return locale.value === 'tr' ? '/bannertr.png' : '/banner.png';
});
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; }

.banner-wrapper {
  width: 100%;
  position: relative;
}

.banner-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.white-banner {
  max-width: 750px;
  width: calc(100% - 60px);
  margin: 60px auto;
  aspect-ratio: 16 / 5;
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.banner-button {
  background-color: #fe78b0;
  color: #ffffff;
  border: none;
  padding: 8px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  font-family: 'Poppins', sans-serif;
  z-index: 3;
  margin-left: -35.5rem;
  margin-top: 7.5rem;
}

.banner-button:hover {
  transform: translateY(-2px);
}

.white-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
