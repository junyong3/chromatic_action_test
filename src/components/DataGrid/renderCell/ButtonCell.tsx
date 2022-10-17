import React from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'
import Button from '@components/Button'

type ButtonCellProps<T> = {
  cellInfo: GridRenderCellParams<T>
  onCellClick?: (row: GridRenderCellParams<T>) => void
  text: string
  disabled?: boolean
  color?: 'primary' | 'error'
}

function ButtonCell<T>(props: ButtonCellProps<T>) {
  const {
    cellInfo,
    onCellClick,
    text,
    disabled,
    color = 'primary',
    ...prop
  } = props
  return (
    <Button
      {...prop}
      variant="text"
      color={color}
      size={'small'}
      onClick={() => {
        onCellClick && onCellClick(cellInfo)
      }}
      disabled={disabled}
      sx={{
        cursor: 'pointer',
        padding: 0,
        minWidth: 0,
        '> .MuiTouchRipple-root': { display: 'none' },
        '&:hover': {
          textDecoration: 'underline',
          backgroundColor: 'transparent',
        },
      }}
    >
      {text ?? cellInfo.row[cellInfo.field]}
    </Button>
  )
}

export default React.memo(ButtonCell)
