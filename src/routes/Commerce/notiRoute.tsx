import DocTitle from '@src/components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'

export const noti: RouteType = {
  path: 'noti',
  title: '알림 관리',
  element: (
    <DocTitle title={'알림 관리'}>
      <div>알림 관리</div>
    </DocTitle>
  ),
}
export const notiChildren: RouteType[] = []
