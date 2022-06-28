import Page from '@components/Page'
import React, { useEffect, useState } from 'react'
import Text from '@components/Text'
import Button from '@components/Button'
import {
  Alert,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from '@mui/material'
import TextField from '@components/TextField'
import { useParams } from 'react-router'
import { SubHeader } from '@components/Header'
import { SLACK_계정관리_정보보안_CAHNNEL_URL } from '@config'
import Dialog from '@components/Dialog/Dialog'
import {
  useMutationCreatePermission,
  useMutationUpdatePermission,
} from '@queries/iam/useMutation.permissions'
import SnackbarService from '@services/SnackbarService'
import LoadingService from '@services/LoadingService'
import { useNavigate } from 'react-router-dom'
import { To } from '@routes/To'
import NetworkService from '@api/NetworkService'
import { useQuery } from 'react-query'
import { MSG } from '@constants/MessageCode/msg'
import ErrorCode from '@api/NetworkService/errorCode'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { IAMSuccessResponseDto } from '@api/dto/iam.response.dto'

function IAMPermissionsUpdatePage() {
  const { id: stringId } = useParams()
  const id = Number(stringId)

  const { isSuccess: isSuccessPermission, data: detailPermission } = useQuery(
    ['permission'],
    () => NetworkService.iam.getPermission(id),
    { enabled: !!id }
  )

  const { mutate: createPermission } = useMutationCreatePermission()
  const { mutate: updatePermission } = useMutationUpdatePermission(id)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [isDialog, setIsDialog] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isDuplicateError, setIsDuplicateError] = useState(false)

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

    const params = {
      name: name,
      description: desc,
    }

    const onSuccess = ({ success, code, data }: IAMSuccessResponseDto<any>) => {
      if (success) {
        SnackbarService.show('권한 정보가 저장되었습니다.')
        navigate(`${To.IAMPermissionsList}/${data.id}`)
      } else {
        if (code === ErrorCode.EXISTING_PERMISSION_NAME) {
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
      updatePermission(params, {
        onSuccess: onSuccess,
        onSettled: onSettled,
      })
    } else {
      createPermission(params, {
        onSuccess: onSuccess,
        onSettled: onSettled,
      })
    }
  }

  return isSuccessPermission && !detailPermission ? (
    <div>존재하지 않는 페이지 입니다.</div>
  ) : (
    <Page>
      <SubHeader title={title}>
        <Button
          variant="contained"
          size="medium"
          disabled={!(name.trim() && desc.trim())}
          onClick={onClickButton}
        >
          저장
        </Button>
      </SubHeader>

      <div
        style={{ display: 'flex', alignItems: 'center', paddingTop: '16px' }}
      >
        <InfoOutlinedIcon fontSize={'small'} sx={{ color: '#0288D1' }} />
        <Text
          styleName={'body2'}
          as={'div'}
          sx={{
            marginLeft: 8,
            color: '#00000099',
          }}
        >
          {MSG.INFO.NO_EXIST_PERMISSION_CODE}
        </Text>
      </div>

      <Text styleName={'subtitle2'} as={'div'} sx={{ marginTop: '24px' }}>
        권한명
      </Text>
      <TextField
        label={'권한명'}
        value={name}
        onChange={(e) => {
          if (isDuplicateError) {
            setIsDuplicateError(false)
          }

          setName(e.currentTarget.value)
        }}
        size={'small'}
        sx={{ width: '376px', marginTop: '12px' }}
      />

      {isDuplicateError && (
        <Alert
          sx={{ width: '376px', fontSize: '12px', mt: 1.5 }}
          severity="error"
        >
          {MSG.ERROR.DUPLICATE_PERMISSION}
        </Alert>
      )}

      <Text styleName={'subtitle2'} as={'div'} sx={{ marginTop: '40px' }}>
        권한 설명
      </Text>
      <TextField
        label={'권한 설명'}
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
      {id ? (
        <>
          <Dialog size="sm" open={isDialog}>
            <DialogTitle>확인</DialogTitle>
            <DialogContent>
              <DialogContentText>
                권한명이 수정된 경우 관련 코드 수정이 필요합니다.
                <br /> 설정된 정보로 권한을 저장하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDialog(false)}>닫기</Button>
              <Button onClick={onClickSave}>저장</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Dialog size="sm" open={isDialog}>
          <DialogTitle>확인</DialogTitle>
          <DialogContent>
            <DialogContentText>
              설정된 정보로 권한을 저장하시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialog(false)}>닫기</Button>
            <Button onClick={onClickSave}>저장</Button>
          </DialogActions>
        </Dialog>
      )}

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

export default IAMPermissionsUpdatePage
