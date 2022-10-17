import { RouteType } from '@src/routes/routeType'
import {
  RoleDetailPage,
  RoleListPage,
  RoleCreateUpdatePage,
} from '@src/app/IAM/Role'
import DocTitle from '@src/components/Page/DocTitle'

export const role: RouteType = {
  path: 'role',
  title: '역할 조회',
  element: (
    <DocTitle title={'역할 조회'}>
      <RoleListPage />
    </DocTitle>
  ),
}
export const roleChildren: RouteType[] = [
  {
    path: 'role/create',
    title: '역할 생성',
    element: (
      <DocTitle title={'역할 생성'}>
        <RoleCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'role/:id',
    title: '역할상세',
    element: (
      <DocTitle title={'역할상세'}>
        <RoleDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'role/:id/update',
    title: '역할 수정',
    element: (
      <DocTitle title={'역할 수정'}>
        <RoleCreateUpdatePage />
      </DocTitle>
    ),
  },
]
