import { InputDataProps } from '@domain/MDM/pages/Goods/Material/Props'
import Typography from '@components/Typography'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'

function OrderUnitQuantity({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '100%' }}>
      <Typography variant="subtitle2">발주단위 수량</Typography>
      <TextFieldElement
        name={'orderUnitQuantity'}
        sx={{ width: '100%', marginTop: '8px' }}
        disabled={disabled}
        isNumber
      />
    </div>
  )
}

export default OrderUnitQuantity
