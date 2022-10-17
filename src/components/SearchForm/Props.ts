import React from 'react'

export interface SearchFormProp {
  text?: string
  onSearch?: () => void
  disabled?: boolean
  disabledText?: string
}
export interface CancelFormProp {
  onCancel?: React.MouseEventHandler<HTMLButtonElement>
  onPaymentCancel?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  confirmLabel: string
  cancelLabel?: string
  isTab?: boolean
}
