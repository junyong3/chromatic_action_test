import { ButtonProps as MuiButtonProps } from '@mui/material/Button'

export interface ButtonProps extends Omit<MuiButtonProps, 'color'> {
  color?: 'primary' | 'gray' | 'error'
  target?: '_blank'
}
