import { InputDataProps } from '@pages/Material/Props'
import Typography from '@components/Typography'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'

function LeadTime({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '100%' }}>
      <Typography variant="subtitle2">리드타임(일)</Typography>
      <TextFieldElement
        name={'leadTime'}
        sx={{ width: '100%', marginTop: '8px' }}
        disabled={disabled}
        isNumber
      />
    </div>
  )
}

export default LeadTime
