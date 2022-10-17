import DocTitle from '@src/components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'

export const review: RouteType = {
  path: 'review',
  title: '리뷰 관리',
  element: (
    <DocTitle title={'리뷰 관리'}>
      <div>리뷰 관리</div>
    </DocTitle>
  ),
}
export const reviewChildren: RouteType[] = []
