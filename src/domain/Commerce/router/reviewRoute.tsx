import DocTitle from '@components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'
import { lazy } from 'react'

const ReviewListPage = lazy(
  () => import('@domain/Commerce/pages/Review/ReviewListPage')
)
const ReviewDetailPage = lazy(
  () => import('@domain/Commerce/pages/Review/ReviewDetailPage')
)
export const review: RouteType = {
  path: 'review',
  title: '리뷰 관리',
  element: (
    <DocTitle title={'리뷰 관리'}>
      <ReviewListPage />
    </DocTitle>
  ),
}
export const reviewChildren: RouteType[] = [
  {
    path: 'review/:id',
    title: '리뷰 상세',
    element: (
      <DocTitle title={'리뷰 상세'}>
        <ReviewDetailPage />
      </DocTitle>
    ),
  },
]
