export interface SearchBoxProp {
  text?: string
  disabled?: boolean
  disabledText?: string
  methods: any
  onSubmit: () => void
}

export interface SearchFormItemProp {
  label: string | JSX.Element
  required?: boolean
  labelWidth?: number
}
