export const Status = {
  enabled: 'ENABLED',
  disabled: 'DISABLED',
} as const
type Status = typeof Status[keyof typeof Status]

export const BrandCategoryKey = {
  list: ['BrandCategoryList'] as const,
}

export interface BrandRenderTree {
  id?: number
  stringId?: string
  status: Status
  name: string
  imageUrl: string
  productCategoryId?: number
  type?: string
  disabled?: boolean
  subCategories?: BrandRenderTree[]
}

export interface BrandCategoryDto {
  name: string
  imageUrl: string
  status: Status
}
