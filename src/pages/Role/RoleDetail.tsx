import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useMutationWrap } from '@queries/useMutation'
import { useQueryWrap } from '@queries/useQuery'
import { RoleDetailRes } from '@api/model/IAM/role'
import NetworkService from '@api/NetworkService'
import { IAM_API_PATH } from '@api/path/IAM/iamPath'
import { useEffect, useState } from 'react'
import { UserRow } from '@api/model/IAM/user'
import { PermissionRow } from '@api/model/IAM/permission'
import { GridColDef } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { To } from '@routes/To'
import ErrorCode from '@api/NetworkService/errorCode'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import Typography from '@components/Typography'
import BaseTextField from '@components/TextField'
import DataGrid from '@components/DataGrid'
import { Dialog } from '@components/Dialog'
import Button from '@components/Button'
import { Box } from '@mui/material'

function RoleDetail() {
  const { id } = useParams()

  const navigate = useNavigate()

  const { mutate } = useMutationWrap()

  const { isSuccess, data: detail } = useQueryWrap<RoleDetailRes>(
    ['roleDetail'],
    () => NetworkService.iam.get(IAM_API_PATH.ROLE(id as string))
  )

  const [roleName, setRoleName] = useState('')
  const [memo, setMemo] = useState('')

  const [userRows, setUserRows] = useState<UserRow[]>([])
  const [permissionRows, setPermissionRows] = useState<PermissionRow[]>([])

  const [isDisabledDeleteButton, setIsDisabledDeleteButton] = useState(true)
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)
  const [isRoleStillHavingUsersDialog, setIsRoleStillHavingUsersDialog] =
    useState(false)

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

    mutate(NetworkService.iam.delete(IAM_API_PATH.ROLE(id as string)), {
      onSuccess: ({ success }) => {
        if (success) {
          SnackbarService.show(MSG.SUCCESS.DELETE_ROLE)
          navigate(To.IAMRoleList)
        }
      },
      onError: ({ response }) => {
        const code = response?.data.code
        switch (code) {
          case ErrorCode.ROLE_STILL_HAVING_USERS:
            setIsRoleStillHavingUsersDialog(true)
            break
        }
      },
      onSettled: () => {
        setIsDeleteDialog(false)
        LoadingService.close()
      },
    })
  }

  useEffect(() => {
    if (isSuccess && detail) {
      const userRows = detail.existingUsersOnRole || []
      const permissionRows = detail.existingPermissionsOnRole || []

      setRoleName(detail.name)
      setMemo(detail.memo)
      setUserRows(userRows)
      setPermissionRows(permissionRows)
      setIsDisabledDeleteButton(!!userRows.length)
    }
  }, [isSuccess, detail])

  return isSuccess && !detail ? (
    <div>존재하지 않는 페이지 입니다.</div>
  ) : (
    <Page>
      <SubHeader
        title="역할 상세"
        deleteButton={{
          disabled: isDisabledDeleteButton,
          onClick: onClickDelete,
        }}
        updateButton={{
          sbKind: 'pages/IAM/Role/RoleUpdate',
          disabled: false,
          onClick: () => navigate('update'),
        }}
      />

      <Typography variant={'subtitle2'} mt={4}>
        역할명
      </Typography>
      <BaseTextField
        label={'역할명'}
        data-cy={'roleName'}
        value={roleName}
        disabled={true}
        size={'small'}
        sx={{ width: '376px', mt: 2 }}
      />

      <Typography variant={'subtitle2'} mt={4}>
        역할 메모
      </Typography>
      <BaseTextField
        label={'역할 메모'}
        data-cy={'memo'}
        value={memo}
        disabled={true}
        size={'small'}
        sx={{ width: '376px', mt: 2 }}
        minRows={3}
        maxRows={3}
        multiline
        inputProps={{ maxLength: 50 }}
        placeholder={'역할의 정의와 역할 생성 요청자를 입력해 주세요.'}
      />

      <Typography variant={'subtitle2'} mt={4}>
        역할 부여된 사용자 목록
      </Typography>
      <Box pt={2}>
        <DataGrid
          rows={userRows}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'assignedAt', sort: 'desc' }],
            },
          }}
        />
      </Box>

      <Typography variant={'subtitle2'} mt={4}>
        권한 목록
      </Typography>
      <Box pt={2}>
        <DataGrid
          rows={permissionRows}
          columns={permissionColumns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'assignedAt', sort: 'desc' }],
            },
          }}
        />
      </Box>

      <Dialog
        size="sm"
        open={isRoleStillHavingUsersDialog}
        title="역할 삭제 불가"
        onClose={() => setIsRoleStillHavingUsersDialog(false)}
        content={
          <>
            해당 역할이 부여된 사용자가 존재합니다.
            <br />
            역할이 부여된 사용자를 모두 삭제한 후 다시 시도해 주세요.
          </>
        }
        actions={
          <Button onClick={() => setIsRoleStillHavingUsersDialog(false)}>
            확인
          </Button>
        }
      />
      <Dialog
        size="sm"
        open={isDeleteDialog}
        title="경고"
        onClose={() => setIsDeleteDialog(false)}
        content={`정말로 ${roleName} 역할을 삭제하시겠습니까?`}
        actions={
          <>
            <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogDeleteButton'}
              data-sb-kind={'pages/IAM/Role/RoleList'}
              onClick={onClickDeleteRole}
            >
              역할 삭제
            </Button>
          </>
        }
      />
    </Page>
  )
}

export default RoleDetail
