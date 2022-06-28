import React from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'
import JIcon from '@components/JIcon'
import { JIconType } from '@components/JIcon/JIcon'

type JIconCellProps<T> = {
  cellInfo: GridRenderCellParams<T>
  onCellClick?: (row: GridRenderCellParams<T>) => void
  iconName: JIconType
  fill?: string
  className?: string
  style?: React.CSSProperties
}

function JIconCell<T>(props: JIconCellProps<T>) {
  const { cellInfo, onCellClick, iconName, fill, className, style } = props
  return (
    <JIcon
      fill={fill}
      className={className}
      style={style}
      name={iconName}
      onClick={() => {
        onCellClick && onCellClick(cellInfo)
      }}
    />
  )
}

export default React.memo(JIconCell)
