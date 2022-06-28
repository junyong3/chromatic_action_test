import Page from '@components/Page'
import styled from '@emotion/styled'
import { default as LogoSVG } from '@assets/svg/JYG.svg'
import React from 'react'
import LogInPageForm from '@components/LogInPageForm'
import LoginPageDialog from '@components/LoginPageDialog'
import { Link } from '@mui/material'
import { SLACK_계정관리_정보보안_CAHNNEL_URL } from '@config'

function LoginPage() {
  return (
    <Page>
      <Header>
        <Logo />
      </Header>

      <Main>
        <Content>
          <Title>마을회관 로그인</Title>
          <LogInPageForm />
          <Divider />
          <HelpTextList>
            <HelpTextListItem>
              계정이 없다면,{' '}
              <Link
                underline="hover"
                href={SLACK_계정관리_정보보안_CAHNNEL_URL}
                target="_blank"
              >
                여기
              </Link>
              에서 계정 생성을 요청해 주세요.
            </HelpTextListItem>
            <HelpTextListItem>
              비밀번호를 잊었다면,{' '}
              <Link
                underline="hover"
                href={SLACK_계정관리_정보보안_CAHNNEL_URL}
                target="_blank"
              >
                여기
              </Link>
              에서 비밀번호 재설정을 요청해 주세요.
            </HelpTextListItem>
          </HelpTextList>
        </Content>
      </Main>

      <LoginPageDialog />
    </Page>
  )
}

const Header = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
`

const Logo = styled.div`
  width: 88px;
  height: 40px;
  background-image: url(${LogoSVG});
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
`

const Main = styled.main`
  min-height: calc(100vh - 64px);
  padding: 24px 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 376px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Title = styled(Content)`
  font-size: 24px;
  line-height: 32px;
  color: #000000de;
  margin-bottom: 32px;
`

const Divider = styled.div`
  border-top: 1px solid #e0e0e0;
  width: 100%;
`

const HelpTextList = styled.ul`
  display: block;
  width: 100%;
  margin-top: 6px !important;
  padding-left: 20px;
  margin: 0;
`

const HelpTextListItem = styled.li`
  font-size: 12px;
  color: #00000099;
`

export default LoginPage
