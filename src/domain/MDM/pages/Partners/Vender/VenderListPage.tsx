import { Stack } from '@mui/material'
import { ListHeader } from '@compositions/Header'
import { To } from '@routes/To'
import Page from '@components/Page'
import PartnersSearchBox from '@domain/MDM/pages/Partners/List/PartnersSearchBox'
import VenderDataGrid from '@domain/MDM/pages/Partners/List/VenderDataGrid'
import { FieldValues } from 'react-hook-form'
import { useVenderStore } from '@stores/MDM/Partners/vender.store'
import { PartnersType } from '../Props'

function VenderList() {
  const [searchCondition, setSearchCondition] = useVenderStore((state) => [
    state.searchCondition,
    state.setSearchCondition,
  ])

  const onSubmit = (inputData: FieldValues) => {
    console.log('vender 검색', inputData)
    setSearchCondition(inputData)
  }

  return (
    <Page>
      <Stack spacing={3}>
        <ListHeader
          title="매입처 목록 조회"
          button={{
            text: '매입처 추가',
            link: To.MDMPartnersVenderCreate,
            sbkind: 'pages/MDM/Partners/Vender/Create',
          }}
          navigation={{
            home: To.MDMHome,
            menuList: ['매입처 관리'],
          }}
        />
        <PartnersSearchBox
          type={PartnersType.VENDER}
          onSubmit={onSubmit}
          defaultValues={searchCondition}
        />
        <VenderDataGrid />
      </Stack>
    </Page>
  )
}

export default VenderList
