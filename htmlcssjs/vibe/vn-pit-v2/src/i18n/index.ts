import { vi } from './locales/vi'
import { en } from './locales/en'
import { ja } from './locales/ja'

export const translations = {
  vi,
  en,
  ja,
}

export type Language = 'vi' | 'en' | 'ja'
export type Translations = typeof vi
