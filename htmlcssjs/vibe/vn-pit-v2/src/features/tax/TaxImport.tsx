import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'
import { Button, Card } from '../../components/ui'
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, Calculator } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useRole } from '../../hooks/useRole'
import { calculateTax, calculateTaxableIncome, TAX_CONSTANTS } from '../../lib/utils'
import { formatCurrency } from '../../lib/constants'
import { useTranslation } from '../../hooks/useTranslation'

interface ImportResult {
  success: number
  failed: number
  errors: string[]
}

interface IncomeData {
  ma_nv: string
  ho_ten: string
  ma_so_thue: string
  tong_thu_nhap: number
  khong_chiu_thue: number
  bao_hiem: number
}

export function TaxImport() {
  const { t } = useTranslation()
  const { hasPermission } = useRole()
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [previewData, setPreviewData] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const canImport = hasPermission('tax:import')

  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const processFile = async (file: File) => {
    setIsLoading(true)
    setResult(null)
    setPreviewData([])

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

      const rows = jsonData.slice(1)
      const incomeData: IncomeData[] = []
      const errors: string[] = []
      const preview: any[] = []

      // Lấy danh sách nhân viên để kiểm tra
      const { data: employees } = await supabase
        .from('employees')
        .select('id, ma_nv, ho_ten')

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const rowNum = i + 2
        const ma_nv = row[0]?.toString().trim()
        const ho_ten = row[1]?.toString().trim()

        if (!ma_nv || !ho_ten) {
          errors.push(`Dòng ${rowNum}: Thiếu mã NV hoặc họ tên`)
          continue
        }

        // Tìm nhân viên
        const employee = (employees as any[])?.find((e: any) => e.ma_nv === ma_nv)
        if (!employee) {
          errors.push(`Dòng ${rowNum}: Không tìm thấy nhân viên ${ma_nv}`)
          continue
        }

        // Lấy số ngưởi phụ thuộc
        const { data: dependents } = await supabase
          .from('dependents')
          .select('*')
          .eq('employee_id', employee.id)
          .eq('khong_con_su_dung', false)

        const soNguoiPhuThuoc = dependents?.length || 0
        const giamTruPhuThuoc = soNguoiPhuThuoc * TAX_CONSTANTS.GIAM_TRU_NGUOI_PHU_THUOC

        const tongThuNhap = Number(row[3]) || 0
        const khongChiuThue = Number(row[4]) || 0
        const baoHiem = Number(row[5]) || 0

        const thuNhapTinhThue = calculateTaxableIncome(
          tongThuNhap,
          khongChiuThue,
          baoHiem,
          TAX_CONSTANTS.GIAM_TRU_BAN_THAN,
          giamTruPhuThuoc
        )

        const thuePhaiNop = calculateTax(thuNhapTinhThue)

        incomeData.push({
          ma_nv,
          ho_ten,
          ma_so_thue: row[2]?.toString().trim() || '',
          tong_thu_nhap: tongThuNhap,
          khong_chiu_thue: khongChiuThue,
          bao_hiem: baoHiem,
        })

        preview.push({
          employee_id: employee.id,
          thang: selectedMonth,
          nam: selectedYear,
          tong_thu_nhap: tongThuNhap,
          khong_chiu_thue: khongChiuThue,
          bao_hiem: baoHiem,
          giam_tru_ban_than: TAX_CONSTANTS.GIAM_TRU_BAN_THAN,
          giam_tru_phu_thuoc: giamTruPhuThuoc,
          so_nguoi_phu_thuoc: soNguoiPhuThuoc,
          thu_nhap_tinh_thue: thuNhapTinhThue,
          thue_phai_nop: thuePhaiNop,
          ho_ten,
          so_nguoi_pt: soNguoiPhuThuoc,
        })
      }

      setPreviewData(preview)

      if (incomeData.length > 0) {
        setResult({
          success: incomeData.length,
          failed: errors.length,
          errors,
        })
      } else {
        setResult({
          success: 0,
          failed: errors.length,
          errors,
        })
      }
    } catch (error) {
      setResult({
        success: 0,
        failed: 1,
        errors: ['Lỗi đọc file Excel. Vui lòng kiểm tra định dạng file.'],
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        processFile(file)
      } else {
        setResult({ success: 0, failed: 1, errors: ['Vui lòng chọn file Excel (.xlsx hoặc .xls)'] })
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleImport = async () => {
    if (previewData.length === 0) return

    setIsLoading(true)
    try {
      // Chuẩn bị data để insert
      const recordsToInsert = previewData.map(p => ({
        employee_id: p.employee_id,
        thang: p.thang,
        nam: p.nam,
        tong_thu_nhap: p.tong_thu_nhap,
        khong_chiu_thue: p.khong_chiu_thue,
        bao_hiem: p.bao_hiem,
        giam_tru_ban_than: p.giam_tru_ban_than,
        giam_tru_phu_thuoc: p.giam_tru_phu_thuoc,
        so_nguoi_phu_thuoc: p.so_nguoi_phu_thuoc,
        thu_nhap_tinh_thue: p.thu_nhap_tinh_thue,
        thue_phai_nop: p.thue_phai_nop,
      }))

      const { error } = await supabase
        .from('tax_records')
        .upsert(recordsToInsert as any, {
          onConflict: 'employee_id,thang,nam',
        })

      if (error) throw error

      alert(`${t('messages.saveSuccess')}: ${recordsToInsert.length} ${t('tax.title')} ${selectedMonth}/${selectedYear}`)
      setPreviewData([])
      setResult(null)
    } catch (error: any) {
      alert(t('messages.saveError') + ': ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadTemplate = () => {
    const template = [
      ['Mã NV', 'Họ tên', 'Mã số thuế', 'Tổng thu nhập', 'Không chịu thuế', 'Bảo hiểm'],
      ['NV001', 'Nguyễn Văn A', '1234567890', '20000000', '0', '1500000'],
      ['NV002', 'Trần Thị B', '0987654321', '15000000', '0', '1200000'],
    ]
    const ws = XLSX.utils.aoa_to_sheet(template)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Thu nhập')
    XLSX.writeFile(wb, `mau_import_thu_nhap_T${selectedMonth}_${selectedYear}.xlsx`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('tax.importIncome')} {selectedMonth}/{selectedYear}</h1>
          <p className="text-gray-500">{t('tax.calculate')}</p>
        </div>
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-medium">Tháng:</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {months.map((m) => (
                <option key={m} value={m}>{t('tax.month')} {m}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{t('tax.year')}:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>{t('tax.year')} {y}</option>
              ))}
            </select>
          </div>
        </div>

        {canImport && (
          <div className="space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'}`}
            >
              <input ref={fileInputRef} type="file" accept=".xlsx,.xls" onChange={handleFileSelect} className="hidden" />
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium text-gray-700 mb-2">{t('common.dragDrop')}</p>
              <p className="text-sm text-gray-500">{t('common.orClick')}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">{t('common.templateFormat')}</p>
                  <p className="text-sm text-blue-700 mt-1">
                    {t('common.templateDescription')}
                  </p>
                  <Button variant="secondary" size="sm" className="mt-3" onClick={downloadTemplate}>
                    {t('common.downloadTemplate')}
                  </Button>
                </div>
              </div>
            </div>

            {isLoading && !previewData.length && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-3 text-gray-600">Đang xử lý...</span>
              </div>
            )}

            {result && (
              <div className={`rounded-lg p-4 ${result.failed === 0 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                <div className="flex items-start gap-3">
                  {result.failed === 0 ? <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />}
                  <div>
                    <p className="font-medium">{result.failed === 0 ? 'Phân tích thành công!' : 'Phân tích hoàn tất với lỗi'}</p>
                    <p className="text-sm mt-1">
                      Thành công: <span className="font-medium text-green-600">{result.success}</span> |
                      Thất bại: <span className="font-medium text-red-600">{result.failed}</span>
                    </p>
                    {result.errors.length > 0 && (
                      <div className="mt-3 space-y-1">
                        <p className="text-sm font-medium">{t('common.errorDetails')}:</p>
                        <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
                          {result.errors.map((error, index) => <li key={index} className="text-red-600">• {error}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {previewData.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Xem trước dữ liệu ({previewData.length} bản ghi)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3">Mã NV</th>
                        <th className="text-left py-2 px-3">Họ tên</th>
                        <th className="text-right py-2 px-3">Tổng thu nhập</th>
                        <th className="text-right py-2 px-3">Bảo hiểm</th>
                        <th className="text-center py-2 px-3">Số ngưởi PT</th>
                        <th className="text-right py-2 px-3">Thuế phải nộp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.slice(0, 10).map((record, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="py-2 px-3">{record.ma_nv}</td>
                          <td className="py-2 px-3">{record.ho_ten}</td>
                          <td className="py-2 px-3 text-right">{formatCurrency(record.tong_thu_nhap)}</td>
                          <td className="py-2 px-3 text-right">{formatCurrency(record.bao_hiem)}</td>
                          <td className="py-2 px-3 text-center">{record.so_nguoi_pt}</td>
                          <td className="py-2 px-3 text-right font-medium">{formatCurrency(record.thue_phai_nop)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {previewData.length > 10 && (
                    <p className="text-center text-sm text-gray-500 mt-2">
                      ... và {previewData.length - 10} bản ghi khác
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleImport} isLoading={isLoading}>
                    <Calculator className="w-4 h-4 mr-2" />
                    Xác nhận Import
                  </Button>
                  <Button variant="secondary" onClick={() => { setPreviewData([]); setResult(null); }}>
                    Hủy
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
