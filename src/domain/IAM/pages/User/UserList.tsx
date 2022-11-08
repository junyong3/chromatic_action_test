import { useQueryWrap } from '@queries/useQuery'
import { UserDto } from '@api/model/IAM/user'
import Instance from '@api/Instance'
import { IAM_API_PATH } from '@api/path/IAM/iamPath'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Link, Stack } from '@mui/material'
import { To } from '@routes/To'
import Page from '@components/Page'
import { ListHeader } from '@compositions/Header'
import DataGrid from '@components/DataGrid'

function UserList() {
  const { data: rows = [] } = useQueryWrap<UserDto[]>(['users'], () =>
    Instance.get(IAM_API_PATH.USER_LIST)
  )

  const columns: GridColDef<UserDto>[] = [
    { field: 'username', headerName: '사용자 아이디', type: 'string', flex: 1 },
    {
      field: '_count.roles',
      headerName: '부여 역할 수',
      type: 'number',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      valueGetter: (params: GridValueGetterParams) => params.row._count?.roles,
    },
    {
      field: 'func',
      headerName: '기능',
      flex: 1,
      sortable: false,
      renderCell: ({ id }) => {
        return (
          <Link
            href={`${To.IAMUserList}/${id}`}
            data-sb-kind={'pages/IAM/User/UserDetail'}
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
          title="사용자 조회"
          navigation={{
            home: To.IAMHome,
            menuList: ['사용자 관리'],
          }}
        />
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={50}
          initialState={{
            sorting: {
              sortModel: [{ field: 'username', sort: 'asc' }],
            },
          }}
        />
      </Stack>
    </Page>
  )
}

export default UserList
