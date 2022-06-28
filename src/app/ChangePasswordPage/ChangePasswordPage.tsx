import React from 'react'
import Page from '@components/Page'
import styled from '@emotion/styled'
import { default as LogoSVG } from '@assets/svg/JYG.svg'
import ChangePasswordForm from '@components/ChangePasswordPageForm'
import { useNavigate } from 'react-router-dom'
import ChangePasswordPageDialog from '@components/ChangePasswordPageDialog'
import { To } from '@routes/To'

function ChangePasswordPage() {
  const navigate = useNavigate()

  return (
    <Page>
      <Header>
        <Logo onClick={() => navigate(To.Home)} />
      </Header>

      <Main>
        <Content>
          <Title>비밀번호 변경</Title>
          <ChangePasswordForm />
        </Content>
      </Main>

      <ChangePasswordPageDialog />
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
  cursor: pointer;
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

export default ChangePasswordPage
