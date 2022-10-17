// SD stands for `Success Data`

export type IAMSuccessRes<SD> = {
  success: true
  code: string
  message: string
  data: SD
}

// FD stands for `Failure Data`
export type IAMErrorRes<FD> = {
  success: false
  code: string
  message: string
  data: FD
}
