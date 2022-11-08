import { Grid, Stack } from '@mui/material'
import { InputDataProps } from '@domain/MDM/pages/Partners/Props'
import Button from '@components/Button'
import InputTextField from '@components/TextField/InputTextField'
import Typography from '@components/Typography'

function PartnersCode({ name = 'code', disabled = false }: InputDataProps) {
  return (
    <Grid item xs={4}>
      <Typography required variant="subtitle2">
        거래처 코드
      </Typography>
      <Stack direction={'row'} alignItems={'center'} spacing={1.5} pt={1}>
        <InputTextField
          name={name}
          sx={{ width: '100%' }}
          required
          placeholder={'거래처 코드'}
          disabled={disabled}
        />
        <Button variant={'outlined'} style={{ width: '120px' }} disabled>
          사용가능
        </Button>
      </Stack>
    </Grid>
  )
}

export default PartnersCode
