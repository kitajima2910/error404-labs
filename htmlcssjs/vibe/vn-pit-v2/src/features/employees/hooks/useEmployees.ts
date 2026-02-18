import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../../lib/supabase'

const EMPLOYEES_KEY = 'employees'

export interface Employee {
  id: string
  ma_nv: string
  ho_ten: string
  don_vi: string | null
  ma_so_thue: string | null
  so_cccd: string | null
  da_nghi_viec: boolean
  created_at: string
  updated_at: string
}

export function useEmployees() {
  const queryClient = useQueryClient()

  const { data: employees, isLoading, error } = useQuery({
    queryKey: [EMPLOYEES_KEY],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return (data || []) as Employee[]
    },
  })

  const createEmployee = useMutation({
    mutationFn: async (employee: Partial<Employee>) => {
      const { data, error } = await supabase
        .from('employees')
        .insert(employee as any)
        .select()
        .single()
      
      if (error) throw error
      return data as Employee
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_KEY] })
    },
  })

  const updateEmployee = useMutation({
    mutationFn: async ({ id, ...employee }: { id: string } & Partial<Employee>) => {
      const { data, error } = await supabase
        .from('employees')
        .update(employee as any)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data as Employee
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_KEY] })
    },
  })

  const deleteEmployee = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_KEY] })
    },
  })

  const importEmployees = useMutation({
    mutationFn: async (employees: Partial<Employee>[]) => {
      const { data, error } = await supabase
        .from('employees')
        .insert(employees as any)
        .select()
      
      if (error) throw error
      return data as Employee[]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_KEY] })
    },
  })

  return {
    employees,
    isLoading,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    importEmployees,
  }
}
