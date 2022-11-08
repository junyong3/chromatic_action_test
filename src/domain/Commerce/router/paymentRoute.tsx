import { RouteType } from '@src/routes/routeType'
import { PaymentListPage } from '@domain/Commerce/pages/Payment'
import DocTitle from '@components/Page/DocTitle'

export const payment: RouteType = {
  path: 'payment',
  title: '결제 목록',
  element: (
    <DocTitle title={'결제 목록'}>
      <PaymentListPage />
    </DocTitle>
  ),
}
// 삭제 예정
export const paymentChildren: RouteType[] = []
