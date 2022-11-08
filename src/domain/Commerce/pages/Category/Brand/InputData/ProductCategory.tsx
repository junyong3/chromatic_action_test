import Typography from '@components/Typography'
import { Box } from '@mui/system'
import { useCategoryStore } from '@stores/category.store'
import { useQueryWrap } from '@queries/useQuery'
import {
  ProductCategoryKey,
  ProductRenderTree,
} from '@domain/Commerce/pages/Category/Product/Props'
import Instance from '@api/Instance'
import { CATEGORY_API_PATH } from '@api/path/Commerce/categoryPath'
import { useEffect, useState } from 'react'
import InputSelect from '@components/Select/InputSelect'

function ProductCategory() {
  const isMainCategory = useCategoryStore((state) => state.isMainCategory)

  const { data } = useQueryWrap<ProductRenderTree[]>(
    ProductCategoryKey.list,
    () => Instance.get(CATEGORY_API_PATH.PRODUCT_CATEGORY)
  )

  const [options, setOptions] = useState<{ value: number; label: string }[]>([])

  useEffect(() => {
    setOptions(
      data?.map((d) => {
        return {
          value: d.id as number,
          label: d.name,
        }
      }) ?? []
    )
  }, [data])

  return (
    <>
      {!isMainCategory ? (
        <Box pt={4}>
          <Typography required variant="subtitle2" pb={1}>
            상품 대분류 연결
          </Typography>
          <InputSelect
            name={'productCategoryId'}
            sx={{ width: '50%' }}
            placeholder={'연결한 상품 분류를 선택해 주세요.'}
            required
            options={options}
          />
        </Box>
      ) : null}
    </>
  )
}

export default ProductCategory
