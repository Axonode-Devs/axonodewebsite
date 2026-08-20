<template>
  <section id="hero" class="hero-container">
    <div class="left-container">
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

    <div class="right-container">
      <div class="floating-card card-1">
        <div class="card-header">
          <img src="/selfie2.png" alt="Alex Morgan" class="avatar" />
          <div class="user-info">
            <h3 class="user-name">{{ $t('hero.cards.card1.name') }}</h3>
            <span class="user-role">{{ $t('hero.cards.card1.role') }}</span>
          </div>
        </div>
        <p class="card-text">
          {{ $t('hero.cards.card1.description') }}
        </p>
        <div class="rating">
          <span class="reply">+2 {{ $t('hero.cards.reply') }}</span>
        </div>
      </div>

      <div class="floating-card card-3">
        <div class="card-header">
          <img src="/selfie1.png" alt="Elena Rostova" class="avatar" />
          <div class="user-info">
            <h3 class="user-name">{{ $t('hero.cards.card2.name') }}</h3>
            <span class="user-role">{{ $t('hero.cards.card2.role') }}</span>
          </div>
        </div>
        <p class="card-text">
          {{ $t('hero.cards.card2.description') }}
        </p>
        <div class="rating">
          <span class="reply">+5 {{ $t('hero.cards.reply') }}</span>
        </div>
      </div>

      <div class="floating-card card-2">
        <div class="card-header">
          <img src="/selfie3.png" alt="David Chen" class="avatar" />
          <div class="user-info">
            <h3 class="user-name">{{ $t('hero.cards.card3.name') }}</h3>
            <span class="user-role">{{ $t('hero.cards.card3.role') }}</span>
          </div>
        </div>
        <p class="card-text">
          {{ $t('hero.cards.card3.description') }}
        </p>
        <div class="rating">
          <span class="reply">+3 {{ $t('hero.cards.reply') }}</span>
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
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10rem;
  padding-right: 8rem;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.left-container {
  height: 80%;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  gap: 15px;
  position: relative;
  z-index: 1;
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
  width: 60%;
  overflow: hidden;
  position: relative;
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

.right-container {
  width: 45%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.floating-card {
  position: absolute;
  width: 320px;
  padding: 1.25rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'Poppins', sans-serif;
  z-index: 2;
}

.card-1 {
  top: 20%;
  right: 20%;
  animation: float 6s ease-in-out infinite;
  z-index: 3;
}

.card-1 .user-role {
  color: var(--main2-color);
}

.card-1 .avatar {
  border: 2px solid var(--main2-color);
}

.card-3 {
  top: 40%;
  left: 2%;
  animation: float 6.5s ease-in-out infinite 0.5s;
  z-index: 1;
}

.card-2 {
  bottom: 20%;
  right: 12%;
  animation: float 7s ease-in-out infinite 1s; 
  z-index: 2;
}

.card-2 .user-role {
  color: var(--main1-color);
}

.card-2 .avatar {
  border: 2px solid var(--main1-color);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--main3-color);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
}

.user-role {
  font-size: 0.78rem;
  color: var(--main3-color);
  font-weight: 400;
}

.card-text {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 300;
  color: var(--text-color2);
  line-height: 1.4;
}

.rating {
  display: flex;
  gap: 4px;
}

.reply {
  color: var(--text-color);
  font-size: 0.9rem;
}

.d-star {
  color: #ffffff63;
  font-size: 0.9rem;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>