import { useState, useEffect } from 'react'
import { Button, Card, Input } from '../../components/ui'
import type { Dependent } from './hooks/useDependents'
import { useTranslation } from '../../hooks/useTranslation'

interface DependentFormProps {
  dependent?: Dependent
  onSubmit: (data: any) => void
  onCancel: () => void
  isLoading?: boolean
}

export function DependentForm({ dependent, onSubmit, onCancel, isLoading }: DependentFormProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    employee_id: '',
    ho_ten: '',
    moi_quan_he: '',
    ngay_sinh: '',
    ma_so_thue: '',
    so_cccd: '',
    tu_thang: '',
    tu_nam: '',
    den_thang: '',
    den_nam: '',
    khong_con_su_dung: false,
  })

  useEffect(() => {
    if (dependent) {
      setFormData({
        employee_id: dependent.employee_id,
        ho_ten: dependent.ho_ten,
        moi_quan_he: dependent.moi_quan_he || '',
        ngay_sinh: dependent.ngay_sinh || '',
        ma_so_thue: dependent.ma_so_thue || '',
        so_cccd: dependent.so_cccd || '',
        tu_thang: dependent.tu_thang?.toString() || '',
        tu_nam: dependent.tu_nam?.toString() || '',
        den_thang: dependent.den_thang?.toString() || '',
        den_nam: dependent.den_nam?.toString() || '',
        khong_con_su_dung: dependent.khong_con_su_dung,
      })
    }
  }, [dependent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      tu_thang: formData.tu_thang ? parseInt(formData.tu_thang) : null,
      tu_nam: formData.tu_nam ? parseInt(formData.tu_nam) : null,
      den_thang: formData.den_thang ? parseInt(formData.den_thang) : null,
      den_nam: formData.den_nam ? parseInt(formData.den_nam) : null,
    })
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card title={dependent ? t('dependent.edit') : t('dependent.addNew')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={`${t('employee.id')} *`}
            value={formData.employee_id}
            onChange={(e) => handleChange('employee_id', e.target.value)}
            required
            disabled={!!dependent}
          />
          <Input
            label={`${t('employee.name')} *`}
            value={formData.ho_ten}
            onChange={(e) => handleChange('ho_ten', e.target.value)}
            required
          />
          <Input
            label={t('dependent.relationship')}
            value={formData.moi_quan_he}
            onChange={(e) => handleChange('moi_quan_he', e.target.value)}
            placeholder={t('dependent.relationshipPlaceholder')}
          />
          <Input
            label={t('dependent.birthDate')}
            type="date"
            value={formData.ngay_sinh}
            onChange={(e) => handleChange('ngay_sinh', e.target.value)}
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
          <div className="grid grid-cols-2 gap-2">
            <Input
              label={`${t('dependent.deductionFrom')} ${t('tax.month').toLowerCase()}`}
              type="number"
              min="1"
              max="12"
              value={formData.tu_thang}
              onChange={(e) => handleChange('tu_thang', e.target.value)}
            />
            <Input
              label={t('tax.year')}
              type="number"
              value={formData.tu_nam}
              onChange={(e) => handleChange('tu_nam', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              label={`${t('dependent.deductionTo')} ${t('tax.month').toLowerCase()}`}
              type="number"
              min="1"
              max="12"
              value={formData.den_thang}
              onChange={(e) => handleChange('den_thang', e.target.value)}
            />
            <Input
              label={t('tax.year')}
              type="number"
              value={formData.den_nam}
              onChange={(e) => handleChange('den_nam', e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="khong_con_su_dung"
            checked={formData.khong_con_su_dung}
            onChange={(e) => handleChange('khong_con_su_dung', e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="khong_con_su_dung" className="text-sm text-gray-700">
            {t('dependent.inactiveDescription')}
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" isLoading={isLoading}>
            {dependent ? t('common.edit') : t('common.addNew')}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        </div>
      </form>
    </Card>
  )
}
