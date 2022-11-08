import Typography from '@components/Typography'
import InputTextField from '@components/TextField/InputTextField'
import { Box } from '@mui/system'
import { useCategoryStore } from '@stores/category.store'

function ImageURL() {
  const isMainCategory = useCategoryStore((state) => state.isMainCategory)

  return (
    <>
      {isMainCategory ? (
        <Box pt={4}>
          <Typography required variant="subtitle2" pb={1}>
            이미지 URL
          </Typography>
          <InputTextField
            name={'imageUrl'}
            sx={{ width: '100%' }}
            placeholder={'아이콘으로 사용할 이미지 URL을 입력해 주세요.'}
            helperText={'에셋관리자의 이미지 URL을 복사해 붙여 넣으세요.'}
            validation={{
              required: true,
            }}
          />
        </Box>
      ) : null}
    </>
  )
}

export default ImageURL
