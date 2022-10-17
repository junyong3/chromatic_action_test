export interface RefreshTokenReq {
  refreshToken: string
}

export type RefreshTokenRes = {
  id: string
  username: string
  accessToken: string
  refreshToken: string
}
