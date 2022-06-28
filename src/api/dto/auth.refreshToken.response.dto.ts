import { IAMResponseDto } from './iam.response.dto'

export interface AuthRefreshTokenSuccessData {
  id: string
  username: string
  access_token: string
  refresh_token: string
  expires_in: number
  refresh_expires_in: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthRefreshTokenFailureData {}

export type AuthRefreshTokenResponseDto = IAMResponseDto<
  AuthRefreshTokenSuccessData,
  AuthRefreshTokenFailureData
>
