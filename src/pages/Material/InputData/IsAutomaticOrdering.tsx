import { InputDataProps } from '@pages/Material/Props'
import Typography from '@components/Typography'
import RadioButtonGroupElement from '@components/Radio/RadioButtonGroupElement'
import React from 'react'

function IsAutomaticOrdering({ disabled = false }: InputDataProps) {
  const isAutomaticOrderingCheckboxList = [
    { label: '자동', id: '자동' },
    { label: '수동', id: '수동' },
  ]

  return (
    <div>
      <Typography variant="subtitle2">자동발주 여부</Typography>
      <RadioButtonGroupElement
        name={'isAutomaticOrdering'}
        row
        options={isAutomaticOrderingCheckboxList}
        disabled={disabled}
      />
    </div>
  )
}

export default IsAutomaticOrdering
