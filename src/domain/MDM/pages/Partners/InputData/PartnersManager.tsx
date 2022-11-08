import { Grid } from '@mui/material'
import { InputDataProps } from '@domain/MDM/pages/Partners/Props'
import InputTextField from '@components/TextField/InputTextField'
import Typography from '@components/Typography'

function PartnersManager({ disabled = false }: InputDataProps) {
  return (
    <Grid item xs={4}>
      <Typography variant="subtitle2">담당자</Typography>
      <InputTextField
        name={'manager'}
        sx={{ width: '100%', mt: 1 }}
        placeholder={'담당자'}
        disabled={disabled}
      />
    </Grid>
  )
}

export default PartnersManager
