import { Backdrop, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'

let _setIsOpen_: React.Dispatch<React.SetStateAction<boolean>>

export const LoadingProvider = React.memo(function LoadingProvider() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    _setIsOpen_ = setIsOpen
  }, [setIsOpen])

  return (
    <Backdrop open={isOpen} sx={{ backgroundColor: '#FFFFFFB3', zIndex: 9999 }}>
      <CircularProgress />
    </Backdrop>
  )
})

const LoadingService = {
  show: () => {
    _setIsOpen_(true)
  },
  close: () => {
    _setIsOpen_(false)
  },
}

export default LoadingService
