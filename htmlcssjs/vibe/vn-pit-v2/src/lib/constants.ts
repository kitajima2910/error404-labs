// Luật thuế TNCN Việt Nam
export const TAX_CONSTANTS = {
  // Giảm trừ gia cảnh (VNĐ/tháng)
  GIAM_TRU_BAN_THAN: 11000000,
  
  // Giảm trừ ngưởi phụ thuộc (VNĐ/ngưởi/tháng)
  GIAM_TRU_NGUOI_PHU_THUOC: 4400000,
  
  // Bậc thuế lũy tiến
  TAX_BRACKETS: [
    { limit: 5000000, rate: 0.05, deduction: 0 },
    { limit: 10000000, rate: 0.10, deduction: 250000 },
    { limit: 18000000, rate: 0.15, deduction: 750000 },
    { limit: 32000000, rate: 0.20, deduction: 1650000 },
    { limit: 52000000, rate: 0.25, deduction: 3250000 },
    { limit: 80000000, rate: 0.30, deduction: 5850000 },
    { limit: Infinity, rate: 0.35, deduction: 9850000 },
  ],
} as const

// Vai trò ngưởi dùng
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  ACCOUNTANT: 'accountant',
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

// Quyền hạn theo vai trò
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    'dashboard:view',
    'employees:view', 'employees:create', 'employees:edit', 'employees:delete', 'employees:import',
    'dependents:view', 'dependents:create', 'dependents:edit', 'dependents:delete',
    'tax:view', 'tax:calculate', 'tax:import', 'tax:edit', 'tax:delete',
    'reports:view', 'reports:export',
    'settings:view', 'settings:edit',
    'users:view', 'users:create', 'users:edit', 'users:delete',
    'month-lock:view', 'month-lock:toggle',
  ],
  [USER_ROLES.MANAGER]: [
    'dashboard:view',
    'employees:view',
    'dependents:view',
    'tax:view',
    'reports:view', 'reports:export',
    'month-lock:view', 'month-lock:toggle',
  ],
  [USER_ROLES.ACCOUNTANT]: [
    'dashboard:view',
    'employees:view', 'employees:create', 'employees:edit', 'employees:import',
    'dependents:view', 'dependents:create', 'dependents:edit',
    'tax:view', 'tax:calculate', 'tax:import', 'tax:edit',
    'reports:view',
  ],
} as const

// Format tiền tệ VND
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format ngày tháng
export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date))
}

// Format tháng/năm
export const formatMonthYear = (month: number, year: number): string => {
  return `Tháng ${month}/${year}`
}
