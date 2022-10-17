import { UserDto, UserRow } from './user'
import { PermissionDto, PermissionRow } from './permission'

export interface RoleDto {
  id: number
  name: string
  memo: string
  createdAt: string
  updatedAt: string
  _count?: {
    usersOnRoles: number
    permissionsOnRoles: number
  }
}

export interface CreateRoleReq {
  name: string
  memo: string
  userIds: string[]
  permissionIds: number[]
}

export interface RoleDetailRes {
  id: number
  name: string
  memo: string
  allPermissions: PermissionDto[]
  allUsers: UserDto[]
  existingPermissionsOnRole: PermissionRow[]
  existingUsersOnRole: UserRow[]
  createdAt: string
}

export interface PrepareRoleRes {
  permissions: PermissionRow[]
  users: UserRow[]
}
