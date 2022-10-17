import DocTitle from '@src/components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'

export const inquiry: RouteType = {
  path: 'inquiry',
  title: '문의 관리',
  element: (
    <DocTitle title={'문의 관리'}>
      <div>문의 관리</div>
    </DocTitle>
  ),
}
export const inquiryChildren: RouteType[] = []
