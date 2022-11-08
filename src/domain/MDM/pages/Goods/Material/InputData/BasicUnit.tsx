import { InputDataProps } from '@domain/MDM/pages/Goods/Material/Props'
import Typography from '@components/Typography'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'
import React from 'react'

function BasicUnit({ disabled = false }: InputDataProps) {
  const basicUnitOptions = [
    { label: '팔레트', value: '팔레트' },
    { label: '박스', value: '박스' },
    { label: 'ea', value: 'ea' },
    { label: 'kg', value: 'kg' },
    { label: 'L', value: 'L' },
    { label: 'roll', value: 'roll' },
  ]

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="subtitle2">기본 단위</Typography>
      <InputAutoComplete
        name={'basicUnit'}
        sx={{ width: '100%', marginTop: '8px' }}
        options={basicUnitOptions}
        disabled={disabled}
      />
    </div>
  )
}

export default BasicUnit
