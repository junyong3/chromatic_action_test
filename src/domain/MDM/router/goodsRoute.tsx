import { RouteType } from '@src/routes/routeType'
import { Outlet } from 'react-router-dom'
import DocTitle from '@components/Page/DocTitle'
import { lazy } from 'react'
import { MaterialUpdatePage } from '@domain/MDM/pages/Goods/Material'
import { ProductUpdatePage } from '@domain/MDM/pages/Goods/Product'
import { MaterialPurchasePriceUpdatePage } from '@domain/MDM/pages/Goods/PurchasePrice/Material'
import { ProductPurchasePriceUpdatePage } from '@domain/MDM/pages/Goods/PurchasePrice/Product'
import { ProductSellingPriceUpdatePage } from '@domain/MDM/pages/Goods/SellingPrice/Product'
// Material
const MaterialCreatePage = lazy(
  () => import('@domain/MDM/pages/Goods/Material/MaterialCreatePage')
)
const MaterialDetailPage = lazy(
  () => import('@domain/MDM/pages/Goods/Material/MaterialDetailPage')
)
const MaterialListPage = lazy(
  () => import('@domain/MDM/pages/Goods/Material/MaterialListPage')
)

// Goods
const ProductDetailPage = lazy(
  () => import('@domain/MDM/pages/Goods/Product/ProductDetailPage')
)
const ProductCreatePage = lazy(
  () => import('@domain/MDM/pages/Goods/Product/ProductCreatePage')
)
const ProductListPage = lazy(
  () => import('@domain/MDM/pages/Goods/Product/ProductListPage')
)

const MaterialCategory = lazy(
  () => import('@domain/MDM/pages/Goods/MaterialCategory/MaterialCategory')
)
// import { MaterialCategory } from '@domain/MDM/pages/Goods/MaterialCategory'
// PurchasePrice/Material
const MaterialPurchasePriceCreatePage = lazy(
  () =>
    import(
      '@domain/MDM/pages/Goods/PurchasePrice/Material/MaterialPurchasePriceCreatePage'
    )
)
const MaterialPurchasePriceDetailPage = lazy(
  () =>
    import(
      '@domain/MDM/pages/Goods/PurchasePrice/Material/MaterialPurchasePriceDetailPage'
    )
)
const MaterialPurchasePriceListPage = lazy(
  () =>
    import(
      '@domain/MDM/pages/Goods/PurchasePrice/Material/MaterialPurchasePriceListPage'
    )
)

// PurchasePrice/Product
const ProductPurchasePriceCreatePage = lazy(
  () =>
    import(
      '@domain/MDM/pages/Goods/PurchasePrice/Product/ProductPurchasePriceCreatePage'
    )
)
const ProductPurchasePriceDetailPage = lazy(
  () =>
    import(
      '@domain/MDM/pages/Goods/PurchasePrice/Product/ProductPurchasePriceDetailPage'
    )
)
const ProductPurchasePriceListPage = lazy(
  () =>
    import(
      '@domain/MDM/pages/Goods/PurchasePrice/Product/ProductPurchasePriceListPage'
    )
)

