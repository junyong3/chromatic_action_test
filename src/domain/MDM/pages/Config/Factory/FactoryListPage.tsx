import { Stack } from '@mui/material'
import Page from '@components/Page'
import FactoryCenterDataGrid from '@domain/MDM/pages/Config/Factory/List/FactoryCenterDataGrid'
import FactoryCenterHeader from '@domain/MDM/pages/Config/Factory/List/FactoryCenterHeader'
import FactoryCenterSearchBox from '@domain/MDM/pages/Config/Factory/List/FactoryCenterSearchBox'

function FactoryListPage() {
  return (
    <Page>
      <Stack spacing={3}>
        <FactoryCenterHeader />
        <FactoryCenterSearchBox />
        <FactoryCenterDataGrid />
      </Stack>
    </Page>
  )
}
export default FactoryListPage
