import { Controller } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import BaseSelect from '@components/Select/BaseSelect'
import { InputSelectProps_back } from '@components/Select/Props'

export default function InputSelect<TFieldValues extends FieldValues>(
  props: InputSelectProps_back<TFieldValues>
): JSX.Element {
  const {
    options,
    label = '',
    optionKey = {
      value: 'value',
      label: 'label',
    },
    displayEmpty = false,
    required = false,
    validation = {},
    parseError,
    name,
    minWidth = 120,
    control,
    onChangeHandler,
    ...rest
  } = props
  let helperText = rest.helperText
  if (required && !validation.required) {
    validation.required = true
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
      }) => {
        helperText = error
          ? typeof parseError === 'function'
            ? parseError(error)
            : error.message
          : helperText
        return (
          <BaseSelect
            {...rest}
            displayEmpty={displayEmpty}
            id={rest.id}
            width={minWidth}
            helperText={helperText}
            optionList={options}
            optionKey={optionKey}
            label={label || undefined}
            error={invalid}
            value={value}
            required={required}
            onChange={(d) => {
              onChange(d)
              onChangeHandler && onChangeHandler(d)
            }}
            onBlur={onBlur}
            sx={{ ...rest.sx, backgroundColor: 'white' }}
          />
        )
      }}
    />
  )
}
