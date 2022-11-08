import { Grid, Stack } from '@mui/material'
import { InputDataProps } from '@domain/MDM/pages/Partners/Props'
import Button from '@components/Button'
import InputTextField from '@components/TextField/InputTextField'
import Typography from '@components/Typography'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'

type GoodsCodeProps = {
  type: GoodsType
  openGoodsModal: () => void
} & InputDataProps

function GoodsCode({
  type,
  name = 'goods',
  disabled = false,
  openGoodsModal,
}: GoodsCodeProps) {
  const fieldName = type === GoodsType.Material ? '원부자재' : '제상품'

  return (
    <>
      <Grid item xs={4}>
        <Typography required variant="subtitle2">
          {fieldName} 코드
        </Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={1.5} pt={1}>
          <InputTextField
            name={`${name}.code`}
            placeholder={'찾기 버튼을 눌러 선택해주세요.'}
            disabled
            sx={{
              width: '314px',
              ' input:disabled': {
                WebkitTextFillColor: disabled ? 'gray.light' : 'black',
              },
            }}
          />
          <Button
            type={'button'}
            variant={'contained'}
            size={'medium'}
            disabled={disabled}
            onClick={openGoodsModal}
          >
            찾기
          </Button>
        </Stack>
      </Grid>
    </>
  )
}

export default GoodsCode
