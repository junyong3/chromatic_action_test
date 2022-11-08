import { Control, Controller, Path } from 'react-hook-form'
import { FormControlLabelProps, Switch } from '@mui/material'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { BaseSwitchProps } from '@components/Switch/Props'
import FormControlLabel from '../FormControlLabel'
import Typography from '@components/Typography'
import { Variant } from '@components/TextField/Props'

type IProps = Omit<FormControlLabelProps, 'control'>
export type InputSwitch<T extends FieldValues> = BaseSwitchProps &
  IProps & {
    name: Path<T>
    control?: Control<T>
    required?: boolean
    disabled?: boolean
    variant?: Variant
  }

export default function InputSwitch<TFieldValues extends FieldValues>(
  props: InputSwitch<TFieldValues>
) {
  const { name, control, disabled, ...muiProps } = props
  const {
    onChange: muiOnChange,
    label,
    variant = 'subtitle2',
    required,
    labelPlacement,
    size = 'small',
    sx,
  } = muiProps
  return (
    <FormControlLabel
      sx={sx}
      labelPlacement={labelPlacement}
      label={
        label ? (
          <Typography
            required={required}
            variant={variant}
            sx={{
              padding: '0 4px',
            }}
          >
            {label}
          </Typography>
        ) : null
      }
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <Switch
                size={size}
                checked={!!field.value}
                disabled={disabled}
                onChange={(ev, c) => {
                  field.onChange(ev, c)
                  muiOnChange && muiOnChange(ev, c)
                }}
              />
            )
          }}
        />
      }
    />
  )
}
