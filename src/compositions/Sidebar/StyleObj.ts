import styled from '@emotion/styled'
import { default as LogoSVG } from '@assets/svg/JYG.svg'

export const LogoWrapper = styled.div`
  padding: 16px 8px;
  > a {
    display: inline-block;
  }
`

export const Logo = styled.span`
  display: inline-block;
  width: 88px;
  height: 40px;
  background-image: url(${LogoSVG});
  background-repeat: no-repeat;
  background-position: center;
`
