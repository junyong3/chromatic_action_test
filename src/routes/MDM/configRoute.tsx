import DocTitle from '@src/components/Page/DocTitle'
import { RouteType } from '../routeType'
import {
  OrganizationCreateUpdatePage,
  OrganizationDetailPage,
  OrganizationListPage,
} from '@src/app/MDM/Config/Organization'
import {
  FactoryCreateUpdatePage,
  FactoryDetailPage,
  FactoryListPage,
} from '@src/app/MDM/Config/Factory'
import { WarehouseListPage } from '@src/app/MDM/Config/Warehouse'
import { AreaListPage } from '@src/app/MDM/Config/Area'
import { LocationListPage } from '@src/app/MDM/Config/Location'

export const config: RouteType = {
  title: '구성',
  path: 'config',
  children: [
    {
      path: 'Org',
      title: '조직정보',
      element: (
        <DocTitle title={'조직정보'}>
          <OrganizationListPage />
        </DocTitle>
      ),
    },
    {
      path: 'Factory',
      title: '공장/센터정보',
      element: (
        <DocTitle title={'공장/센터정보'}>
          <FactoryListPage />
        </DocTitle>
      ),
    },
    {
      path: 'Warehouse',
      title: '창고 정보',
      element: (
        <DocTitle title={'창고 정보'}>
          <WarehouseListPage />
        </DocTitle>
      ),
    },
    {
      path: 'Area',
      title: '구역 정보',
      element: (
        <DocTitle title={'구역 정보'}>
          <AreaListPage />
        </DocTitle>
      ),
    },
    {
      path: 'Location',
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
    path: 'config/Org/:deptCode',
    title: '조직상세',
    element: (
      <DocTitle title={'조직정보 상세'}>
        <OrganizationDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'config/Org/:deptCode/update',
    title: '조직정보 수정',
    element: (
      <DocTitle title={'조직정보 수정'}>
        <OrganizationCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'config/Org/create',
    title: '조직정보 등록',
    element: (
      <DocTitle title={'조직정보 등록'}>
        <OrganizationCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'config/Factory/:factoryCode',
    title: '공장/센터 정보 상세',
    element: (
      <DocTitle title={'공장/센터 정보 상세'}>
        <FactoryDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'config/Factory/:factoryCode/update',
    title: '공장/센터 정보 상세',
    element: (
      <DocTitle title={'공장/센터 정보 상세'}>
        <FactoryCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'config/Factory/create',
    title: '공장/센터 정보 등록',
    element: (
      <DocTitle title={'공장/센터 정보 등록'}>
        <FactoryCreateUpdatePage />
      </DocTitle>
    ),
  },
]
