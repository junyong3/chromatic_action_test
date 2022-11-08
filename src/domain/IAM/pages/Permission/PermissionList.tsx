import { useQueryWrap } from '@queries/useQuery'
import { PermissionDto } from '@api/model/IAM/permission'
import Instance from '@api/Instance'
import { IAM_API_PATH } from '@api/path/IAM/iamPath'
import { GridColDef } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { Link, Stack } from '@mui/material'
import { To } from '@routes/To'
import Page from '@components/Page'
import { ListHeader } from '@compositions/Header'
import DataGrid from '@components/DataGrid'
import React from 'react'
import { PermissionQueryKey } from '@domain/IAM/pages/Permission/Props'

function PermissionList() {
  const { data: rows = [] } = useQueryWrap<PermissionDto[]>(
    PermissionQueryKey.list,
    () => Instance.get(IAM_API_PATH.PERMISSION_LIST)
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
            href={`${To.IAMPermissionList}/${id}`}
            data-sb-kind={'pages/IAM/Permission/PermissionDetail'}
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
      <Stack spacing={3}>
        <ListHeader
          title="권한 조회"
          button={{
            text: '권한 생성',
            link: To.IAMPermissionCreate,
            sbkind: 'pages/IAM/Permission/PermissionCreate',
          }}
          navigation={{
            home: To.IAMHome,
            menuList: ['권한 관리'],
          }}
        />

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
      </Stack>
    </Page>
  )
}

export default PermissionList
