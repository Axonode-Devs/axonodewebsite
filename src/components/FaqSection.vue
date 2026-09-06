<template>
  <section class="faq-section" id="faq">
    <div class="container">
      <p class="eyebrow">{{ $t('faq.eyebrow') }}</p>
      <h2 class="title">
        {{ $t('faq.title') }}
        <span class="gradient-text">{{ $t('faq.title_gradient') }}</span>
      </h2>
      <p class="subtitle">{{ $t('faq.subtitle') }}</p>

      <div class="faq-list">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="faq-item"
          :class="{ open: openIndex === index }"
        >
          <button
            class="faq-question"
            :aria-expanded="openIndex === index"
            :aria-controls="`faq-answer-${index}`"
            @click="toggle(index)"
          >
            <span>{{ $t(item.q) }}</span>
            <svg
              class="chevron"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <div
            :id="`faq-answer-${index}`"
            class="faq-answer"
            role="region"
          >
            <div class="faq-answer-inner">
              <p>{{ $t(item.a) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = [
  { q: 'faq.items.q1', a: 'faq.items.a1' },
  { q: 'faq.items.q2', a: 'faq.items.a2' },
  { q: 'faq.items.q3', a: 'faq.items.a3' },
  { q: 'faq.items.q4', a: 'faq.items.a4' },
  { q: 'faq.items.q5', a: 'faq.items.a5' },
  { q: 'faq.items.q6', a: 'faq.items.a6' },
];

const openIndex = ref<number | null>(0);

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<style scoped>
.faq-section {
  position: relative;
  padding: 60px 20px 100px;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}

.container {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}

.eyebrow {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--main2-color);
  margin: 0 0 8px;
}

.title {
  font-size: 2.2rem;
  font-weight: 500;
  margin: 0;
  color: var(--text-color);
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(90deg, var(--main1-color) 0%, var(--main2-color) 50%, var(--main3-color) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.subtitle {
  font-size: 1rem;
  font-weight: 300;
  color: var(--text-color2);
  margin: 12px 0 32px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.faq-item {
  background: var(--sc-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.faq-item.open {
  border-color: var(--main1-color);
}

.faq-question {
  width: 100%;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  background: transparent;
  border: none;
  color: var(--text-color);
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: color 0.3s ease;
}

.faq-question:hover {
  color: var(--main1-color);
}

.chevron {
  flex-shrink: 0;
  color: var(--text-color2);
  transition: transform 0.3s ease;
}

.faq-item.open .chevron {
  transform: rotate(180deg);
  color: var(--main1-color);
}

.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.faq-item.open .faq-answer {
  grid-template-rows: 1fr;
}

.faq-answer-inner {
  overflow: hidden;
}

.faq-answer-inner p {
  margin: 0;
  padding: 0 20px 18px;
  font-size: 0.92rem;
  font-weight: 300;
  line-height: 1.6;
  color: var(--text-color2);
}

@media (max-width: 768px) {
  .faq-section {
    padding: 40px 16px 72px;
  }

  .title {
    font-size: 1.7rem;
  }

  .subtitle {
    font-size: 0.92rem;
    margin-bottom: 24px;
  }

  .faq-question {
    min-height: 48px;
    padding: 14px 16px;
    font-size: 0.95rem;
  }

  .faq-answer-inner p {
    padding: 0 16px 16px;
    font-size: 0.88rem;
  }
}
</style>
