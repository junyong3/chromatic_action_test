import DocTitle from '@components/Page/DocTitle'
import { RouteType } from '@src/routes/routeType'
import { lazy } from 'react'
import { VenderUpdatePage } from '@domain/MDM/pages/Partners/Vender'
import { ClientUpdatePage } from '@domain/MDM/pages/Partners/Client'
// Vender
const VenderCreatePage = lazy(
  () => import('@domain/MDM/pages/Partners/Vender/VenderCreatePage')
)
const VenderDetailPage = lazy(
  () => import('@domain/MDM/pages/Partners/Vender/VenderDetailPage')
)
const VenderListPage = lazy(
  () => import('@domain/MDM/pages/Partners/Vender/VenderListPage')
)

// Partners
const ClientCreatePage = lazy(
  () => import('@domain/MDM/pages/Partners/Client/ClientCreatePage')
)
const ClientDetailPage = lazy(
  () => import('@domain/MDM/pages/Partners/Client/ClientDetailPage')
)
const ClientListPage = lazy(
  () => import('@domain/MDM/pages/Partners/Client/ClientListPage')
)

export const partners: RouteType = {
  title: '협럭사',
  path: 'partners',
  children: [
    {
      path: 'vender',
      title: '매입처 관리',
      element: (
        <DocTitle title={'매입처 관리'}>
          <VenderListPage />
        </DocTitle>
      ),
    },
    {
      path: 'client',
      title: '매출처 관리',
      element: (
        <DocTitle title={'매출처 관리'}>
          <ClientListPage />
        </DocTitle>
      ),
    },
  ],
}

export const partnersChildren: RouteType[] = [
  {
    path: 'partners/vender/create',
    title: '매입처 추가',
    element: (
      <DocTitle title={'매입처 추가'}>
        <VenderCreatePage />
      </DocTitle>
    ),
  },
  {
    path: 'partners/vender/:id',
    title: '매입처 상세',
    element: (
      <DocTitle title={'매입처 상세'}>
        <VenderDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'partners/vender/:id/update',
    title: '매입처 수정',
    element: (
      <DocTitle title={'매입처 수정'}>
        <VenderUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'partners/client/create',
    title: '매출처 추가',
    element: (
      <DocTitle title={'매출처 추가'}>
        <ClientCreatePage />
      </DocTitle>
    ),
  },
  {
    path: 'partners/client/:id',
    title: '매출처 상세',
    element: (
      <DocTitle title={'매출처 상세'}>
        <ClientDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'partners/client/:id/update',
    title: '매출처 수정',
    element: (
      <DocTitle title={'매출처 수정'}>
        <ClientUpdatePage />
      </DocTitle>
    ),
  },
]
