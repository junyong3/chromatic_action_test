import { SelectProps as MuiSelectProps } from '@mui/material/Select'
import {
  Control,
  ControllerProps,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { FormControlProps, TextFieldProps } from '@mui/material'

export interface BaseSelectProps<T> extends MuiSelectProps<T> {
  optionList: { id: string | number; label: string }[] | any[]
  optionKey?: {
    value: string
    label: string
  }
  placeholder?: string
  helperText?: string
  width?: number
}

export type InputSelectProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'name' | 'type' | 'onChange'
> & {
  validation?: ControllerProps['rules']
  name: Path<T>
  options?: any[]
  optionKey?: { value: string; label: string }
  type?: 'string' | 'number'
  parseError?: (error: FieldError) => string
  objectOnChange?: boolean
  onChange?: (value: any) => void
  control?: Control<T>
  minWidth?: number
  onChangeHandler?: (value: any) => void
}

export type InputSelectProps_back<T extends FieldValues> = Omit<
  MuiSelectProps,
  'value'
> & {
  options: { id: string | number; label: string }[] | any[]
  label?: string
  optionKey?: {
    value: string
    label: string
  }
  placeholder?: string
  minWidth?: number
  itemValue?: string
  required?: boolean
  validation?: any
  name: Path<T>
  parseError?: (error: FieldError) => string
  helperText?: string
  showChips?: boolean
  onChangeHandler?: (value: any) => void
  control?: Control<T>
  formControlProps?: Omit<FormControlProps, 'fullWidth' | 'variant'>
}

export type InputMultiSelectProps<T extends FieldValues> = Omit<
  MuiSelectProps,
  'value'
> & {
  options: { id: string | number; label: string }[] | any[]
  optionKey?: {
    value: string
    label: string
  }
  label?: string
  required?: boolean
  validation?: any
  name: Path<T>
  parseError?: (error: FieldError) => string
  minWidth?: number
  menuMaxHeight?: number
  menuMaxWidth?: number
  helperText?: string
  showChips?: boolean
  control?: Control<T>
  showCheckbox?: boolean
  formControlProps?: Omit<FormControlProps, 'fullWidth' | 'variant'>
}
