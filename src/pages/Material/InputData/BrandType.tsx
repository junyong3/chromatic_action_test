import { InputDataProps } from '@pages/Material/Props'
import Typography from '@components/Typography'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'
import React from 'react'

function BrandType({ disabled = false }: InputDataProps) {
  const brandTypeOptions = [
    { label: '퓨어', value: '퓨어' },
    { label: '안전', value: '안전' },
    { label: '초신선', value: '초신선' },
    { label: '베이비', value: '베이비' },
  ]

  return (
    <div style={{ width: '100%' }}>
      <Typography required variant="subtitle2">
        브랜드 구분
      </Typography>
      <InputAutoComplete
        name={'brandType'}
        sx={{ width: '100%', marginTop: '8px' }}
        options={brandTypeOptions}
        required
        disabled={disabled}
      />
    </div>
  )
}

export default BrandType