// Goods/SellingPrice
const ProductSellingPriceCreatePage = lazy(
  () =>
    import(
      '@domain/MDM/pages/Goods/SellingPrice/Product/ProductSellingPriceCreatePage'
    )
)
const ProductSellingPriceDetailPage = lazy(
  () =>
    import(
      '@domain/MDM/pages/Goods/SellingPrice/Product/ProductSellingPriceDetailPage'
    )
)
const ProductSellingPriceListPage = lazy(
  () =>
    import(
      '@domain/MDM/pages/Goods/SellingPrice/Product/ProductSellingPriceListPage'
    )
)
export const goods: RouteType = {
  title: '원부자재/제상품',
  path: 'goods',
  element: (
    <DocTitle title={'goods'}>
      <Outlet />
    </DocTitle>
  ),
  children: [
    {
      path: 'material',
      title: '원부자재 관리',
      element: (
        <DocTitle title={'원부자재 관리'}>
          <MaterialListPage />
        </DocTitle>
      ),
    },
    {
      path: 'product',
      title: '제상품 관리',
      element: (
        <DocTitle title={'제상품 관리'}>
          <ProductListPage />
        </DocTitle>
      ),
    },
    {
      path: 'material-purchase-price',
      title: '원부자재 구매 가격 관리',
      element: (
        <DocTitle title={'원부자재 구매 가격 관리'}>
          <MaterialPurchasePriceListPage />
        </DocTitle>
      ),
    },
    {
      path: 'product-purchase-price',
      title: '제상품 구매 가격 관리',
      element: (
        <DocTitle title={'제상품 구매 가격 관리'}>
          <ProductPurchasePriceListPage />
        </DocTitle>
      ),
    },
    {
      path: 'product-selling-price',
      title: '제상품 판매 가격 관리',
      element: (
        <DocTitle title={'제상품 판매 가격 관리'}>
          <ProductSellingPriceListPage />
        </DocTitle>
      ),
    },
  ],
}

export const goodsChildren: RouteType[] = [
  {
    path: 'goods/material/category',
    title: '자재 카테고리 관리',
    element: (
      <DocTitle title={'자재 카테고리 관리'}>
        <MaterialCategory />
      </DocTitle>
    ),
  },
  {
    path: 'goods/material/create',
    title: '원부자재 생성',
    element: (
      <DocTitle title={'원부자재 생성'}>
        <MaterialCreatePage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/material/:id',
    title: '원부자재 상세',
    element: (
      <DocTitle title={'원부자재 상세'}>
        <MaterialDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/material/:id/update',
    title: '원부자재 수정',
    element: (
      <DocTitle title={'원부자재 수정'}>
        <MaterialUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/product/create',
    title: '제상품 생성',
    element: (
      <DocTitle title={'제상품 생성'}>
        <ProductCreatePage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/product/:id',
    title: '제상품 상세',
    element: (
      <DocTitle title={'제상품 상세'}>
        <ProductDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/product/:id/update',
    title: '제상품 수정',
    element: (
      <DocTitle title={'제상품 수정'}>
        <ProductUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/material-purchase-price/create',
    title: '원부자재 구매 가격 등록',
    element: (
      <DocTitle title={'원부자재 구매 가격 등록'}>
        <MaterialPurchasePriceCreatePage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/material-purchase-price/:id',
    title: '원부자재 구매 가격 상세',
    element: (
      <DocTitle title={'원부자재 구매 가격 상세'}>
        <MaterialPurchasePriceDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/material-purchase-price/:id/update',
    title: '원부자재 구매 가격 수정',
    element: (
      <DocTitle title={'원부자재 구매 가격 수정'}>
        <MaterialPurchasePriceUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/product-purchase-price/create',
    title: '제상품 구매 가격 등록',
    element: (
      <DocTitle title={'제상품 구매 가격 등록'}>
        <ProductPurchasePriceCreatePage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/product-purchase-price/:id',
    title: '제상품 구매 가격 상세',
    element: (
      <DocTitle title={'제상품 구매 가격 상세'}>
        <ProductPurchasePriceDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/product-purchase-price/:id/update',
    title: '제상품 구매 가격 수정',
    element: (
      <DocTitle title={'제상품 구매 가격 수정'}>
        <ProductPurchasePriceUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/product-selling-price/create',
    title: '제상품 판매 가격 등록',
    element: (
      <DocTitle title={'제상품 판매 가격 등록'}>
        <ProductSellingPriceCreatePage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/product-selling-price/:id',
    title: '제상품 판매 가격 상세',
    element: (
      <DocTitle title={'제상품 판매 가격 상세'}>
        <ProductSellingPriceDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'goods/product-selling-price/:id/update',
    title: '제상품 판매 가격 수정',
    element: (
      <DocTitle title={'제상품 판매 가격 수정'}>
        <ProductSellingPriceUpdatePage />
      </DocTitle>
    ),
  },
]
