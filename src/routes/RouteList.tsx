import { IAMLayout, CommerceLayout, MDMLayout } from '@layouts/SidebarLayout'
import EmptyLayout from '@layouts/EmptyLayout'
import { RouteListType } from '@src/routes/routeType'
import { ROOT } from '@domain/common/router/rootRoute'
import { IAMRoot, IAMChildren } from '@domain/IAM/router'
import { CommerceRoot, CommerceChildren } from '@domain/Commerce/router'
import { MDMRoot, MDMChildren } from '@domain/MDM/router'
import DocTitle from '@components/Page/DocTitle'
import React from 'react'

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
