import { DataGridProps as MuiDataGridProps } from '@mui/x-data-grid'

type CustomProps = {
  useMultiline?: boolean
}

export type DataGridProps = MuiDataGridProps & CustomProps
