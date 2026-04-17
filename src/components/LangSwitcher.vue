<template>
  <div class="lang-switcher" ref="switcherRef">
    <button class="lang-btn" @click="isOpen = !isOpen" :aria-expanded="isOpen" aria-haspopup="listbox">
      <span class="lang-flag">{{ currentLang.flag }}</span>
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
  { locale: 'en', code: 'EN', name: 'English', flag: '🇬🇧' },
  { locale: 'tr', code: 'TR', name: 'Türkçe',  flag: '🇹🇷' },
];

const isOpen = ref(false);
const switcherRef = ref<HTMLElement | null>(null);

const currentLang = computed(
  () => languages.find(l => l.locale === locale.value) ?? languages[0]
);

const selectLang = (newLocale: string) => {
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
  isOpen.value = false;
};

// Close on outside click
const onClickOutside = (e: MouseEvent) => {
  if (switcherRef.value && !switcherRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(()  => document.addEventListener('mousedown', onClickOutside));
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside));
</script>

<style scoped>
.lang-switcher {
  position: relative;
  display: inline-block;
}

/* ── Trigger button ── */
.lang-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.5);
  color: #374151;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

html.dark .lang-btn {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.1);
  color: #d1d5db;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: #78dee7;
}

html.dark .lang-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #78dee7;
}

.lang-flag { font-size: 1rem; line-height: 1; }
.lang-code { letter-spacing: 0.05em; }

.chevron {
  font-size: 0.65rem;
  transition: transform 0.25s ease;
  opacity: 0.6;
}
.chevron-open { transform: rotate(180deg); }

/* ── Dropdown ── */
.lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 140px;
  background: rgba(255, 255, 255, 0.95);
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
}

html.dark .lang-dropdown {
  background: rgba(24, 24, 32, 0.97);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s ease;
}

html.dark .lang-option { color: #d1d5db; }

.lang-option:hover {
  background: rgba(120, 222, 231, 0.1);
  color: #181818;
}

html.dark .lang-option:hover {
  background: rgba(120, 222, 231, 0.12);
  color: #fff;
}

.lang-option.active {
  background: rgba(120, 222, 231, 0.12);
  color: #2ebbc5;
  font-weight: 700;
}

html.dark .lang-option.active { color: #78dee7; }

.check-icon {
  margin-left: auto;
  font-size: 0.75rem;
  color: #78dee7;
}

/* ── Transition ── */
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