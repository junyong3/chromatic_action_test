import NetworkService from '@api/NetworkService'
import { useMutation } from 'react-query'
import { AuthChangePasswordRequestDto } from '@api/dto/auth.changePassword.request.dto'
import { AuthChangePasswordResponseDto } from '@api/dto/auth.changePassword.response.dto'

export function useMutationChangePassword() {
  return useMutation<
    AuthChangePasswordResponseDto,
    AuthChangePasswordResponseDto,
    AuthChangePasswordRequestDto
  >(({ username, password, new_password, confirmation, otpcode }) =>
    NetworkService.auth.changePassword({
      username,
      password,
      new_password,
      confirmation,
      otpcode,
    })
  )
}
