import Link from '@mui/material/Link'
import Page from '@components/Page'
import LoginForm from '@components/LoginForm'
import { SLACK_계정관리_정보보안_CHANNEL_URL } from '@config'
import {
  Content,
  Divider,
  Header,
  HelpTextList,
  HelpTextListItem,
  Logo,
  Main,
  Title,
} from './StyleObj'

function Login() {
  return (
    <Page>
      <Header>
        <Logo />
      </Header>

      <Main>
        <Content>
          <Title>마을회관 로그인</Title>
          <LoginForm />
          <Divider />
          <HelpTextList>
            <HelpTextListItem>
              계정이 없다면,{' '}
              <Link
                underline="hover"
                href={SLACK_계정관리_정보보안_CHANNEL_URL}
                target="_blank"
                sx={{ fontSize: '12px' }}
              >
                여기
              </Link>
              에서 계정 생성을 요청해 주세요.
            </HelpTextListItem>
            <HelpTextListItem>
              비밀번호를 잊었다면,{' '}
              <Link
                underline="hover"
                href={SLACK_계정관리_정보보안_CHANNEL_URL}
                target="_blank"
                sx={{ fontSize: '12px' }}
              >
                여기
              </Link>
              에서 비밀번호 재설정을 요청해 주세요.
            </HelpTextListItem>
          </HelpTextList>
        </Content>
      </Main>
    </Page>
  )
}

export default Login
