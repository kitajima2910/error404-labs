import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../../lib/supabase'

const DEPENDENTS_KEY = 'dependents'

export interface Dependent {
  id: string
  employee_id: string
  ho_ten: string
  moi_quan_he: string | null
  ngay_sinh: string | null
  ma_so_thue: string | null
  so_cccd: string | null
  tu_thang: number | null
  tu_nam: number | null
  den_thang: number | null
  den_nam: number | null
  khong_con_su_dung: boolean
  created_at: string
  employee?: {
    ma_nv: string
    ho_ten: string
  }
}

export function useDependents() {
  const queryClient = useQueryClient()

  const { data: dependents, isLoading, error } = useQuery({
    queryKey: [DEPENDENTS_KEY],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dependents')
        .select(`
          *,
          employee:employees(ma_nv, ho_ten)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return (data || []) as Dependent[]
    },
  })

  const createDependent = useMutation({
    mutationFn: async (dependent: Partial<Dependent>) => {
      const { data, error } = await supabase
        .from('dependents')
        .insert(dependent as any)
        .select()
        .single()
      
      if (error) throw error
      return data as Dependent
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPENDENTS_KEY] })
    },
  })

  const updateDependent = useMutation({
    mutationFn: async ({ id, ...dependent }: { id: string } & Partial<Dependent>) => {
      const { data, error } = await supabase
        .from('dependents')
        .update(dependent as any)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data as Dependent
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPENDENTS_KEY] })
    },
  })

  const deleteDependent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('dependents')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPENDENTS_KEY] })
    },
  })

  return {
    dependents,
    isLoading,
    error,
    createDependent,
    updateDependent,
    deleteDependent,
  }
}
