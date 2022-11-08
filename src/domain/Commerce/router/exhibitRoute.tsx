import DocTitle from '@components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'

export const exhibit: RouteType = {
  path: 'exhibit',
  title: '전시 관리',
  element: (
    <DocTitle title={'전시 관리'}>
      <div>전시 관리</div>
    </DocTitle>
  ),
}
export const exhibitChildren: RouteType[] = []
