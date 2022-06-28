export interface AuthChangePasswordRequestDto {
  username: string
  password: string
  new_password: string
  confirmation: string
  otpcode: string
}
