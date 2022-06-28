import React, { ChangeEvent, useState } from 'react'
import styled from '@emotion/styled'
import Button from '@components/Button'
import TextField from '@components/TextField'
import LoadingService from '@services/LoadingService'
import { Alert } from '@mui/material'
import { AuthChangePasswordRequestDto } from '@api/dto/auth.changePassword.request.dto'
import { useMutationChangePassword } from '@queries/auth/useMutation.changePassword'
import ErrorCode from '@api/NetworkService/errorCode'
import { useNavigate } from 'react-router-dom'
import { To } from '@routes/To'
import { useAuthStore } from '@stores/auth.store'
import {
  FailureData,
  INVALID_PARAMETERS_CODE,
} from '@api/dto/auth.changePassword.response.dto'
import SnackbarService from '@services/SnackbarService'

const INVALID_PASSWORD_ERROR_MESSAGE =
  '영소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자를 입력해 주세요'
const NO_SAME_CONFIRM_PASSWORD_ERROR_MESSAGE =
  '위의 비밀번호와 동일하게 입력해 주세요.'
const UNAUTHORIZED_SUBMIT_ERROR_MESSAGE = '입력한 정보가 일치하지 않습니다.'
const NO_RECENTLY_USED_PASSWORD_ERROR_MESSAGE =
  '현재 비밀번호와 다른 비밀번호를 입력해 주세요.'
const NOT_EMAIL_ERROR_MESSAGE = '이메일과 다른 비밀번호를 입력해 주세요.'

// Minimum Length : 8
// Lowercase Characters(영소문자) : 1
// Digits(숫자) : 1
// Special Characters(특수문자) : 1
const REGEXP = /^(?=.*[a-z])(?=.*[!@#$%^*+=-])(?=.*\d)/

function ChangePasswordPageForm() {
  const { mutate: changePassword } = useMutationChangePassword()
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

    const changePasswordRequestDto: AuthChangePasswordRequestDto = {
      username: temporallyStoredEmailForChangingPassword || loggedEmail,
      password: password,
      new_password: newPassword,
      confirmation: confirmNewPassword,
      otpcode: otp,
    }

    changePassword(changePasswordRequestDto, {
      onSuccess: ({ success, code, data }) => {
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
        } else {
          let numFailures = 0

          switch (code) {
            case ErrorCode.ACCESS_DENIED:
              numFailures = (data as FailureData)?.num_failures

              if (numFailures) {
                setNumOfLoginFailure(numFailures)
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
              } else if (
                data === INVALID_PARAMETERS_CODE.PASSWORD_MINIMUM_LENGTH ||
                data === INVALID_PARAMETERS_CODE.PASSWORD_MISMATCH ||
                data === INVALID_PARAMETERS_CODE.AT_LEAST_ONE_LOWER_CASE ||
                data === INVALID_PARAMETERS_CODE.AT_LEAST_ONE_NUMERIC ||
                data === INVALID_PARAMETERS_CODE.AT_LEAST_ONE_SPECIAL_CHARACTER
              ) {
                setIsFailedKeycloak(true)
              }
              break
            case ErrorCode.FAILED_INTERNAL_ERROR:
            case ErrorCode.FAILED_KEYCLOAK_HANDLING:
              setIsFailedKeycloak(true)
              break
          }
        }
      },
      onSettled: () => {
        LoadingService.close()
      },
    })
  }

  const onChangePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.currentTarget.value)
  }

  const onChangeNewPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!REGEXP.test(e.currentTarget.value)) {
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

  const isEnabledButton = password && newPassword && confirmNewPassword && otp
  // &&
  // !isInvalidNewPwd &&
  // !isNoSameConfirmPwd

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="현재 비밀번호"
        type="password"
        value={password}
        onChange={onChangePassword}
        fullWidth
      />
      <Input
        label="새 비밀번호"
        type="password"
        value={newPassword}
        onChange={onChangeNewPassword}
        fullWidth
        error={isInvalidNewPwd}
        helperText={isInvalidNewPwd ? INVALID_PASSWORD_ERROR_MESSAGE : ''}
      />
      <Input
        label="새 비밀번호 확인"
        type="password"
        value={confirmNewPassword}
        onChange={onChangeConfirmNewPassword}
        fullWidth
        error={isNoSameConfirmPwd}
        helperText={
          isNoSameConfirmPwd ? NO_SAME_CONFIRM_PASSWORD_ERROR_MESSAGE : ''
        }
      />

      <Input
        label="OTP 인증번호"
        inputProps={{ maxLength: 6 }}
        value={otp}
        onChange={handleChangeOtp}
        fullWidth
      />

      {(isInvalidParameters ||
        (numOfLoginFailure > 0 && numOfLoginFailure < 5)) && (
        <Alert sx={{ mt: 1.5 }} severity="error">
          {UNAUTHORIZED_SUBMIT_ERROR_MESSAGE}
        </Alert>
      )}

      {isNotRecentlyUsed && (
        <Alert sx={{ mt: 1.5 }} severity="error">
          {NO_RECENTLY_USED_PASSWORD_ERROR_MESSAGE}
        </Alert>
      )}

      {isNotEmail && (
        <Alert sx={{ mt: 1.5 }} severity="error">
          {NOT_EMAIL_ERROR_MESSAGE}
        </Alert>
      )}

      <SubmitButton
        type="submit"
        variant="contained"
        fullWidth
        disabled={!isEnabledButton}
      >
        비밀번호 변경
      </SubmitButton>
    </form>
  )
}

const Input = styled(TextField)`
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
