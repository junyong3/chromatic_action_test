import React, { PropsWithChildren } from 'react'
import {
  Breakpoint,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogProps as MuiModalProps,
  Divider,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { FormProvider } from 'react-hook-form'

type DialogSize = false | Breakpoint | undefined

export interface ModalProps extends MuiModalProps {
  methods: any
  size: DialogSize
  title: string
  onClose: () => void
  content?: string | JSX.Element
  actions?: JSX.Element
  onSubmit?: () => void
}

function FormModal({
  size,
  title,
  content,
  children,
  onClose,
  methods,
  onSubmit,
  actions,
  ...props
}: PropsWithChildren<ModalProps>) {
  return (
    <MuiDialog maxWidth={size} fullWidth={true} onClose={onClose} {...props}>
      {title ? (
        <DialogTitle data-cy={'modalTitle'} className={'modal'}>
          {title}
          {onClose ? (
            <IconButton
              aria-label={'close'}
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 24,
                padding: 0,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
      ) : null}

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <DialogContent className={'modal'}>{content}</DialogContent>

          <Divider className={'modal'} variant={'middle'} />

          <DialogActions className={'modal'}>{actions}</DialogActions>
        </form>
      </FormProvider>

      {children}
    </MuiDialog>
  )
}

export default FormModal
