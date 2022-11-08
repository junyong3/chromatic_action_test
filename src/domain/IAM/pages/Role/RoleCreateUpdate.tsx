import { useParams } from 'react-router'
import { useQueryWrap } from '@queries/useQuery'
import {
  CreateRoleReq,
  PrepareRoleRes,
  RoleDetailRes,
  RoleDto,
} from '@api/model/IAM/role'
import Instance from '@api/Instance'
import { IAM_API_PATH } from '@api/path/IAM/iamPath'
import { useMutationWrap } from '@queries/useMutation'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { UserDto, UserRow } from '@api/model/IAM/user'
import { PermissionDto, PermissionRow } from '@api/model/IAM/permission'
import { useErrorStore } from '@stores/error.store'
import { GridColDef } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import ButtonCell from '@components/DataGrid/renderCell/ButtonCell'
import LoadingService from '@services/LoadingService'
import { IAMErrorRes, IAMSuccessRes } from '@api/model/IAMRes'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { To } from '@routes/To'
import { AxiosError } from 'axios'
import ErrorCode from '@api/Instance/errorCode'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import Typography from '@components/Typography'
import BaseTextField from '@components/TextField'
import { Alert, Box } from '@mui/material'
import Autocomplete from '@components/Autocomplete'
import DataGrid from '@components/DataGrid'
import { Dialog } from '@components/Dialog'
import Button from '@components/Button'
import InvalidParamsErrorDialog from '@components/Dialog/InvalidParamsErrorDialog'
import { useQueryClient } from 'react-query'

function RoleCreateUpdate() {
  const { id } = useParams()

  const { isSuccess: isSuccessRole, data: detailRole } =
    useQueryWrap<RoleDetailRes>(
      ['role'],
      () => Instance.get(IAM_API_PATH.ROLE(id as string)),
      {
        enabled: !!id,
      }
    )
  const { isSuccess: isSuccessPrepare, data: detailPrepare } =
    useQueryWrap<PrepareRoleRes>(['prepare'], () =>
      Instance.get(IAM_API_PATH.ROLE_PREPARE)
    )

  const { mutate: create } = useMutationWrap<RoleDto>()
  const { mutate: update } = useMutationWrap()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const [roleName, setRoleName] = useState('')
  const [memo, setMemo] = useState('')
  const [user] = useState()
  const [userOptions, setUserOptions] = useState<UserDto[]>([])
  const [rows, setRows] = useState<UserRow[]>([])

  const [permission] = useState()
  const [permissionOptions, setPermissionOptions] = useState<PermissionRow[]>(
    []
  )
  const [permissionRows, setPermissionRows] = useState<PermissionRow[]>([])

  const [isDialog, setIsDialog] = useState(false)
  const [isDuplicateError, setIsDuplicateError] = useState(false)
  const setIsInvalidError = useErrorStore((state) => state.setIsInvalidError)

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
          <ButtonCell
            text={'삭제'}
            color={'error'}
            cellInfo={row}
            data-cy={'deleteButton'}
            onCellClick={onClickDeleteRow}
          />
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
          <ButtonCell
            text={'삭제'}
            color={'error'}
            cellInfo={row}
            onCellClick={onClickDeleteRow}
          />
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

    const createRoleParams: CreateRoleReq = {
      name: roleName,
      memo: memo,
      userIds: rows.map((d) => d.id),
      permissionIds: permissionRows.map((d) => d.id),
    }

    const onSuccess = ({ success, data }: IAMSuccessRes<any>) => {
      if (success) {
        queryClient.invalidateQueries(['roleDetail', id])
        SnackbarService.show(MSG.SUCCESS.SAVE_ROLE)
        navigate(`${To.IAMRoleList}/${data.id}`)
      }
    }

    const onError = ({ response }: AxiosError<IAMErrorRes<any>>) => {
      const code = response?.data.code

      if (code === ErrorCode.EXISTING_ROLE_NAME) {
        setIsDuplicateError(true)
      } else if (code === ErrorCode.NO_ROLE_NAME_INPUT) {
        console.log('NO_ROLE_NAME_INPUT')
      } else {
        setIsInvalidError(true)
      }
    }

    const onSettled = () => {
      setIsDialog(false)
      LoadingService.close()
    }

    if (id) {
      update(Instance.put(IAM_API_PATH.ROLE(id as string), createRoleParams), {
        onSuccess: onSuccess,
        onError: onError,
        onSettled: onSettled,
      })
    } else {
      create(
        Instance.post<CreateRoleReq>(IAM_API_PATH.ROLE_LIST, createRoleParams),
        {
          onSuccess: onSuccess,
          onError: onError,
          onSettled: onSettled,
        }
      )
    }
  }

  return isSuccessRole && !detailRole ? (
    <div>존재하지 않는 페이지 입니다.</div>
  ) : (
    <Page>
      <SubHeader
        title={title}
        saveButton={{
          disabled: !roleName.trim(),
          onClick: onClickButton,
        }}
      />

      <Typography variant={'subtitle2'} mt={4}>
        역할명
      </Typography>
      <BaseTextField
        label={'역할명'}
        data-cy={'roleName'}
        value={roleName}
        onChange={(e) => {
          if (isDuplicateError) setIsDuplicateError(false)
          setRoleName(e.currentTarget.value)
        }}
        size={'small'}
        sx={{ width: '376px', mt: 2 }}
      />
      {isDuplicateError && (
        <Alert
          sx={{ width: '376px', fontSize: '12px', mt: 1.5 }}
          severity="error"
        >
          {MSG.ERROR.DUPLICATE_ROLE}
        </Alert>
      )}

      <Typography variant={'subtitle2'} mt={4}>
        역할 메모
      </Typography>
      <BaseTextField
        label={'역할 메모'}
        data-cy={'memo'}
        value={memo}
        onChange={(e) => {
          setMemo(e.currentTarget.value)
        }}
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
      <Autocomplete
        getOptionLabel={(option: any) => option.username || ''}
        isOptionEqualToValue={(option: any, value: any) =>
          option.id === value.id
        }
        sx={{ width: '376px', mt: 2 }}
        data-cy={'user'}
        value={user}
        options={userOptions}
        size={'small'}
        renderInput={(params) => (
          <BaseTextField {...params} label={'사용자 아이디 검색'} />
        )}
        onChange={(e, newValue) => {
          if (!newValue) return

          const user = newValue as UserDto
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

      <Typography variant={'subtitle2'} mt={4}>
        권한 목록
      </Typography>

      <Autocomplete
        getOptionLabel={(option: any) => option.name || ''}
        isOptionEqualToValue={(option: any, value: any) =>
          option.id === value.id
        }
        sx={{ width: '376px', mt: 2 }}
        data-cy={'permission'}
        value={permission}
        options={permissionOptions}
        size={'small'}
        renderInput={(params) => (
          <BaseTextField {...params} label={'권한 검색'} />
        )}
        onChange={(e, newValue) => {
          if (!newValue) return

          const permission = newValue as PermissionDto

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
        open={isDialog}
        title="확인"
        onClose={() => setIsDialog(false)}
        content="설정된 정보로 역할을 저장하시겠습니까?"
        actions={
          <>
            <Button onClick={() => setIsDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogSaveButton'}
              data-sb-kind={'pages/IAM/Role/RoleDetail'}
              onClick={onClickSave}
            >
              저장
            </Button>
          </>
        }
      />
      <InvalidParamsErrorDialog />
    </Page>
  )
}

export default RoleCreateUpdate
