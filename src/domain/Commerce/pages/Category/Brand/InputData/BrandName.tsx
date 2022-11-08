import Typography from '@components/Typography'
import InputTextField from '@components/TextField/InputTextField'
import { useCategoryStore } from '@stores/category.store'

function BrandName() {
  const isMainCategory = useCategoryStore((state) => state.isMainCategory)

  return (
    <div>
      <Typography required variant="subtitle2" pb={1}>
        {isMainCategory ? '브랜드 명' : '하위'} 카테고리 명
      </Typography>
      <InputTextField
        name={'name'}
        sx={{ width: '50%' }}
        placeholder={'카테고리 명을 입력해 주세요.'}
        validation={{
          required: true,
        }}
      />
    </div>
  )
}

export default BrandName
