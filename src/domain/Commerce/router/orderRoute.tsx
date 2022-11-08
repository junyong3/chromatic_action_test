import { RouteType } from '@src/routes/routeType'
import { OrderDetailPage } from '@domain/Commerce/pages/Order'
import DocTitle from '@components/Page/DocTitle'

export const order: RouteType = {
  path: 'order',
  title: '주문 관리',
  element: (
    <DocTitle title={'주문 관리'}>
      <div>주문 목록</div>
    </DocTitle>
  ),
}
export const orderChildren: RouteType[] = [
  {
    path: 'order/:id',
    title: '주문 상세',
    element: (
      <DocTitle title={'주문 상세'}>
        <OrderDetailPage />
      </DocTitle>
    ),
  },
]
