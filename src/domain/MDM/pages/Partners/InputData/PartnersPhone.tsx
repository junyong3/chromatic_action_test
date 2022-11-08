import { Grid } from '@mui/material'
import { InputDataProps } from '@domain/MDM/pages/Partners/Props'
import InputTextField from '@components/TextField/InputTextField'
import Typography from '@components/Typography'

function PartnersPhone({ disabled = false }: InputDataProps) {
  return (
    <Grid item xs={4}>
      <Typography variant="subtitle2" mb={1}>
        전화번호
      </Typography>
      <InputTextField
        name={'phone'}
        sx={{ width: '100%' }}
        placeholder={'전화번호'}
        disabled={disabled}
      />
    </Grid>
  )
}

export default PartnersPhone
