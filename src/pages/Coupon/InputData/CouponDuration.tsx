import { useEffect } from 'react'
import RadioButtonGroupElement from '@components/Radio/RadioButtonGroupElement'
import { Box, Stack } from '@mui/material'
import DateTimePickerElement from '@components/DatePicker/DateTimePickerElement'
import TextFieldElement from '@components/TextField/InputTextField'
import Typography from '@components/Typography'
import { useFormContext } from 'react-hook-form'
import { InputDataProps } from '../Props'

function CouponDuration({ disabled = false }: InputDataProps) {
  const { watch, setError, clearErrors } = useFormContext()
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.includes('couponDuration')) {
        const {
          couponDuration: { type, duration },
        } = value
        clearErrors([
          'couponDuration.duration.startDate',
          'couponDuration.duration.endDate',
        ])
        if (type === 'duration') {
          if (!duration.startDate)
            setError('couponDuration.duration.startDate', {
              type: 'required',
            })
          if (!duration.endDate)
            setError('couponDuration.duration.endDate', {
              type: 'required',
            })
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setError, clearErrors])
  return (
    <Box pt={4}>
      <Typography variant={'subtitle2'} required>
        쿠폰 사용 기간
      </Typography>
      <Stack direction={'row'} alignItems={'center'} spacing={2} pt={1}>
        <div style={{ flex: 2 }}>
          <RadioButtonGroupElement
            name={'couponDuration.type'}
            options={[{ label: '시작/종료 설정', id: 'duration' }]}
            disabled={disabled}
          />
          <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
            <DateTimePickerElement
              name={'couponDuration.duration.startDate'}
              label={'시작일자'}
              inputFormat={'YYYY-MM-DD HH:mm:ss'}
              disabled={disabled || watch('couponDuration.type') !== 'duration'}
            />
            <Typography
              variant="body1"
              color={disabled ? 'gray.light' : 'gray'}
            >
              ~
            </Typography>
            <DateTimePickerElement
              name={'couponDuration.duration.endDate'}
              label={'종료일자'}
              inputFormat={'YYYY-MM-DD HH:mm:ss'}
              disabled={disabled || watch('couponDuration.type') !== 'duration'}
            />
          </Stack>
        </div>
        <div style={{ flex: 1 }}>
          <RadioButtonGroupElement
            name={'couponDuration.type'}
            options={[{ label: '유효기간 설정', id: 'validDayFromDownload' }]}
            disabled={disabled}
          />
          <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
            <Typography
              variant={'body1'}
              color={disabled ? 'rgba(0, 0, 0, 0.38)' : 'gray'}
            >
              다운로드 시점부터
            </Typography>
            <TextFieldElement
              name={'couponDuration.validDayFromDownload'}
              sx={{ width: '150px', marginLeft: '12px' }}
              disabled={
                disabled ||
                watch('couponDuration.type') !== 'validDayFromDownload'
              }
              validation={{
                validate: (value) => {
                  if (watch('couponDuration.type') !== 'validDayFromDownload')
                    return true
                  else return !!value
                },
              }}
            />
            <Typography
              variant={'body1'}
              color={disabled ? 'rgba(0, 0, 0, 0.38)' : 'gray'}
            >
              일
            </Typography>
          </Stack>
        </div>
      </Stack>
    </Box>
  )
}

export default CouponDuration
