import { RouteType } from '@src/routes/routeType'
// import { UserDetailPage, UserListPage } from '@domain/IAM/pages/User'
import DocTitle from '@components/Page/DocTitle'
import { lazy } from 'react'

const UserDetailPage = lazy(
  () => import('@domain/IAM/pages/User/UserDetailPage')
)
const UserListPage = lazy(() => import('@domain/IAM/pages/User/UserListPage'))
export const user: RouteType = {
  path: 'user',
  title: '사용자 조회',
  element: (
    <DocTitle title={'사용자 조회'}>
      <UserListPage />
    </DocTitle>
  ),
}
export const userChildren: RouteType[] = [
  {
    path: 'user/:id',
    title: '사용자 상세',
    element: (
      <DocTitle title={'사용자 상세'}>
        <UserDetailPage />
      </DocTitle>
    ),
  },
]
