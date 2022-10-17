import CloseIcon from '@mui/icons-material/Cancel'
import { Controller } from 'react-hook-form'
import {
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material'
import { InputMultiSelectProps } from '@components/Select/Props'
import { FieldValues } from 'react-hook-form/dist/types/fields'

const ITEM_HEIGHT = 58
const ITEM_PADDING_TOP = 8

function InputMultiSelect<T extends FieldValues>(
  props: InputMultiSelectProps<T>
) {
  const {
    options,
    label = '',
    optionKey = {
      value: 'value',
      label: 'label',
    },
    required = false,
    validation = {},
    // parseError,
    name,
    menuMaxHeight = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    menuMaxWidth = 250,
    minWidth = 120,
    helperText,
    showChips,
    control,
    showCheckbox,
    formControlProps,
    variant,
    fullWidth,
    size = 'small',
    ...muiProps
  } = props
  // if (required && !validation.required) {
  //   validation.required = 'This field is required'
  // }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
      }) => {
        // helperText = error
        //   ? typeof parseError === 'function'
        //     ? parseError(error)
        //     : error.message
        //   : helperText
        return (
          <FormControl
            {...formControlProps}
            style={{
              ...formControlProps?.style,
              minWidth,
            }}
            required={required}
            variant={variant}
            fullWidth={fullWidth}
            error={invalid}
            size={size}
          >
            {label && (
              <InputLabel
                size={size === 'small' ? 'small' : undefined}
                error={invalid}
                htmlFor={muiProps.id || `select-multi-select-${name}`}
                required={required}
              >
                {label}
              </InputLabel>
            )}
            <Select
              {...muiProps}
              id={muiProps.id || `select-multi-select-${name}`}
              multiple
              label={label || undefined}
              error={invalid}
              value={value || []}
              inputProps={{
                required: false,
              }}
              // required={required}
              onChange={onChange}
              onBlur={onBlur}
              MenuProps={{
                ...muiProps.MenuProps,
                PaperProps: {
                  ...(muiProps.MenuProps?.PaperProps ?? {
                    style: {
                      maxHeight: menuMaxHeight,
                      width: menuMaxWidth,
                      ...muiProps.MenuProps?.PaperProps?.style,
                    },
                  }),
                },
              }}
              renderValue={
                typeof muiProps.renderValue === 'function'
                  ? muiProps.renderValue
                  : showChips
                  ? (selected) => (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '4px',
                        }}
                      >
                        {((selected as any[]) || []).map((selectedValue) => (
                          <Chip
                            key={selectedValue}
                            label={selectedValue}
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              height: size === 'small' ? '23px' : '',
                            }}
                            onDelete={() => {
                              onChange(
                                value.filter((i: any) => i !== selectedValue)
                              )
                              // setValue(name, formValue.filter((i: any) => i !== value), { shouldValidate: true })
                            }}
                            deleteIcon={
                              <CloseIcon
                                onMouseDown={(ev) => {
                                  ev.stopPropagation()
                                }}
                              />
                            }
                          />
                        ))}
                      </div>
                    )
                  : (selected) =>
                      Array.isArray(selected) ? selected.join(', ') : ''
              }
            >
              {options.map((item) => {
                const val: string | number = item[optionKey.label] || item
                const isChecked = Array.isArray(value)
                  ? value.includes(val)
                  : false
                return (
                  <MenuItem
                    key={val}
                    value={val}
                    sx={{
                      fontWeight: (theme) =>
                        isChecked
                          ? theme.typography.fontWeightBold
                          : theme.typography.fontWeightRegular,
                    }}
                  >
                    {showCheckbox && <Checkbox checked={isChecked} />}
                    <ListItemText primary={item[optionKey.label] || item} />
                  </MenuItem>
                )
              })}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}

export default InputMultiSelect
