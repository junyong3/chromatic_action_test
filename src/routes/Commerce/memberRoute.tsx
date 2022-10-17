import {
  MemberDetailPage,
  MemberListPage,
  MemberUpdatePage,
} from '@src/app/Commerce/Member'
import DocTitle from '@src/components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'

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
