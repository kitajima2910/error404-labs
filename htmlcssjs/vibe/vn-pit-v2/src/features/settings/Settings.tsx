import { useState, useEffect } from 'react'
import { Card } from '../../components/ui'
import { Palette, Moon, Sun, Check } from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { useLanguage } from '../../i18n/LanguageContext'

type Theme = 'light' | 'dark' | 'system'

export function Settings() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light'
  })

  useEffect(() => {
    // Áp dụng theme ngay khi component mount
    applyTheme(theme)
  }, [])

  useEffect(() => {
    // Lưu vào localStorage
    localStorage.setItem('theme', theme)
    localStorage.setItem('language', language)

    // Áp dụng theme
    applyTheme(theme)
  }, [theme, language])

  const applyTheme = (selectedTheme: Theme) => {
    const root = document.documentElement

    if (selectedTheme === 'dark') {
      root.classList.add('dark')
    } else if (selectedTheme === 'light') {
      root.classList.remove('dark')
    } else {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('nav.settings')}</h1>
        <p className="text-gray-500">{t('setting.appearanceDescription')}</p>
      </div>

      {/* Theme Settings */}
      <Card title={t('setting.theme')}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">{t('setting.themeDescription')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${theme === 'light'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <Sun className="w-6 h-6 text-orange-500" />
              <div className="text-left">
                <p className="font-medium">Sáng</p>
                <p className="text-xs text-gray-500">Giao diện sáng mặc định</p>
              </div>
              {theme === 'light' && <Check className="w-5 h-5 text-primary-600 ml-auto" />}
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${theme === 'dark'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <Moon className="w-6 h-6 text-indigo-500" />
              <div className="text-left">
                <p className="font-medium">Tối</p>
                <p className="text-xs text-gray-500">Giao diện tối dễ nhìn</p>
              </div>
              {theme === 'dark' && <Check className="w-5 h-5 text-primary-600 ml-auto" />}
            </button>

            <button
              onClick={() => setTheme('system')}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${theme === 'system'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <Palette className="w-6 h-6 text-purple-500" />
              <div className="text-left">
                <p className="font-medium">Hệ thống</p>
                <p className="text-xs text-gray-500">Theo cài đặt hệ thống</p>
              </div>
              {theme === 'system' && <Check className="w-5 h-5 text-primary-600 ml-auto" />}
            </button>
          </div>
        </div>
      </Card>

      {/* Language Settings */}
      <Card title={t('setting.language')}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">{t('setting.languageDescription')}</p>
          <div className="space-y-2">
            {[
              { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
              { code: 'en', name: 'English', flag: '🇬🇧' },
              { code: 'ja', name: '日本語', flag: '🇯🇵' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code as any)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${language === lang.code
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <div className="flex-1 text-left">
                  <p className="font-medium">{lang.name}</p>
                  <p className="text-xs text-gray-500">
                    {lang.code === 'vi' && 'Tiếng Việt'}
                    {lang.code === 'en' && 'English'}
                    {lang.code === 'ja' && '日本語'}
                  </p>
                </div>
                {language === lang.code && (
                  <Check className="w-5 h-5 text-primary-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* About */}
      <Card title={t('setting.about')}>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">{t('setting.version')}</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">{t('setting.releaseDate')}</span>
            <span className="font-medium">{t('tax.month')} 2/2026</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">{t('setting.taxLaw')}</span>
            <span className="font-medium">Luật Thuế TNCN 2007</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Công nghệ</span>
            <span className="font-medium">React + Supabase + Tailwind</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
