// SD stands for `Success Data`

export type CommerceSuccessRes<SD> = {
  code: string
  message: string
  data: SD
}

// FD stands for `Failure Data`
export type CommerceErrorRes<FD> = {
  code: string
  message: string
  data: FD
}
