import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@mui/material'
import React, { PropsWithChildren, useMemo } from 'react'

type DialogSize = 'es' | 'sm' | 'md' | 'lg' | 'xl'

interface DialogProps extends MuiDialogProps {
  size: DialogSize
}

function Dialog({ size, children, ...props }: PropsWithChildren<DialogProps>) {
  const width = useMemo(() => getDialogWidth(size), [size])

  return (
    <MuiDialog PaperProps={{ style: { width } }} {...props}>
      {children}
    </MuiDialog>
  )
}

const getDialogWidth = (size: DialogSize) => {
  let width: number

  switch (size) {
    case 'es':
      width = 444
      break
    case 'sm':
      width = 600
      break
    case 'md':
      width = 900
      break
    case 'lg':
      width = 1200
      break
    case 'xl':
      width = 1536
      break
    default:
      width = 444
  }
  return width
}

export default Dialog
