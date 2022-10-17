import { IAMLayout, CommerceLayout, MDMLayout } from '@layouts/SidebarLayout'
import EmptyLayout from '@layouts/EmptyLayout'
import { RouteListType } from '@src/routes/routeType'
import { ROOT } from '@src/routes/rootRoute'
import { IAMRoot, IAMChildren } from '@src/routes/IAM'
import { CommerceRoot, CommerceChildren } from '@src/routes/Commerce'
import { MDMRoot, MDMChildren } from '@src/routes/MDM'
import DocTitle from '@src/components/Page/DocTitle'

export const RouteList: RouteListType = {
  ROOT,
  IAM: [
    {
      path: '/IAM',
      title: 'IAM',
      element: (
        <DocTitle title={'IAM'}>
          <IAMLayout />
        </DocTitle>
      ),
      children: IAMRoot,
    },
    {
      path: '/IAM',
      title: 'IAM',
      element: (
        <DocTitle title={'IAM'}>
          <EmptyLayout />
        </DocTitle>
      ),
      children: IAMChildren,
    },
  ],
  Commerce: [
    {
      path: '/commerce',
      title: 'Commerce',
      element: (
        <DocTitle title={'Commerce'}>
          <CommerceLayout />
        </DocTitle>
      ),
      children: CommerceRoot,
    },
    {
      path: '/commerce',
      title: 'Commerce',
      element: (
        <DocTitle title={'Commerce'}>
          <EmptyLayout />
        </DocTitle>
      ),
      children: CommerceChildren,
    },
  ],
  MDM: [
    {
      path: '/MDM',
      title: 'MDM',
      element: (
        <DocTitle title={'MDM'}>
          <MDMLayout />
        </DocTitle>
      ),
      children: MDMRoot,
    },
    {
      path: '/MDM',
      title: 'MDM',
      element: (
        <DocTitle title={'MDM'}>
          <EmptyLayout />
        </DocTitle>
      ),
      children: MDMChildren,
    },
  ],
}
