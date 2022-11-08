import { Stack } from '@mui/material'
import Page from '@components/Page'
import HealthCertificateDataGrid from './List/HealthCertificateDataGrid'
import HealthCertificateListHeader from './List/HealthCertificateListHeader'
import HealthCertificateSearchBox from './List/HealthCertificateSearchBox'

function HealthCertificateListPage() {
  return (
    <Page>
      <Stack spacing={3}>
        <HealthCertificateListHeader />
        <HealthCertificateSearchBox />
        <HealthCertificateDataGrid />
      </Stack>
    </Page>
  )
}
export default HealthCertificateListPage
