import { TypographyProps } from '@components/Typography/Props'
import { Typography as MuiTypography } from '@mui/material'
import { PropsWithChildren } from 'react'
import { TypoRequired } from '@components/Typography/StyleObj'

function Typography(props: PropsWithChildren<TypographyProps>) {
  const { variant, align, required, fontSize, children } = props
  return (
    <MuiTypography
      variant={variant}
      align={align}
      fontSize={fontSize}
      {...props}
    >
      {children}
      {required ? <TypoRequired>*</TypoRequired> : null}
    </MuiTypography>
  )
}

export default Typography
