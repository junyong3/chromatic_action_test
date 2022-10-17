import { RadioProps as MuiRadioProps } from '@mui/material/Radio'
import { RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup'
import { Control, FieldError, FieldValues, Path } from 'react-hook-form'

export type BaseRadioProps = MuiRadioProps
export type RadioGroupProps = MuiRadioGroupProps

export type InputRadioProps<T extends FieldValues> = {
  options: { label: string; id: string | number }[] | any[]
  helperText?: string
  name: Path<T>
  required?: boolean
  parseError?: (error: FieldError) => string
  label?: string
  labelKey?: string
  valueKey?: string
  type?: 'number' | 'string'
  emptyOptionLabel?: 'string'
  onChange?: (value: any) => void
  returnObject?: boolean
  row?: boolean
  control?: Control<T>
  disabled?: boolean
}
