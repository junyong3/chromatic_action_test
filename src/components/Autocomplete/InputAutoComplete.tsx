import {
  AutoDefault,
  InputAutoCompleteProps,
} from '@components/Autocomplete/Props'
import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  TextField,
} from '@mui/material'
import { ControllerProps, Controller } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'

function InputAutoComplete<T extends FieldValues>(
  props: Omit<
    InputAutoCompleteProps<
      T,
      AutoDefault | string | any,
      boolean | undefined,
      boolean | undefined
    >,
    'renderInput'
  >
) {
  const {
    optionKey = {
      value: 'value',
      label: 'label',
    },
    textFieldProps,
    autocompleteProps,
    name,
    control,
    options,
    loading,
    showCheckbox,
    rules,
    required,
    multiple,
    matchId,
    label,
    size = 'small',
    ...muiProps
  } = props

  const validationRules: ControllerProps['rules'] = {
    ...rules,
    ...(required && {
      required: rules?.required || true,
    }),
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({
        field: { onChange, onBlur, value, ...fieldRest },
        fieldState: { error },
      }) => {
        let currentValue = multiple ? value || [] : value || null
        if (matchId) {
          currentValue = multiple
            ? (value || []).map((i: any) =>
                options.find((j) => (j[optionKey.value] || j) === i)
              )
            : options.find((i) => (i[optionKey.value] || i) === value) || null
        }
        return (
          <Autocomplete
            {...muiProps}
            {...autocompleteProps}
            value={currentValue}
            loading={loading}
            multiple={multiple}
            options={options}
            disableCloseOnSelect={
              typeof autocompleteProps?.disableCloseOnSelect === 'boolean'
                ? autocompleteProps.disableCloseOnSelect
                : !!multiple
            }
            isOptionEqualToValue={
              autocompleteProps?.isOptionEqualToValue
                ? autocompleteProps.isOptionEqualToValue
                : (option, value) => {
                    return value
                      ? option[optionKey.value] ===
                          (value[optionKey.value] || value)
                      : false
                  }
            }
            getOptionLabel={
              autocompleteProps?.getOptionLabel
                ? autocompleteProps.getOptionLabel
                : (option) => {
                    return `${option[optionKey.label] || option}`
                  }
            }
            onChange={(event, value, reason, details) => {
              let changedVal = value
              if (matchId) {
                changedVal = Array.isArray(value)
                  ? value.map((i: any) => i?.id || i)
                  : value?.id || value
              }
              onChange(changedVal)
              if (autocompleteProps?.onChange) {
                autocompleteProps.onChange(event, value, reason, details)
              }
            }}
            renderOption={
              autocompleteProps?.renderOption ??
              (showCheckbox
                ? (props, option, { selected }) => {
                    return (
                      <li {...props}>
                        <Checkbox sx={{ marginRight: 1 }} checked={selected} />
                        {autocompleteProps?.getOptionLabel?.(option) ||
                          option[optionKey.label] ||
                          option}
                      </li>
                    )
                  }
                : undefined)
            }
            onBlur={(event) => {
              onBlur()
              if (typeof autocompleteProps?.onBlur === 'function') {
                autocompleteProps.onBlur(event)
              }
            }}
            renderInput={(params) => (
              <TextField
                name={name}
                // required={rules?.required ? true : required}
                label={label}
                {...textFieldProps}
                {...params}
                error={!!error}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                  ...textFieldProps?.InputProps,
                }}
                inputProps={{
                  ...params.inputProps,
                  ...textFieldProps?.inputProps,

                  required: false,
                }}
                helperText={error ? error.message : textFieldProps?.helperText}
                size={size}
              />
            )}
            {...fieldRest}
          />
        )
      }}
    />
  )
}

export default InputAutoComplete
