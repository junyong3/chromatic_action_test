import { PropsWithChildren } from 'react'
import { ButtonGroup as MuiButtonGroup } from '@mui/material'
import { ButtonGroupProps } from '@components/ButtonGroup/Props'

function ButtonGroup(props: PropsWithChildren<ButtonGroupProps>) {
  return <MuiButtonGroup {...props} sx={{ width: '100%' }} />
}

export default ButtonGroup
