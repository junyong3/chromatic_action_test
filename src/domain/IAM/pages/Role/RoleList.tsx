import Page from '@components/Page'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Link, Stack } from '@mui/material'
import DataGrid from '@components/DataGrid/DataGrid'
import { To } from '@routes/To'
import { ListHeader } from '@compositions/Header'
import dayjs from 'dayjs'
import Instance from '@api/Instance'
import { useQueryWrap } from '@queries/useQuery'
import { RoleDto } from '@api/model/IAM/role'
import { IAM_API_PATH } from '@api/path/IAM/iamPath'

function RoleListPage() {
  const { data: rows = [] } = useQueryWrap<RoleDto[]>('roleList', () =>
    Instance.get(IAM_API_PATH.ROLE_LIST)
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
            href={`${To.IAMRoleList}/${params.row.id}`}
            data-sb-kind={'pages/IAM/Role/RoleDetail'}
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
      <Stack spacing={3}>
        <ListHeader
          title="역할 조회"
          button={{
            text: '역할 생성',
            link: To.IAMRoleCreate,
            sbkind: 'pages/IAM/Role/RoleCreate',
          }}
          navigation={{
            home: To.IAMHome,
            menuList: ['역할 관리'],
          }}
        />
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={50}
          useMultiline={true}
        />
      </Stack>
    </Page>
  )
}

export default RoleListPage
