import { TextField as MuiTextField } from '@mui/material'
import React from 'react'
import { TextFieldProps } from './Props'

function BaseTextField(props: TextFieldProps) {
  const {
    size = 'small',
    variant = 'outlined',
    name,
    value,
    onChange,
    helperText,
  } = props
  return (
    <MuiTextField
      {...props}
      name={name}
      value={value}
      onChange={(ev) => {
        onChange && onChange(ev)
      }}
      variant={variant}
      size={size}
      helperText={helperText}
    />
  )
}

export default BaseTextField
