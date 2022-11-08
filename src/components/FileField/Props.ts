import { TextFieldProps as muiTextFieldProps } from '@mui/material'
import { FieldValues, Path } from 'react-hook-form'

export type TextFieldElementProps<T extends FieldValues> = Omit<
  muiTextFieldProps,
  'name'
> & {
  name: Path<T>
}
