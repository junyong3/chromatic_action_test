import Instance from '@api/Instance'
import { MaterialCategoryDto } from '@domain/MDM/pages/Goods/MaterialCategory/Props'
import { CATEGORY_API_PATH } from '@api/path/MDM/categoryPath'

export const materialCategoryUpdate = async (params: MaterialCategoryDto) => {
  const { data } = await Instance.post<MaterialCategoryDto>(
    CATEGORY_API_PATH.MATERIAL_CATEGORY,
    params
  )

  return data
}
