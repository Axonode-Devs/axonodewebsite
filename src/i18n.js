import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import tr from './locales/tr.json'

const browserLocale = navigator.language.split('-')[0]
const supportedLocales = ['en', 'tr']

const savedLocale = localStorage.getItem('locale')
const detectedLocale = supportedLocales.includes(browserLocale) ? browserLocale : 'en'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale || detectedLocale, // saved wins, then browser, then 'en'
  fallbackLocale: 'en',
  messages: { en, tr },
})