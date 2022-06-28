import { Link } from '@mui/material'
import React from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'

type LinkCellProps<T> = {
  cellInfo: GridRenderCellParams<T>
  onCellClick?: (row: GridRenderCellParams<T>) => void
  title?: string
  href?: string
}

function LinkCell<T>(props: LinkCellProps<T>) {
  const { cellInfo, onCellClick, title, href } = props
  return (
    <Link
      color="primary"
      underline={'hover'}
      href={href && href}
      onClick={() => {
        onCellClick && onCellClick(cellInfo)
      }}
      sx={{ cursor: 'pointer' }}
    >
      {title ?? cellInfo.row[cellInfo.field]}
    </Link>
  )
}

export default React.memo(LinkCell)
