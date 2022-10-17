import { InputDataProps } from '@pages/Material/Props'
import Typography from '@components/Typography'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'

function ShelfLife({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '100%' }}>
      <Typography required variant="subtitle2">
        유통 기간
      </Typography>
      <TextFieldElement
        name={'shelfLife'}
        sx={{ width: '100%', marginTop: '8px' }}
        required
        disabled={disabled}
        isNumber
      />
    </div>
  )
}

export default ShelfLife
