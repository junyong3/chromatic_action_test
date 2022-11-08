import { InputDataProps } from '@domain/MDM/pages/Goods/Material/Props'
import Typography from '@components/Typography'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'

function MaterialName({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '100%' }}>
      <Typography required variant="subtitle2">
        자재명
      </Typography>
      <TextFieldElement
        name={'materialName'}
        sx={{ width: '100%', marginTop: '8px' }}
        required
        disabled={disabled}
      />
    </div>
  )
}

export default MaterialName
