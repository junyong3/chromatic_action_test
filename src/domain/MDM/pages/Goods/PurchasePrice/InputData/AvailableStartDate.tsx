import { Grid } from '@mui/material'
import { InputDataProps } from '@domain/MDM/pages/Partners/Props'
import Typography from '@components/Typography'
import InputDatePicker from '@components/DatePicker/InputDatePicker'

function AvailableStartDate({
  name = 'availableStartDate',
  disabled = false,
}: InputDataProps) {
  return (
    <>
      <Grid item xs={4}>
        <Typography required variant="subtitle2" mb={1}>
          적용 시작일
        </Typography>
        <InputDatePicker
          data-chromatic={'ignore'}
          name={name}
          label={'날짜'}
          inputFormat={'YYYY-MM-DD'}
          validation={{
            required: {
              value: true,
              message: '날짜를 입력하세요',
            },
            validate: {
              valueCheck: (value) => {
                if (value === 'Invalid Date') return '날짜 형식을 확인해주세요'
              },
            },
          }}
          disabled={disabled}
          inputProps={{ sx: { width: '100%' } }}
        />
      </Grid>
    </>
  )
}

export default AvailableStartDate
