import Typography from '@components/Typography'
import { Box } from '@mui/material'
import RadioButtonGroupElement from '@components/Radio/RadioButtonGroupElement'
import React from 'react'
import { useCategoryStore } from '@stores/category.store'
import { useFormContext } from 'react-hook-form'
import { Stack } from '@mui/system'
import DateTimePickerElement from '@components/DatePicker/DateTimePickerElement'
import { Status } from '@domain/Commerce/pages/Category/Product/Props'

function ExposureState() {
  const selectedNode = useCategoryStore((state) => state.selectedNode)
  const exposureRadioOptionList = [
    { label: '미노출', id: Status.disabled },
    { label: '예약 노출', id: Status.reserved },
    {
      label: '즉시 노출',
      id: Status.enabled,
      disabled: selectedNode?.type === 'new',
    },
  ]

  const { watch, unregister } = useFormContext()

  const isReservation = watch('status') === Status.reserved

  const onChangeRadio = () => {
    if (watch('status') !== Status.reserved) {
      unregister(['displayStartAt', 'displayEndAt'], {
        keepDefaultValue: true,
      })
    }
  }

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
          onChange={onChangeRadio}
        />
      </Box>

      {isReservation ? (
        <Box pt={4}>
          <Typography required variant="subtitle2" pb={1}>
            예약 설정
          </Typography>
          <Stack direction={'row'}>
            <DateTimePickerElement
              name={'displayStartAt'}
              label={'시작일자'}
              inputFormat={'YYYY-MM-DD HH:mm:ss'}
              validation={{
                required: true,
              }}
            />
            <div style={{ margin: '12px' }}>~</div>
            <DateTimePickerElement
              name={'displayEndAt'}
              label={'종료일자'}
              inputFormat={'YYYY-MM-DD HH:mm:ss'}
              disableFuture={false}
              validation={{
                required: true,
              }}
            />
          </Stack>
        </Box>
      ) : null}
    </>
  )
}

export default ExposureState
