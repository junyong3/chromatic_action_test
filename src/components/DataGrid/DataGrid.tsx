import React, { useState } from 'react'
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid'
import { DataGridProps } from './Props'
import NoRwoData from '@components/DataGrid/NoRwoData'

function DataGrid({ rows, columns, pageSize, ...props }: DataGridProps) {
  const [gridPageSize, setGridPageSize] = useState(pageSize || 10)

  const onPageSizeChange = (value: number) => {
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
      rows={rows}
      columns={columns}
      components={{
        NoRowsOverlay: NoRwoData,
      }}
      autoHeight={true}
      disableColumnSelector={true}
      pageSize={gridPageSize}
      onPageSizeChange={onPageSizeChange}
      rowsPerPageOptions={[5, 10, 50, 100]}
      {...props}
    />
  )
}

export default DataGrid
