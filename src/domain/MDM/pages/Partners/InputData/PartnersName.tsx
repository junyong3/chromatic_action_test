import { Grid } from '@mui/material'
import { InputDataProps } from '@domain/MDM/pages/Partners/Props'
import InputTextField from '@components/TextField/InputTextField'
import Typography from '@components/Typography'

function PartnersName({ name = 'name', disabled = false }: InputDataProps) {
  return (
    <Grid item xs={4}>
      <Typography required variant="subtitle2">
        거래처 명
      </Typography>
      <InputTextField
        name={name}
        sx={{ width: '100%', mt: 1 }}
        required
        placeholder={'거래처 명'}
        disabled={disabled}
      />
    </Grid>
  )
}

export default PartnersName
