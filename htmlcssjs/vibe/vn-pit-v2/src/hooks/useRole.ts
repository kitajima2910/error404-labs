import { useAuth } from './useAuth'

export function useRole() {
  const { profile, isAdmin, isManager, isAccountant } = useAuth()

  const hasPermission = (permission: string): boolean => {
    if (isAdmin) return true
    if (isManager) {
      const managerPermissions = [
        'dashboard:view',
        'employees:view',
        'dependents:view',
        'tax:view',
        'reports:view',
        'reports:export',
        'month-lock:view',
        'month-lock:toggle',
      ]
      return managerPermissions.includes(permission)
    }
    if (isAccountant) {
      const accountantPermissions = [
        'dashboard:view',
        'employees:view',
        'employees:create',
        'employees:edit',
        'employees:import',
        'dependents:view',
        'dependents:create',
        'dependents:edit',
        'tax:view',
        'tax:calculate',
        'tax:import',
        'tax:edit',
        'reports:view',
      ]
      return accountantPermissions.includes(permission)
    }
    return false
  }

  return {
    role: profile?.role,
    isAdmin,
    isManager,
    isAccountant,
    hasPermission,
  }
}
