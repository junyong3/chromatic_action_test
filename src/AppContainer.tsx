import React from 'react'
import App from './App'
import { queryClient } from '@queries/client'
import { LoadingProvider } from '@services/LoadingService'
import { SnackbarProvider } from '@services/SnackbarService'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import MockRunning from '@mocks/MockRunning'

import * as Sentry from '@sentry/react'
const AppContainer = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
      <LoadingProvider />
      <SnackbarProvider />
      {import.meta.env.MODE === 'development' &&
      import.meta.env.VITE_IS_MOCK === 'true' ? (
        <MockRunning />
      ) : null}
    </QueryClientProvider>
  )
}

export default Sentry.withProfiler(AppContainer)
