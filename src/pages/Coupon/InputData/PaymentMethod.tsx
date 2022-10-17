import { useFormContext } from 'react-hook-form'
import Typography from '@components/Typography'
import { Box, Stack } from '@mui/material'
import SelectElement from '@components/Select/SelectElement'
import TextFieldElement from '@components/TextField/InputTextField'
import DateTimePickerElement from '@components/DatePicker/DateTimePickerElement'
import React from 'react'
import { InputDataProps } from '../Props'

function PaymentMethod({ disabled = false }: InputDataProps) {
  const { watch } = useFormContext()

  return (
    <Box pt={4}>
      <Typography variant="subtitle2">지급 방식</Typography>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={1.5}
        sx={{ marginTop: '8px' }}
      >
        <SelectElement
          name={'paymentMethod.type'}
          sx={{ width: 150, marginRight: '60px' }}
          options={[
            { id: 'download', label: '다운로드 형' },
            { id: 'autoServe', label: '자동 지급형' },
            { id: 'register', label: '등록형' },
          ]}
          disabled={disabled}
        />
        {watch('paymentMethod.type') === 'download' ? (
          <>
            <Typography
              variant="body1"
              color={disabled ? 'gray.light' : 'gray'}
            >
              선착순 지급 제한
            </Typography>
            <TextFieldElement
              name={'paymentMethod.download.firstCome'}
              sx={{ width: 150 }}
              disabled={disabled}
            />
            <Typography variant="subtitle2" style={{ color: 'gray.light' }}>
              ※ 숫자 입력 안하면 제한 없이 다운로드 가능
            </Typography>
          </>
        ) : null}
      </Stack>
      {watch('paymentMethod.type') === 'download' ? (
        <Stack
          direction={'row'}
          alignItems={'center'}
          spacing={1.5}
          sx={{ marginTop: '8px' }}
        >
          <Typography
            variant="body1"
            color={disabled ? 'gray.light' : 'gray'}
            sx={{ marginLeft: '225px' }}
          >
            다운로드 가능 시간
          </Typography>
          <DateTimePickerElement
            name={'paymentMethod.download.duration.startDate'}
            label={'시작일자'}
            inputFormat={'YYYY-MM-DD HH:mm:ss'}
            disabled={disabled}
          />
          <Typography variant="body1" color={disabled ? 'gray.light' : 'gray'}>
            ~
          </Typography>
          <DateTimePickerElement
            name={'paymentMethod.download.duration.endDate'}
            label={'종료일자'}
            inputFormat={'YYYY-MM-DD HH:mm:ss'}
            disabled={disabled}
          />
        </Stack>
      ) : null}
    </Box>
  )
}

export default PaymentMethod
