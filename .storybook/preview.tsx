import theme from '@theme'
import { addDecorator } from '@storybook/react'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from '@queries/client'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider } from 'react-query'

const DefaultViewport = {
  defaultResolution: {
    name: 'default resolution',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      ...DefaultViewport,
    },
  },
  controls: {
    expand: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export default addDecorator((story) => (
  <div style={{ width: '100%', height: '100%' }}>
    <CssBaseline />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        <ThemeProvider theme={theme}>{story()}</ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </div>
))
