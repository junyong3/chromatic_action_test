import { RouteType } from '@src/routes/routeType'
import PointListPage from '@src/app/Commerce/Point/PointListPage'
import DocTitle from '@src/components/Page/DocTitle'

export const point: RouteType = {
  path: 'point',
  title: '적립금 관리',
  element: (
    <DocTitle title={'적립금 관리'}>
      <PointListPage />
    </DocTitle>
  ),
}
export const pointChildren: RouteType[] = []
