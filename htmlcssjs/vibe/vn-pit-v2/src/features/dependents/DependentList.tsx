import { useState, useMemo } from 'react'
import { useDependents, type Dependent } from './hooks/useDependents'
import { DependentForm } from './DependentForm'
import { Button, Card } from '../../components/ui'
import { Plus, Search, Users, Edit2, Trash2, AlertCircle } from 'lucide-react'
import { useRole } from '../../hooks/useRole'
import { formatDate } from '../../lib/constants'
import { useTranslation } from '../../hooks/useTranslation'

type SortDirection = 'asc' | 'desc' | null

interface SortConfig {
  key: keyof Dependent | null
  direction: SortDirection
}

export function DependentList() {
  const { t } = useTranslation()
  const { dependents, isLoading, createDependent, updateDependent, deleteDependent } = useDependents()
  const { hasPermission } = useRole()
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingDependent, setEditingDependent] = useState<Dependent | undefined>()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  // Sort
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null })

  const canCreate = hasPermission('dependents:create')
  const canEdit = hasPermission('dependents:edit')
  const canDelete = hasPermission('dependents:delete')

  // Filter và Sort
  const filteredAndSortedDependents = useMemo(() => {
    let result = dependents?.filter((dep) =>
      dep.ho_ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dep.moi_quan_he?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dep.employee?.ho_ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dep.employee?.ma_nv.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    // Sort
    if (sortConfig.key && sortConfig.direction) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Dependent]
        const bValue = b[sortConfig.key as keyof Dependent]

        if (aValue === null || aValue === undefined) return 1
        if (bValue === null || bValue === undefined) return -1

        const comparison = String(aValue).localeCompare(String(bValue), undefined)
        return sortConfig.direction === 'asc' ? comparison : -comparison
      })
    }

    return result
  }, [dependents, searchTerm, sortConfig])

  // Xử lý sort
  const handleSort = (key: keyof Dependent) => {
    let direction: SortDirection = 'asc'
    let newKey: keyof Dependent | null = key

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null
      newKey = null
    }

    setSortConfig({ key: newKey, direction })
  }

  const handleSubmit = async (data: any) => {
    try {
      if (editingDependent) {
        await updateDependent.mutateAsync({ id: editingDependent.id, ...data })
      } else {
        await createDependent.mutateAsync(data)
      }
      setShowForm(false)
      setEditingDependent(undefined)
    } catch (error) {
      console.error('Error saving dependent:', error)
      alert(t('messages.saveError'))
    }
  }

  const handleEdit = (dependent: Dependent) => {
    setEditingDependent(dependent)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDependent.mutateAsync(id)
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting dependent:', error)
      alert(t('messages.deleteError'))
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingDependent(undefined)
  }

  if (showForm) {
    return (
      <DependentForm
        dependent={editingDependent}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createDependent.isPending || updateDependent.isPending}
      />
    )
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
          <h1 className="text-2xl font-bold text-gray-900">{t('dependent.title')}</h1>
          <p className="text-gray-500">{t('dependent.total')}: {dependents?.length || 0} {t('nav.dependents').toLowerCase()}</p>
        </div>
        {canCreate && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {t('dependent.addNew')}
          </Button>
        )}
      </div>

      <Card>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo họ tên, mối quan hệ, nhân viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th
                  className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('ho_ten')}
                >
                  Họ và tên
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Mối quan hệ</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Nhân viên</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ngày sinh</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Thờigian giảm trừ</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Trạng thái</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedDependents?.map((dependent) => (
                <tr key={dependent.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{dependent.ho_ten}</td>
                  <td className="py-3 px-4">{dependent.moi_quan_he || '-'}</td>
                  <td className="py-3 px-4">
                    {dependent.employee ? (
                      <div>
                        <p className="font-medium">{dependent.employee.ho_ten}</p>
                        <p className="text-xs text-gray-500">{dependent.employee.ma_nv}</p>
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {dependent.ngay_sinh ? formatDate(dependent.ngay_sinh) : '-'}
                  </td>
                  <td className="py-3 px-4">
                    {dependent.tu_thang && dependent.tu_nam ? (
                      <span>
                        T{dependent.tu_thang}/{dependent.tu_nam}
                        {dependent.den_thang && dependent.den_nam && (
                          <> - T{dependent.den_thang}/{dependent.den_nam}</>
                        )}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {dependent.khong_con_su_dung ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {t('employee.inactive')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {t('employee.active')}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      {canEdit && (
                        <button
                          onClick={() => handleEdit(dependent)}
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => setShowDeleteConfirm(dependent.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAndSortedDependents?.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Không tìm thấy ngưởi phụ thuộc nào</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold">{t('common.confirm')}</h3>
            </div>
            <p className="text-gray-600 mb-6">
              {t('messages.confirmDelete')} {t('messages.actionCannotUndo')}
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)}>
                {t('common.cancel')}
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(showDeleteConfirm)}
                isLoading={deleteDependent.isPending}
              >
                {t('common.delete')}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900">Thông tin về ngưởi phụ thuộc</p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• Giảm trừ gia cảnh: 4.4 triệu VNĐ/ngưởi/tháng</li>
              <li>• Cần theo dõi thờigian giảm trừ (từ tháng/năm đến tháng/năm)</li>
              <li>• Có thể đánh dấu không còn sử dụng khi hết thờigian giảm trừ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
