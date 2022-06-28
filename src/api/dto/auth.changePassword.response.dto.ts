import { IAMResponseDto } from './iam.response.dto'

export type AuthChangePasswordSuccessData = Record<string, unknown>

export enum INVALID_PARAMETERS_CODE {
  NOT_RECENTLY_USED = 'NOT_RECENTLY_USED',
  NOT_USERNAME = 'NOT_USERNAME',
  NOT_EMAIL = 'NOT_EMAIL',
  PASSWORD_MINIMUM_LENGTH = 'PASSWORD_MINIMUM_LENGTH',
  PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
  AT_LEAST_ONE_LOWER_CASE = 'AT_LEAST_ONE_LOWER_CASE',
  AT_LEAST_ONE_NUMERIC = 'AT_LEAST_ONE_NUMERIC',
  AT_LEAST_ONE_SPECIAL_CHARACTER = 'AT_LEAST_ONE_SPECIAL_CHARACTER',
}

export type FailureData = {
  num_failures: number
  locked: boolean
}

export type AuthChangePasswordFailureData =
  | FailureData
  | INVALID_PARAMETERS_CODE

export type AuthChangePasswordResponseDto = IAMResponseDto<
  AuthChangePasswordSuccessData,
  AuthChangePasswordFailureData
>
