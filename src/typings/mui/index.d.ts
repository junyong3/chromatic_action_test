declare module '@mui/material/styles' {
  interface Palette {
    gray: Palette['primary']
  }
  interface PaletteOptions {
    gray: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gray: true
  }
}
declare module '@mui/material/styles' {
  interface ThemeOptions {
    status?: {
      fail?: string
      cancel?: string
    } // optional
  }
}

export {}
