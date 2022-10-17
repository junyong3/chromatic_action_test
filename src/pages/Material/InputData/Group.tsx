import Typography from '@components/Typography'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'
import React from 'react'
import { InputDataProps } from '@pages/Material/Props'

function Group({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '100%' }}>
      <Typography required variant="subtitle2">
        군
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

export default Group
