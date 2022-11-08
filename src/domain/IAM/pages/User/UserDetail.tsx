import { useParams } from 'react-router-dom'
import { useQueryWrap } from '@queries/useQuery'
import { UsersDetailRes, UsersOnRoles } from '@api/model/IAM/user'
import Instance from '@api/Instance'
import { IAM_API_PATH } from '@api/path/IAM/iamPath'
import { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { Box, Link } from '@mui/material'
import { To } from '@routes/To'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import Typography from '@components/Typography'
import BaseTextField from '@components/TextField'
import DataGrid from '@components/DataGrid'

function UserDetail() {
  const { id } = useParams()
  const { isSuccess, data: detail } = useQueryWrap<UsersDetailRes>(
    ['user'],
    () => Instance.get(IAM_API_PATH.USER(id as string))
  )

  const [rows, setRows] = useState<UsersOnRoles[]>([])

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
            href={`${To.IAMRoleList}/${roleId}`}
            data-sb-kind={'pages/IAM/Role/RoleDetail'}
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
      <Typography variant="subtitle2" mt={4}>
        사용자 아이디
      </Typography>
      <BaseTextField
        label="사용자 아이디"
        value={detail?.username ?? ''}
        size="small"
        sx={{ width: '376px', mt: 1 }}
        disabled
      />
      <Typography variant="subtitle2" mt={4}>
        부여된 역할 목록
      </Typography>
      <Box mt={3}>
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
      </Box>
    </Page>
  )
}

export default UserDetail
