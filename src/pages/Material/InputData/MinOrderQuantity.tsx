import Typography from '@components/Typography'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'
import { InputDataProps } from '@pages/Material/Props'

function MinOrderQuantity({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '32%' }}>
      <Typography variant="subtitle2">최소 발주수량</Typography>
      <TextFieldElement
        name={'minOrderQuantity'}
        sx={{ width: '100%', marginTop: '8px' }}
        disabled={disabled}
        isNumber
      />
    </div>
  )
}

export default MinOrderQuantity
