<template>
  <section class="join-section" id="join">
    <div class="container">
      <div class="join-card">
        <div class="glow glow-1" aria-hidden="true"></div>
        <div class="glow glow-2" aria-hidden="true"></div>

        <p class="eyebrow">{{ $t('join_us.eyebrow') }}</p>
        <h2 class="title">
          {{ $t('join_us.title') }}
          <span class="gradient-text">{{ $t('join_us.title_gradient') }}</span>
        </h2>
        <p class="description">{{ $t('join_us.description') }}</p>

        <div class="cta-container">
          <router-link to="/join" class="join-btn">
            {{ $t('join_us.button') }}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </router-link>
          <p class="cta-note">{{ $t('join_us.note') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.join-section {
  position: relative;
  padding: 60px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}

.container {
  width: 100%;
  max-width: 900px;
}

.join-card {
  position: relative;
  background: var(--sc-color);
  border: 1px solid var(--border-color);
  border-radius: 32px;
  padding: 60px 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  overflow: hidden;
}

.glow {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(110px);
  opacity: 0.18;
  pointer-events: none;
  z-index: 0;
}

.glow-1 {
  background: var(--main1-color);
  top: -200px;
  left: -120px;
}

.glow-2 {
  background: var(--main3-color);
  bottom: -200px;
  right: -120px;
}

.eyebrow {
  position: relative;
  z-index: 1;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--main2-color);
  margin: 0;
}

.title {
  position: relative;
  z-index: 1;
  font-size: 2.4rem;
  font-weight: 500;
  margin: 0;
  color: var(--text-color);
  line-height: 1.2;
}

:deep(.gradient-text),
.gradient-text {
  background: linear-gradient(90deg, var(--main1-color) 0%, var(--main2-color) 50%, var(--main3-color) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.description {
  position: relative;
  z-index: 1;
  font-size: 1.05rem;
  font-weight: 300;
  color: var(--text-color2);
  max-width: 620px;
  margin: 0;
  line-height: 1.6;
}

.cta-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.join-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 52px;
  padding: 0 36px;
  background: linear-gradient(90deg, var(--main1-color) 0%, var(--main2-color) 50%, var(--main3-color) 100%);
  color: #101010;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.join-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--main1-color) 25%, transparent);
}

.cta-note {
  font-size: 0.8rem;
  font-weight: 300;
  color: var(--text-color2);
  opacity: 0.7;
  margin: 0;
}

@media (max-width: 768px) {
  .join-section {
    padding: 40px 16px;
  }

  .join-card {
    padding: 40px 20px;
    border-radius: 24px;
  }

  .title {
    font-size: 1.7rem;
  }

  .description {
    font-size: 0.92rem;
  }

  .join-btn {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
}
</style>
