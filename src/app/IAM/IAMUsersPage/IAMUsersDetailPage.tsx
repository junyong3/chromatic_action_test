import { useEffect, useState } from 'react'
import Page from '@components/Page'
import { SubHeader } from '@components/Header'
import Text from '@components/Text'
import TextField from '@components/TextField'
import DataGrid from '@components/DataGrid'
import { GridColDef } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { Link } from '@mui/material'
import { To } from '@routes/To'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import NetworkService from '@api/NetworkService'

import { PermissionRow } from '@queries/iam/useMutation.permissions'

function IAMUsersDetailPage() {
  const { id } = useParams()
  const { isSuccess, data: detail } = useQuery(['user'], () =>
    NetworkService.iam.getUser(String(id))
  )

  const [rows, setRows] = useState<PermissionRow[]>([])

  const columns: GridColDef[] = [
    {
      field: 'role.name',
      headerName: '역할명',
      flex: 1,
      sortable: true,
      valueGetter: (params) => params.row.role?.name,
    },
    {
      field: 'assignedAt',
      headerName: '역할 부여 일시',
      flex: 1,
      type: 'date',
      sortable: true,
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'func',
      headerName: '기능',
      flex: 1,
      sortable: false,
      renderCell: ({ row: { roleId } }) => {
        return (
          <Link
            href={`${To.IAMRolesList}/${roleId}`}
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

  useEffect(() => {
    if (isSuccess && detail) {
      const rows = detail.usersOnRoles || []

      setRows(rows)
    }
  }, [isSuccess, detail])

  return isSuccess && !detail ? (
    <div>존재하지 않는 페이지 입니다.</div>
  ) : (
    <Page>
      <SubHeader title="사용자 상세" />
      <Text styleName="subtitle2" as="div" sx={{ marginTop: '32px' }}>
        사용자 아이디
      </Text>
      <TextField
        label="사용자 아이디"
        value={detail?.username ?? ''}
        size="small"
        sx={{ width: '376px', marginTop: '16px' }}
        disabled
      />
      <Text styleName="subtitle2" as="div" sx={{ marginTop: '32px' }}>
        부여된 역할 목록
      </Text>
      <div style={{ width: '100%', paddingTop: '24px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          useMultiline={true}
          initialState={{
            sorting: {
              sortModel: [{ field: 'assignedAt', sort: 'desc' }],
            },
          }}
        />
      </div>
    </Page>
  )
}

export default IAMUsersDetailPage
