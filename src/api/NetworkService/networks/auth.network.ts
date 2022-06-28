import { AuthSignInRequestDto } from '@api/dto/auth.signIn.request.dto'
import { AuthSignInResponseDto } from '@api/dto/auth.signIn.response.dto'
import { AxiosInstance, AxiosResponse } from 'axios'
import { AuthChangePasswordRequestDto } from '@api/dto/auth.changePassword.request.dto'
import { AuthChangePasswordResponseDto } from '@api/dto/auth.changePassword.response.dto'

class AuthNetwork {
  private readonly legacyAPI: AxiosInstance

  constructor(legacyAPI: AxiosInstance) {
    this.legacyAPI = legacyAPI
  }

  async signIn(authSignInRequestDto: AuthSignInRequestDto) {
    const url = '/api/v1/auth/sign-in'
    const { data: response } = await this.legacyAPI.post<
      AuthSignInResponseDto,
      AxiosResponse<AuthSignInResponseDto>,
      AuthSignInRequestDto
    >(url, authSignInRequestDto)

    return response
  }

  async changePassword(authChangePassword: AuthChangePasswordRequestDto) {
    const url = '/api/v1/users/reset-password'
    const { data: response } = await this.legacyAPI.put<
      AuthChangePasswordResponseDto,
      AxiosResponse<AuthChangePasswordResponseDto>,
      AuthChangePasswordRequestDto
    >(url, authChangePassword)

    return response
  }
}

export default AuthNetwork
