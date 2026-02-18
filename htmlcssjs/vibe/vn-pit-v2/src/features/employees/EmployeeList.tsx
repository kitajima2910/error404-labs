import { useState, useMemo } from 'react'
import { useEmployees } from './hooks/useEmployees'
import { EmployeeForm } from './EmployeeForm'
import { Button, Card } from '../../components/ui'
import { useRole } from '../../hooks/useRole'
import { Plus, Search, Edit2, Trash2, Upload, Users, AlertCircle, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import type { Employee, EmployeeFormData } from './types'

type SortDirection = 'asc' | 'desc' | null

interface SortConfig {
  key: keyof Employee | null
  direction: SortDirection
}

export function EmployeeList() {
  const { t } = useTranslation()
  const { employees, isLoading, createEmployee, updateEmployee, deleteEmployee } = useEmployees()
  const { hasPermission } = useRole()
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Sort
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null })

  const canCreate = hasPermission('employees:create')
  const canEdit = hasPermission('employees:edit')
  const canDelete = hasPermission('employees:delete')
  const canImport = hasPermission('employees:import')

  // Filter và Sort
  const filteredAndSortedEmployees = useMemo(() => {
    let result = employees?.filter((emp) =>
      emp.ma_nv.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.ho_ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.don_vi?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    // Sort
    if (sortConfig.key && sortConfig.direction) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Employee]
        const bValue = b[sortConfig.key as keyof Employee]

        if (aValue === null || aValue === undefined) return 1
        if (bValue === null || bValue === undefined) return -1

        const comparison = String(aValue).localeCompare(String(bValue), undefined)
        return sortConfig.direction === 'asc' ? comparison : -comparison
      })
    }

    return result
  }, [employees, searchTerm, sortConfig])

  // Phân trang
  const totalPages = Math.ceil((filteredAndSortedEmployees?.length || 0) / itemsPerPage)
  const paginatedEmployees = filteredAndSortedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Xử lý sort
  const handleSort = (key: keyof Employee) => {
    let direction: SortDirection = 'asc'
    let newKey: keyof Employee | null = key

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null
      newKey = null
    }

    setSortConfig({ key: newKey, direction })
    setCurrentPage(1) // Reset về trang 1 khi sort
  }

  // Render icon sort
  const getSortIcon = (key: keyof Employee) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="w-4 h-4 ml-1 text-gray-400" />
    if (sortConfig.direction === 'asc') return <ArrowUp className="w-4 h-4 ml-1 text-primary-600" />
    return <ArrowDown className="w-4 h-4 ml-1 text-primary-600" />
  }

  const handleSubmit = async (data: EmployeeFormData) => {
    try {
      if (editingEmployee) {
        await updateEmployee.mutateAsync({ id: editingEmployee.id, ...data })
      } else {
        await createEmployee.mutateAsync(data)
      }
      setShowForm(false)
      setEditingEmployee(undefined)
    } catch (error) {
      console.error('Error saving employee:', error)
      alert(t('messages.saveError'))
    }
  }

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee.mutateAsync(id)
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting employee:', error)
      alert(t('messages.deleteError'))
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingEmployee(undefined)
  }

  // Chuyển trang
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  if (showForm) {
    return <EmployeeForm employee={editingEmployee} onSubmit={handleSubmit} onCancel={handleCancel} isLoading={createEmployee.isPending || updateEmployee.isPending} />
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('employee.title')}</h1>
          <p className="text-gray-500">{t('employee.total')}: {employees?.length || 0} {t('nav.employees').toLowerCase()}</p>
        </div>
        <div className="flex gap-3">
          {canImport && (
            <Button
              variant="secondary"
              onClick={() => window.location.href = '/employees/import'}
            >
              <Upload className="w-4 h-4 mr-2" />Import Excel
            </Button>
          )}
          {canCreate && <Button onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-2" />Thêm nhân viên</Button>}
        </div>
      </div>

      <Card>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã NV, họ tên, đơn vị..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th
                  className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50 select-none"
                  onClick={() => handleSort('ma_nv')}
                >
                  <div className="flex items-center">
                    Mã NV
                    {getSortIcon('ma_nv')}
                  </div>
                </th>
                <th
                  className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50 select-none"
                  onClick={() => handleSort('ho_ten')}
                >
                  <div className="flex items-center">
                    Họ và tên
                    {getSortIcon('ho_ten')}
                  </div>
                </th>
                <th
                  className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50 select-none"
                  onClick={() => handleSort('don_vi')}
                >
                  <div className="flex items-center">
                    Đơn vị
                    {getSortIcon('don_vi')}
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Mã số thuế</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">CCCD</th>
                <th
                  className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50 select-none"
                  onClick={() => handleSort('da_nghi_viec')}
                >
                  <div className="flex items-center">
                    Trạng thái
                    {getSortIcon('da_nghi_viec')}
                  </div>
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">{t('common.actions') || 'Thao tác'}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees?.map((employee: any) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{employee.ma_nv}</td>
                  <td className="py-3 px-4">{employee.ho_ten}</td>
                  <td className="py-3 px-4">{employee.don_vi || '-'}</td>
                  <td className="py-3 px-4">{employee.ma_so_thue || '-'}</td>
                  <td className="py-3 px-4">{employee.so_cccd || '-'}</td>
                  <td className="py-3 px-4">
                    {employee.da_nghi_viec ?
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Đã nghỉ việc</span> :
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Đang làm việc</span>
                    }
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      {canEdit && <button onClick={() => handleEdit(employee)} className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>}
                      {canDelete && <button onClick={() => setShowDeleteConfirm(employee.id)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>}
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedEmployees?.length === 0 &&
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>{t('messages.noData')}</p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedEmployees.length)}
              {' '}trên tổng số {filteredAndSortedEmployees.length} nhân viên
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${currentPage === pageNum
                      ? 'bg-primary-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {pageNum}
                  </button>
                )
              })}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </Card>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><AlertCircle className="w-5 h-5 text-red-600" /></div>
              <h3 className="text-lg font-semibold">{t('common.confirm')}</h3>
            </div>
            <p className="text-gray-600 mb-6">{t('messages.confirmDelete')} {t('messages.actionCannotUndo')}</p>
            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)}>{t('common.cancel')}</Button>
              <Button variant="danger" onClick={() => handleDelete(showDeleteConfirm)} isLoading={deleteEmployee.isPending}>{t('common.delete')}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
