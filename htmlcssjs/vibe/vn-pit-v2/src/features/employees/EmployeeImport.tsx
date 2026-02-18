import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'
import { Button, Card } from '../../components/ui'
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react'
import { useEmployees } from './hooks/useEmployees'
import type { EmployeeImportData } from './types'
import { useTranslation } from '../../hooks/useTranslation'

interface ImportResult {
  success: number
  failed: number
  errors: string[]
}

export function EmployeeImport() {
  const { t } = useTranslation()
  const { importEmployees } = useEmployees()
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

      const rows = jsonData.slice(1)
      const employees: EmployeeImportData[] = []
      const errors: string[] = []

      rows.forEach((row, index) => {
        const rowNum = index + 2
        const ma_nv = row[0]?.toString().trim()
        const ho_ten = row[1]?.toString().trim()

        if (!ma_nv || ho_ten === undefined) {
          errors.push(`${t('common.row')} ${rowNum}: ${t('messages.importError')}`)
          return
        }

        employees.push({
          ma_nv,
          ho_ten,
          don_vi: row[2]?.toString().trim() || undefined,
          ma_so_thue: row[3]?.toString().trim() || undefined,
          so_cccd: row[4]?.toString().trim() || undefined,
          da_nghi_viec: row[5]?.toString().toLowerCase() === 'true' || row[5] === 1 || row[5] === true,
        })
      })

      if (employees.length > 0) {
        try {
          await importEmployees.mutateAsync(employees)
          setResult({ success: employees.length, failed: errors.length, errors })
        } catch (error: any) {
          if (error.code === '23505') {
            errors.push(t('messages.duplicateError'))
          } else {
            errors.push(`${t('messages.importError')}: ${error.message}`)
          }
          setResult({ success: 0, failed: employees.length + errors.length, errors })
        }
      } else {
        setResult({ success: 0, failed: errors.length, errors })
      }
    } catch (error) {
      setResult({ success: 0, failed: 1, errors: [t('messages.readError')] })
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
        setResult({ success: 0, failed: 1, errors: [t('messages.invalidFile')] })
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const downloadTemplate = () => {
    const template = [
      ['Mã NV', 'Họ tên', 'Đơn vị', 'Mã số thuế', 'Số CCCD', 'Đã nghỉ việc (true/false)'],
      ['NV001', 'Nguyễn Văn A', 'Phòng Kế toán', '1234567890', '012345678901', 'false'],
    ]
    const ws = XLSX.utils.aoa_to_sheet(template)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Nhân viên')
    XLSX.writeFile(wb, 'mau_import_nhan_vien.xlsx')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Import danh sách nhân viên</h1>
        <p className="text-gray-500">Tải lên file Excel để thêm nhiều nhân viên cùng lúc</p>
      </div>

      <Card>
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
                <p className="text-sm text-blue-700 mt-1">{t('common.templateDescription')}</p>
                <Button variant="secondary" size="sm" className="mt-3" onClick={downloadTemplate}>{t('common.downloadTemplate')}</Button>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <span className="ml-3 text-gray-600">Đang xử lý...</span>
            </div>
          )}

          {result && !isLoading && (
            <div className={`rounded-lg p-4 ${result.failed === 0 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
              <div className="flex items-start gap-3">
                {result.failed === 0 ? <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />}
                <div>
                  <p className="font-medium">{result.failed === 0 ? t('messages.saveSuccess') : t('messages.saveError')}</p>
                  <p className="text-sm mt-1">{t('common.success')}: <span className="font-medium text-green-600">{result.success}</span> | {t('common.failed')}: <span className="font-medium text-red-600">{result.failed}</span></p>
                  {result.errors.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <p className="text-sm font-medium">Chi tiết lỗi:</p>
                      <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
                        {result.errors.map((error, index) => <li key={index} className="text-red-600">• {error}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
