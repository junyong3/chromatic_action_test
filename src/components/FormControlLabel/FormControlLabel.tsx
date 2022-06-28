import { PropsWithChildren } from 'react'
import { FormControlLabel as MuiFormControlLabel } from '@mui/material'
import { FormControlLabelProps } from './Props'

function FormControlLabel(props: PropsWithChildren<FormControlLabelProps>) {
  return <MuiFormControlLabel {...props} />
}

export default FormControlLabel
