import { Stack } from '@mui/material'
import { ListHeader } from '@compositions/Header'
import { To } from '@routes/To'
import Page from '@components/Page'
import MaterialSearchBox from './List/MaterialSearchBox'
import MaterialDataGrid from './List/MaterialDataGrid'

function MaterialListPage() {
  return (
    <Page>
      <Stack spacing={3}>
        <ListHeader
          title="원부자재 목록 조회"
          button={{
            text: '원부자재 생성',
            link: To.MDMGoodsMaterialCreate,
            sbkind: 'pages/MDM/Goods/Material/Create',
          }}
          navigation={{
            home: To.MDMHome,
            menuList: ['원부자재 관리'],
          }}
        />
        <MaterialSearchBox />
        <MaterialDataGrid />
      </Stack>
    </Page>
  )
}

export default MaterialListPage
