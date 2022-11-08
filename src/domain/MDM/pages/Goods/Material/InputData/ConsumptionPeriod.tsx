import { InputDataProps } from '@domain/MDM/pages/Goods/Material/Props'
import Typography from '@components/Typography'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'

function ConsumptionPeriod({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '100%' }}>
      <Typography variant="subtitle2">소비 기간</Typography>
      <TextFieldElement
        name={'consumptionPeriod'}
        sx={{ width: '100%', marginTop: '8px' }}
        disabled={disabled}
        isNumber
      />
    </div>
  )
}

export default ConsumptionPeriod
