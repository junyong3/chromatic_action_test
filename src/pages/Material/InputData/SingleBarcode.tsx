import { InputDataProps } from '@pages/Material/Props'
import Typography from '@components/Typography'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'

function SingleBarcode({ disabled = false }: InputDataProps) {
  return (
    <div>
      <Typography variant="subtitle2">단일바코드 사용 시 사용바코드</Typography>
      <TextFieldElement
        name={'singleBarcode'}
        sx={{ width: '100%', marginTop: '8px' }}
        disabled={disabled}
        isNumber
      />
    </div>
  )
}

export default SingleBarcode
