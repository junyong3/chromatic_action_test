import { Link } from '@mui/material'
import React, { HTMLAttributeAnchorTarget } from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'

type LinkCellProps<T> = {
  cellInfo: GridRenderCellParams<T>
  onCellClick?: (row: GridRenderCellParams<T>) => void
  title?: string
  href?: string
  sbKind?: string
  target?: HTMLAttributeAnchorTarget
}

function LinkCell<T>(props: LinkCellProps<T>) {
  const {
    cellInfo,
    onCellClick,
    title,
    href,
    sbKind = 'pages/Home',
    target = '_blank',
  } = props
  return (
    <Link
      color="primary"
      underline={'hover'}
      target={target}
      href={href && href}
      data-sb-kind={sbKind}
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
