import { Grid } from '@mui/material'
import { InputDataProps } from '@domain/MDM/pages/Partners/Props'
import Typography from '@components/Typography'
import InputSelect from '@components/Select/InputSelect'

function GoodsCustomer({
  name = 'customer',
  disabled = false,
}: InputDataProps) {
  const customerOptions = [
    {
      code: 'cow',
      name: '소 거래처',
    },
    {
      code: 'chicken',
      name: '닭 거래처',
    },
    {
      code: 'fork',
      name: '돼지 거래처',
    },
  ]
  return (
    <>
      <Grid item xs={4}>
        <Typography required variant="subtitle2" mb={1}>
          판매채널/고객사
        </Typography>
        <InputSelect
          name={name}
          options={customerOptions}
          optionKey={{ value: 'code', label: 'name' }}
          disabled={disabled}
          sx={{ width: '100%' }}
        />
      </Grid>
    </>
  )
}

export default GoodsCustomer
