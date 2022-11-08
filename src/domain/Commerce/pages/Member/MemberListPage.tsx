import Page from '@components/Page'
import { ListHeader } from '@compositions/Header'
import MemberDataGrid from './List/MemberDataGrid'
import MemberSearchBox from './List/MemberSearchBox'
import { To } from '@routes/To'
import { Stack } from '@mui/material'

function MemberListPage() {
  return (
    <Page>
      <Stack spacing={3}>
        <ListHeader
          title="회원 목록 조회"
          navigation={{
            home: To.CommerceHome,
            menuList: ['회원 관리'],
          }}
        />
        <MemberSearchBox />
        <MemberDataGrid />
      </Stack>
    </Page>
  )
}

export default MemberListPage
