import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useRootVariables } from '@stores/rootVariables.store'
import shallow from 'zustand/shallow'

// let _setIsOpen_: React.Dispatch<React.SetStateAction<null | boolean>>

export const LoadingProvider = () => {
  // const [isOpen, setIsOpen] = useState<null | boolean>(false)
  const isLoading = useRootVariables((state) => state.loadingState, shallow)
  // useLayoutEffect(() => {
  //   console.log(3213123)
  //   _setIsOpen_ = setIsOpen
  // }, [])

  return (
    <Backdrop
      open={isLoading}
      sx={{ backgroundColor: '#FFFFFFB3', zIndex: 9999 }}
    >
      <CircularProgress />
    </Backdrop>
  )
}

const LoadingService = {
  show: () => {
    useRootVariables.setState({
      loadingState: true,
    })
  },
  close: () => {
    useRootVariables.setState({
      loadingState: false,
    })
  },
}

export default LoadingService
