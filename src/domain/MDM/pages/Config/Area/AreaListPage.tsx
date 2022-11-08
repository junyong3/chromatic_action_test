import { Stack } from '@mui/material'
import Page from '@components/Page'
import AreaDataGrid from './List/AreaDataGrid'
import AreaListHeader from './List/AreaListHeader'
import AreaSearchBox from './List/AreaSearchBox'

function AreaListPage() {
  return (
    <Page>
      <Stack spacing={3}>
        <AreaListHeader />
        <AreaSearchBox />
        <AreaDataGrid />
      </Stack>
    </Page>
  )
}
export default AreaListPage
