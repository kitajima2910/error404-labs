-- ============================================
-- SCHEMA CƠ SỞ DỮ LIỆU QUẢN LÝ THUẾ TNCN
-- ============================================

-- Bảng profiles: Thông tin bổ sung cho user
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'manager', 'accountant')) DEFAULT 'accountant',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng employees: Danh sách nhân viên
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ma_nv TEXT UNIQUE NOT NULL,
  ho_ten TEXT NOT NULL,
  don_vi TEXT,
  ma_so_thue TEXT,
  so_cccd TEXT,
  da_nghi_viec BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng dependents: Ngưởi phụ thuộc
CREATE TABLE IF NOT EXISTS dependents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  ho_ten TEXT NOT NULL,
  moi_quan_he TEXT,
  ngay_sinh DATE,
  ma_so_thue TEXT,
  so_cccd TEXT,
  tu_thang INTEGER CHECK (tu_thang BETWEEN 1 AND 12),
  tu_nam INTEGER,
  den_thang INTEGER CHECK (den_thang BETWEEN 1 AND 12),
  den_nam INTEGER,
  khong_con_su_dung BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng tax_records: Bản ghi thuế hàng tháng
CREATE TABLE IF NOT EXISTS tax_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  thang INTEGER NOT NULL CHECK (thang BETWEEN 1 AND 12),
  nam INTEGER NOT NULL,
  tong_thu_nhap DECIMAL(15,2) NOT NULL DEFAULT 0,
  khong_chiu_thue DECIMAL(15,2) DEFAULT 0,
  bao_hiem DECIMAL(15,2) DEFAULT 0,
  giam_tru_ban_than DECIMAL(15,2) DEFAULT 11000000,
  giam_tru_phu_thuoc DECIMAL(15,2) DEFAULT 0,
  so_nguoi_phu_thuoc INTEGER DEFAULT 0,
  thu_nhap_tinh_thue DECIMAL(15,2) DEFAULT 0,
  thue_phai_nop DECIMAL(15,2) DEFAULT 0,
  da_khoa_so BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_id, thang, nam)
);

-- Bảng month_locks: Quản lý khóa sổ tháng
CREATE TABLE IF NOT EXISTS month_locks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thang INTEGER NOT NULL CHECK (thang BETWEEN 1 AND 12),
  nam INTEGER NOT NULL,
  da_khoa BOOLEAN DEFAULT FALSE,
  khoa_boi UUID REFERENCES profiles(id),
  ngay_khoa TIMESTAMP WITH TIME ZONE,
  UNIQUE(thang, nam)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_employees_ma_nv ON employees(ma_nv);
CREATE INDEX IF NOT EXISTS idx_employees_ho_ten ON employees(ho_ten);
CREATE INDEX IF NOT EXISTS idx_dependents_employee_id ON dependents(employee_id);
CREATE INDEX IF NOT EXISTS idx_tax_records_employee_id ON tax_records(employee_id);
CREATE INDEX IF NOT EXISTS idx_tax_records_thang_nam ON tax_records(thang, nam);

-- Function: Tự động cập nhật updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
DROP TRIGGER IF EXISTS update_employees_updated_at ON employees;
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tax_records_updated_at ON tax_records;
CREATE TRIGGER update_tax_records_updated_at
  BEFORE UPDATE ON tax_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
