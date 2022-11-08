import { ListPagination } from '@api/model/Commerce/common'

export const MaterialCategoryKey = {
  list: ['MaterialCategoryList'] as const,
}

export interface MaterialRenderTree {
  id: string
  name: string
  code: string
  disabled?: boolean
  children?: MaterialRenderTree[]
}

export interface MaterialCategoryDto {
  name: string
  code: string
}

export type CategoryListRes = ListPagination & {
  items: Array<MaterialRenderTree>
}
