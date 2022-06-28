import NetworkService from '@api/NetworkService'
import { useMutation } from 'react-query'
import { Dayjs } from 'dayjs'
import {
  IAMErrorResponseDto,
  IAMSuccessResponseDto,
} from '@api/dto/iam.response.dto'
import { PermissionRow } from '@queries/iam/useMutation.permissions'

interface _Count {
  usersOnRoles: number
  permissionsOnRoles: number
}

export interface User {
  id: string
  username: string
}

export interface UserRow extends User {
  assignedAt: Date | Dayjs
  func?: any
}

export interface Role {
  id: number
  name: string
  createdAt: Date | Dayjs
  updatedAt: Date | Dayjs
  _count?: _Count
  existingUsersOnRole?: UserRow[]
  existingPermissionsOnRole?: PermissionRow[]
  allUsers?: UserRow[]
  allPermissions?: UserRow[]
}

interface Params {
  name: string
  memo: string
  userIds: string[]
  permissionIds: number[]
}

export function useMutationCreateRole() {
  return useMutation<
    IAMSuccessResponseDto<Role>,
    IAMErrorResponseDto<Record<string, unknown>>,
    Params
  >((params) => NetworkService.iam.createRole(params))
}

export function useMutationUpdateRole(id: number) {
  return useMutation<
    IAMSuccessResponseDto<Role>,
    IAMErrorResponseDto<Record<string, unknown>>,
    Params
  >((params) => NetworkService.iam.updateRole(id, params))
}

export function useMutationDeleteRole() {
  return useMutation<
    IAMSuccessResponseDto<Record<string, unknown>>,
    IAMErrorResponseDto<Record<string, unknown>>,
    { id: number }
  >(({ id }) => NetworkService.iam.deleteRole(id))
}
