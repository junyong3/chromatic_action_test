import DocTitle from '@components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'

export const product: RouteType = {
  path: 'product',
  title: '상품 관리',
  element: (
    <DocTitle title={'상품 관리'}>
      <div>상품 관리</div>
    </DocTitle>
  ),
}
export const productChildren: RouteType[] = []
