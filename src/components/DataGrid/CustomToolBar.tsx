import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  // GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid'

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      {/*<GridToolbarDensitySelector />*/}
    </GridToolbarContainer>
  )
}

export default CustomToolbar
