import { IAMResponseDto } from './iam.response.dto'

export type AuthSignInSuccessData = {
  id: string
  username: string
  email: string
  user_type: 'admin' | 'internal'
  access_token: string
  refresh_token: string
  expires_in: number
  refresh_expires_in: number
}

export type AuthSignInFailureData = {
  num_failures: number
  locked: boolean
}

export type AuthSignInResponseDto = IAMResponseDto<
  AuthSignInSuccessData,
  AuthSignInFailureData
>
