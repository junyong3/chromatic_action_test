import Page from '@components/Page'
import { MainHeader } from '@components/Header'
import { To } from '@routes/To'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Link } from '@mui/material'
import DataGrid from '@components/DataGrid/DataGrid'
import { useQuery } from 'react-query'
import NetworkService from '@api/NetworkService'

function IAMUsersListPage() {
  const { data: rows = [] } = useQuery(['users'], () =>
    NetworkService.iam.getUsers()
  )

  const columns: GridColDef[] = [
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
            href={`${To.IAMUsersList}/${id}`}
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
        title="사용자 조회"
        HomeLink={To.IAMHome}
        menuName="사용자 관리"
        useNavigation
      />
      <div style={{ width: '100%', paddingTop: '24px' }}>
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
      </div>
    </Page>
  )
}

export default IAMUsersListPage
