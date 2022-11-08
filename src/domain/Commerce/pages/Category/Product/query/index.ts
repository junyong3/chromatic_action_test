import { ProductCategoryDto } from '@domain/Commerce/pages/Category/Product/Props'
import Instance from '@api/Instance'
import { CATEGORY_API_PATH } from '@api/path/Commerce/categoryPath'

export const productCategoryUpdate = async (params: ProductCategoryDto) => {
  const { data } = await Instance.patch<ProductCategoryDto>(
    CATEGORY_API_PATH.PRODUCT_CATEGORY,
    params
  )

  return data
}
