import { Controller } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { InputDatePickerProps } from '@components/DatePicker/Props'
import BaseTextField from '@components/TextField'
import BaseDatePicker from '@components/DatePicker/BaseDatePicker'

export default function InputDatePicker<TFieldValues extends FieldValues>(
  props: InputDatePickerProps<TFieldValues, any, any>
): JSX.Element {
  const {
    parseError,
    name,
    required,
    parseDate,
    validation = {},
    inputProps,
    control,
    ...muiprops
  } = props
  const { onChange: muiOnChange, helperText, ...mui } = muiprops
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
      }) => {
        return (
          <BaseDatePicker
            {...mui}
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
              muiOnChange && muiOnChange(newValue, keyboardInputValue)
            }}
            renderInput={(params) => {
              return (
                <BaseTextField
                  {...params}
                  inputProps={{
                    ...params?.inputProps,
                    ...(!value && {
                      value: '',
                    }),
                    required: false,
                  }}
                  {...inputProps}
                  required={!!required}
                  error={invalid}
                  helperText={
                    error
                      ? typeof parseError === 'function'
                        ? parseError(error)
                        : error.message
                      : inputProps?.helperText || helperText
                  }
                  size={'small'}
                />
              )
            }}
          />
        )
      }}
    />
  )
}
