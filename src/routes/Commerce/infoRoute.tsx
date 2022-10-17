import DocTitle from '@src/components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'

export const info: RouteType = {
  path: 'info',
  title: '기초정보 관리',
  element: (
    <DocTitle title={'기초정보 관리'}>
      <div>기초정보 관리</div>
    </DocTitle>
  ),
}
export const infoChildren: RouteType[] = []
