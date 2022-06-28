import React from 'react'
import Page from '@components/Page'
import { MainHeader } from '@components/Header'
import { To } from '@routes/To'
import DataGrid from '@components/DataGrid/DataGrid'
import { GridColDef } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { Link } from '@mui/material'
import { useQuery } from 'react-query'
import NetworkService from '@api/NetworkService'

function IAMPermissionsListPage() {
  const { data: rows = [] } = useQuery(['permissions'], () =>
    NetworkService.iam.getPermissions()
  )

  const columns: GridColDef[] = [
    { field: 'name', headerName: '권한명', flex: 1 },
    {
      field: 'description',
      headerName: '권한 설명',
      flex: 1,
      sortable: false,
    },
    {
      field: 'updatedAt',
      headerName: '최종 수정 일시',
      flex: 1,
      type: 'date',
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'func',
      headerName: '기능',
      flex: 1,
      sortable: false,
      renderCell: ({ row: { id } }) => {
        return (
          <Link
            href={`${To.IAMPermissionsList}/${id}`}
            target="_blank"
            color="primary"
            underline="hover"
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
        title="권한 조회"
        buttonText="권한 생성"
        buttonLink={To.IAMPermissionsCreate}
        HomeLink={To.IAMHome}
        menuName="권한 관리"
        useNavigation={true}
      />
      <div style={{ width: '100%', paddingTop: '24px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={50}
          useMultiline={true}
          initialState={{
            sorting: {
              sortModel: [{ field: 'updatedAt', sort: 'desc' }],
            },
          }}
        />
      </div>
    </Page>
  )
}

export default IAMPermissionsListPage
