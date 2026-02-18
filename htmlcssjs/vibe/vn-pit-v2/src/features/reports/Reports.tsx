import { useEffect, useState } from 'react'
import { Card } from '../../components/ui'
import { supabase } from '../../lib/supabase'
import { formatCurrency } from '../../lib/constants'
import { useTranslation } from '../../hooks/useTranslation'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Download, FileText, TrendingUp, Users, Calculator } from 'lucide-react'
import * as XLSX from 'xlsx'

interface TaxSummary {
  thang: number
  nam: number
  tong_thue: number
  so_nhan_vien: number
}

interface DepartmentTax {
  don_vi: string
  tong_thue: number
  so_nhan_vien: number
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export function Reports() {
  const { t } = useTranslation()
  const [taxByMonth, setTaxByMonth] = useState<TaxSummary[]>([])
  const [taxByDepartment, setTaxByDepartment] = useState<DepartmentTax[]>([])
  const [totalTax, setTotalTax] = useState(0)
  const [totalEmployees, setTotalEmployees] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i)

  useEffect(() => {
    fetchReportData()
  }, [selectedYear])

  const fetchReportData = async () => {
    setIsLoading(true)
    try {
      // Lấy tổng thuế theo tháng
      const { data: monthlyData } = await supabase
        .from('tax_records')
        .select('thang, nam, thue_phai_nop')
        .eq('nam', selectedYear)
        .order('thang', { ascending: true })

      // Gom nhóm theo tháng
      const monthSummary: { [key: string]: { thang: number; tong_thue: number; so_nhan_vien: number } } = {}
      monthlyData?.forEach((record: any) => {
        const key = `${record.thang}`
        if (!monthSummary[key]) {
          monthSummary[key] = { thang: record.thang, tong_thue: 0, so_nhan_vien: 0 }
        }
        monthSummary[key].tong_thue += record.thue_phai_nop
        monthSummary[key].so_nhan_vien += 1
      })

      const taxByMonthArray = Object.values(monthSummary).sort((a, b) => a.thang - b.thang)
      setTaxByMonth(taxByMonthArray as TaxSummary[])

      // Tính tổng
      const totalTaxAmount = monthlyData?.reduce((sum: number, r: any) => sum + (r.thue_phai_nop || 0), 0) || 0
      setTotalTax(totalTaxAmount)

      // Lấy thuế theo đơn vị
      const { data: employees } = await supabase
        .from('employees')
        .select('id, don_vi')

      const { data: taxRecords } = await supabase
        .from('tax_records')
        .select('employee_id, thue_phai_nop')
        .eq('nam', selectedYear)

      const deptSummary: { [key: string]: { don_vi: string; tong_thue: number; so_nhan_vien: number } } = {}

      taxRecords?.forEach((record: any) => {
        const employee = (employees as any[])?.find((e: any) => e.id === record.employee_id)
        if (employee) {
          const donVi = employee.don_vi || 'Không xác định'
          if (!deptSummary[donVi]) {
            deptSummary[donVi] = { don_vi: donVi, tong_thue: 0, so_nhan_vien: 0 }
          }
          deptSummary[donVi].tong_thue += record.thue_phai_nop
          deptSummary[donVi].so_nhan_vien += 1
        }
      })

      const taxByDeptArray = Object.values(deptSummary).sort((a, b) => b.tong_thue - a.tong_thue)
      setTaxByDepartment(taxByDeptArray as DepartmentTax[])

      // Tổng nhân viên có đóng thuế
      const uniqueEmployees = new Set(taxRecords?.map((r: any) => r.employee_id))
      setTotalEmployees(uniqueEmployees.size)

    } catch (error) {
      console.error('Error fetching report data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const exportToExcel = () => {
    // Export dữ liệu thuế theo tháng
    const monthData = taxByMonth.map(m => ({
      [t('tax.month')]: m.thang,
      [t('tax.totalTax')]: m.tong_thue,
      [t('employee.total')]: m.so_nhan_vien,
      [t('report.avgTaxPerEmployee')]: m.so_nhan_vien > 0 ? m.tong_thue / m.so_nhan_vien : 0
    }))

    const ws1 = XLSX.utils.json_to_sheet(monthData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws1, t('report.taxByMonth'))

    // Export dữ liệu theo đơn vị
    const deptData = taxByDepartment.map(d => ({
      [t('report.department')]: d.don_vi,
      [t('tax.totalTax')]: d.tong_thue,
      [t('employee.total')]: d.so_nhan_vien
    }))

    const ws2 = XLSX.utils.json_to_sheet(deptData)
    XLSX.utils.book_append_sheet(wb, ws2, t('report.taxByDept'))

    XLSX.writeFile(wb, `bao_cao_thue_${selectedYear}.xlsx`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('nav.reports')}</h1>
          <p className="text-gray-500">{t('report.statsDescription')}</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {years.map((y) => (
              <option key={y} value={y}>{t('tax.year')} {y}</option>
            ))}
          </select>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            {t('common.exportExcel')}
          </button>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('report.annualTaxSum')} {selectedYear}</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalTax)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('report.taxPayingEmployees')}</p>
              <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('report.avgTaxPerMonth')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalEmployees > 0 ? totalTax / totalEmployees / 12 : 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Biểu đồ thuế theo tháng */}
      <Card title={t('report.taxByMonth')}>
        <div className="h-80">
          {taxByMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taxByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="thang"
                  tickFormatter={(value) => `T${value}`}
                />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                />
                <Tooltip
                  formatter={(value: any) => formatCurrency(value as number)}
                  labelFormatter={(label) => `Tháng ${label}`}
                />
                <Bar dataKey="tong_thue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <FileText className="w-12 h-12 mr-2" />
              <p>{t('messages.noData')} {selectedYear}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Biểu đồ thuế theo đơn vị */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={t('report.taxByDept')}>
          <div className="h-80">
            {taxByDepartment.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taxByDepartment}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) => `${props.don_vi}: ${((props.percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="tong_thue"
                    nameKey="don_vi"
                  >
                    {taxByDepartment.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <FileText className="w-12 h-12 mr-2" />
                <p>{t('messages.noData')}</p>
              </div>
            )}
          </div>
        </Card>

        <Card title={t('report.taxByDeptTable')}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">{t('report.department')}</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">{t('employee.total')}</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">{t('tax.totalTax')}</th>
                </tr>
              </thead>
              <tbody>
                {taxByDepartment.map((dept, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-3 px-4">{dept.don_vi}</td>
                    <td className="py-3 px-4 text-right">{dept.so_nhan_vien}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      {formatCurrency(dept.tong_thue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
