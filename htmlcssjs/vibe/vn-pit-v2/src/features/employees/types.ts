import type { Database } from '../../types/database'

export type Employee = Database['public']['Tables']['employees']['Row']
export type EmployeeInsert = Database['public']['Tables']['employees']['Insert']
export type EmployeeUpdate = Database['public']['Tables']['employees']['Update']

export interface EmployeeFormData {
  ma_nv: string
  ho_ten: string
  don_vi: string
  ma_so_thue: string
  so_cccd: string
  da_nghi_viec: boolean
}

export interface EmployeeImportData {
  ma_nv: string
  ho_ten: string
  don_vi?: string
  ma_so_thue?: string
  so_cccd?: string
  da_nghi_viec?: boolean
}
