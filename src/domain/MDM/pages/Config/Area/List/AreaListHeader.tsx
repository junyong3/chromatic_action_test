import { ListHeader } from '@compositions/Header'
import { To } from '@routes/To'

function AreaListHeader() {
  return (
    <ListHeader
      title="구역 정보"
      navigation={{
        home: To.MDMConfigArea,
        menuList: ['구역정보'],
      }}
      button={{
        text: '구역 추가',
        link: To.MDMConfigAreaCreate,
        sbkind: 'pages/MDM/config/Area/Create',
      }}
    />
  )
}

export default AreaListHeader
