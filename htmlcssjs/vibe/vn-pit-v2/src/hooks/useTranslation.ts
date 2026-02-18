import { useLanguage } from '../i18n/LanguageContext'

export function useTranslation() {
  const context = useLanguage()

  return {
    t: context.t,
    language: context.language,
    changeLanguage: context.changeLanguage,
    translations: context.translations,
  }
}
