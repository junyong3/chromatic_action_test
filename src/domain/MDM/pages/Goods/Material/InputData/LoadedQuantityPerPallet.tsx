import { InputDataProps } from '@domain/MDM/pages/Goods/Material/Props'
import Typography from '@components/Typography'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'

function LoadedQuantityPerPallet({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '100%' }}>
      <Typography variant="subtitle2">파레트당 적재수량</Typography>
      <TextFieldElement
        name={'loadedQuantityPerPallet'}
        sx={{ width: '100%', marginTop: '8px' }}
        disabled={disabled}
        isNumber
      />
    </div>
  )
}

export default LoadedQuantityPerPallet
