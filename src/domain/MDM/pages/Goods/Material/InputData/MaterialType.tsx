import { InputDataProps } from '@domain/MDM/pages/Goods/Material/Props'
import Typography from '@components/Typography'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'
import React from 'react'

function MaterialType({ disabled = false }: InputDataProps) {
  const materialTypeOptions = [
    { label: '원재료', value: '원재료' },
    { label: '부재료', value: '부재료' },
    { label: '부자재', value: '부자재' },
  ]

  return (
    <div style={{ width: '100%' }}>
      <Typography required variant="subtitle2">
        자재 유형
      </Typography>
      <InputAutoComplete
        name={'materialType'}
        sx={{ width: '100%', marginTop: '8px' }}
        options={materialTypeOptions}
        required
        disabled={disabled}
      />
    </div>
  )
}

export default MaterialType
