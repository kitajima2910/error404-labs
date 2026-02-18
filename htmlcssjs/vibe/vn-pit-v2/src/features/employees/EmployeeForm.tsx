import { useState, useEffect } from 'react'
import { Button, Input, Card } from '../../components/ui'
import type { Employee, EmployeeFormData } from './types'
import { useTranslation } from '../../hooks/useTranslation'

interface EmployeeFormProps {
  employee?: Employee
  onSubmit: (data: EmployeeFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export function EmployeeForm({ employee, onSubmit, onCancel, isLoading }: EmployeeFormProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<EmployeeFormData>({
    ma_nv: '',
    ho_ten: '',
    don_vi: '',
    ma_so_thue: '',
    so_cccd: '',
    da_nghi_viec: false,
  })

  useEffect(() => {
    if (employee) {
      setFormData({
        ma_nv: employee.ma_nv,
        ho_ten: employee.ho_ten,
        don_vi: employee.don_vi || '',
        ma_so_thue: employee.ma_so_thue || '',
        so_cccd: employee.so_cccd || '',
        da_nghi_viec: employee.da_nghi_viec,
      })
    }
  }, [employee])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof EmployeeFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card title={employee ? t('employee.edit') : t('employee.addNew')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={`${t('employee.id')} *`}
            value={formData.ma_nv}
            onChange={(e) => handleChange('ma_nv', e.target.value)}
            required
            disabled={!!employee}
          />
          <Input
            label={`${t('employee.name')} *`}
            value={formData.ho_ten}
            onChange={(e) => handleChange('ho_ten', e.target.value)}
            required
          />
          <Input
            label={t('employee.department')}
            value={formData.don_vi}
            onChange={(e) => handleChange('don_vi', e.target.value)}
          />
          <Input
            label={t('employee.taxId')}
            value={formData.ma_so_thue}
            onChange={(e) => handleChange('ma_so_thue', e.target.value)}
          />
          <Input
            label={t('employee.idCard')}
            value={formData.so_cccd}
            onChange={(e) => handleChange('so_cccd', e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="da_nghi_viec"
            checked={formData.da_nghi_viec}
            onChange={(e) => handleChange('da_nghi_viec', e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="da_nghi_viec" className="text-sm text-gray-700">
            {t('employee.inactive')}
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" isLoading={isLoading}>
            {employee ? t('common.edit') : t('common.addNew')}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        </div>
      </form>
    </Card>
  )
}
