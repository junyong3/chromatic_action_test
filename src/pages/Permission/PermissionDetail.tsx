import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useMutationWrap } from '@queries/useMutation'
import { useQueryWrap } from '@queries/useQuery'
import {
  PermissionDetailRes,
  PermissionsOnRoles,
} from '@api/model/IAM/permission'
import NetworkService from '@api/NetworkService'
import { IAM_API_PATH } from '@api/path/IAM/iamPath'
import { useEffect, useState } from 'react'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { Box, Link } from '@mui/material'
import { To } from '@routes/To'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import ErrorCode from '@api/NetworkService/errorCode'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import Typography from '@components/Typography'
import BaseTextField from '@components/TextField'
import DataGrid from '@components/DataGrid'
import { Dialog } from '@components/Dialog'
import Button from '@components/Button'
import { PermissionQueryKey } from '@pages/Permission/Props'

function PermissionDetail() {
  const { id } = useParams()

  const navigate = useNavigate()

  const { mutate } = useMutationWrap()

  const { isSuccess, data: detail } = useQueryWrap<PermissionDetailRes>(
    PermissionQueryKey.detail,
    () => NetworkService.iam.get(IAM_API_PATH.PERMISSION(id as string))
  )

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [rows, setRows] = useState<PermissionsOnRoles[]>([])

  const [actorUsername, setActorUsername] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')

  const [isDisabledDeleteButton, setIsDisabledDeleteButton] = useState(true)
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)
  const [
    isPermissionStillHavingRolesDialog,
    setIsPermissionStillHavingRolesDialog,
  ] = useState(false)

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: '역할명',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.role?.name,
    },
    {
      field: 'assignedAt',
      headerName: '부여 일시',
      flex: 1,
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

  const onClickDelete = () => {
    setIsDeleteDialog(true)
  }

  const onClickDeleteRole = () => {
    LoadingService.show()

    mutate(NetworkService.iam.delete(IAM_API_PATH.PERMISSION(id as string)), {
      onSuccess: ({ success }) => {
        if (success) {
          SnackbarService.show(MSG.SUCCESS.DELETE_PERMISSION)
          navigate(To.IAMPermissionList)
        }
      },
      onError: ({ response }) => {
        const code = response?.data.code
        switch (code) {
          case ErrorCode.PERMISSION_STILL_HAVING_ROLES:
            setIsPermissionStillHavingRolesDialog(true)
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
      const rows = detail.permissionsOnRoles || []

      setName(detail.name)
      setDesc(detail.description)
      setRows(rows)

      setActorUsername(detail.actorUsername)
      setUpdatedAt(detail.updatedAt)

      setIsDisabledDeleteButton(!!rows.length)
    }
  }, [isSuccess, detail])

  return isSuccess && !detail ? (
    <div>존재하지 않는 페이지 입니다.</div>
  ) : (
    <Page>
      <SubHeader
        title="권한 상세"
        deleteButton={{
          disabled: isDisabledDeleteButton,
          onClick: onClickDelete,
        }}
        updateButton={{
          sbKind: 'pages/IAM/Permission/PermissionUpdate',
          disabled: false,
          onClick: () => navigate('update'),
        }}
      />

      <Typography variant={'subtitle2'} mt={4}>
        권한명
      </Typography>
      <BaseTextField
        label={'권한명'}
        data-cy={'name'}
        value={name}
        disabled={true}
        size={'small'}
        sx={{ width: '376px', mt: 2 }}
      />

      <Typography variant={'subtitle2'} mt={4}>
        권한 설명
      </Typography>
      <BaseTextField
        label={'권한 설명'}
        data-cy={'desc'}
        value={desc}
        disabled={true}
        size={'small'}
        sx={{ mt: 2 }}
        minRows={3}
        maxRows={3}
        multiline
        fullWidth
      />

      <Typography variant={'subtitle2'} mt={4}>
        권한이 부여된 역할 목록
      </Typography>
      <Box pt={2}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'assignedAt', sort: 'desc' }],
            },
          }}
        />
      </Box>

      <Typography variant={'caption'} mt={5} color={'#00000099'}>
        최종 작업자 및 최종 작업 일시 : {actorUsername} /{' '}
        {dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}
      </Typography>

      <Dialog
        size="sm"
        open={isPermissionStillHavingRolesDialog}
        title="권한 삭제 불가"
        onClose={() => setIsDeleteDialog(false)}
        content={
          <>
            해당 권한을 부여받은 역할이 존재합니다.
            <br />
            모든 역할에서 해당 권한을 회수한 후 다시 시도해 주세요.
          </>
        }
        actions={
          <Button onClick={() => setIsPermissionStillHavingRolesDialog(false)}>
            확인
          </Button>
        }
      />
      <Dialog
        size="sm"
        open={isDeleteDialog}
        title="경고"
        content={`정말로 ${name} 권한을 삭제하시겠습니까?`}
        onClose={() => setIsDeleteDialog(false)}
        actions={
          <>
            <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogDeleteButton'}
              data-sb-kind={'pages/IAM/Permission/PermissionList'}
              onClick={onClickDeleteRole}
            >
              권한 삭제
            </Button>
          </>
        }
      />
    </Page>
  )
}

export default PermissionDetail
