import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'

type StyleName =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'subtitle3'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'buttonLargeM'
  | 'buttonLargeR'
  | 'buttonMediumM'
  | 'buttonMediumR'
  | 'buttonSmallM'
  | 'buttonSmallR'
  | 'caption'
  | 'overline'

interface TextProps {
  as: React.ElementType<any>
  styleName: StyleName
  sx?: any
}

function Text({
  as,
  styleName,
  children,
  sx,
  ...props
}: PropsWithChildren<TextProps>) {
  return (
    <StyledText as={as} styleName={styleName} style={sx} {...props}>
      {children}
    </StyledText>
  )
}

const StyledText = styled.div<TextProps>`
  ${({ styleName }) => {
    let fontSize: number
    let fontWeight: number
    let lineHeight: number | string

    switch (styleName) {
      case 'h1':
        fontSize = 96
        fontWeight = 300
        lineHeight = 1
        break
      case 'h2':
        fontSize = 60
        fontWeight = 300
        lineHeight = 1.23
        break
      case 'h3':
        fontSize = 48
        fontWeight = 400
        lineHeight = 1.25
        break
      case 'h4':
        fontSize = 34
        fontWeight = 400
        lineHeight = 1.29
        break
      case 'h5':
        fontSize = 24
        fontWeight = 400
        lineHeight = 1.33
        break
      case 'h6':
        fontSize = 20
        fontWeight = 500
        lineHeight = 1.4
        break
      case 'subtitle1':
        fontSize = 16
        fontWeight = 500
        lineHeight = 1.38
        break
      case 'subtitle2':
        fontSize = 14
        fontWeight = 500
        lineHeight = 1.43
        break
      case 'subtitle3':
        fontSize = 12
        fontWeight = 500
        lineHeight = 1.5
        break
      case 'body1':
        fontSize = 16
        fontWeight = 400
        lineHeight = 1.38
        break
      case 'body2':
        fontSize = 14
        fontWeight = 400
        lineHeight = 1.43
        break
      case 'body3':
        fontSize = 12
        fontWeight = 400
        lineHeight = 1.5
        break
      case 'buttonLargeM':
        fontSize = 15
        fontWeight = 500
        lineHeight = '26px'
        break
      case 'buttonLargeR':
        fontSize = 15
        fontWeight = 400
        lineHeight = '26px'
        break
      case 'buttonMediumM':
        fontSize = 14
        fontWeight = 500
        lineHeight = '24px'
        break
      case 'buttonMediumR':
        fontSize = 14
        fontWeight = 400
        lineHeight = '24px'
        break
      case 'buttonSmallM':
        fontSize = 13
        fontWeight = 500
        lineHeight = '22px'
        break
      case 'buttonSmallR':
        fontSize = 13
        fontWeight = 400
        lineHeight = '22px'
        break
      case 'caption':
        fontSize = 12
        fontWeight = 400
        lineHeight = 1.5
        break
      case 'overline':
        fontSize = 12
        fontWeight = 500
        lineHeight = 1.5
        break
      default:
        fontSize = 16
        fontWeight = 400
        lineHeight = 1.5
    }

    return `
        font-size: ${fontSize}px;
        font-weight: ${fontWeight};
        line-height: ${lineHeight};
    `
  }}
`

export default Text
