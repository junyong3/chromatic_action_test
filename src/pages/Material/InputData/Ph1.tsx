import { InputDataProps } from '@pages/Material/Props'
import Typography from '@components/Typography'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'
import React from 'react'

function Ph1({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '100%' }}>
      <Typography required variant="subtitle2">
        Ph1
      </Typography>
      <InputAutoComplete
        name={'ph1'}
        sx={{ width: '100%', marginTop: '8px' }}
        options={[]}
        required
        disabled={disabled}
      />
    </div>
  )
}

export default Ph1
