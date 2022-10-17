import DocTitle from '@src/components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'

export const takeBack: RouteType = {
  path: 'take-back',
  title: '반품/교환 관리',
  element: (
    <DocTitle title={'반품/교환 관리'}>
      <div>반품/교환 목록</div>
    </DocTitle>
  ),
}
export const takeBackChildren: RouteType[] = []
