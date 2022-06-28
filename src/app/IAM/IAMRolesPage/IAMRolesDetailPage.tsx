import Page from '@components/Page'
import React, { useEffect, useState } from 'react'
import Text from '@components/Text'
import Button from '@components/Button'
import { GridColDef } from '@mui/x-data-grid'
import DataGrid from '@components/DataGrid'
import TextField from '@components/TextField'
import { SubHeader } from '@components/Header'
import { useMutationDeleteRole, UserRow } from '@queries/iam/useMutation.roles'
import { useParams } from 'react-router'
import dayjs from 'dayjs'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import Dialog from '@components/Dialog/Dialog'
import SnackbarService from '@services/SnackbarService'
import { To } from '@routes/To'
import { useNavigate } from 'react-router-dom'
import LoadingService from '@services/LoadingService'
import NetworkService from '@api/NetworkService'
import { useQuery } from 'react-query'
import { PermissionRow } from '@queries/iam/useMutation.permissions'

function IAMRolesDetailPage() {
  const { id: stringId } = useParams()
  const id = Number(stringId)

  const navigate = useNavigate()

  const { mutate: deleteRole } = useMutationDeleteRole()

  const { isSuccess, data: detail } = useQuery(['roleDetail'], () =>
    NetworkService.iam.getRole(id)
  )

  const [roleName, setRoleName] = useState('')
  const [memo, setMemo] = useState('')
  const [rows, setRows] = useState<UserRow[]>([])

  const [permissionRows, setPermissionRows] = useState<PermissionRow[]>([])

  const [isDisabledDeleteButton, setIsDisabledDeleteButton] = useState(true)
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)

  const columns: GridColDef[] = [
    {
      field: 'username',
      headerName: '사용자 아이디',
      flex: 1,
      sortable: false,
    },
    {
      field: 'assignedAt',
      headerName: '역할 부여 일시',
      flex: 1,
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  const permissionColumns: GridColDef[] = [
    { field: 'name', headerName: '권한명', flex: 1 },
    { field: 'description', headerName: '권한 설명', flex: 1, sortable: false },
    {
      field: 'assignedAt',
      headerName: '권한 부여 일시',
      flex: 1,
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  const onClickDelete = () => {
    setIsDeleteDialog(true)
  }

  const onClickDeleteRole = () => {
    LoadingService.show()

    deleteRole(
      { id: id },
      {
        onSuccess: ({ success }) => {
          if (success) {
            SnackbarService.show('역할이 삭제되었습니다.')
            navigate(To.IAMRolesList)
          }
        },
        onSettled: () => {
          setIsDeleteDialog(false)
          LoadingService.close()
        },
      }
    )
  }

  useEffect(() => {
    if (isSuccess && detail) {
      const rows = detail.existingUsersOnRole || []
      const permissionRows = detail.existingPermissionsOnRole || []

      setRoleName(detail.name)
      setMemo(detail.memo)
      setRows(rows)
      setPermissionRows(permissionRows)
      setIsDisabledDeleteButton(!!rows.length)
    }
  }, [isSuccess, detail])

  return isSuccess && !detail ? (
    <div>존재하지 않는 페이지 입니다.</div>
  ) : (
    <Page>
      <SubHeader title={'역할 상세'}>
        <div>
          <Button
            color="gray"
            variant="outlined"
            size="medium"
            disabled={isDisabledDeleteButton}
            onClick={onClickDelete}
          >
            삭제
          </Button>
          <Button
            variant="outlined"
            size="medium"
            sx={{ ml: 2 }}
            href={`${id}/update`}
          >
            수정
          </Button>
        </div>
      </SubHeader>

      <Text styleName={'subtitle2'} as={'div'} sx={{ marginTop: '32px' }}>
        역할명
      </Text>
      <TextField
        label={'역할명'}
        value={roleName}
        disabled={true}
        size={'small'}
        sx={{ width: '376px', marginTop: '16px' }}
      />
      <Text styleName={'subtitle2'} as={'div'} sx={{ marginTop: '32px' }}>
        역할 메모
      </Text>
      <TextField
        label={'역할 메모'}
        value={memo}
        disabled={true}
        size={'small'}
        sx={{ width: '376px', marginTop: '16px' }}
        minRows={3}
        maxRows={3}
        multiline
        inputProps={{ maxLength: 50 }}
        placeholder={'역할의 정의와 역할 생성 요청자를 입력해 주세요.'}
      />

      <Text styleName={'subtitle2'} as={'div'} sx={{ marginTop: '32px' }}>
        역할 부여된 사용자 목록
      </Text>

      <div style={{ width: '100%', paddingTop: '24px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'assignedAt', sort: 'desc' }],
            },
          }}
        />
      </div>

      <Text styleName={'subtitle2'} as={'div'} sx={{ marginTop: '40px' }}>
        권한 목록
      </Text>

      <div style={{ width: '100%', paddingTop: '16px' }}>
        <DataGrid
          rows={permissionRows}
          columns={permissionColumns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'assignedAt', sort: 'desc' }],
            },
          }}
        />
      </div>

      <Dialog size="sm" open={isDeleteDialog}>
        <DialogTitle>경고</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말로 {roleName} 역할을 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
          <Button onClick={onClickDeleteRole}>역할 삭제</Button>
        </DialogActions>
      </Dialog>
    </Page>
  )
}

export default IAMRolesDetailPage
