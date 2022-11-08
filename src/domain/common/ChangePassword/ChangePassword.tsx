import { To } from '@routes/To'
import ChangePasswordForm from '@components/ChangePasswordPageForm/ChangePasswordPageForm'
import { FailedKeycloakDialog } from '@components/Dialog'
import React from 'react'
import { Logo } from '@compositions/Sidebar/StyleObj'
import { useNavigate } from 'react-router-dom'
import Page from '@components/Page'
import { Content, Header, Main, Title } from '@domain/common/Login/StyleObj'

function ChangePassword() {
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

      <FailedKeycloakDialog />
    </Page>
  )
}

export default ChangePassword
