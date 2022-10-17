import { RouteType } from '../routeType'
import { Outlet } from 'react-router-dom'
import DocTitle from '@components/Page/DocTitle'
import {
  MaterialCreatePage,
  MaterialDetailPage,
  MaterialListPage,
  MaterialUpdatePage,
} from '@src/app/MDM/Material'
import {
  ProductCreatePage,
  ProductDetailPage,
  ProductListPage,
  ProductUpdatePage,
} from '@src/app/MDM/Product'
import { MaterialPurchasePriceListPage } from '@src/app/MDM/MaterialPurchasePrice'
import { ProductPurchasePriceListPage } from '@src/app/MDM/ProductPurchasePrice'
import { MaterialSellingPriceListPage } from '@src/app/MDM/MaterialSellingPrice'

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
      path: 'material-selling-price',
      title: '제상품 판매 가격 관리',
      element: (
        <DocTitle title={'제상품 판매 가격 관리'}>
          <MaterialSellingPriceListPage />
        </DocTitle>
      ),
    },
  ],
}

export const goodsChildren: RouteType[] = [
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
]
