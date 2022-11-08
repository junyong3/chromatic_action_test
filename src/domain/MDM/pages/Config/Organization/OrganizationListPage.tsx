import { Stack } from '@mui/material'
import Page from '@components/Page'
import OrganizationListHeader from '@domain/MDM/pages/Config/Organization/List/OrganizationListHeader'
import OrganizationSearchBox from '@domain/MDM/pages/Config/Organization/List/OrganizationSearchBox'
import OrganizationDataGrid from '@domain/MDM/pages/Config/Organization/List/OrganizationDataGrid'

function OrganizationListPage() {
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
export default OrganizationListPage
