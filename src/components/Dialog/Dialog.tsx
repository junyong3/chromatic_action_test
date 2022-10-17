import {
  Breakpoint,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps as MuiDialogProps,
  DialogTitle,
} from '@mui/material'
import React, { PropsWithChildren } from 'react'

type DialogSize = false | Breakpoint | undefined

export interface DialogProps extends MuiDialogProps {
  size: DialogSize
  title: string
  onClose: () => void
  content?: string | JSX.Element
  actions?: JSX.Element
}

function Dialog({
  size,
  title,
  content,
  actions,
  children,
  onClose,
  ...props
}: PropsWithChildren<DialogProps>) {
  return (
    <MuiDialog maxWidth={size} fullWidth={true} onClose={onClose} {...props}>
      {title ? (
        <DialogTitle data-cy={'dialogTitle'}>{title}</DialogTitle>
      ) : null}
      {content ? (
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      ) : null}
      {children}
      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </MuiDialog>
  )
}

export default Dialog
