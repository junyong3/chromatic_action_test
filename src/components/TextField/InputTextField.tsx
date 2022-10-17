import { Controller } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { TextFieldElementProps } from './Props'
import BaseTextField from './BaseTextField'

export default function InputTextField<TFieldValues extends FieldValues>({
  validation = {},
  parseError,
  type,
  required,
  name,
  control,
  isComma = false,
  isNumber = false,
  ...muiProps
}: TextFieldElementProps<TFieldValues>): JSX.Element {
  const { onChange: muiOnChange, helperText, inputProps } = muiProps
  if (required && !validation.required) {
    validation.required = true
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => {
        const reFormat = NumberFieldType({
          value,
          isComma,
          isNumber,
        })
        return (
          <BaseTextField
            {...muiProps}
            name={name}
            value={reFormat ?? ''}
            onChange={(ev) => {
              onChange(ev)
              muiOnChange && muiOnChange(ev)
            }}
            onBlur={onBlur}
            required={required}
            inputProps={{
              required: false,
              ...inputProps,
            }}
            type={type}
            error={invalid}
            helperText={
              error
                ? typeof parseError === 'function'
                  ? parseError(error)
                  : error.message
                : helperText
            }
          />
        )
      }}
    />
  )
}

const NumberFieldType = ({
  value,
  isNumber,
  isComma,
}: {
  value: string
  isNumber: boolean
  isComma: boolean
}) => {
  let onlyNumberVal = ''
  let result

  if (isNumber) {
    onlyNumberVal = String(value)
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1')
    if (isComma) {
      result = Number(onlyNumberVal.replace(/,/g, '')).toLocaleString('ko-KR')
    } else {
      result = onlyNumberVal
    }
    if (onlyNumberVal === '') result = ''
  } else {
    result = value
  }

  return result
}
