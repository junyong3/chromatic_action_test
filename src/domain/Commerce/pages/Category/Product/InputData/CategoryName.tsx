import Typography from '@components/Typography'
import InputTextField from '@components/TextField/InputTextField'
import { useCategoryStore } from '@stores/category.store'

function CategoryName() {
  const [isMainCategory] = useCategoryStore((state) => [state.isMainCategory])

  return (
    <div>
      <Typography required variant="subtitle2" pb={1}>
        {isMainCategory ? '대분류' : '중분류'} 카테고리 명
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
