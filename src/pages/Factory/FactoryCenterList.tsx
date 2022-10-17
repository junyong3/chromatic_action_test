import { Stack } from '@mui/material'
import Page from '@src/components/Page'
import FactoryCenterDataGrid from '@pages/Factory/List/FactoryCenterDataGrid'
import FactoryCenterHeader from '@pages/Factory/List/FactoryCenterHeader'
import FactoryCenterSearchBox from '@pages/Factory/List/FactoryCenterSearchBox'

function FactoryCenterList() {
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
export default FactoryCenterList
