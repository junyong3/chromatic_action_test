import { InputDataProps } from '@domain/MDM/pages/Goods/Material/Props'
import Typography from '@components/Typography'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'
import React from 'react'

function Ph3({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '100%' }}>
      <Typography required variant="subtitle2">
        Ph3
      </Typography>
      <InputAutoComplete
        name={'group'}
        sx={{ width: '100%', marginTop: '8px' }}
        options={[]}
        required
        disabled={disabled}
      />
    </div>
  )
}

export default Ph3
