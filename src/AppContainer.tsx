import React from 'react'
import App from './App'
import { queryClient } from '@queries/client'
import { LoadingProvider } from '@services/LoadingService'
import { SnackbarProvider } from '@services/SnackbarService'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
const AppContainer = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
      <LoadingProvider />
      <SnackbarProvider />
    </QueryClientProvider>
  )
}

export default AppContainer
