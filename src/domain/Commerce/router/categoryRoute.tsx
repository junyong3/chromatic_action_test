import DocTitle from '@components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'
import { Outlet } from 'react-router-dom'
import { ProductCategory } from '@domain/Commerce/pages/Category/Product'
import { BrandCategoryList } from '@domain/Commerce/pages/Category/Brand'

export const category: RouteType = {
  title: '카테고리 관리',
  path: 'category',
  element: (
    <DocTitle title={'카테고리 관리'}>
      <Outlet />
    </DocTitle>
  ),
}
export const categoryChildren: RouteType[] = [
  {
    path: 'category/product',
    title: '상품 카테고리 관리',
    element: (
      <DocTitle title={'상품 카테고리 관리'}>
        <ProductCategory />
      </DocTitle>
    ),
  },
  {
    path: 'category/brand',
    title: '브랜드 카테고리 관리',
    element: (
      <DocTitle title={'브랜드 카테고리 관리'}>
        <BrandCategoryList />
      </DocTitle>
    ),
  },
]
