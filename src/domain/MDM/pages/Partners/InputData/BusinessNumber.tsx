import { Grid } from '@mui/material'
import { InputDataProps } from '@domain/MDM/pages/Partners/Props'
import InputTextField from '@components/TextField/InputTextField'
import Typography from '@components/Typography'

function BusinessNumber({ disabled = false }: InputDataProps) {
  return (
    <Grid item xs={4}>
      <Typography variant="subtitle2">사업자 번호</Typography>
      <InputTextField
        name={'businessNumber'}
        sx={{ width: '100%', mt: 1 }}
        placeholder={'사업자 번호'}
        disabled={disabled}
      />
    </Grid>
  )
}

export default BusinessNumber
