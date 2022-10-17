import { InputDataProps } from '@pages/Material/Props'
import Typography from '@components/Typography'
import RadioButtonGroupElement from '@components/Radio/RadioButtonGroupElement'
import React from 'react'

function IsUseSingleBarcode({ disabled = false }: InputDataProps) {
  const isUseSingleBarcodeCheckboxList = [
    { label: '사용', id: '사용' },
    { label: '미사용', id: '미사용' },
  ]

  return (
    <div>
      <Typography variant="subtitle2" required>
        단일바코드 사용여부
      </Typography>
      <RadioButtonGroupElement
        name={'isUseSingleBarcode'}
        row
        options={isUseSingleBarcodeCheckboxList}
        disabled={true}
      />
    </div>
  )
}

export default IsUseSingleBarcode
