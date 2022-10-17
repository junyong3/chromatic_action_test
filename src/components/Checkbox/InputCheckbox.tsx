import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  useTheme,
} from '@mui/material'
import { useController } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { InputCheckBoxProps } from '@components/Checkbox/Props'
import BaseCheckbox from '@components/Checkbox/BaseCheckbox'

export default function InputCheckbox<TFieldValues extends FieldValues>(
  props: InputCheckBoxProps<TFieldValues>
): JSX.Element {
  const {
    options,
    label,
    name,
    parseError,
    required,
    labelKey = 'label',
    valueKey = 'id',
    returnObject,
    disabled,
    row,
    control,
    checkboxColor,
    ...muiProps
  } = props
  const { onChange: muiOnChange } = muiProps
  let helperText = muiProps.helperText
  const theme = useTheme()
  const {
    field: { value = [], onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: required ? { required: true } : undefined,
    control,
  })

  helperText = error
    ? typeof parseError === 'function'
      ? parseError(error)
      : error.message
    : helperText

  const handleChange = (index: number | string) => {
    const newArray: (string | number)[] | any[] = [...value]

    const exists =
      value.findIndex((i: any) =>
        returnObject ? i[valueKey] === index : i === index
      ) === -1
    const isCheck = returnObject
      ? options.find((i) => i[valueKey] === index)
      : index
    const checkLabel = returnObject
      ? options.find((i) => i[valueKey] === index)[valueKey]
      : index
    const allFindIndex = value.findIndex((i: any) =>
      returnObject ? i[valueKey] === 'all' : i === 'all'
    )
    const allcheckLabel = returnObject
      ? options.find((i) => i[valueKey] === 'all')[valueKey]
      : 'all'
    if (exists) {
      // 전체 체크 선택시
      if (checkLabel === 'all') {
        newArray.splice(0, newArray.length)
        if (returnObject) {
          newArray.push(...options)
        } else {
          newArray.push(
            ...options.map((d) => {
              return d[valueKey]
            })
          )
        }
      } else {
        if (options.length - 2 === value.length) {
          newArray.push(allcheckLabel)
        }
        newArray.push(isCheck)
      }
    } else {
      // 전체선택 체크 해제
      if (checkLabel === 'all') {
        if (returnObject) {
          newArray.splice(0, newArray.length)
        } else {
          newArray.splice(0, newArray.length)
        }
      } else {
        // 전체체크 해지
        if (allFindIndex !== -1) {
          newArray.splice(allFindIndex, 1)
        }

        newArray.splice(
          newArray.findIndex((i: any) =>
            returnObject ? i[valueKey] === index : i === index
          ),
          1
        )
      }
    }
    // setValue(name, newArray, { shouldValidate: true })
    onChange(newArray)
    muiOnChange && muiOnChange(newArray)
  }

  return (
    <FormControl error={invalid} required={required}>
      {label && <FormLabel error={invalid}>{label}</FormLabel>}
      <FormGroup row={row}>
        {options.map((option: any) => {
          const optionKey = option[valueKey]
          if (!optionKey) {
            console.error(
              `CheckboxButtonGroup: valueKey ${valueKey} does not exist on option`,
              option
            )
          }
          const isChecked =
            value.findIndex((item: any) =>
              returnObject ? item[valueKey] === optionKey : item === optionKey
            ) !== -1
          return (
            <FormControlLabel
              control={
                <BaseCheckbox
                  {...muiProps}
                  sx={{
                    color: invalid ? theme.palette.error.main : undefined,
                  }}
                  color={checkboxColor || 'primary'}
                  value={optionKey}
                  checked={isChecked}
                  disabled={disabled}
                  onChange={() => handleChange(optionKey)}
                  onBlur={onBlur}
                />
              }
              label={option[labelKey]}
              key={optionKey}
            />
          )
        })}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
