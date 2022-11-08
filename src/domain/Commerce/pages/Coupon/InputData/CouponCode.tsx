import { useMemo, useState } from 'react'
import { useFormContext, useFormState } from 'react-hook-form'
import { Box, Stack } from '@mui/material'
import TextFieldElement from '@components/TextField/InputTextField'
import Button from '@components/Button'
import Typography from '@components/Typography'
import InputRadio from '@components/Radio/InputRadio'
import Instance from '@api/Instance'
import { COMMERCE_COUPON_API_PATH } from '@api/path/Commerce/couponPath'
import { useMutationWrap } from '@queries/useMutation'
import InputSwitch from '@components/Switch/InputSwitch'
import { useParams } from 'react-router-dom'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { InputDataProps } from '../Props'
import { REGEXP } from '@constants/REGEXP'

function CouponCode({ disabled = false }: InputDataProps) {
  const couponCodeOptions = useMemo(
    () => [
      {
        label: '자동 생성',
        id: 'auto',
      },
      {
        label: '직접 입력',
        id: 'custom',
      },
    ],
    []
  )
  const { id } = useParams()
  const { mutate } = useMutationWrap()
  const { getValues, setValue, watch } = useFormContext()
  const { errors } = useFormState()
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false)
  const clickValidateCouponCode = () => {
    if (isValidCouponCode) return
    mutate(
      Instance.post(COMMERCE_COUPON_API_PATH.VALIDATE_COUPON_CODE, {
        name: watch('couponCode'),
      }),
      {
        onSuccess: ({ data }: any) => {
          setIsValidCouponCode(data.result as boolean)
        },
      }
    )
    console.log('couponCode', getValues('couponCode'))
  }

  const setIsActive = (e: React.SyntheticEvent, checked: boolean) => {
    console.log(e, checked)
    if (!id) return
    LoadingService.show()
    mutate(
      Instance.patch(COMMERCE_COUPON_API_PATH.SET_ACTIVE(id as string), {
        isActive: checked,
      }),
      {
        onSuccess: ({ data }: any) => {
          if (data.result)
            SnackbarService.show(
              `쿠폰이 ${checked ? '활성화' : '비활성화'}되었습니다.`
            )
          else {
            setValue('isActive', !checked)
          }
        },
        onError: () => {
          setValue('isActive', !checked)
        },
        onSettled: () => {
          LoadingService.close()
        },
      }
    )
  }

  return disabled ? (
    <Stack direction={'row'} alignItems={'center'} spacing={2} pt={4}>
      <Typography variant={'subtitle2'} required>
        쿠폰코드
      </Typography>
      <TextFieldElement name={'couponCode'} disabled sx={{ width: '150px' }} />
      <InputSwitch
        name={'isActive'}
        label={'활성화'}
        size={'small'}
        onChange={setIsActive}
      />
    </Stack>
  ) : (
    <Box pt={4}>
      <Typography variant={'subtitle2'} required>
        쿠폰코드
      </Typography>
      <Stack direction={'row'} alignItems={'center'} spacing={2} pt={1}>
        <InputRadio
          row
          name={'couponCodeType'}
          options={couponCodeOptions}
          onChange={() => setValue('couponCode', '')}
        />
        {watch('couponCodeType') !== 'auto' ? (
          <>
            <TextFieldElement
              name={'couponCode'}
              placeholder={
                watch('couponCodeType') === 'auto'
                  ? '자동 생성'
                  : '영문+숫자 조합 5~20자 입력 가능'
              }
              disabled={watch('couponCodeType') === 'auto'}
              inputProps={{
                maxLength: 20,
              }}
              validation={{
                validate: (value: string) => {
                  if (watch('couponCodeType') === 'auto') return true
                  else return REGEXP.COUPON_CODE.test(value)
                },
                // pattern: {
                //   value: REGEXP_COUPON_CODE,
                //   message: '영문+숫자 조합 5~20자를 입력하세요.',
                // },
              }}
              onChange={() => setIsValidCouponCode(false)}
              sx={{ width: '286px' }}
            />
            <Button
              variant={'contained'}
              size={'medium'}
              disabled={isValidCouponCode || !!errors.couponCode}
              onClick={clickValidateCouponCode}
            >
              {isValidCouponCode ? '사용가능' : '중복확인'}
            </Button>
          </>
        ) : null}
      </Stack>
    </Box>
  )
}

export default CouponCode
