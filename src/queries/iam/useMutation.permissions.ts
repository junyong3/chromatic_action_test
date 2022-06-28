import NetworkService from '@api/NetworkService'
import { useMutation } from 'react-query'
import {
  IAMErrorResponseDto,
  IAMSuccessResponseDto,
} from '@api/dto/iam.response.dto'
import { Dayjs } from 'dayjs'

export interface Permission {
  id: number
  name: string
  description: string
}

export interface PermissionRow extends Permission {
  assignedAt: Date | Dayjs
  func?: any
}

interface Params {
  name: string
  description: string
}

export function useMutationCreatePermission() {
  return useMutation<
    IAMSuccessResponseDto<Permission>,
    IAMErrorResponseDto<Record<string, unknown>>,
    Params
  >((params) => NetworkService.iam.createPermission(params))
}

export function useMutationUpdatePermission(id: number) {
  return useMutation<
    IAMSuccessResponseDto<Permission>,
    IAMErrorResponseDto<Record<string, unknown>>,
    Params
  >((params) => NetworkService.iam.updatePermission(id, params))
}

export function useMutationDeletePermission() {
  return useMutation<
    IAMSuccessResponseDto<Record<string, unknown>>,
    IAMErrorResponseDto<Record<string, unknown>>,
    { id: number }
  >(({ id }) => NetworkService.iam.deletePermission(id))
}
