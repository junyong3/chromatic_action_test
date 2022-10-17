import { Snackbar, SnackbarOrigin } from '@mui/material'
import React, { useEffect, useState } from 'react'

let _setMessage_: React.Dispatch<React.SetStateAction<null | string>>

export const SnackbarProvider = React.memo(function SnackbarProvider() {
  const [message, setMessage] = useState<null | string>(null)

  useEffect(() => {
    _setMessage_ = setMessage
  }, [setMessage])

  const anchorOrigin: SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  }

  const handleClose = () => {
    setMessage(null)
  }

  return (
    <Snackbar
      open={!!message}
      data-cy={'snackbar'}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      anchorOrigin={anchorOrigin}
      sx={{
        maxWidth: 568,
        minWidth: 320,
        width: '100%',
      }}
      ContentProps={{
        sx: {
          width: '100%',
        },
      }}
    />
  )
})

const SnackbarService = {
  show: (message: string) => {
    _setMessage_(message)
  },
  close: () => {
    _setMessage_(null)
  },
}

export default SnackbarService
