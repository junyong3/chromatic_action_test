import { RouteType } from '@src/routes/routeType'
import {
  PermissionDetailPage,
  PermissionListPage,
  PermissionUpdatePage,
} from '@src/app/IAM/Permission'
import DocTitle from '@src/components/Page/DocTitle'

export const permission: RouteType = {
  title: '권한 조회',
  path: 'permission',
  element: (
    <DocTitle title={'권한 조회'}>
      <PermissionListPage />
    </DocTitle>
  ),
}
export const permissionChildren: RouteType[] = [
  {
    path: 'permission/create',
    title: '권한 생성',
    element: (
      <DocTitle title={'권한 생성'}>
        <PermissionUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'permission/:id',
    title: '권한 상세',
    element: (
      <DocTitle title={'권한 상세'}>
        <PermissionDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'permission/:id/update',
    title: '권한 수정',
    element: (
      <DocTitle title={'권한 수정'}>
        <PermissionUpdatePage />
      </DocTitle>
    ),
  },
]
