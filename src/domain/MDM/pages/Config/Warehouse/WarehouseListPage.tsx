import { Stack } from '@mui/material'
import WarehouseListHeader from '@domain/MDM/pages/Config/Warehouse/List/WarehouseListHeader'
import WarehouseSearchBox from '@domain/MDM/pages/Config/Warehouse/List/WarehouseSearchBox'
import WarehouseDataGrid from '@domain/MDM/pages/Config/Warehouse/List/WarehouseDataGrid'
import Page from '@components/Page'

function WarehouseListPage() {
  return (
    <Page>
      <Stack spacing={3}>
        <WarehouseListHeader />
        <WarehouseSearchBox />
        <WarehouseDataGrid />
      </Stack>
    </Page>
  )
}
export default WarehouseListPage
