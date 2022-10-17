import { InputDataProps } from '@pages/Material/Props'
import Typography from '@components/Typography'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'

function MinDeliveryAllowablePeriod({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '100%' }}>
      <Typography required variant="subtitle2">
        출고허용기간(min)
      </Typography>
      <TextFieldElement
        name={'minDeliveryAllowablePeriod'}
        sx={{ width: '100%', marginTop: '8px' }}
        required
        disabled={disabled}
        isNumber
      />
    </div>
  )
}

export default MinDeliveryAllowablePeriod
