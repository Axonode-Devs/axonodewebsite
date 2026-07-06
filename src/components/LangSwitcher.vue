<template>
  <div class="lang-switcher" ref="switcherRef">
    <button class="lang-btn" @click="isOpen = !isOpen" :aria-expanded="isOpen" aria-haspopup="listbox">
      <span class="lang-code">{{ currentLang.code }}</span>
      <i class="fa-solid fa-chevron-down chevron" :class="{ 'chevron-open': isOpen }"></i>
    </button>

    <Transition name="dropdown">
      <ul v-if="isOpen" class="lang-dropdown" role="listbox">
        <li
          v-for="lang in languages"
          :key="lang.locale"
          class="lang-option"
          :class="{ active: locale === lang.locale }"
          @click="selectLang(lang.locale)"
          role="option"
          :aria-selected="locale === lang.locale"
        >
          <span class="lang-flag">{{ lang.flag }}</span>
          <span>{{ lang.name }}</span>
          <i v-if="locale === lang.locale" class="fa-solid fa-check check-icon"></i>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const languages = [
  { locale: 'en', code: 'EN', name: 'English', flag: 'US' },
  { locale: 'tr', code: 'TR', name: 'Türkçe',  flag: 'TR' },
];

const isOpen = ref(false);
const switcherRef = ref<HTMLDivElement | null>(null);

const currentLang = computed(
  () => languages.find(l => l.locale === locale.value) ?? languages[0]
);

const selectLang = (newLocale: string) => {
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
  isOpen.value = false;
};

const onClickOutside = (e: MouseEvent) => {
  if (switcherRef.value && !switcherRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale && languages.some(l => l.locale === savedLocale)) {
    locale.value = savedLocale;
  }
  
  document.addEventListener('mousedown', onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside);
});
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/coolvetica-2');
@import url('https://fonts.cdnfonts.com/css/poppins');

.lang-switcher {
  position: relative;
  display: inline-block;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 8px;
  border: 1.5px solid var(--text-color2);
  background: rgba(236, 236, 236, 0);
  color: var(--text-color2);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-family: 'Poppins', sans-serif;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  -webkit-text-fill-color: #1f1f1f;
}

.lang-flag { font-size: 1rem; line-height: 1; }
.lang-code { letter-spacing: 0.05em; }

.chevron {
  font-size: 0.65rem;
  transition: transform 0.25s ease;
  opacity: 0.6;
  color: var(--text-color2);
}
.chevron-open { transform: rotate(180deg); }

.lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 140px;
  background: #1f1f1f;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  padding: 6px;
  z-index: 1100;
  overflow: hidden;
  display: grid;
  gap: 6px;
  font-family: 'Poppins', sans-serif;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #3f3f3f;
  cursor: pointer;
  transition: background 0.15s ease;
}

.lang-option:hover {
  background: #3f3f3f;
  color: var(--text-color);
}

.lang-option.active {
  background: #3f3f3f;
  color: var(--text-color);
  font-weight: 700;
}

.check-icon {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--text-color);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>