import Typography from '@components/Typography'
import InputTextField from '@components/TextField/InputTextField'

function CategoryName() {
  return (
    <div>
      <Typography required variant="subtitle2" pb={1}>
        카테고리 명
      </Typography>
      <InputTextField
        name={'name'}
        sx={{ width: '100%' }}
        placeholder={'카테고리 명을 입력해 주세요.'}
        validation={{
          required: true,
        }}
      />
    </div>
  )
}

export default CategoryName
