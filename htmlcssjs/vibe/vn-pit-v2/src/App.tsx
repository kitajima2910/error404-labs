import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { LanguageProvider } from './i18n/LanguageContext'
import { Login } from './features/auth/Login'
import { Sidebar } from './components/layout/Sidebar'
import { Dashboard } from './features/dashboard/Dashboard'
import { EmployeeList } from './features/employees/EmployeeList'
import { EmployeeImport } from './features/employees/EmployeeImport'
import { DependentList } from './features/dependents/DependentList'
import { TaxCalculator } from './features/tax/TaxCalculator'
import { TaxImport } from './features/tax/TaxImport'
import { Reports } from './features/reports/Reports'
import { Settings } from './features/settings/Settings'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

function AppContent() {
  const { user, isLoading } = useAuth()
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  // Áp dụng theme khi ứng dụng khởi động
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    const theme = savedTheme || 'light'

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  // Update URL when navigating
  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  // Listen for browser back/forward
  window.addEventListener('popstate', () => {
    setCurrentPath(window.location.pathname)
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard />
      case '/employees':
        return <EmployeeList />
      case '/employees/import':
        return <EmployeeImport />
      case '/dependents':
        return <DependentList />
      case '/tax':
        return <TaxCalculator />
      case '/tax/import':
        return <TaxImport />
      case '/reports':
        return <Reports />
      case '/settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />
      <main className="flex-1 lg:ml-0">
        <div className="lg:hidden h-16"></div>
        <div className="p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}

export default App
