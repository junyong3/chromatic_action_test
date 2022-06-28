import { PropsWithChildren } from 'react'
import { Button as MuiButton } from '@mui/material'
import { ButtonProps } from '@components/Button/Props'

function Button({ color, ...props }: PropsWithChildren<ButtonProps>) {
  return <MuiButton color={color} {...props} />
}

export default Button
