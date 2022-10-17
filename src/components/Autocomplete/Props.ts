import { TextFieldProps } from '@mui/material'
import { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete'
import { Control, ControllerProps, Path } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'

export interface InputAutoCompleteProps<
  F extends FieldValues,
  T,
  M extends boolean | undefined,
  D extends boolean | undefined
> extends MuiAutocompleteProps<T, M, D, boolean> {
  name: Path<F>
  control?: Control<F>
  options: T[]
  optionKey?: {
    value: string
    label: string
  }
  loading?: boolean
  multiple?: M
  matchId?: boolean
  rules?: ControllerProps['rules']
  required?: boolean
  label?: TextFieldProps['label']
  showCheckbox?: boolean
  autocompleteProps?: Omit<
    MuiAutocompleteProps<T, M, D, any>,
    'name' | 'options' | 'loading' | 'renderInput'
  >
  textFieldProps?: Omit<TextFieldProps, 'name' | 'required' | 'label'>
}

export type AutoDefault = {
  id: string | number // must keep id in case of keepObject
  label: string
}
