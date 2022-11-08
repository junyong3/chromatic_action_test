import Page from '@components/Page'
import PointListHeader from '@domain/Commerce/pages/Point/List/PointListHeader'
import PointSearchBox from '@domain/Commerce/pages/Point/List/PointSearchBox'
import PointDataGrid from '@domain/Commerce/pages/Point/List/PointDataGrid'
import { Stack } from '@mui/material'

function PointList() {
  return (
    <Page>
      <Stack spacing={3}>
        <PointListHeader />
        <PointSearchBox />
        <PointDataGrid />
      </Stack>
    </Page>
  )
}

export default PointList
