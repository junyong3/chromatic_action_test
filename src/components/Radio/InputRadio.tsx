import { ChangeEvent } from 'react'
import { useController } from 'react-hook-form'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from '@mui/material'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { InputRadioProps } from '@components/Radio/Props'
import BaseRadio from '@components/Radio/Radio'

export default function InputRadio<TFieldValues extends FieldValues>(
  props: InputRadioProps<TFieldValues>
): JSX.Element {
  const {
    options,
    label,
    name,
    parseError,
    labelKey = 'label',
    valueKey = 'id',
    type = 'string',
    required,
    emptyOptionLabel,
    returnObject,
    row,
    control,
    disabled,
    ...muiProps
  } = props
  const { onChange: muiOnChange } = muiProps
  let helperText = muiProps.helperText
  const theme = useTheme()
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: required ? { required: 'This field is required' } : undefined,
    control,
  })

  helperText = error
    ? typeof parseError === 'function'
      ? parseError(error)
      : error.message
    : helperText

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radioValue = (event.target as HTMLInputElement).value
    const value = type === 'number' ? +radioValue : radioValue

    const returnValue = returnObject
      ? options.find((items) => items[valueKey] === value)
      : value
    // setValue(name, returnValue, { shouldValidate: true })
    onChange(returnValue)
    muiOnChange && muiOnChange(returnValue)
  }

  return (
    <FormControl error={invalid}>
      {label && (
        <FormLabel required={required} error={invalid}>
          {label}
        </FormLabel>
      )}
      <RadioGroup
        onChange={onRadioChange}
        onBlur={onBlur}
        name={name}
        row={row}
        value={value || ''}
      >
        {emptyOptionLabel && (
          <FormControlLabel
            control={
              <Radio
                sx={{
                  color: invalid ? theme.palette.error.main : undefined,
                }}
                checked={!value}
              />
            }
            label={emptyOptionLabel}
            value=""
          />
        )}
        {options.map((option: any) => {
          const optionKey = option[valueKey] ?? option
          if (typeof optionKey !== 'boolean' && !optionKey) {
            console.error(
              `CheckboxButtonGroup: valueKey ${valueKey} does not exist on option`,
              option
            )
          }

          const isChecked =
            value &&
            (returnObject ? value[valueKey] === optionKey : value === optionKey)

          return (
            <FormControlLabel
              control={
                <BaseRadio
                  sx={{
                    color: invalid ? theme.palette.error.main : undefined,
                  }}
                  checked={isChecked}
                />
              }
              value={optionKey}
              label={option[labelKey] ?? option}
              key={optionKey}
              disabled={disabled}
            />
          )
        })}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
