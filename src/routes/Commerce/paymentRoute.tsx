import { RouteType } from '@src/routes/routeType'
import { PaymentListPage } from '@src/app/Commerce/Pyament'
import DocTitle from '@src/components/Page/DocTitle'

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
