import { RouteType } from '@src/routes/routeType'
import DocTitle from '@components/Page/DocTitle'
import { lazy } from 'react'
// import {
//   NoticeDetailPage,
//   NoticeListPage,
//   NoticeUpdatePage,
// } from '@domain/Commerce/pages/Notice'

const NoticeDetailPage = lazy(
  () => import('@domain/Commerce/pages/Notice/NoticeDetailPage')
)
const NoticeListPage = lazy(
  () => import('@domain/Commerce/pages/Notice/NoticeListPage')
)
const NoticeUpdatePage = lazy(
  () => import('@domain/Commerce/pages/Notice/NoticeUpdatePage')
)
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
