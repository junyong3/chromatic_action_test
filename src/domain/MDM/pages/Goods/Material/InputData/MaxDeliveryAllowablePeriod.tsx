import { InputDataProps } from '@domain/MDM/pages/Goods/Material/Props'
import Typography from '@components/Typography'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'

function MaxDeliveryAllowablePeriod({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '100%' }}>
      <Typography required variant="subtitle2">
        출고허용기간(max)
      </Typography>
      <TextFieldElement
        name={'maxDeliveryAllowablePeriod'}
        sx={{ width: '100%', marginTop: '8px' }}
        required
        disabled={disabled}
        isNumber
      />
    </div>
  )
}

export default MaxDeliveryAllowablePeriod
