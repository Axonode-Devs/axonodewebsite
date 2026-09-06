import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import tr from './locales/tr.json'

const browserLocale = navigator.language.split('-')[0]
const supportedLocales = ['en', 'tr']

const savedLocale = localStorage.getItem('locale')
const detectedLocale = supportedLocales.includes(browserLocale) ? browserLocale : 'en'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale || detectedLocale,
  fallbackLocale: 'en',
  messages: { en, tr },
  missingWarn: true,
  fallbackWarn: true,
  warnHtmlMessage: true,
  escapeParameterHtml: false,
  missing: (locale, key) => {
    console.warn(`[i18n] Missing translation: "${key}" (locale: "${locale}")`)
    return key
  },
})