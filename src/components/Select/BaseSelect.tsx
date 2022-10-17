import {
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select as MuiSelect,
} from '@mui/material'
import FormControl from '../FormControl'
import { BaseSelectProps } from './Props'

function BaseSelect<T>({
  label,
  value,
  size = 'small',
  placeholder,
  optionList,
  optionKey = {
    value: 'value',
    label: 'label',
  },
  width = 100,
  error,
  helperText,
  required,
  sx,
  ...props
}: BaseSelectProps<T>) {
  return (
    <FormControl
      required={required}
      sx={{ ...sx, ...{ minWidth: width } }}
      size={size}
    >
      {label ? (
        <InputLabel id={`select_label_input_${label}`}>{label}</InputLabel>
      ) : null}
      <MuiSelect
        {...props}
        labelId={`select_label_input_${label}`}
        label={label}
        value={value}
        error={error}
        input={<OutlinedInput label={label} />}
        size={size}
        inputProps={{
          required: false,
        }}
        renderValue={(selected: any) => {
          if (placeholder && selected === '') {
            return <em>{placeholder}</em>
          }
          return <em>{selected}</em>
        }}
        onChange={props.onChange}
      >
        {placeholder ? (
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
        ) : null}
        {optionList.map((option, index) => (
          <MenuItem key={index} value={option[optionKey.value] ?? option}>
            {option[optionKey.label] ?? option}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default BaseSelect
