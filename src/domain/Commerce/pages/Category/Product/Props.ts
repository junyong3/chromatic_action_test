export const Status = {
  enabled: 'ENABLED',
  reserved: 'RESERVED',
  disabled: 'DISABLED',
} as const
type Status = typeof Status[keyof typeof Status]

export const ProductCategoryKey = {
  list: ['ProductCategoryList'] as const,
}

export interface ProductRenderTree extends ProductCategoryDto {
  type?: string
  disabled?: boolean
}

export interface ProductCategoryDto {
  id?: number
  stringId?: string
  status: Status
  name: string
  imageUrl: string
  orderIndex: number
  displayStartAt: string
  displayEndAt: string
  parentCategoryId: number
  subCategories: any[]
}
