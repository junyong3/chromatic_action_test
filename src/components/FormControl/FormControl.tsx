import { PropsWithChildren } from 'react'
import { FormControl as MuiFormControl } from '@mui/material'
import { FormControlProps } from './Props'

function FormControl(props: PropsWithChildren<FormControlProps>) {
  return <MuiFormControl {...props} />
}

export default FormControl
