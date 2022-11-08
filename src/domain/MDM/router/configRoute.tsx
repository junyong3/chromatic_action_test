import DocTitle from '@components/Page/DocTitle'

import { OrganizationCreateUpdatePage } from '@domain/MDM/pages/Config/Organization'
import { FactoryCreateUpdatePage } from '@domain/MDM/pages/Config/Factory'
import { WarehouseCreateUpdatePage } from '@domain/MDM/pages/Config/Warehouse'
import { AreaCreateUpdatePage } from '@domain/MDM/pages/Config/Area'
import { LocationCreateUpdatePage } from '@domain/MDM/pages/Config/Location'
import { RouteType } from '@src/routes/routeType'
import { lazy } from 'react'
// org
const OrganizationDetailPage = lazy(
  () => import('@domain/MDM/pages/Config/Organization/OrganizationDetailPage')
)
const OrganizationListPage = lazy(
  () => import('@domain/MDM/pages/Config/Organization/OrganizationListPage')
)
// factory
const FactoryDetailPage = lazy(
  () => import('@domain/MDM/pages/Config/Factory/FactoryDetailPage')
)
const FactoryListPage = lazy(
  () => import('@domain/MDM/pages/Config/Factory/FactoryListPage')
)
//warehouse
const WarehouseDetailPage = lazy(
  () => import('@domain/MDM/pages/Config/Warehouse/WarehouseDetailPage')
)
const WarehouseListPage = lazy(
  () => import('@domain/MDM/pages/Config/Warehouse/WarehouseListPage')
)
// area
const AreaDetailPage = lazy(
  () => import('@domain/MDM/pages/Config/Area/AreaDetailPage')
)
const AreaListPage = lazy(
  () => import('@domain/MDM/pages/Config/Area/AreaListPage')
)
//Location
const LocationDetailPage = lazy(
  () => import('@domain/MDM/pages/Config/Location/LocationDetailPage')
)
const LocationListPage = lazy(
  () => import('@domain/MDM/pages/Config/Location/LocationListPage')
)
export const config: RouteType = {
  title: '구성',
  path: 'config',
  children: [
    {
      path: 'org',
      title: '조직정보',
      element: (
        <DocTitle title={'조직정보'}>
          <OrganizationListPage />
        </DocTitle>
      ),
    },
    {
      path: 'factory',
      title: '공장/센터정보',
      element: (
        <DocTitle title={'공장/센터정보'}>
          <FactoryListPage />
        </DocTitle>
      ),
    },
    {
      path: 'warehouse',
      title: '창고 정보',
      element: (
        <DocTitle title={'창고 정보'}>
          <WarehouseListPage />
        </DocTitle>
      ),
    },
    {
      path: 'area',
      title: '구역 정보',
      element: (
        <DocTitle title={'구역 정보'}>
          <AreaListPage />
        </DocTitle>
      ),
    },
    {
      path: 'location',
      title: '로케이션 정보',
      element: (
        <DocTitle title={'로케이션 정보'}>
          <LocationListPage />
        </DocTitle>
      ),
    },
  ],
}

export const configChildren: RouteType[] = [
  {
    path: 'config/org/:deptCode',
    title: '조직상세',
    element: (
      <DocTitle title={'조직정보 상세'}>
        <OrganizationDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'config/org/:deptCode/update',
    title: '조직정보 수정',
    element: (
      <DocTitle title={'조직정보 수정'}>
        <OrganizationCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'config/org/create',
    title: '조직정보 등록',
    element: (
      <DocTitle title={'조직정보 등록'}>
        <OrganizationCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'config/factory/:factoryCode',
    title: '공장/센터 정보 상세',
    element: (
      <DocTitle title={'공장/센터 정보 상세'}>
        <FactoryDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'config/factory/:factoryCode/update',
    title: '공장/센터 정보 상세',
    element: (
      <DocTitle title={'공장/센터 정보 상세'}>
        <FactoryCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'config/factory/create',
    title: '공장/센터 정보 등록',
    element: (
      <DocTitle title={'공장/센터 정보 등록'}>
        <FactoryCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'config/warehouse/:warehouseCode',
    title: '창고 정보 상세',
    element: (
      <DocTitle title={'창고 정보 상세'}>
        <WarehouseDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'config/warehouse/:warehouseCode/update',
    title: '창고 정보 상세',
    element: (
      <DocTitle title={'창고 정보 상세'}>
        <WarehouseCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'config/warehouse/create',
    title: '창고 정보 등록',
    element: (
      <DocTitle title={'창고 정보 등록'}>
        <WarehouseCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'config/area/:areaCode',
    title: '구역 정보 상세',
    element: (
      <DocTitle title={'구역 정보 상세'}>
        <AreaDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'config/area/:areaCode/update',
    title: '구역 정보 상세',
    element: (
      <DocTitle title={'구역 정보 상세'}>
        <AreaCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'config/area/create',
    title: '구역 정보 등록',
    element: (
      <DocTitle title={'구역 정보 등록'}>
        <AreaCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'config/location/:locationCode',
    title: '로케이션 정보 상세',
    element: (
      <DocTitle title={'로케이션 정보 상세'}>
        <LocationDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'config/location/:locationCode/update',
    title: '로케이션 정보 수정',
    element: (
      <DocTitle title={'로케이션 정보 수정'}>
        <LocationCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'config/location/create',
    title: '로케이션 정보 등록',
    element: (
      <DocTitle title={'로케이션 정보 등록'}>
        <LocationCreateUpdatePage />
      </DocTitle>
    ),
  },
]
