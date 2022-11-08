import Typography from '@components/Typography'
import InputTextField from '@components/TextField/InputTextField'
import { Box } from '@mui/system'

function CategoryCode() {
  return (
    <Box pt={4}>
      <Typography variant="subtitle2" pb={1}>
        카테고리 코드
      </Typography>
      <InputTextField
        name={'code'}
        sx={{ width: '100%' }}
        placeholder={'카테고리 저장 시, 자동 생성됩니다.'}
        disabled
      />
    </Box>
  )
}

export default CategoryCode
