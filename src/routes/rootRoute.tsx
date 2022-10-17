import { RouteType } from '@src/routes/routeType'
import HomePage from '@src/app/Home'
import LoginPage from '@src/app/Login'
import ChangePasswordPage from '@src/app/ChangePassword'
import ErrorPage from '@src/app/Error'
import DocTitle from '@components/Page/DocTitle'
export const ROOT: RouteType[] = [
  {
    path: '/',
    title: 'HOME',
    element: (
      <DocTitle title={'HOME'}>
        <HomePage />
      </DocTitle>
    ),
  },
  {
    path: '/login',
    title: '로그인',
    element: (
      <DocTitle title={'로그인'}>
        <LoginPage />
      </DocTitle>
    ),
  },
  {
    path: '/change-password',
    title: '비밀번호 변경',
    element: (
      <DocTitle title={'비밀번호 변경'}>
        <ChangePasswordPage />
      </DocTitle>
    ),
  },
  {
    path: '/error',
    title: '에러',
    element: (
      <DocTitle title={'에러'}>
        <ErrorPage />
      </DocTitle>
    ),
  },
  {
    path: '/*',
    title: 'Not Found',
    element: (
      <DocTitle title={'Not Found'}>
        <div>404</div>
      </DocTitle>
    ),
  },
]
