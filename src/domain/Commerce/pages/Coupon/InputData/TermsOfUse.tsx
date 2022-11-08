import Typography from '@components/Typography'
import { Box, Stack } from '@mui/material'
import CheckboxButtonGroupElement from '@components/Checkbox/CheckboxButtonGroupElement'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'
import { InputDataProps } from '../Props'

function TermsOfUse({ disabled = false }: InputDataProps) {
  return (
    <Box pt={4}>
      <Typography variant="subtitle2">사용 조건</Typography>
      <Stack direction={'row'} alignItems={'center'} spacing={1.5} mt={1}>
        <CheckboxButtonGroupElement
          row
          name={'termsOfUse.type'}
          options={[{ label: '최대 할인금액', id: 'maxDiscountPrice' }]}
          disabled={disabled}
        />
        <TextFieldElement
          type={'number'}
          name={'termsOfUse.maxDiscountPrice'}
          disabled={disabled}
          sx={{ width: 230 }}
          placeholder={'할인금액 입력'}
          inputProps={{
            min: 0,
            max: 100000,
          }}
          validation={{
            max: {
              value: 100000,
              message: '100,000원 미만 입력하세요.',
            },
          }}
        />
        <Typography
          variant="subtitle2"
          color={disabled ? 'gray.light' : 'gray'}
        >
          원
        </Typography>
        <Typography variant="subtitle2" style={{ color: 'gray.light' }}>
          {'※100,000원 이상 입력 불가'}
        </Typography>
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={1.5}
        sx={{ marginTop: '8px' }}
      >
        <CheckboxButtonGroupElement
          row
          name={'termsOfUse.type'}
          options={[{ label: '최소 결제금액', id: 'minPaymentPrice' }]}
          disabled={disabled}
        />
        <TextFieldElement
          type={'number'}
          name={'termsOfUse.minPaymentPrice'}
          disabled={disabled}
          sx={{ width: 230 }}
          placeholder={'주문금액 입력'}
          inputProps={{
            min: 5000,
          }}
          validation={{
            min: {
              value: 5000,
              message: '5000원 이상 입력하세요.',
            },
          }}
        />
        <Typography
          variant="subtitle2"
          color={disabled ? 'gray.light' : 'gray'}
        >
          원
        </Typography>
        <Typography variant="subtitle2" color={'gray.light'}>
          {'※5,000원 미만 입력 불가'}
        </Typography>
      </Stack>
    </Box>
  )
}

export default TermsOfUse
