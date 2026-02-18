import { Card } from '../../components/ui'
import {
  Users,
  UsersRound,
  Calculator,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { formatCurrency } from '../../lib/constants'
import { useTranslation } from '../../hooks/useTranslation'

interface DashboardStats {
  totalEmployees: number
  totalDependents: number
  totalTaxRecords: number
  totalTaxAmount: number
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    totalDependents: 0,
    totalTaxRecords: 0,
    totalTaxAmount: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [currentDate] = useState(new Date())
  const { t, language } = useTranslation()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Đếm nhân viên
      const { count: employeeCount } = await supabase
        .from('employees')
        .select('*', { count: 'exact', head: true })

      // Đếm ngưởi phụ thuộc
      const { count: dependentCount } = await supabase
        .from('dependents')
        .select('*', { count: 'exact', head: true })

      // Đếm bản ghi thuế
      const { count: taxCount } = await supabase
        .from('tax_records')
        .select('*', { count: 'exact', head: true })

      // Tính tổng thuế tháng hiện tại
      const currentMonth = currentDate.getMonth() + 1
      const currentYear = currentDate.getFullYear()

      const { data: currentMonthTax } = await supabase
        .from('tax_records')
        .select('thue_phai_nop')
        .eq('thang', currentMonth)
        .eq('nam', currentYear)

      const totalTax = currentMonthTax?.reduce((sum: number, record: any) => sum + (record.thue_phai_nop || 0), 0) || 0

      setStats({
        totalEmployees: employeeCount || 0,
        totalDependents: dependentCount || 0,
        totalTaxRecords: taxCount || 0,
        totalTaxAmount: totalTax,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: t('employee.total'),
      value: stats.totalEmployees,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: t('dependent.total'),
      value: stats.totalDependents,
      icon: UsersRound,
      color: 'bg-green-500',
    },
    {
      title: t('tax.title'),
      value: stats.totalTaxRecords,
      icon: Calculator,
      color: 'bg-purple-500',
    },
    {
      title: t('tax.taxPayable'),
      value: formatCurrency(stats.totalTaxAmount),
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const dateLocales: Record<string, string> = {
    vi: 'vi-VN',
    en: 'en-US',
    ja: 'ja-JP'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('nav.dashboard')}</h1>
          <p className="text-gray-500 flex items-center gap-2 mt-1">
            <Calendar className="w-4 h-4" />
            {currentDate.toLocaleDateString(dateLocales[language] || 'vi-VN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={t('common.quickActions') || 'Chức năng nhanh'}>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => window.location.href = '/employees'}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
            >
              <Users className="w-6 h-6 text-primary-600 mb-2" />
              <p className="font-medium">{t('employee.title')}</p>
              <p className="text-sm text-gray-500">{t('employee.searchPlaceholder')}</p>
            </button>
            <button
              onClick={() => window.location.href = '/tax'}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
            >
              <Calculator className="w-6 h-6 text-primary-600 mb-2" />
              <p className="font-medium">{t('tax.title')}</p>
              <p className="text-sm text-gray-500">{t('tax.calculate')}</p>
            </button>
          </div>
        </Card>

        <Card title={t('setting.about')}>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">{t('setting.version')}</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t('setting.releaseDate')}</span>
              <span className="font-medium">Tháng 2/2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t('setting.taxLaw')}</span>
              <span className="font-medium">Luật Thuế TNCN 2007</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
