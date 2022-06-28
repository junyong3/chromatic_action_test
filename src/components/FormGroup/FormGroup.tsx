import { PropsWithChildren } from 'react'
import { FormGroup as MuiFormGroup } from '@mui/material'
import { FormGroupProps } from './Props'

function FormGroup(props: PropsWithChildren<FormGroupProps>) {
  return <MuiFormGroup {...props} />
}

export default FormGroup
