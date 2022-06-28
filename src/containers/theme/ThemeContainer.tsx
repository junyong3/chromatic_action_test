import { PropsWithChildren } from 'react'
import theme from './index'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'
import '../styles/global.css'
import '../styles/pretendard.css'
import '../styles/mui.css'

const ThemeContainer = (props: PropsWithChildren<unknown>) => {
  const { children } = props

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default ThemeContainer
