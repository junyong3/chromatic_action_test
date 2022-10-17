import DocTitle from '@src/components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'

export const search: RouteType = {
  path: 'search',
  title: '검색 관리',
  element: (
    <DocTitle title={'검색 관리'}>
      <div>검색 관리</div>
    </DocTitle>
  ),
}
export const searchChildren: RouteType[] = []
