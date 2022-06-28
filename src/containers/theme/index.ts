import { createTheme } from '@mui/material/styles'
import { koKR } from '@mui/material/locale'

const theme = createTheme(
  {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '8px 16px',
          },
          sizeMedium: {
            padding: '6px 16px',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            height: 60,
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            paddingTop: '8px !important',
            paddingBottom: 8,
          },
        },
      },
      MuiDialogContentText: {
        styleOverrides: {
          root: {
            color: '#000000DE',
          },
        },
      },
    },
    typography: {
      fontFamily: [
        'Pretendard',
        '-apple-system',
        'BlinkMacSystemFont',
        'system-ui',
        'Roboto',
        "'Helvetica Neue'",
        "'Segoe UI'",
        "'Apple SD Gothic Neo'",
        "'Noto Sans KR'",
        "'Malgun Gothic'",
        "'Apple Color Emoji'",
        "'Segoe UI Emoji'",
        "'Segoe UI Symbol'",
      ].join(','),
    },
    palette: {
      gray: {
        main: '#000000DE',
        light: '#0000000A',
        contrastText: '#fff',
      },
    },
  },
  koKR
)

export default theme
