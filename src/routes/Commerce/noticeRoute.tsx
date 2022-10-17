import { RouteType } from '@src/routes/routeType'
import {
  NoticeDetailPage,
  NoticeListPage,
  NoticeUpdatePage,
} from '@src/app/Commerce/Notice'
import DocTitle from '@src/components/Page/DocTitle'

export const notice: RouteType = {
  path: 'notice',
  title: '공지 관리',
  element: (
    <DocTitle title={'공지 관리'}>
      <NoticeListPage />
    </DocTitle>
  ),
}
export const noticeChildren: RouteType[] = [
  {
    path: 'notice/create',
    title: '공지 생성',
    element: (
      <DocTitle title={'공지 생성'}>
        <NoticeUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'notice/:id',
    title: '공지 상세',
    element: (
      <DocTitle title={'공지 상세'}>
        <NoticeDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'notice/:id/update',
    title: '공지 수정',
    element: (
      <DocTitle title={'공지 수정'}>
        <NoticeUpdatePage />
      </DocTitle>
    ),
  },
]
