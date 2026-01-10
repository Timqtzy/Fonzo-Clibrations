export type UserRole = 'admin' | 'staff' | 'mechanic' | 'viewer';

// Role-based access configuration
export const roleAccess: Record<string, UserRole[]> = {
  '/dashboard': ['admin', 'staff', 'mechanic', 'viewer'],
  '/job-orders': ['admin', 'staff'],
  '/work-assign': ['admin', 'staff', 'mechanic'],
  '/inventory-supplies': ['admin', 'staff'],
  '/suppliers': ['admin', 'staff'],
  '/mechanics': ['admin', 'staff'],
  '/appointment-scheduling': ['admin', 'staff'],
  '/customers': ['admin', 'staff'],
  '/user-management': ['admin'],
  '/activity-logs': ['admin'],
  '/settings': ['admin', 'staff', 'mechanic', 'viewer'],
};
