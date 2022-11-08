import Typography from '@components/Typography'
import { Box, Stack } from '@mui/material'
import RadioButtonGroupElement from '@components/Radio/RadioButtonGroupElement'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'
import { InputDataProps } from '../Props'

function BenefitType({ disabled = false }: InputDataProps) {
  return (
    <Box pt={4}>
      <Typography variant="subtitle2">혜택 유형</Typography>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={1.5}
        sx={{ marginTop: '8px' }}
      >
        <RadioButtonGroupElement
          name={'benefitType.type'}
          options={[{ label: '정액', id: 'price' }]}
          disabled={disabled}
        />
        <TextFieldElement
          type={'number'}
          name={'benefitType.price'}
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
          ※100,000원 이상 입력 불가
        </Typography>
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={1.5}
        sx={{ marginTop: '8px' }}
      >
        <RadioButtonGroupElement
          name={'benefitType.type'}
          options={[{ label: '정률', id: 'percent' }]}
          disabled={disabled}
        />
        <TextFieldElement
          name={'benefitType.percent'}
          disabled={disabled}
          sx={{ width: 230 }}
          placeholder={'할인율 입력'}
          inputProps={{
            min: 0,
            max: 70,
          }}
          validation={{
            max: {
              value: 70,
              message: '70% 미만 입력하세요.',
            },
          }}
        />
        <Typography
          variant="subtitle2"
          color={disabled ? '#gray.light' : 'gray'}
        >
          %
        </Typography>
        <Typography variant="subtitle2" style={{ color: '#gray.light' }}>
          ※70 이상 입력 불가
        </Typography>
      </Stack>
    </Box>
  )
}

export default BenefitType
