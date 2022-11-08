import { useMemo } from 'react'
import { Grid } from '@mui/material'
import InputRadio from '@components/Radio/InputRadio'
import Typography from '@components/Typography'
import { InputDataProps } from '../Props'

function ClientType({ disabled = false }: InputDataProps) {
  const clientTypeOptions = useMemo(
    () => ['초샵 오프라인', '초록마을', 'B2B'],
    []
  )
  return (
    <Grid item>
      <Typography required variant="subtitle2" sx={{ mb: 1 }}>
        거래처 구분
      </Typography>
      <InputRadio
        row
        name={'clientType'}
        options={clientTypeOptions}
        disabled={disabled}
      />
    </Grid>
  )
}

export default ClientType
