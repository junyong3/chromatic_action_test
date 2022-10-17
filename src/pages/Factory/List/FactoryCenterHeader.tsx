import { ListHeader } from '@compositions/Header'
import { To } from '@routes/To'

function FactoryCenterHeader() {
  return (
    <ListHeader
      title="공장/센터정보"
      navigation={{
        home: To.MDMHome,
        menuList: ['공장/센터 정보'],
      }}
      button={{
        text: '공장/센터 추가',
        link: To.MDMConfigFactoryCreate,
        sbKind: 'pages/MDM/config/Factory/Create',
      }}
    />
  )
}

export default FactoryCenterHeader
