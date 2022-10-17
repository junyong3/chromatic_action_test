export interface LoginReq {
  username: string
  password: string
  otp: string
}

export type LoginRes = {
  username: string
  accessToken: string
  refreshToken: string
}
