import { Grid } from '@mui/material'
import { InputDataProps } from '@domain/MDM/pages/Partners/Props'
import InputTextField from '@components/TextField/InputTextField'
import Typography from '@components/Typography'

function Price({ name = 'price', disabled = false }: InputDataProps) {
  return (
    <>
      <Grid item xs={4}>
        <Typography required variant="subtitle2" mb={1}>
          가격 설정
        </Typography>
        <InputTextField
          isNumber
          label={'구매단가'}
          name={name}
          placeholder={'원'}
          disabled={disabled}
          sx={{
            width: '100%',
          }}
        />
      </Grid>
    </>
  )
}

export default Price
