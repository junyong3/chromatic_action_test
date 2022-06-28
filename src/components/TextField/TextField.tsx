import {
  OutlinedTextFieldProps,
  TextField as MuiTextField,
} from '@mui/material'
import React from 'react'

type TextFieldProps = Omit<OutlinedTextFieldProps, 'variant'>

function TextField(props: TextFieldProps) {
  return <MuiTextField variant="outlined" {...props} />
}

export default TextField
