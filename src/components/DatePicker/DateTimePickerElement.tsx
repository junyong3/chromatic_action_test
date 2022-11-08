import {
  DateTimePicker,
  DateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker'
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  Path,
} from 'react-hook-form'
import { TextFieldProps } from '@mui/material'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import BaseTextField from '../TextField/BaseTextField'
import 'dayjs/locale/ko'

export declare type ParseableDate<TDate> =
  | string
  | number
  | Date
  | null
  | undefined
  | TDate

export type DateTimePickerElementProps<
  T extends FieldValues,
  TInputDate,
  TDate = TInputDate
> = Omit<
  DateTimePickerProps<TInputDate, TDate>,
  'value' | 'onChange' | 'renderInput'
> & {
  name: Path<T>
  required?: boolean
  parseError?: (error: FieldError) => string
  onChange?: (value: TDate, keyboardInputValue?: string) => void
  validation?: ControllerProps['rules']
  parseDate?: (value: TDate, keyboardInputValue?: string) => TDate
  control?: Control<T>
  inputProps?: TextFieldProps
  helperText?: TextFieldProps['helperText']
}

export default function DateTimePickerElement<
  TFieldValues extends FieldValues
>({
  parseError,
  name,
  required,
  parseDate,
  validation = {},
  inputProps,
  control,
  ...rest
}: DateTimePickerElementProps<TFieldValues, any, any>): JSX.Element {
  if (required && !validation.required) {
    validation.required = 'This field is required'
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error, invalid },
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ko'}>
          <DateTimePicker
            {...rest}
            value={value || ''}
            onChange={(value, keyboardInputValue) => {
              let newValue = undefined
              if (keyboardInputValue) {
                if (typeof parseDate === 'function') {
                  newValue = parseDate(value, keyboardInputValue)
                } else {
                  newValue = keyboardInputValue
                }
              } else {
                if (typeof parseDate === 'function') {
                  newValue = parseDate(value)
                } else {
                  newValue = value
                }
              }
              onChange(newValue, keyboardInputValue)
              if (typeof rest.onChange === 'function') {
                rest.onChange(newValue, keyboardInputValue)
              }
            }}
            renderInput={(params) => (
              <BaseTextField
                {...params}
                inputProps={{
                  ...params?.inputProps,
                  ...(!value && {
                    value: '',
                  }),
                }}
                {...inputProps}
                required={!!required}
                error={invalid}
                type={'datetime-local'}
                helperText={
                  error
                    ? typeof parseError === 'function'
                      ? parseError(error)
                      : error.message
                    : inputProps?.helperText || rest.helperText
                }
                size={'small'}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  )
}
