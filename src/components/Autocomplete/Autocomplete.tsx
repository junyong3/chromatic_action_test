import React from 'react'
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps,
} from '@mui/material'

function Autocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  options,
  ...props
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  return <MuiAutocomplete disablePortal options={options} {...props} />
}

export default Autocomplete
