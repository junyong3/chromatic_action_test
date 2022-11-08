import { ListHeader } from '@compositions/Header'
import { To } from '@routes/To'

function WarehouseListHeader() {
  return (
    <ListHeader
      title="창고 정보"
      navigation={{
        home: To.MDMConfigWarehouse,
        menuList: ['창고정보'],
      }}
      button={{
        text: '창고 추가',
        link: To.MDMConfigWarehouseCreate,
        sbkind: 'pages/MDM/config/Warehouse/Create',
      }}
    />
  )
}

export default WarehouseListHeader
