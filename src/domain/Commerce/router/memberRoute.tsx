import { MemberUpdatePage } from '@domain/Commerce/pages/Member'
import DocTitle from '@components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'
import { lazy } from 'react'

const MemberListPage = lazy(
  () => import('@domain/Commerce/pages/Member/MemberListPage')
)
const MemberDetailPage = lazy(
  () => import('@domain/Commerce/pages/Member/MemberDetailPage')
)

export const member: RouteType = {
  path: 'member',
  title: '회원 관리',
  element: (
    <DocTitle title={'회원 관리'}>
      <MemberListPage />
    </DocTitle>
  ),
}
export const memberChildren: RouteType[] = [
  {
    path: 'member/:id',
    title: '회원 상세',
    element: (
      <DocTitle title={'회원 상세'}>
        <MemberDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'member/:id/update',
    title: '회원 수정',
    element: (
      <DocTitle title={'회원 수정'}>
        <MemberUpdatePage />
      </DocTitle>
    ),
  },
]
