export enum INVALID_PARAMETERS_CODE {
  NOT_RECENTLY_USED = 'NOT_RECENTLY_USED',
  NOT_USERNAME = 'NOT_USERNAME',
  NOT_EMAIL = 'NOT_EMAIL',
}

export interface ChangePasswordReq {
  username: string
  password: string
  newPassword: string
  otp: string
}
