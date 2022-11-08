import Instance from '@api/Instance'
import { CATEGORY_API_PATH } from '@api/path/Commerce/categoryPath'
import { BrandCategoryDto } from '@domain/Commerce/pages/Category/Brand/Props'

export const brandCategoryUpdate = async (params: BrandCategoryDto) => {
  const { data } = await Instance.patch<BrandCategoryDto>(
    CATEGORY_API_PATH.BRAND_CATEGORY,
    params
  )

  return data
}
