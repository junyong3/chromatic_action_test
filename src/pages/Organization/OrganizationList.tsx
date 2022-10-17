import { Stack } from '@mui/material'
import Page from '@src/components/Page'
import OrganizationListHeader from '@pages/Organization/List/OrganizationListHeader'
import OrganizationSearchBox from '@pages/Organization/List/OrganizationSearchBox'
import OrganizationDataGrid from '@pages/Organization/List/OrganizationDataGrid'

function OrganizationList() {
  return (
    <Page>
      <Stack spacing={3}>
        <OrganizationListHeader />
        <OrganizationSearchBox />
        <OrganizationDataGrid />
      </Stack>
    </Page>
  )
}
export default OrganizationList
