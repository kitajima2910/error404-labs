import { useState } from 'react'
import { Button, Card } from '../../components/ui'
import { Calculator, Upload, FileSpreadsheet, Calendar } from 'lucide-react'
import { useRole } from '../../hooks/useRole'
import { formatCurrency } from '../../lib/constants'
import { useTranslation } from '../../hooks/useTranslation'

export function TaxCalculator() {
  const { t } = useTranslation()
  const { hasPermission } = useRole()
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const canImport = hasPermission('tax:import')
  // const canCalculate = hasPermission('tax:calculate')

  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('tax.title')}</h1>
          <p className="text-gray-500">{t('tax.calculate')}</p>
        </div>
        <div className="flex gap-3">
          {canImport && (
            <Button
              variant="secondary"
              onClick={() => window.location.href = '/tax/import'}
            >
              <Upload className="w-4 h-4 mr-2" />
              {t('tax.importIncome')}
            </Button>
          )}
        </div>
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="font-medium">{t('tax.month')}/{t('tax.year')}:</span>
          </div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {months.map((m) => (
              <option key={m} value={m}>{t('tax.month')} {m}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="text-center py-12">
          <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('messages.noData')}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            {t('employee.searchPlaceholder')}
          </p>
          {canImport && (
            <Button onClick={() => window.location.href = '/tax/import'}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              {t('tax.importIncome')} {selectedMonth}/{selectedYear}
            </Button>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title={t('tax.formula')}>
          <div className="space-y-2 text-sm">
            <p><strong>{t('tax.taxableIncome')}</strong> =</p>
            <p className="pl-4 text-gray-600">
              {t('tax.totalIncome')} - {t('tax.nonTaxableIncome')} - {t('tax.insurance')} - {t('tax.dependentDeduction')}
            </p>
          </div>
        </Card>

        <Card title={t('tax.deductionRates')}>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{t('tax.personalDeduction')}:</span>
              <span className="font-medium">{formatCurrency(11000000)}/{t('tax.month').toLowerCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('tax.dependentDeduction')}:</span>
              <span className="font-medium">{formatCurrency(4400000)}/{t('dependent.name').toLowerCase()}/{t('tax.month').toLowerCase()}</span>
            </div>
          </div>
        </Card>

        <Card title={t('tax.taxRates')}>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Đến 5 triệu:</span>
              <span className="font-medium">5%</span>
            </div>
            <div className="flex justify-between">
              <span>5 - 10 triệu:</span>
              <span className="font-medium">10%</span>
            </div>
            <div className="flex justify-between">
              <span>10 - 18 triệu:</span>
              <span className="font-medium">15%</span>
            </div>
            <div className="flex justify-between">
              <span>18 - 32 triệu:</span>
              <span className="font-medium">20%</span>
            </div>
            <div className="flex justify-between">
              <span>32 - 52 triệu:</span>
              <span className="font-medium">25%</span>
            </div>
            <div className="flex justify-between">
              <span>52 - 80 triệu:</span>
              <span className="font-medium">30%</span>
            </div>
            <div className="flex justify-between">
              <span>Trên 80 triệu:</span>
              <span className="font-medium">35%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
