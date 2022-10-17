import { createTheme } from '@mui/material/styles'
import { koKR } from '@mui/material/locale'

const theme = createTheme(
  {
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: '#1976d2',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '8px 16px',
          },
          sizeLarge: {
            padding: '8px 22px',
          },
          sizeMedium: {
            padding: '6px 16px',
          },
          sizeSmall: {
            padding: '4px 10px',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            '& > form': {
              display: 'contents',
            },
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            '&.modal': {
              padding: '28px 24px',
              height: 88,
            },
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            paddingTop: 8,
            paddingBottom: 8,
            '&.modal': {
              padding: '0px 24px 28px 24px',
            },
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
      MuiDivider: {
        styleOverrides: {
          root: {
            '&.modal': {
              marginLeft: '24px',
              marginRight: '24px',
            },
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            '&.modal': {
              padding: 18,
              justifyContent: 'center',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.5,
          },
          h1: {
            fontSize: 96,
            fontWeight: 300,
            lineHeight: 1,
          },
          h2: {
            fontSize: 60,
            fontWeight: 300,
            lineHeight: 1.23,
          },
          h3: {
            fontSize: 48,
            fontWeight: 400,
            lineHeight: 1.25,
          },
          h4: {
            fontSize: 34,
            fontWeight: 400,
            lineHeight: 1.29,
          },
          h5: {
            fontSize: 24,
            fontWeight: 400,
            lineHeight: 1.33,
          },
          h6: {
            fontSize: 20,
            fontWeight: 500,
            lineHeight: 1.4,
          },
          subtitle1: {
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.38,
          },
          subtitle2: {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.43,
          },
          body1: {
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.38,
          },
          body2: {
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.43,
          },
          caption: {
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 1.5,
          },
          overline: {
            fontSize: 12,
            fontWeight: 500,
            lineHeight: 1.5,
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
        light: '#00000061',
        contrastText: '#fff',
      },
    },
    status: {
      fail: 'rgba(211, 47, 47, 0.04)',
      cancel: 'rgba(2, 136, 209, 0.04)',
    },
  },
  koKR
)

export default theme
