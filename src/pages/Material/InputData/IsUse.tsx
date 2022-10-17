import { InputDataProps } from '@pages/Material/Props'
import Typography from '@components/Typography'
import React from 'react'
import InputSwitch from '@src/components/Switch/InputSwitch'

function IsUse({ disabled = false }: InputDataProps) {
  return (
    <div>
      <Typography variant="subtitle2" required>
        사용여부
      </Typography>
      <InputSwitch
        sx={{ marginTop: '8px' }}
        name={'isUse'}
        label={'주문금지'}
        disabled={disabled}
      />
    </div>
  )
}

export default IsUse
