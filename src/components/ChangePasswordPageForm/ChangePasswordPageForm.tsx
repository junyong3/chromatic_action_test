import React, { ChangeEvent, useState } from 'react'
import styled from '@emotion/styled'
import Button from '@components/Button'
import BaseTextField from '@components/TextField'
import LoadingService from '@services/LoadingService'
import { Alert } from '@mui/material'
import { ChangePasswordReq } from '@api/model/IAM/changePassword'
import ErrorCode from '@api/NetworkService/errorCode'
import { useNavigate } from 'react-router-dom'
import { To } from '@routes/To'
import { useAuthStore } from '@stores/auth.store'
import SnackbarService from '@services/SnackbarService'
import { IAMErrorRes } from '@api/model/IAMRes'
import { AxiosError } from 'axios'
import { MSG } from '@constants/MessageCode/msg'
import { INVALID_PARAMETERS_CODE } from '@api/model/IAM/changePassword'
import { useMutationWrap } from '@queries/useMutation'
import NetworkService from '@api/NetworkService'
import { IAM_API_PATH } from '@api/path/IAM/iamPath'
import { REGEXP } from '@src/constants/REGEXP'

function ChangePasswordPageForm() {
  const { mutate } = useMutationWrap()
  const navigate = useNavigate()

  const loggedEmail = useAuthStore((state) => state.loggedEmail)
  const temporallyStoredEmailForChangingPassword = useAuthStore(
    (state) => state.temporallyStoredEmailForChangingPassword
  )
  const setTemporallyStoredEmailForChangingPassword = useAuthStore(
    (state) => state.setTemporallyStoredEmailForChangingPassword
  )

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [otp, setOtp] = useState('')

  const [isInvalidNewPwd, setIsInvalidNewPwd] = useState(false)
  const [isNoSameConfirmPwd, setIsNoSameConfirmPwd] = useState(false)

  const [isInvalidParameters, setIsInvalidParameters] = useState(false)
  const [isNotEmail, setIsNotEmail] = useState(false)
  const [isNotRecentlyUsed, setIsNotRecentlyUsed] = useState(false)

  const setIsAccountLocked = useAuthStore((state) => state.setIsAccountLocked)
  const numOfLoginFailure = useAuthStore((state) => state.numOfLoginFailure)
  const setNumOfLoginFailure = useAuthStore(
    (state) => state.setNumOfLoginFailure
  )
  const setIsFailedKeycloak = useAuthStore((state) => state.setIsFailedKeycloak)

  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)

  const handleChangeOtp = (event: ChangeEvent<HTMLInputElement>) => {
    const removeExceptNumber = (value: string) => value.replace(/\D/g, '')
    let value = event.currentTarget.value
    if (isNaN(Number(value)))
      value = removeExceptNumber(event.currentTarget.value)
    setOtp(value)
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    LoadingService.show()

    // To remove Alert
    setIsInvalidParameters(false)
    setIsNotRecentlyUsed(false)
    setIsNotEmail(false)
    setIsAccountLocked(false)
    setNumOfLoginFailure(0)
    setIsFailedKeycloak(false)

    const changePasswordParams: ChangePasswordReq = {
      username: temporallyStoredEmailForChangingPassword || loggedEmail,
      password,
      newPassword,
      otp,
    }

    mutate(
      NetworkService.iam.post<ChangePasswordReq>(
        IAM_API_PATH.CHANGE_PASSWORD,
        changePasswordParams
      ),
      {
        onSuccess: ({ success }) => {
          if (success) {
            if (temporallyStoredEmailForChangingPassword) {
              setTemporallyStoredEmailForChangingPassword(null)
              SnackbarService.show(
                '비밀번호가 변경되었습니다. 변경된 비밀번호로 재로그인해 주세요.'
              )
              navigate(To.Login)
            } else {
              SnackbarService.show('비밀번호가 변경되었습니다.')
              navigate(To.Home)
            }
          }
        },
        onError: ({ response }: AxiosError<IAMErrorRes<any>>) => {
          const code = response?.data?.code
          const data = response?.data?.data

          let failureCount = 0

          switch (code) {
            case ErrorCode.ACCESS_DENIED:
              failureCount = data?.signInFailureCount

              if (failureCount) {
                setNumOfLoginFailure(failureCount)
              }
              break
            case ErrorCode.ACCESS_DENIED_ACCOUNT_DISABLE:
              setIsAccountLocked(true)

              // 로그아웃 처리
              setIsLoggedIn(false)
              navigate(To.Login)
              break
            case ErrorCode.INVALID_PARAMETERS:
              if (data === INVALID_PARAMETERS_CODE.NOT_RECENTLY_USED) {
                setIsNotRecentlyUsed(true)
              } else if (
                data === INVALID_PARAMETERS_CODE.NOT_USERNAME ||
                data === INVALID_PARAMETERS_CODE.NOT_EMAIL
              ) {
                setIsNotEmail(true)
              } else {
                setIsFailedKeycloak(true)
              }
              break
            case ErrorCode.FAILED_INTERNAL_ERROR:
            case ErrorCode.FAILED_KEYCLOAK_HANDLING:
              setIsFailedKeycloak(true)
              break
          }
        },
        onSettled: () => {
          LoadingService.close()
        },
      }
    )
  }

  const onChangePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.currentTarget.value)
  }

  const onChangeNewPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!REGEXP.USER_PASSWORD.test(e.currentTarget.value)) {
      setIsInvalidNewPwd(true)
    } else {
      setIsInvalidNewPwd(false)
    }

    setNewPassword(e.currentTarget.value)
  }

  const onChangeConfirmNewPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (newPassword !== e.currentTarget.value) {
      setIsNoSameConfirmPwd(true)
    } else {
      setIsNoSameConfirmPwd(false)
    }

    setConfirmNewPassword(e.currentTarget.value)
  }

  const isEnabledButton =
    password &&
    newPassword &&
    confirmNewPassword &&
    otp &&
    !isInvalidNewPwd &&
    !isNoSameConfirmPwd

  return (
    <form onSubmit={handleSubmit}>
      <Input
        size={'medium'}
        label="현재 비밀번호"
        data-cy={'password'}
        type="password"
        value={password}
        onChange={onChangePassword}
        fullWidth
      />
      <Input
        size={'medium'}
        label="새 비밀번호"
        data-cy={'newPassword'}
        type="password"
        value={newPassword}
        onChange={onChangeNewPassword}
        fullWidth
        error={isInvalidNewPwd}
        helperText={isInvalidNewPwd ? MSG.ERROR.INVALID_PASSWORD : ''}
      />
      <Input
        size={'medium'}
        label="새 비밀번호 확인"
        data-cy={'newPasswordConfirm'}
        type="password"
        value={confirmNewPassword}
        onChange={onChangeConfirmNewPassword}
        fullWidth
        error={isNoSameConfirmPwd}
        helperText={
          isNoSameConfirmPwd ? MSG.ERROR.NO_SAME_CONFIRM_PASSWORD : ''
        }
      />

      <Input
        size={'medium'}
        label="OTP 인증번호"
        data-cy={'otp'}
        inputProps={{ maxLength: 6 }}
        value={otp}
        onChange={handleChangeOtp}
        fullWidth
      />

      {(isInvalidParameters ||
        (numOfLoginFailure > 0 && numOfLoginFailure < 5)) && (
        <Alert data-cy={'alert'} sx={{ mt: 1.5 }} severity="error">
          {MSG.ERROR.UNAUTHORIZED_SUBMIT}
        </Alert>
      )}

      {isNotRecentlyUsed && (
        <Alert sx={{ mt: 1.5 }} severity="error">
          {MSG.ERROR.NO_RECENTLY_USED_PASSWORD}
        </Alert>
      )}

      {isNotEmail && (
        <Alert sx={{ mt: 1.5 }} severity="error">
          {MSG.ERROR.NOT_EMAIL}
        </Alert>
      )}

      <SubmitButton
        type="submit"
        data-cy={'submit'}
        variant="contained"
        fullWidth
        disabled={!isEnabledButton}
        data-sb-kind={'pages/Home'}
      >
        비밀번호 변경
      </SubmitButton>
    </form>
  )
}

const Input = styled(BaseTextField)`
  & + & {
    margin-top: 12px;
  }
`

const SubmitButton = styled(Button)`
  margin-top: 32px;
  margin-bottom: 40px;
  height: 42px;
  font-size: 15px;
  line-height: 26px;
  font-weight: 500;
`

export default ChangePasswordPageForm
