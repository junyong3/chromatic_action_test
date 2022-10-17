import { RouteType } from '@src/routes/routeType'
import {
  CouponDetailPage,
  CouponListPage,
  CouponCreatePage,
  CouponUpdatePage,
} from '@src/app/Commerce/Coupon'
import DocTitle from '@src/components/Page/DocTitle'

export const coupon: RouteType = {
  path: 'coupon',
  title: '쿠폰 관리',
  element: (
    <DocTitle title={'쿠폰 관리'}>
      <CouponListPage />
    </DocTitle>
  ),
}
export const couponChildren: RouteType[] = [
  {
    path: 'coupon/create',
    title: '쿠폰 생성',
    element: (
      <DocTitle title={'쿠폰 생성'}>
        <CouponCreatePage />
      </DocTitle>
    ),
  },
  {
    path: 'coupon/:id',
    title: '쿠폰 상세',
    element: (
      <DocTitle title={'쿠폰 상세'}>
        <CouponDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'coupon/:id/update',
    title: '쿠폰 수정',
    element: (
      <DocTitle title={'쿠폰 수정'}>
        <CouponUpdatePage />
      </DocTitle>
    ),
  },
]
