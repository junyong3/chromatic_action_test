import { Dayjs } from 'dayjs'
import { RoleDto } from './role'

export interface UserDto {
  id: string
  username: string
  _count?: {
    roles: number
  }
}

export interface UserRow extends UserDto {
  assignedAt: Date | Dayjs
  func?: any
}

export interface UsersOnRoles {
  id: number
  role: RoleDto
  roleId: number
  userId: string
  assignedAt: string
}

export interface UsersDetailRes {
  id: string
  username: string
  usersOnRoles: UsersOnRoles[]
}
