import { Stack } from '@mui/material'
import Page from '@components/Page'
import LocationDataGrid from './List/LocationDataGrid'
import LocationListHeader from './List/LocationListHeader'
import LocationSearchBox from './List/LocationSearchBox'

function LocationListPage() {
  return (
    <Page>
      <Stack spacing={3}>
        <LocationListHeader />
        <LocationSearchBox />
        <LocationDataGrid />
      </Stack>
    </Page>
  )
}
export default LocationListPage
