import { useParams } from 'react-router'
import { useQueryWrap } from '@queries/useQuery'
import {
  CreatePermissionReq,
  PermissionDetailRes,
  PermissionDto,
} from '@api/model/IAM/permission'
import Instance from '@api/Instance'
import { IAM_API_PATH } from '@api/path/IAM/iamPath'
import { useMutationWrap } from '@queries/useMutation'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useErrorStore } from '@stores/error.store'
import LoadingService from '@services/LoadingService'
import { IAMErrorRes, IAMSuccessRes } from '@api/model/IAMRes'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { To } from '@routes/To'
import { AxiosError } from 'axios'
import ErrorCode from '@api/Instance/errorCode'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Typography from '@components/Typography'
import BaseTextField from '@components/TextField'
import { Alert, Box } from '@mui/material'
import { Dialog } from '@components/Dialog'
import Button from '@components/Button'
import InvalidParamsErrorDialog from '@components/Dialog/InvalidParamsErrorDialog'
import { queryClient } from '@queries/client'
import { PermissionQueryKey } from '@domain/IAM/pages/Permission/Props'

function PermissionCreateUpdate() {
  const { id } = useParams()

  const { isSuccess: isSuccessPermission, data: detailPermission } =
    useQueryWrap<PermissionDetailRes>(
      PermissionQueryKey.detail,
      () => Instance.get(IAM_API_PATH.PERMISSION(id as string)),
      {
        enabled: !!id,
      }
    )

  const { mutate: create } = useMutationWrap<PermissionDto>()
  const { mutate: update } = useMutationWrap()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [isDialog, setIsDialog] = useState(false)
  const [isDuplicateError, setIsDuplicateError] = useState(false)
  const setSystemError = useErrorStore((state) => state.setIsInvalidError)

  const title = id ? '권한 수정' : '권한 생성'

  useEffect(() => {
    if (id && isSuccessPermission && detailPermission) {
      setName(detailPermission.name)
      setDesc(detailPermission.description)
    }
  }, [id, isSuccessPermission, detailPermission])

  const onClickButton = () => {
    setIsDialog(true)
  }

  const onClickSave = () => {
    LoadingService.show()

    const CreatePermissionParams: CreatePermissionReq = {
      name: name,
      description: desc,
    }

    const onSuccess = ({ success, data }: IAMSuccessRes<any>) => {
      if (success) {
        SnackbarService.show(MSG.SUCCESS.SAVE_PERMISSION)
        queryClient.invalidateQueries(PermissionQueryKey.detail)
        navigate(`${To.IAMPermissionList}/${data.id}`)
      }
    }

    const onError = ({ response }: AxiosError<IAMErrorRes<any>>) => {
      const code = response?.data.code

      if (code === ErrorCode.EXISTING_PERMISSION_NAME) {
        setIsDuplicateError(true)
      } else {
        setSystemError(true)
      }
    }

    const onSettled = () => {
      setIsDialog(false)
      LoadingService.close()
    }

    if (id) {
      update(
        Instance.put<CreatePermissionReq>(
          IAM_API_PATH.PERMISSION(id as string),
          CreatePermissionParams
        ),
        {
          onSuccess: onSuccess,
          onError: onError,
          onSettled: onSettled,
        }
      )
    } else {
      create(
        Instance.post<CreatePermissionReq>(
          IAM_API_PATH.PERMISSION_LIST,
          CreatePermissionParams
        ),
        {
          onSuccess: onSuccess,
          onError: onError,
          onSettled: onSettled,
        }
      )
    }
  }

  return isSuccessPermission && !detailPermission ? (
    <div>존재하지 않는 페이지 입니다.</div>
  ) : (
    <Page>
      <SubHeader
        title={title}
        saveButton={{
          disabled: !(name.trim() && desc.trim()),
          onClick: onClickButton,
        }}
      />

      <Box display={'flex'} alignItems={'center'} pt={2}>
        <InfoOutlinedIcon fontSize={'small'} sx={{ color: '#0288D1' }} />
        <Typography variant={'body2'} ml={1} color={'#00000099'}>
          {id
            ? MSG.INFO.UPDATE_PERMISSION_CODE
            : MSG.INFO.CREATE_PERMISSION_CODE}
        </Typography>
      </Box>

      <Typography variant={'subtitle2'} mt={3}>
        권한명
      </Typography>
      <BaseTextField
        label={'권한명'}
        data-cy={'name'}
        value={name}
        onChange={(e) => {
          if (isDuplicateError) {
            setIsDuplicateError(false)
          }

          setName(e.currentTarget.value)
        }}
        size={'small'}
        sx={{ width: '376px', mt: 1.5 }}
      />

      {isDuplicateError && (
        <Alert
          sx={{ width: '376px', fontSize: '12px', mt: 1.5 }}
          severity="error"
        >
          {MSG.ERROR.DUPLICATE_PERMISSION}
        </Alert>
      )}

      <Typography variant={'subtitle2'} mt={5}>
        권한 설명
      </Typography>
      <BaseTextField
        label={'권한 설명'}
        data-cy={'desc'}
        value={desc}
        onChange={(e) => {
          setDesc(e.currentTarget.value)
        }}
        size={'small'}
        sx={{ marginTop: '12px' }}
        minRows={3}
        maxRows={3}
        multiline
        fullWidth
      />
      <Dialog
        size="sm"
        open={isDialog}
        title="확인"
        onClose={() => setIsDialog(false)}
        content={
          id ? (
            <>
              권한명이 수정된 경우 관련 코드 수정이 필요합니다.
              <br /> 설정된 정보로 권한을 저장하시겠습니까?
            </>
          ) : (
            '설정된 정보로 권한을 저장하시겠습니까?'
          )
        }
        actions={
          <>
            <Button onClick={() => setIsDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogSaveButton'}
              data-sb-kind={'pages/IAM/Permission/PermissionDetail'}
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

export default PermissionCreateUpdate
