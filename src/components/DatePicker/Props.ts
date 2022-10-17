import { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { Control, ControllerProps, FieldError, Path } from 'react-hook-form'
import { TextFieldProps } from '@mui/material'
import { FieldValues } from 'react-hook-form/dist/types/fields'

export interface BaseDatePickerProps extends MuiDatePickerProps<string, Dayjs> {
  dateFormat?: string
}

export declare type ParseableDate<TDate> =
  | string
  | number
  | Date
  | null
  | undefined
  | TDate

export type InputDatePickerProps<
  T extends FieldValues,
  TInputDate,
  TDate = TInputDate
> = Omit<
  MuiDatePickerProps<TInputDate, TDate>,
  'value' | 'onChange' | 'renderInput'
> & {
  dateFormat?: string
  name: Path<T>
  required?: boolean
  isDate?: boolean
  parseError?: (error: FieldError) => string
  onChange?: (value: TDate | string, keyboardInputValue?: string) => void
  validation?: ControllerProps['rules']
  parseDate?: (value: TDate, keyboardInputValue?: string) => TDate
  control?: Control<T>
  inputProps?: TextFieldProps
  helperText?: TextFieldProps['helperText']
}
