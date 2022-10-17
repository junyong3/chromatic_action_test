import React from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'

type NumberFormatCellProps<T> = {
  cellInfo: GridRenderCellParams<T>
  onCellClick?: (row: GridRenderCellParams<T>) => void
  locale?: string
  comma?: boolean
  unit?: string
}

function NumberFormatCell<T>(props: NumberFormatCellProps<T>) {
  const {
    cellInfo,
    onCellClick,
    unit = '',
    comma = true,
    locale = 'ko-KR',
  } = props
  const cellVal = cellInfo.row[cellInfo.field]
  const unitVal = comma ? Number(cellVal).toLocaleString(locale) : cellVal
  return (
    <div
      onClick={() => {
        onCellClick && onCellClick(cellInfo)
      }}
    >
      {unitVal}
      {unit}
    </div>
  )
}

export default React.memo(NumberFormatCell)
