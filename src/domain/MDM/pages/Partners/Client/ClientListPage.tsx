import { Stack } from '@mui/material'
import { ListHeader } from '@compositions/Header'
import { To } from '@routes/To'
import Page from '@components/Page'
import PartnersSearchBox from '@domain/MDM/pages/Partners/List/PartnersSearchBox'
import ClientDataGrid from '@domain/MDM/pages/Partners/List/ClientDataGrid'
import { FieldValues } from 'react-hook-form'
import { useClientStore } from '@stores/MDM/Partners/client.store'
import { PartnersType } from '../Props'

function ClientListPage() {
  const [searchCondition, setSearchCondition] = useClientStore((state) => [
    state.searchCondition,
    state.setSearchCondition,
  ])
  const onSubmit = (inputData: FieldValues) => {
    console.log('client 검색', inputData)
    setSearchCondition(inputData)
  }
  return (
    <Page>
      <Stack spacing={3}>
        <ListHeader
          title="매출처 목록 조회"
          button={{
            text: '매출처 추가',
            link: To.MDMPartnersClientCreate,
            sbkind: 'pages/MDM/Partners/Client/Create',
          }}
          navigation={{
            home: To.MDMHome,
            menuList: ['매출처 관리'],
          }}
        />
        <PartnersSearchBox
          type={PartnersType.CLIENT}
          onSubmit={onSubmit}
          defaultValues={searchCondition}
        />
        <ClientDataGrid />
      </Stack>
    </Page>
  )
}

export default ClientListPage
