export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: 'admin' | 'manager' | 'accountant'
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: 'admin' | 'manager' | 'accountant'
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: 'admin' | 'manager' | 'accountant'
          created_at?: string
        }
      }
      employees: {
        Row: {
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
        Insert: {
          id?: string
          ma_nv: string
          ho_ten: string
          don_vi?: string | null
          ma_so_thue?: string | null
          so_cccd?: string | null
          da_nghi_viec?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ma_nv?: string
          ho_ten?: string
          don_vi?: string | null
          ma_so_thue?: string | null
          so_cccd?: string | null
          da_nghi_viec?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      dependents: {
        Row: {
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
        }
        Insert: {
          id?: string
          employee_id: string
          ho_ten: string
          moi_quan_he?: string | null
          ngay_sinh?: string | null
          ma_so_thue?: string | null
          so_cccd?: string | null
          tu_thang?: number | null
          tu_nam?: number | null
          den_thang?: number | null
          den_nam?: number | null
          khong_con_su_dung?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          ho_ten?: string
          moi_quan_he?: string | null
          ngay_sinh?: string | null
          ma_so_thue?: string | null
          so_cccd?: string | null
          tu_thang?: number | null
          tu_nam?: number | null
          den_thang?: number | null
          den_nam?: number | null
          khong_con_su_dung?: boolean
          created_at?: string
        }
      }
      tax_records: {
        Row: {
          id: string
          employee_id: string
          thang: number
          nam: number
          tong_thu_nhap: number
          khong_chiu_thue: number
          bao_hiem: number
          giam_tru_ban_than: number
          giam_tru_phu_thuoc: number
          so_nguoi_phu_thuoc: number
          thu_nhap_tinh_thue: number
          thue_phai_nop: number
          da_khoa_so: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          thang: number
          nam: number
          tong_thu_nhap: number
          khong_chiu_thue?: number
          bao_hiem?: number
          giam_tru_ban_than?: number
          giam_tru_phu_thuoc?: number
          so_nguoi_phu_thuoc?: number
          thu_nhap_tinh_thue?: number
          thue_phai_nop?: number
          da_khoa_so?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          thang?: number
          nam?: number
          tong_thu_nhap?: number
          khong_chiu_thue?: number
          bao_hiem?: number
          giam_tru_ban_than?: number
          giam_tru_phu_thuoc?: number
          so_nguoi_phu_thuoc?: number
          thu_nhap_tinh_thue?: number
          thue_phai_nop?: number
          da_khoa_so?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      month_locks: {
        Row: {
          id: string
          thang: number
          nam: number
          da_khoa: boolean
          khoa_boi: string | null
          ngay_khoa: string | null
        }
        Insert: {
          id?: string
          thang: number
          nam: number
          da_khoa?: boolean
          khoa_boi?: string | null
          ngay_khoa?: string | null
        }
        Update: {
          id?: string
          thang?: number
          nam?: number
          da_khoa?: boolean
          khoa_boi?: string | null
          ngay_khoa?: string | null
        }
      }
    }
    Enums: {
      user_role: 'admin' | 'manager' | 'accountant'
    }
  }
}
