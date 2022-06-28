// SD stands for `Success Data`

export type IAMSuccessResponseDto<SD> = {
  success: true
  code: string
  message: string
  data: SD
}

// FD stands for `Failure Data`
export type IAMErrorResponseDto<FD> = {
  success: false
  code: string
  message: string
  data: FD
}

export type IAMResponseDto<SD, FD> =
  | IAMSuccessResponseDto<SD>
  | IAMErrorResponseDto<FD>
