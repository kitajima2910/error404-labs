import { useAuth } from '../../hooks/useAuth'
import { useRole } from '../../hooks/useRole'
import { useTranslation } from '../../hooks/useTranslation'
import { cn } from '../../lib/utils'
import {
  LayoutDashboard,
  Users,
  UsersRound,
  Calculator,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  currentPath: string
  onNavigate: (path: string) => void
}

interface NavItem {
  path: string
  label: string
  icon: React.ElementType
  permission?: string
}

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  const { profile, signOut } = useAuth()
  const { hasPermission, isAdmin } = useRole()
  const { t, language, changeLanguage, translations } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { path: '/', label: t('nav.dashboard'), icon: LayoutDashboard, permission: 'dashboard:view' },
    { path: '/employees', label: t('nav.employees'), icon: Users, permission: 'employees:view' },
    { path: '/dependents', label: t('nav.dependents'), icon: UsersRound, permission: 'dependents:view' },
    { path: '/tax', label: t('nav.tax'), icon: Calculator, permission: 'tax:view' },
    { path: '/reports', label: t('nav.reports'), icon: FileText, permission: 'reports:view' },
  ]

  const filteredNavItems = navItems.filter(
    (item) => !item.permission || hasPermission(item.permission)
  )

  const handleSignOut = async () => {
    await signOut()
  }

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {profile?.full_name?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{profile?.full_name}</p>
            <p className="text-sm text-gray-500 capitalize">{profile?.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPath === item.path

          return (
            <button
              key={item.path}
              onClick={() => {
                onNavigate(item.path)
                setIsMobileMenuOpen(false)
              }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        {isAdmin && (
          <button
            onClick={() => {
              onNavigate('/settings')
              setIsMobileMenuOpen(false)
            }}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
              currentPath === '/settings'
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            <Settings className="w-5 h-5" />
            {t('nav.settings')}
          </button>
        )}

        <div className="px-4 py-2 mt-4 border-t border-gray-100">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {translations.map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={cn(
                  'flex-1 py-1.5 px-2 rounded-md text-sm transition-all flex items-center justify-center',
                  language === lang
                    ? 'bg-white text-primary-700 shadow-sm font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                <span className="uppercase">{lang}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {t('nav.logout')}
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col',
          'transform transition-transform duration-200 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
