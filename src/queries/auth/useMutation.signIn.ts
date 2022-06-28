import { AuthSignInRequestDto } from '@api/dto/auth.signIn.request.dto'
import { AuthSignInResponseDto } from '@api/dto/auth.signIn.response.dto'
import NetworkService from '@api/NetworkService'
import { useMutation } from 'react-query'

export function useMutationSignIn() {
  return useMutation<
    AuthSignInResponseDto,
    AuthSignInResponseDto,
    AuthSignInRequestDto
  >(async ({ username, password, otpcode }) => {
    const response = await NetworkService.auth.signIn({
      username,
      password,
      otpcode,
    })
    const { success, data } = response

    if (success) {
      NetworkService.setAccessToken(data.access_token)
      NetworkService.setRefreshToken(data.refresh_token)
    }

    return response
  })
}
