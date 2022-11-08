export type checkboxComp = {
  label: string
  key: string
  checked: boolean
}
export type PaymentCheckFilterProps = {
  checkboxCompList: checkboxComp[]
  type: 'payStatus' | 'paymentMethod'
  title: string
}

export type isValidateTS = {
  error: boolean
  msg: string
} | null
