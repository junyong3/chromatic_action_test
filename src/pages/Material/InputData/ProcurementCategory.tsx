import { InputDataProps } from '@pages/Material/Props'
import Typography from '@components/Typography'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'
import React from 'react'

function ProcurementCategory({ disabled = false }: InputDataProps) {
  const procurementCategoryOptions = [
    { label: '생산', value: '생산' },
    { label: '매입', value: '매입' },
  ]

  return (
    <div style={{ width: '100%' }}>
      <Typography required variant="subtitle2">
        조달 구분
      </Typography>
      <InputAutoComplete
        name={'procurementCategory'}
        sx={{ width: '100%', marginTop: '8px' }}
        options={procurementCategoryOptions}
        required
        disabled={disabled}
      />
    </div>
  )
}

export default ProcurementCategory
