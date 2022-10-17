import { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox'
import { Control, FieldError, FieldValues, Path } from 'react-hook-form'

export type BaseCheckboxProps = MuiCheckboxProps

export type InputCheckBoxProps<T extends FieldValues> = {
  options: { id: string | number; label: string }[] | any[]
  helperText?: string
  name: Path<T>
  required?: boolean
  parseError?: (error: FieldError) => string
  label?: string
  labelKey?: string
  valueKey?: string
  onChange?: (newArray: (string | number)[] | any[]) => void
  returnObject?: boolean
  disabled?: boolean
  row?: boolean
  control?: Control<T>
  checkboxColor?: MuiCheckboxProps['color']
}
