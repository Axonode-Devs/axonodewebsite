import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import tr from './locales/tr.json'

const savedLocale = localStorage.getItem('locale') || 'en'

export const i18n = createI18n({
  legacy: false,          // required for Composition API (useI18n)
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, tr },
})