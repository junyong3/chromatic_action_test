import Typography from '@components/Typography'
import { Box } from '@mui/material'
import RadioButtonGroupElement from '@components/Radio/RadioButtonGroupElement'
import React from 'react'
import { useCategoryStore } from '@stores/category.store'
import { Status } from '@domain/Commerce/pages/Category/Brand/Props'

function ExposureState() {
  const selectedNode = useCategoryStore((state) => state.selectedNode)
  const exposureRadioOptionList = [
    { label: '미노출', id: Status.disabled },
    {
      label: '즉시 노출',
      id: Status.enabled,
      disabled: selectedNode?.type === 'new',
    },
  ]

  return (
    <>
      <Box pt={4}>
        <Typography variant="subtitle2" required>
          노출 상태
        </Typography>
        <RadioButtonGroupElement
          name={'status'}
          options={exposureRadioOptionList}
          row
        />
      </Box>
    </>
  )
}

export default ExposureState
