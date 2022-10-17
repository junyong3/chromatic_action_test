import React, { useState } from 'react'
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid'
import { DataGridProps } from './Props'
import NoRwoData from '@components/DataGrid/NoRwoData'
import CustomToolbar from '@components/DataGrid/CustomToolBar'

function DataGrid({
  rows,
  columns,
  pageSize,
  autoHeight = true,
  toolBar = false,
  ...props
}: DataGridProps) {
  const { pageSizeChangeEvent } = props
  const [gridPageSize, setGridPageSize] = useState(pageSize || 10)

  const onPageSizeChange = (value: number) => {
    pageSizeChangeEvent && pageSizeChangeEvent(value)
    setGridPageSize(value)
  }

  if (props.useMultiline) {
    props.getRowHeight = () => 'auto'
    props.sx = {
      '& .MuiDataGrid-cell': {
        py: '15.5px',
      },
    }
  }

  return (
    <MuiDataGrid
      {...props}
      rows={rows}
      columns={columns}
      components={{
        ...props.components,
        ...(toolBar && { Toolbar: CustomToolbar }),
        NoRowsOverlay: NoRwoData,
      }}
      autoHeight={autoHeight}
      pageSize={gridPageSize}
      onPageSizeChange={onPageSizeChange}
      rowsPerPageOptions={[5, 10, 50, 100]}
    />
  )
}

export default DataGrid
