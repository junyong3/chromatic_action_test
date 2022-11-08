import { user, userChildren } from './userRoute'
import { role, roleChildren } from './roleRoute'
import { permission, permissionChildren } from './permissionRoute'

export const IAMRoot = [user, role, permission]
export const IAMChildren = [
  ...userChildren,
  ...roleChildren,
  ...permissionChildren,
]
