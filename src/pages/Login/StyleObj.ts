import styled from '@emotion/styled'
import { default as LogoSVG } from '@assets/svg/JYG.svg'

export const Header = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
`

export const Logo = styled.div`
  width: 88px;
  height: 40px;
  background-image: url(${LogoSVG});
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
`

export const Main = styled.main`
  min-height: calc(100vh - 64px);
  padding: 24px 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export const Content = styled.div`
  margin: 0 auto;
  max-width: 376px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Title = styled(Content)`
  font-size: 24px;
  line-height: 32px;
  color: #000000de;
  margin-bottom: 32px;
`

export const Divider = styled.div`
  border-top: 1px solid #e0e0e0;
  width: 100%;
`

export const HelpTextList = styled.ul`
  display: block;
  width: 100%;
  margin-top: 6px !important;
  padding-left: 20px;
  margin: 0;
`

export const HelpTextListItem = styled.li`
  font-size: 12px;
  color: #00000099;
`
