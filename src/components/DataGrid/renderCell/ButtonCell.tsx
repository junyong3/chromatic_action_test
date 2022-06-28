import React from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'
import Button from '@components/Button'

type ButtonCellProps<T> = {
  cellInfo: GridRenderCellParams<T>
  onCellClick?: (row: GridRenderCellParams<T>) => void
  text: string
}

function ButtonCell<T>(props: ButtonCellProps<T>) {
  const { cellInfo, onCellClick, text } = props
  return (
    <Button
      variant={'contained'}
      color="primary"
      size={'small'}
      onClick={() => {
        onCellClick && onCellClick(cellInfo)
      }}
      sx={{ cursor: 'pointer' }}
    >
      {text ?? cellInfo.row[cellInfo.field]}
    </Button>
  )
}

export default React.memo(ButtonCell)
