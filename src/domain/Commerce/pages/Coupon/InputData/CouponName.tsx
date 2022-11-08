import Typography from '@components/Typography'
import { Box, Stack } from '@mui/material'
import TextFieldElement from '@components/TextField/InputTextField'
import { InputDataProps } from '../Props'
import { REGEXP } from '@constants/REGEXP'

function CouponName({ disabled = false }: InputDataProps) {
  return (
    <>
      <Box pt={4}>
        <Typography required variant="subtitle2" mb={1}>
          운영용 쿠폰명
        </Typography>
        <TextFieldElement
          name={'couponName.internal'}
          sx={{ width: '533px' }}
          disabled={disabled}
          placeholder={'한글/영문 3자~30자까지 입력 가능'}
          inputProps={{
            maxLength: 30,
          }}
          validation={{
            required: {
              value: true,
              message: '쿠폰명을 입력해 주세요.',
            },
            minLength: {
              value: 3,
              message: '3자 이상 입력해 주세요.',
            },
          }}
        />
      </Box>
      <Box pt={4}>
        <Typography required variant="subtitle2">
          고객용 쿠폰명
        </Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={2} pt={1}>
          <TextFieldElement
            name={'couponName.customer'}
            sx={{ width: '376px' }}
            disabled={disabled}
            placeholder={'한글 3자~20자까지 입력 가능'}
            inputProps={{
              maxLength: 20,
            }}
            validation={{
              required: {
                value: true,
                message: '고객에게 노출되는 쿠폰명을 입력해 주세요.',
              },
              minLength: {
                value: 3,
                message: '한글 3자 이상 입력해 주세요.',
              },
              pattern: {
                value: REGEXP.COUPON_NAME_CUSTOMER,
                message: '영문은 사용할 수 없습니다. 한글로 입력해 주세요.',
              },
            }}
          />
          <Typography variant="subtitle2" style={{ color: 'gray.light' }}>
            ※고객에게 노출되는 쿠폰명에 특수문자 사용을 지양합니다.
          </Typography>
        </Stack>
      </Box>
    </>
  )
}

export default CouponName
