import Typography from '@components/Typography'
import CheckboxButtonGroupElement from '@components/Checkbox/CheckboxButtonGroupElement'
import React from 'react'
import { InputDataProps } from '@domain/MDM/pages/Goods/Material/Props'

function AvailableDays({ disabled = false }: InputDataProps) {
  const availableDaysCheckboxList = [
    { label: '월', id: '월' },
    { label: '화', id: '화' },
    { label: '수', id: '수' },
    { label: '목', id: '목' },
    { label: '금', id: '금' },
    { label: '토', id: '토' },
    { label: '일', id: '일' },
  ]

  return (
    <div>
      <Typography variant="subtitle2">입고가능 요일</Typography>
      <CheckboxButtonGroupElement
        row
        name={'availableDays'}
        options={availableDaysCheckboxList}
        disabled={disabled}
      />
    </div>
  )
}

export default AvailableDays
