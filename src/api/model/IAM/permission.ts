import { Dayjs } from 'dayjs'
import { RoleDto } from './role'

export interface PermissionDto {
  id: number
  name: string
  description: string
  createdA: string
  updatedAt: string
}

export interface PermissionRow extends PermissionDto {
  assignedAt: Date | Dayjs
  func?: any
}

export interface CreatePermissionReq {
  name: string
  description: string
}

export interface PermissionsOnRoles {
  id: number
  permissionId: number
  roleId: number
  assignedAt: string
  role: RoleDto
}

export interface PermissionDetailRes {
  id: number
  name: string
  description: string
  actorUsername: string
  createdAt: string
  loggedAt: string
  updatedAt: string
  permissionsOnRoles: PermissionsOnRoles[]
}
