import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import Button from '@components/Button'
import TextField from '@components/TextField'
import { AuthSignInRequestDto } from '@api/dto/auth.signIn.request.dto'
import { useMutationSignIn } from '@queries/auth/useMutation.signIn'
import ErrorCode from '@api/NetworkService/errorCode'
import { useAuthStore } from '@stores/auth.store'
import {
  Alert,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from '@mui/material'
import LoadingService from '@services/LoadingService'
import { To } from '@routes/To'
import { SLACK_계정관리_정보보안_CAHNNEL_URL } from '@config'
import Dialog from '@components/Dialog'

const NO_EMAIL_ERROR_MESSAGE = '이메일을 입력해 주세요'
const NO_PASSWORD_ERROR_MESSAGE = '비밀번호를 입력해 주세요'
const NO_OTP_ERROR_MESSAGE = 'OTP 인증번호를 입력해 주세요'
const UNAUTHORIZED_SUBMIT_ERROR_MESSAGE = '입력한 정보가 일치하지 않습니다.'

function LogInPageForm() {
  const { mutate: signIn } = useMutationSignIn()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')

  const [noEmailError, setNoEmailError] = useState(false)
  const [noPasswordError, setNoPasswordError] = useState(false)
  const [noOTPError, setNoOTPError] = useState(false)

  const [isError, setIsError] = useState(false)
  const [isEmailNotFound, setIsEmailNotFound] = useState(false)
  const [invalidParametersError, setInvalidParametersError] = useState(false)

  const setIsAccountLocked = useAuthStore((state) => state.setIsAccountLocked)
  const numOfLoginFailure = useAuthStore((state) => state.numOfLoginFailure)
  const setNumOfLoginFailure = useAuthStore(
    (state) => state.setNumOfLoginFailure
  )

  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)
  const setLoggedEmail = useAuthStore((state) => state.setLoggedEmail)

  const setTemporallyStoredEmailForChangingPassword = useAuthStore(
    (state) => state.setTemporallyStoredEmailForChangingPassword
  )

  useEffect(() => {
    if (email && noEmailError) setNoEmailError(false)
  }, [email, noEmailError, setNoEmailError])

  useEffect(() => {
    if (password && noPasswordError) setNoPasswordError(false)
  }, [password, noPasswordError, setNoPasswordError])

  useEffect(() => {
    if (otp && noOTPError) setNoOTPError(false)
  }, [otp, noOTPError, setNoOTPError])

  useEffect(() => {
    setIsEmailNotFound(false)
  }, [email, password, noOTPError, setIsEmailNotFound])

  useEffect(() => {
    setIsError(false)
  }, [email, password, noOTPError, setIsError])

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
    setIsEmailNotFound(false)
    setIsError(false)
    setInvalidParametersError(false)
    setIsAccountLocked(false)
    setNumOfLoginFailure(0)

    if (!email) setNoEmailError(true)
    if (!password) setNoPasswordError(true)
    if (!otp) setNoOTPError(true)
    if (!email || !password || !otp) {
      LoadingService.close()
      return
    }

    const authSignInRequestDto: AuthSignInRequestDto = {
      username: email,
      password: password,
      otpcode: otp,
    }

    signIn(authSignInRequestDto, {
      onSuccess: (response) => {
        if (response.success) {
          setLoggedEmail(response.data.username)
          setIsLoggedIn(true)
          navigate(To.Home, { replace: true })
        } else {
          let numFailures = 0

          switch (response.code) {
            case ErrorCode.ACCESS_DENIED:
            case ErrorCode.ACCESS_DENIED_ACCOUNT_DISABLE:
              setIsAccountLocked(true)

              numFailures = response.data?.num_failures
              if (numFailures) {
                setNumOfLoginFailure(numFailures)
              }
              break
            case ErrorCode.NOT_FOUND_ERROR:
              setIsEmailNotFound(true)
              break
            case ErrorCode.INVALID_PARAMETERS:
              setInvalidParametersError(true)
              break
            case ErrorCode.RESOLVE_REQUIRED_ACTIONS:
              setTemporallyStoredEmailForChangingPassword(email)
              navigate(To.ChangePassword)
              break
          }
        }
      },
      onError: (error) => {
        switch (error.code) {
          case ErrorCode.ERR_NETWORK:
            setIsError(true)
            break
        }
      },
      onSettled: () => {
        LoadingService.close()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="이메일"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        fullWidth
        error={noEmailError}
        helperText={noEmailError ? NO_EMAIL_ERROR_MESSAGE : ''}
      />
      <Input
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        fullWidth
        error={noPasswordError}
        helperText={noPasswordError ? NO_PASSWORD_ERROR_MESSAGE : ''}
      />
      <Input
        label="OTP 인증번호"
        inputProps={{ maxLength: 6 }}
        value={otp}
        onChange={handleChangeOtp}
        fullWidth
        error={noOTPError}
        helperText={noOTPError ? NO_OTP_ERROR_MESSAGE : ''}
      />
      {(invalidParametersError ||
        isEmailNotFound ||
        (numOfLoginFailure > 0 && numOfLoginFailure < 5)) && (
        <Alert sx={{ mt: 1.5 }} severity="error">
          {UNAUTHORIZED_SUBMIT_ERROR_MESSAGE}
        </Alert>
      )}

      <SubmitButton type="submit" variant="contained" fullWidth>
        로그인
      </SubmitButton>

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

export default LogInPageForm
