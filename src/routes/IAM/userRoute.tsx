import { RouteType } from '@src/routes/routeType'
import { UserDetailPage, UserListPage } from '@src/app/IAM/User'
import DocTitle from '@src/components/Page/DocTitle'

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
