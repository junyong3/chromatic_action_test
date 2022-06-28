import Page from '@components/Page'
import React, { useEffect, useState } from 'react'
import Text from '@components/Text'
import Button from '@components/Button'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import DataGrid from '@components/DataGrid'
import TextField from '@components/TextField'
import { SubHeader } from '@components/Header'
import { useParams } from 'react-router'
import dayjs from 'dayjs'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from '@mui/material'
import Dialog from '@components/Dialog/Dialog'
import SnackbarService from '@services/SnackbarService'
import { To } from '@routes/To'
import { useNavigate } from 'react-router-dom'
import LoadingService from '@services/LoadingService'
import NetworkService from '@api/NetworkService'
import { useQuery } from 'react-query'
import {
  PermissionRow,
  useMutationDeletePermission,
} from '@queries/iam/useMutation.permissions'

function IAMPermissionsDetailPage() {
  const { id: stringId } = useParams()
  const id = Number(stringId)

  const navigate = useNavigate()

  const { mutate: deletePermission } = useMutationDeletePermission()

  const { isSuccess, data: detail } = useQuery(['permissionDetail'], () =>
    NetworkService.iam.getPermission(id)
  )

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [rows, setRows] = useState<PermissionRow[]>([])

  const [actorUsername, setActorUsername] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')

  const [isDisabledDeleteButton, setIsDisabledDeleteButton] = useState(true)
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)

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

  const onClickDelete = () => {
    setIsDeleteDialog(true)
  }

  const onClickDeleteRole = () => {
    LoadingService.show()

    deletePermission(
      { id: id },
      {
        onSuccess: ({ success }) => {
          if (success) {
            SnackbarService.show('권한이 삭제되었습니다.')
            navigate(To.IAMPermissionsList)
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
      const rows = detail.permissionsOnRoles || []

      setName(detail.name)
      setDescription(detail.description)
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
      <SubHeader title={'권한 상세'}>
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
        권한명
      </Text>
      <TextField
        label={'권한명'}
        value={name}
        disabled={true}
        size={'small'}
        sx={{ width: '376px', marginTop: '16px' }}
      />
      <Text styleName={'subtitle2'} as={'div'} sx={{ marginTop: '32px' }}>
        권한 설명
      </Text>
      <TextField
        label={'권한 설명'}
        value={description}
        disabled={true}
        size={'small'}
        sx={{ marginTop: '12px' }}
        minRows={3}
        maxRows={3}
        multiline
        fullWidth
      />

      <Text styleName={'subtitle2'} as={'div'} sx={{ marginTop: '32px' }}>
        권한이 부여된 역할 목록
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

      <Text
        styleName={'caption'}
        as={'div'}
        sx={{ marginTop: 40, color: '#00000099' }}
      >
        최종 작업자 및 최종 작업 일시 : {actorUsername} /{' '}
        {dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}
      </Text>

      <Dialog size="sm" open={isDeleteDialog}>
        <DialogTitle>경고</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말로 {name} 권한을 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
          <Button onClick={onClickDeleteRole}>권한 삭제</Button>
        </DialogActions>
      </Dialog>
    </Page>
  )
}

export default IAMPermissionsDetailPage
