import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TAX_CONSTANTS as CONSTANTS } from './constants'

export { CONSTANTS as TAX_CONSTANTS }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Tính thuế TNCN
export function calculateTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0
  
  const { TAX_BRACKETS } = CONSTANTS
  
  for (const bracket of TAX_BRACKETS) {
    if (taxableIncome <= bracket.limit) {
      return taxableIncome * bracket.rate - bracket.deduction
    }
  }
  
  // Trường hợp vượt quá bậc cao nhất
  const highestBracket = TAX_BRACKETS[TAX_BRACKETS.length - 1]
  return taxableIncome * highestBracket.rate - highestBracket.deduction
}

// Tính thu nhập chịu thuế
export function calculateTaxableIncome(
  totalIncome: number,
  nonTaxableIncome: number,
  insurance: number,
  personalDeduction: number,
  dependentDeduction: number
): number {
  const taxableIncome = totalIncome - nonTaxableIncome - insurance - personalDeduction - dependentDeduction
  return Math.max(0, taxableIncome)
}

// Kiểm tra ngưởi phụ thuộc có hiệu lực trong tháng
export function isDependentActive(
  dependent: {
    tu_thang: number | null
    tu_nam: number | null
    den_thang: number | null
    den_nam: number | null
    khong_con_su_dung: boolean
  },
  month: number,
  year: number
): boolean {
  if (dependent.khong_con_su_dung) return false
  
  // Nếu không có thông tin thời gian, mặc định active
  if (!dependent.tu_thang || !dependent.tu_nam) return true
  
  const startMonth = dependent.tu_nam * 12 + dependent.tu_thang
  const currentMonth = year * 12 + month
  
  // Kiểm tra đã bắt đầu chưa
  if (currentMonth < startMonth) return false
  
  // Kiểm tra đã kết thúc chưa
  if (dependent.den_thang && dependent.den_nam) {
    const endMonth = dependent.den_nam * 12 + dependent.den_thang
    if (currentMonth > endMonth) return false
  }
  
  return true
}

// Đếm số ngưởi phụ thuộc active
export function countActiveDependents(
  dependents: Array<{
    tu_thang: number | null
    tu_nam: number | null
    den_thang: number | null
    den_nam: number | null
    khong_con_su_dung: boolean
  }>,
  month: number,
  year: number
): number {
  return dependents.filter(dep => isDependentActive(dep, month, year)).length
}

// Parse Excel date
export function parseExcelDate(excelDate: number | string): Date | null {
  if (typeof excelDate === 'string') {
    const parsed = new Date(excelDate)
    return isNaN(parsed.getTime()) ? null : parsed
  }
  
  // Excel date là số ngày tính từ 1/1/1900
  const excelEpoch = new Date(1900, 0, 1)
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  return new Date(excelEpoch.getTime() + (excelDate - 1) * millisecondsPerDay)
}

// Validate file Excel
export function validateExcelFile(file: File): boolean {
  const validTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
  ]
  return validTypes.includes(file.type) || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
}
