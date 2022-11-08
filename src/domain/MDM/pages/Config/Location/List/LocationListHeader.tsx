import { ListHeader } from '@compositions/Header'
import { To } from '@routes/To'

function LocationListHeader() {
  return (
    <ListHeader
      title="로케이션 정보"
      navigation={{
        home: To.MDMConfigLocation,
        menuList: ['로케이션정보'],
      }}
      button={{
        text: '로케이션 추가',
        link: To.MDMConfigLocationCreate,
        sbkind: 'pages/MDM/config/Location/Create',
      }}
    />
  )
}

export default LocationListHeader
