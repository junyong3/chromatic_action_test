import { InputDataProps } from '@domain/MDM/pages/Goods/Material/Props'
import Typography from '@components/Typography'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'
import React from 'react'

function SupplyStatus({ disabled = false }: InputDataProps) {
  const supplyStatusOptions = [
    { label: '사용', value: '사용' },
    { label: '미사용', value: '미사용' },
    { label: '시즌오프', value: '시즌오프' },
    { label: '시즌중', value: '시즌중' },
  ]

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="subtitle2" required>
        공급 상태
      </Typography>
      <InputAutoComplete
        name={'supplyStatus'}
        sx={{ width: '100%', marginTop: '8px' }}
        options={supplyStatusOptions}
        required
        disabled={disabled}
      />
    </div>
  )
}

export default SupplyStatus
