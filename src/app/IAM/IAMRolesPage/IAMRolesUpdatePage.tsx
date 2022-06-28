import Page from '@components/Page'
import React, { useEffect, useState } from 'react'
import Text from '@components/Text'
import Button from '@components/Button'
import { GridColDef } from '@mui/x-data-grid'
import {
  Alert,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from '@mui/material'
import DataGrid from '@components/DataGrid'
import TextField from '@components/TextField'
import Autocomplete from '@components/Autocomplete'
import { useParams } from 'react-router'
import dayjs from 'dayjs'
import { SubHeader } from '@components/Header'
import { SLACK_계정관리_정보보안_CAHNNEL_URL } from '@config'
import Dialog from '@components/Dialog/Dialog'
import {
  useMutationCreateRole,
  useMutationUpdateRole,
  User,
  UserRow,
} from '@queries/iam/useMutation.roles'
import SnackbarService from '@services/SnackbarService'
import LoadingService from '@services/LoadingService'
import { useNavigate } from 'react-router-dom'
import { To } from '@routes/To'
import ErrorCode from '@api/NetworkService/errorCode'
import NetworkService from '@api/NetworkService'
import { useQuery } from 'react-query'
import { MSG } from '@constants/MessageCode/msg'
import { Permission, PermissionRow } from '@queries/iam/useMutation.permissions'
import { IAMSuccessResponseDto } from '@api/dto/iam.response.dto'

function IAMRolesUpdatePage() {
  const { id: stringId } = useParams()
  const id = Number(stringId)

  const { isSuccess: isSuccessRole, data: detailRole } = useQuery(
    ['role'],
    () => NetworkService.iam.getRole(id),
    { enabled: !!id }
  )
  const { isSuccess: isSuccessPrepare, data: detailPrepare } = useQuery(
    ['prepare'],
    () => NetworkService.iam.prePareRoleCreation()
  )
  const { mutate: createRole } = useMutationCreateRole()
  const { mutate: updateRole } = useMutationUpdateRole(id)
  const navigate = useNavigate()

  const [roleName, setRoleName] = useState('')
  const [memo, setMemo] = useState('')
  const [user] = useState()
  const [userOptions, setUserOptions] = useState<User[]>([])
  const [rows, setRows] = useState<UserRow[]>([])

  const [permission] = useState()
  const [permissionOptions, setPermissionOptions] = useState([])
  const [permissionRows, setPermissionRows] = useState<PermissionRow[]>([])

  const [isDialog, setIsDialog] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isDuplicateError, setIsDuplicateError] = useState(false)

  const title = id ? '역할 수정' : '역할 생성'

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
    {
      field: 'func',
      headerName: '기능',
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        const onClickDeleteRow = () => {
          setRows((prev) => {
            const findIndex = prev.findIndex((d) => d.id === row.id)
            return [...rows.slice(0, findIndex), ...rows.slice(findIndex + 1)]
          })
        }

        return (
          <Link
            color="primary"
            underline={'hover'}
            onClick={onClickDeleteRow}
            sx={{ cursor: 'pointer' }}
          >
            삭제
          </Link>
        )
      },
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
    {
      field: 'func',
      headerName: '기능',
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        const onClickDeleteRow = () => {
          setPermissionRows((prev) => {
            const findIndex = prev.findIndex((d) => d.id === row.id)
            return [
              ...permissionRows.slice(0, findIndex),
              ...permissionRows.slice(findIndex + 1),
            ]
          })
        }

        return (
          <Link
            color="primary"
            underline={'hover'}
            onClick={onClickDeleteRow}
            sx={{ cursor: 'pointer' }}
          >
            삭제
          </Link>
        )
      },
    },
  ]

  useEffect(() => {
    if (id && isSuccessRole && detailRole) {
      const rows = detailRole.existingUsersOnRole || []
      const permissionRows = detailRole.existingPermissionsOnRole || []

      setRoleName(detailRole.name)
      setMemo(detailRole.memo)
      setRows(rows)
      setPermissionRows(permissionRows)
    }
  }, [id, isSuccessRole, detailRole])

  useEffect(() => {
    if (isSuccessPrepare) {
      setUserOptions(detailPrepare.users)
      setPermissionOptions(detailPrepare.permissions)
    }
  }, [isSuccessPrepare, detailPrepare])

  const onClickButton = () => {
    setIsDialog(true)
  }

  const onClickSave = () => {
    LoadingService.show()

    const params = {
      name: roleName,
      memo: memo,
      userIds: rows.map((d) => d.id),
      permissionIds: permissionRows.map((d) => d.id),
    }

    const onSuccess = ({ success, code, data }: IAMSuccessResponseDto<any>) => {
      if (success) {
        SnackbarService.show('역할 정보가 저장되었습니다.')
        navigate(`${To.IAMRolesList}/${data.id}`)
      } else {
        if (code === ErrorCode.EXISTING_ROLE_NAME) {
          setIsDuplicateError(true)
        } else {
          setIsError(true)
        }
      }
    }

    const onSettled = () => {
      setIsDialog(false)
      LoadingService.close()
    }

    if (id) {
      updateRole(params, {
        onSuccess: onSuccess,
        onSettled: onSettled,
      })
    } else {
      createRole(params, {
        onSuccess: onSuccess,
        onSettled: onSettled,
      })
    }
  }

  return isSuccessRole && !detailRole ? (
    <div>존재하지 않는 페이지 입니다.</div>
  ) : (
    <Page>
      <SubHeader title={title}>
        <Button
          variant="contained"
          size="medium"
          disabled={!roleName}
          onClick={onClickButton}
        >
          저장
        </Button>
      </SubHeader>

      <Text styleName={'subtitle2'} as={'div'} sx={{ marginTop: '32px' }}>
        역할명
      </Text>
      <TextField
        label={'역할명'}
        value={roleName}
        onChange={(e) => {
          if (isDuplicateError) {
            setIsDuplicateError(false)
          }

          setRoleName(e.currentTarget.value)
        }}
        size={'small'}
        sx={{ width: '376px', marginTop: '12px' }}
      />
      {isDuplicateError && (
        <Alert
          sx={{ width: '376px', fontSize: '12px', mt: 1.5 }}
          severity="error"
        >
          {MSG.ERROR.DUPLICATE_ROLE}
        </Alert>
      )}

      <Text styleName={'subtitle2'} as={'div'} sx={{ marginTop: '32px' }}>
        역할 메모
      </Text>
      <TextField
        label={'역할 메모'}
        value={memo}
        onChange={(e) => {
          setMemo(e.currentTarget.value)
        }}
        size={'small'}
        sx={{ width: '376px', marginTop: '12px' }}
        minRows={3}
        maxRows={3}
        multiline
        inputProps={{ maxLength: 50 }}
        placeholder={'역할의 정의와 역할 생성 요청자를 입력해 주세요.'}
      />
      <Text styleName={'subtitle2'} as={'div'} sx={{ marginTop: '40px' }}>
        역할 부여된 사용자 목록
      </Text>
      <div style={{ display: 'flex', paddingTop: '12px' }}>
        <Autocomplete
          getOptionLabel={(option: any) => option.username || ''}
          isOptionEqualToValue={(option: any, value: any) =>
            option.id === value.id
          }
          sx={{ width: '376px' }}
          value={user}
          options={userOptions}
          size={'small'}
          renderInput={(params) => (
            <TextField {...params} label={'사용자 아이디 검색'} />
          )}
          onChange={(e, newValue) => {
            if (!newValue) return

            const user = newValue as User
            const id = user.id as string
            const username = user.username as string

            if (!username || !id) return

            const findObject = rows.find((d) => d.id === id)
            if (findObject) {
              SnackbarService.show(MSG.ERROR.DUPLICATE_EMAIL)
              return
            }

            const addUser = {
              id: id,
              username: username,
              assignedAt: dayjs().toISOString(),
              func: null,
            }

            setRows((prevRows) => [addUser, ...prevRows] as UserRow[])
          }}
        />
      </div>

      <div style={{ width: '100%', paddingTop: '16px' }}>
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
      <div style={{ display: 'flex', paddingTop: '12px' }}>
        <Autocomplete
          getOptionLabel={(option: any) => option.name || ''}
          isOptionEqualToValue={(option: any, value: any) =>
            option.id === value.id
          }
          sx={{ width: '376px' }}
          value={permission}
          options={permissionOptions}
          size={'small'}
          renderInput={(params) => (
            <TextField {...params} label={'권한 검색'} />
          )}
          onChange={(e, newValue) => {
            if (!newValue) return

            const permission = newValue as Permission

            const id = permission.id
            const name = permission.name
            const description = permission.description

            if (!name || !id || !description) return

            const findObject = permissionRows.find((d) => d.id === id)
            if (findObject) {
              SnackbarService.show(MSG.ERROR.ALREADY_PERMISSION)
              return
            }

            const addPermission = {
              id: id,
              name: name,
              description: description,
              assignedAt: dayjs().toISOString(),
              func: null,
            }

            setPermissionRows(
              (prevRows) => [addPermission, ...prevRows] as PermissionRow[]
            )
          }}
        />
      </div>

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

      <Dialog size="sm" open={isDialog}>
        <DialogTitle>확인</DialogTitle>
        <DialogContent>
          <DialogContentText>
            설정된 정보로 역할을 저장하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialog(false)}>닫기</Button>
          <Button onClick={onClickSave}>저장</Button>
        </DialogActions>
      </Dialog>

      <Dialog size="sm" open={isError}>
        <DialogTitle>시스템 오류</DialogTitle>
        <DialogContent>
          <DialogContentText>
            시스템 오류가 발생해 동작을 수행할 수 없습니다.
            <br />
            Slack 채널로 이동해 오류를 공유해 주세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsError(false)}>닫기</Button>
          <Link href={SLACK_계정관리_정보보안_CAHNNEL_URL} target="_blank">
            <Button>채널로 이동</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Page>
  )
}

export default IAMRolesUpdatePage
