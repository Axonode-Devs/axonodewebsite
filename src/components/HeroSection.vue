<template>
  <section id="hero" class="hero-container">
    <img src="/sunburst.svg" alt="" class="sunburst bottom-left" aria-hidden="true" />
    <img src="/sunburst.svg" alt="" class="sunburst top-right" aria-hidden="true" />
    
    <div class="content-container">
      <h1 class="title1">{{ $t('hero.title-1') }}</h1>
      <h1 class="title2" v-html="$t('hero.title-2')"></h1>
      <p class="description">
        {{ $t('hero.subtext') }}
      </p>
      
      <div class="button-container">
        <button class="start-btn">{{ $t('hero.buttons.about') }}</button>
        <button class="learn-btn">{{ $t('hero.buttons.learn') }}</button>
      </div>

      <div class="ticker-wrapper">
        <div class="ticker-track">
          <div class="ticker-content">
            <span>{{ $t('hero.ticker.item1') }}</span>
            <span class="dot">•</span>
            <span>{{ $t('hero.ticker.item2') }}</span>
            <span class="dot">•</span>
            <span>{{ $t('hero.ticker.item3') }}</span>
            <span class="dot">•</span>
            <span>{{ $t('hero.ticker.item4') }}</span>
            <span class="dot">•</span>
            <span>{{ $t('hero.ticker.item5') }}</span>
            <span class="dot">•</span>
          </div>
          <div class="ticker-content" aria-hidden="true">
            <span>{{ $t('hero.ticker.item1') }}</span>
            <span class="dot">•</span>
            <span>{{ $t('hero.ticker.item2') }}</span>
            <span class="dot">•</span>
            <span>{{ $t('hero.ticker.item3') }}</span>
            <span class="dot">•</span>
            <span>{{ $t('hero.ticker.item4') }}</span>
            <span class="dot">•</span>
            <span>{{ $t('hero.ticker.item5') }}</span>
            <span class="dot">•</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>

<style scoped>
.hero-container {
  height: 95vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.sunburst {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  max-width: 40vw;
  opacity: 0.9;
}

.bottom-left {
  top: 60%;
  left: -20%;
}

.top-right {
  bottom: 60%;
  right: -20%;
  transform: rotate(180deg);
}

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 15px;
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.title1 {
  font-size: 2.6rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  margin: 0;
  color: var(--text-color2);
}

.title2 {
  font-size: 3.5rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: var(--text-color);
  margin: 0;
}

.description {
  font-size: 1.2rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  color: var(--text-color2);
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

:deep(.highlight) {
  color: var(--main2-color);
}

.start-btn {
  height: 50px;
  width: 150px;
  background-color: var(--main3-color);
  color: var(--text-color);
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-btn:hover {
  background-color: var(--main2-color);
}

.learn-btn {
  color: var(--main3-color);
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
  background-color: transparent;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.learn-btn:hover {
  border: 2px solid transparent;
  color: var(--main2-color);
}

.ticker-wrapper {
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: scroll 20s linear infinite;
}

.ticker-content {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--text-color2);
  white-space: nowrap;
  padding-right: 12px;
}

.dot {
  color: var(--main1-color);
  font-size: 1rem;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>