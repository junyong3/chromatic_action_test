import { Grid } from '@mui/material'
import { InputDataProps } from '@domain/MDM/pages/Partners/Props'
import InputTextField from '@components/TextField/InputTextField'
import Typography from '@components/Typography'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'

type GoodsCodeProps = {
  type: GoodsType
} & InputDataProps

function GoodsCode({ type, name = 'goods', disabled = false }: GoodsCodeProps) {
  const fieldName = type === GoodsType.Material ? '원부자재' : '제상품'
  return (
    <>
      <Grid item xs={4}>
        <Typography required variant="subtitle2" mb={1}>
          {fieldName} 명
        </Typography>
        <InputTextField
          name={`${name}.name`}
          placeholder={`${fieldName} 명`}
          disabled
          sx={{
            width: '100%',
            ' input:disabled': {
              WebkitTextFillColor: disabled ? 'gray.light' : 'black',
            },
          }}
        />
      </Grid>
    </>
  )
}

export default GoodsCode
