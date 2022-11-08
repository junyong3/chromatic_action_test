import { createElement } from 'react'
import { MenuItem } from '@mui/material'
import { Controller } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import BaseTextField from '../TextField'
import { InputSelectProps } from '@components/Select/Props'

export default function InputSelect<TFieldValues extends FieldValues>({
  name,
  required,
  optionKey = {
    value: 'value',
    label: 'label',
  },
  options = [],
  parseError,
  type,
  objectOnChange,
  validation = {},
  control,
  placeholder,
  minWidth = 120,
  onChangeHandler,
  ...rest
}: InputSelectProps<TFieldValues>): JSX.Element {
  const isNativeSelect = !!rest.SelectProps?.native
  const ChildComponent = isNativeSelect ? 'option' : MenuItem

  if (required && !validation.required) {
    validation.required = true
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { invalid, error },
      }) => {
        // handle shrink on number input fields
        if (type === 'number' && typeof value !== 'undefined') {
          rest.InputLabelProps = rest.InputLabelProps || {}
          rest.InputLabelProps.shrink = true
        }
        if (typeof value === 'object') {
          value = value[optionKey.value] // if value is object get key
        }
        return (
          <BaseTextField
            {...rest}
            name={name}
            value={value ?? ''}
            onBlur={onBlur}
            onChange={(event) => {
              let item: string | number = event.target.value
              if (type === 'number') {
                item = Number(item)
              }
              onChange(item)
              onChangeHandler && onChangeHandler(item)
              if (typeof rest.onChange === 'function') {
                if (objectOnChange) {
                  item = options.find((i) => i[optionKey.value] ?? i === item)
                }
                rest.onChange(item)
              }
            }}
            select
            required={required}
            error={invalid}
            helperText={
              error
                ? typeof parseError === 'function'
                  ? parseError(error)
                  : error.message
                : rest.helperText
            }
            size={'small'}
            sx={{ width: minWidth }}
          >
            {isNativeSelect && <option />}
            {placeholder ? (
              <MenuItem disabled value="">
                <em>{placeholder}</em>
              </MenuItem>
            ) : null}
            {options.map((item: any) =>
              createElement(
                ChildComponent,
                {
                  key: `${name}_${item[optionKey.value] ?? item}`,
                  value: item[optionKey.value] ?? item,
                },
                item[optionKey.label] ?? item
              )
            )}
          </BaseTextField>
        )
      }}
    ></Controller>
  )
}
