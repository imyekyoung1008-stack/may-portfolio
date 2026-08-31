// i18n.ts — lightweight locale utility
// Currently scaffolded for future language switching.
// English values are Korean placeholders; translate via /locales/en.json when ready.

import ko from './locales/ko.json'
import en from './locales/en.json'

export type LocaleKey = 'ko' | 'en'
export type Strings = typeof ko

const locales: Record<LocaleKey, Strings> = { ko, en }

export function strings(locale: LocaleKey = 'ko'): Strings {
  return locales[locale]
}
