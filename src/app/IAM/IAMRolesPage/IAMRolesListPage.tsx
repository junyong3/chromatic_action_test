import Page from '@components/Page'
import React from 'react'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Link } from '@mui/material'
import DataGrid from '@components/DataGrid/DataGrid'
import { To } from '@routes/To'
import { MainHeader } from '@components/Header'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import NetworkService from '@api/NetworkService'

function IAMRolesListPage() {
  const { data: rows = [] } = useQuery('roles', () =>
    NetworkService.iam.getRoles()
  )

  const columns: GridColDef[] = [
    { field: 'name', headerName: '역할 명', flex: 1 },
    { field: 'memo', headerName: '메모', flex: 1, sortable: false },
    {
      field: '_count.usersOnRoles',
      headerName: '부여 사용자 수',
      flex: 1,
      type: 'number',
      valueGetter: (params: GridValueGetterParams) =>
        params.row._count?.usersOnRoles,
    },
    {
      field: '_count.permissionsOnRoles',
      headerName: '포함 권한 수',
      flex: 1,
      type: 'number',
      valueGetter: (params: GridValueGetterParams) =>
        params.row._count?.permissionsOnRoles,
    },
    {
      field: 'createdAt',
      headerName: '생성 일시',
      flex: 1,
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'func',
      headerName: '기능',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            href={`${To.IAMRolesList}/${params.row.id}`}
            target="_blank"
            color="primary"
            underline={'hover'}
          >
            상세
          </Link>
        )
      },
    },
  ]

  return (
    <Page>
      <MainHeader
        title={'역할 조회'}
        buttonText={'역할 생성'}
        buttonLink={To.IAMRolesCreate}
        HomeLink={To.IAMHome}
        menuName={'역할 관리'}
        useNavigation={true}
      ></MainHeader>
      <div style={{ width: '100%', paddingTop: '24px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={50}
          useMultiline={true}
        />
      </div>
    </Page>
  )
}

export default IAMRolesListPage
