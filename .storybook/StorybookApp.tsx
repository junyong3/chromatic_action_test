import React, { useEffect } from 'react'
import Instance from '@api/Instance'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@queries/client'
import ThemeContainer from '@src/containers/theme/ThemeContainer'
import { MemoryRouter, Route, Routes } from 'react-router'
import { LoadingProvider } from '@services/LoadingService'
import { SnackbarProvider } from '@services/SnackbarService'
import MockRunning from '@mocks/MockRunning'
import { StoryContext } from '@storybook/react'
import '@mocks/Storybook/StorybookBrowser'

export const StorybookApp = (
  StoryFn: any,
  { parameters: { paramLink } }: StoryContext
) => {
  useEffect(() => {
    // storybook token 주입
    Instance.storybookTokenInject()
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}

        <ThemeContainer>
          {!paramLink ? (
            <MemoryRouter>
              <StoryFn />
            </MemoryRouter>
          ) : (
            <MemoryRouter initialEntries={[paramLink.route]}>
              <Routes>
                <Route path={paramLink.path} element={<StoryFn />}></Route>
              </Routes>
            </MemoryRouter>
          )}
        </ThemeContainer>
        <LoadingProvider />
        <SnackbarProvider />
        <MockRunning />
      </QueryClientProvider>
    </div>
  )
}
