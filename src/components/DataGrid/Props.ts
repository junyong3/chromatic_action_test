import { DataGridProps as MuiDataGridProps } from '@mui/x-data-grid'

type CustomProps = {
  useMultiline?: boolean
  pageSizeChangeEvent?: (pageSize: number) => void
  toolBar?: boolean
}

export type DataGridProps = MuiDataGridProps & CustomProps
